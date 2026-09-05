/**
 * Next.js Middleware
 * Protects /admin routes, redirects unauthenticated users to login
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

const PUBLIC_PATHS = [
  '/admin/login',
  '/api/admin/auth/login',
  '/api/admin/auth/logout',
  '/api/analytics/track',  // public tracking endpoint
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only guard /admin and /api/admin paths
  const isAdminPath = pathname.startsWith('/admin')
  const isAdminApi = pathname.startsWith('/api/admin')

  if (!isAdminPath && !isAdminApi) {
    return NextResponse.next()
  }

  // Allow public auth paths through
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const session = await getSessionFromRequest(request)

  if (!session) {
    // API → 401, page → redirect to login
    if (isAdminApi) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Inject user info headers for route handlers
  const response = NextResponse.next()
  response.headers.set('x-user-id', String(session.id))
  response.headers.set('x-user-role', session.role)
  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
