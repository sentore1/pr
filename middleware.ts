/**
 * Next.js Middleware
 * 1. Protects /admin routes, redirects unauthenticated users to login
 * 2. Enforces DB-configured URL redirects (301/302/307) at request time
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

// In-process redirect cache (Edge isolate scope — resets on cold start)
let _redirectCache: Array<{ source_url: string; destination_url: string; redirect_type: string }> = []
let _redirectCacheTime = 0
const REDIRECT_CACHE_TTL = 60_000 // 60 seconds

async function getRedirects(baseUrl: string) {
  if (Date.now() - _redirectCacheTime < REDIRECT_CACHE_TTL) return _redirectCache
  try {
    // Call the Node.js API route — safe from Edge because it's a plain fetch
    const res = await fetch(`${baseUrl}/api/redirects`, {
      headers: { 'x-internal': '1' },
      // Don't let this fetch be cached by Next.js ISR — we manage the cache ourselves
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── 1. DB-driven redirects ───────────────────────────────────────────────────
  // Skip for Next.js internals, API routes, and admin to avoid overhead + loops
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

  // ── 2. Admin route protection ────────────────────────────────────────────────
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
    /*
     * Match all paths except static files and Next.js internals.
     * sitemap.xml and robots.txt are excluded so their route handlers serve unimpeded.
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?|ttf|otf)).*)',
  ],
}
