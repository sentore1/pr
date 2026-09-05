/**
 * Authentication utilities
 * JWT-based session management for the CMS admin
 */

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'

const JWT_SECRET = new TextEncoder().encode(config.auth.jwtSecret)
const COOKIE_NAME = 'pryro_admin_token'

export interface AdminSession {
  id: number
  email: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
}

/**
 * Create a signed JWT token
 */
export async function createToken(payload: AdminSession): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AdminSession
  } catch {
    return null
  }
}

/**
 * Get session from cookies (server component / route handler)
 */
export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

/**
 * Get session from request (middleware)
 */
export async function getSessionFromRequest(
  request: NextRequest
): Promise<AdminSession | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

/**
 * Set session cookie on a response
 */
export function setSessionCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: config.app.isProduction,
    sameSite: 'lax',
    maxAge: config.auth.sessionMaxAge,
    path: '/',
  })
  return response
}

/**
 * Clear session cookie
 */
export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.delete(COOKIE_NAME)
  return response
}

/**
 * Build a JSON error response (unauthorized)
 */
export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { success: false, error: 'Unauthorized' },
    { status: 401 }
  )
}

/**
 * Check if session has required role
 */
export function hasRole(
  session: AdminSession,
  required: 'admin' | 'editor' | 'viewer'
): boolean {
  const hierarchy = { admin: 3, editor: 2, viewer: 1 }
  return hierarchy[session.role] >= hierarchy[required]
}
