/**
 * Individual sitemap entry management
 * PUT    /api/admin/seo/sitemap/entries/[id]  — update a URL entry
 * DELETE /api/admin/seo/sitemap/entries/[id]  — remove a URL entry
 */
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query } from '@/lib/db/connection'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { id: rawId } = await params
  const id = parseInt(rawId)
  if (isNaN(id)) return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 })

  const { url, changefreq, priority, is_active } = await req.json()

  const fields: string[] = []
  const values: any[] = []

  if (url !== undefined) { fields.push('url = ?'); values.push(url) }
  if (changefreq !== undefined) { fields.push('changefreq = ?'); values.push(changefreq) }
  if (priority !== undefined) { fields.push('priority = ?'); values.push(priority) }
  if (is_active !== undefined) { fields.push('is_active = ?'); values.push(is_active ? 1 : 0) }
  // Always update last_modified when the entry is touched
  fields.push('last_modified = NOW()')

  if (fields.length === 1) {
    // Only last_modified was going to be updated — nothing to change
    return NextResponse.json({ success: false, error: 'No fields to update' }, { status: 400 })
  }

  values.push(id)
  await query(`UPDATE sitemaps SET ${fields.join(', ')} WHERE id = ?`, values)

  return NextResponse.json({ success: true })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { id: rawId } = await params
  const id = parseInt(rawId)
  if (isNaN(id)) return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 })

  await query('DELETE FROM sitemaps WHERE id = ?', [id])
  return NextResponse.json({ success: true })
}
