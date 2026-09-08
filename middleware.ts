/**
 * Next.js Middleware
 * 1. Protects /admin routes — redirects unauthenticated users to /admin/login
 * 2. Enforces DB-configured URL redirects (301/302/307) at request time
 * 3. In-memory rate-limiting for the login endpoint (brute-force protection)
 *
 * NOTE: Middleware runs on the Edge Runtime — no Node.js modules (mysql2, fs, etc.)
 * allowed. Redirects are fetched from an internal API route (Node.js) and cached
 * in-memory for 60 seconds to avoid a fetch on every request.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

const PUBLIC_PATHS = [
  '/admin/login',
  '/api/admin/auth/login',
  '/api/admin/auth/logout',
  '/api/analytics/track',
]

// ── In-process redirect cache (resets on cold start — acceptable) ──────────
let _redirectCache: Array<{ source_url: string; destination_url: string; redirect_type: string }> = []
let _redirectCacheTime = 0
const REDIRECT_CACHE_TTL = 60_000 // 60 seconds

async function getRedirects(baseUrl: string) {
  if (Date.now() - _redirectCacheTime < REDIRECT_CACHE_TTL) return _redirectCache
  try {
    const res = await fetch(`${baseUrl}/api/redirects`, {
      headers: { 'x-internal': '1' },
      cache: 'no-store',
    })
    if (res.ok) {
      const json = await res.json()
      _redirectCache = json.data || []
      _redirectCacheTime = Date.now()
    }
  } catch {
    // Network error — return stale cache rather than crashing
  }
  return _redirectCache
}

// ── In-memory rate limiter (Edge-compatible, per-IP sliding window) ─────────
// Stores: Map<ip, { count: number; windowStart: number }>
const _loginAttempts = new Map<string, { count: number; windowStart: number }>()

const LOGIN_RATE_LIMIT   = 10   // max attempts
const LOGIN_WINDOW_MS    = 15 * 60 * 1000 // 15-minute window
const LOGIN_LOCKOUT_MS   = 15 * 60 * 1000 // lockout duration after exceeding

/**
 * Returns true if the IP is currently rate-limited.
 * Increments the counter on each call for login attempts.
 */
function isLoginRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = _loginAttempts.get(ip)

  if (!entry) {
    _loginAttempts.set(ip, { count: 1, windowStart: now })
    return false
  }

  // Reset window if it has expired
  if (now - entry.windowStart > LOGIN_WINDOW_MS) {
    _loginAttempts.set(ip, { count: 1, windowStart: now })
    return false
  }

  // Still inside the window — increment
  entry.count += 1
  _loginAttempts.set(ip, entry)

  return entry.count > LOGIN_RATE_LIMIT
}

/**
 * Periodically prune stale entries so the Map doesn't grow forever.
 * Called on each login request — cheap enough given low login traffic.
 */
function pruneLoginAttempts() {
  const now = Date.now()
  for (const [ip, entry] of _loginAttempts) {
    if (now - entry.windowStart > LOGIN_WINDOW_MS + LOGIN_LOCKOUT_MS) {
      _loginAttempts.delete(ip)
    }
  }
}

// ── Main middleware ──────────────────────────────────────────────────────────
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── 1. Rate-limit the login endpoint ──────────────────────────────────────
  if (pathname === '/api/admin/auth/login' && request.method === 'POST') {
    pruneLoginAttempts()

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    if (isLoginRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many login attempts. Please try again in 15 minutes.' },
        {
          status: 429,
          headers: {
            'Retry-After': '900',
            'X-RateLimit-Limit': String(LOGIN_RATE_LIMIT),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }
  }

  // ── 2. DB-driven redirects ─────────────────────────────────────────────────
  const skipRedirect =
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/admin/')

  if (!skipRedirect) {
    const origin = request.nextUrl.origin
    const redirects = await getRedirects(origin)
    const match = redirects.find((r) => r.source_url === pathname)
    if (match) {
      const destination = new URL(match.destination_url, request.url)
      const status = parseInt(match.redirect_type) || 301
      return NextResponse.redirect(destination, { status })
    }
  }

  // ── 3. Admin route protection ──────────────────────────────────────────────
  const isAdminPath = pathname.startsWith('/admin')
  const isAdminApi  = pathname.startsWith('/api/admin')

  if (!isAdminPath && !isAdminApi) {
    return NextResponse.next()
  }

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const session = await getSessionFromRequest(request)

  if (!session) {
    if (isAdminApi) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const response = NextResponse.next()
  response.headers.set('x-user-id', String(session.id))
  response.headers.set('x-user-role', session.role)
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?|ttf|otf)).*)',
  ],
}
