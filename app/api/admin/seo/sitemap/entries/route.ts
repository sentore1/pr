/**
 * Sitemap entries CRUD
 * POST   /api/admin/seo/sitemap/entries  — create a new URL entry
 * GET handled by parent /api/admin/seo/sitemap/route.ts
 */
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query } from '@/lib/db/connection'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { url, changefreq = 'weekly', priority = 0.5, is_active = true } = await req.json()

  if (!url || typeof url !== 'string' || !url.startsWith('/')) {
    return NextResponse.json({ success: false, error: 'url must be a path starting with /' }, { status: 400 })
  }

  await query(
    `INSERT INTO sitemaps (url, changefreq, priority, last_modified, is_active) VALUES (?, ?, ?, NOW(), ?)`,
    [url, changefreq, priority, is_active ? 1 : 0]
  )

  const rows = await query('SELECT * FROM sitemaps ORDER BY priority DESC') as any[]
  return NextResponse.json({ success: true, data: rows }, { status: 201 })
}
