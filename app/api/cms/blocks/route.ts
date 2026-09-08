/**
 * Public endpoint for reading content blocks by page slug.
 * Used by <CmsBlocks slug="..." /> on the frontend — no auth required.
 * Writing is handled by the admin-only PUT /api/admin/content.
 */
import { NextRequest, NextResponse } from 'next/server'
import { contentBlockModel, pageModel } from '@/lib/db/models'

export const revalidate = 60 // ISR: revalidate every 60s

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ success: false, error: 'slug required' }, { status: 400 })

  try {
    const page = await pageModel.findBySlug(slug)
    if (!page) return NextResponse.json({ success: true, data: [] })

    const rawBlocks = await contentBlockModel.getBlocksByPage(page.id) as any[]

    // MySQL returns the `settings` column as a raw JSON string — parse it here
    // so the frontend receives a proper object instead of a string.
    const blocks = rawBlocks.map(b => ({
      ...b,
      settings: typeof b.settings === 'string'
        ? (() => { try { return JSON.parse(b.settings) } catch { return {} } })()
        : (b.settings ?? {}),
    }))

    return NextResponse.json({ success: true, data: blocks })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load blocks' }, { status: 500 })
  }
}
