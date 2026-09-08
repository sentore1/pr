import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { contentBlockModel, activityLogModel, pageModel } from '@/lib/db/models'
import { transaction } from '@/lib/db/connection'
import { revalidatePath } from 'next/cache'

// GET /api/admin/content?page_id=1   OR   ?slug=non-profit
export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  let pageId = parseInt(req.nextUrl.searchParams.get('page_id') || '0')

  if (!pageId) {
    const slug = req.nextUrl.searchParams.get('slug')
    if (slug) {
      let page = await pageModel.findBySlug(slug)
      if (!page) {
        const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        const id = await pageModel.create({ title, slug, is_published: true } as any)
        page = await pageModel.findById(id)
      }
      pageId = page?.id || 1
    } else {
      pageId = 1
    }
  }

  const rawBlocks = await contentBlockModel.getBlocksByPage(pageId) as any[]

  // Parse settings JSON string → object (MySQL returns it as a raw string)
  const blocks = rawBlocks.map(b => ({
    ...b,
    settings: typeof b.settings === 'string'
      ? (() => { try { return JSON.parse(b.settings) } catch { return {} } })()
      : (b.settings ?? {}),
  }))

  return NextResponse.json({ success: true, data: blocks, page_id: pageId })
}

// PUT /api/admin/content — full replace blocks for a page
// Accepts { page_id, blocks } or { slug, blocks }
export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  let { page_id, slug, blocks } = body as { page_id?: number; slug?: string; blocks: any[] }

  // Resolve page_id from slug if not directly provided
  if (!page_id && slug) {
    let page = await pageModel.findBySlug(slug)
    if (!page) {
      const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      const id = await pageModel.create({ title, slug, is_published: true } as any)
      page = await pageModel.findById(id)
    }
    page_id = page?.id
  }

  if (!page_id) return NextResponse.json({ success: false, error: 'page_id or slug required' }, { status: 400 })

  await transaction(async (conn) => {
    await conn.execute(`DELETE FROM content_blocks WHERE page_id = ?`, [page_id])

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i]
      await conn.execute(
        `INSERT INTO content_blocks (page_id, block_type, title, content, settings, sort_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          page_id,
          b.block_type,
          b.title || '',
          b.content || '',
          JSON.stringify(b.settings || {}),
          i,
          b.is_active ? 1 : 0,
        ]
      )
    }
  })

  await activityLogModel.logActivity({ user_id: session.id, action: 'Updated content blocks', entity_type: 'content', entity_id: page_id })

  // Revalidate root layout and specific slug
  revalidatePath('/', 'layout')
  if (slug && slug !== 'home') revalidatePath(`/${slug}`)
  // Also bust the public blocks cache for this slug
  revalidatePath(`/api/cms/blocks`)

  return NextResponse.json({ success: true, page_id })
}
