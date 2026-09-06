/**
 * Internal redirects endpoint
 * Used by middleware (Edge Runtime) to fetch DB redirects without importing
 * Node.js-only modules (mysql2) directly into the edge bundle.
 *
 * Only responds to requests carrying the x-internal header to prevent
 * public access. Called by middleware every 60 seconds (cached in-process).
 */
import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db/connection'

export async function GET(req: NextRequest) {
  // Lightweight guard — only allow calls from our own middleware
  if (req.headers.get('x-internal') !== '1') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const data = await query(
      'SELECT source_url, destination_url, redirect_type FROM redirects WHERE is_active = TRUE'
    )
    return NextResponse.json({ data })
  } catch {
    // DB not ready — return empty list so middleware doesn't crash
    return NextResponse.json({ data: [] })
  }
}
