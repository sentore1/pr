import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { pageModel, contentBlockModel } from '@/lib/db/models'

/**
 * GET /api/admin/content/by-slug?slug=non-profit
 * Returns the page_id and content_blocks for a given page slug.
 * Creates a pages row automatically if one doesn't exist yet (so solution
 * pages that were never explicitly created in the CMS still work).
 */
export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ success: false, error: 'slug is required' }, { status: 400 })

  // Find or create the page row
  let page = await pageModel.findBySlug(slug)
  if (!page) {
    // Auto-create a stub page row so blocks can be stored
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const id = await pageModel.create({ title, slug, is_published: true } as any)
    page = await pageModel.findById(id)
  }

  if (!page) {
    return NextResponse.json({ success: false, error: 'Failed to find or create page' }, { status: 500 })
  }

  const blocks = await contentBlockModel.getBlocksByPage(page.id)
  return NextResponse.json({ success: true, data: { page_id: page.id, blocks } })
}
