import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { contentBlockModel, activityLogModel } from '@/lib/db/models'
import { transaction } from '@/lib/db/connection'
import { revalidatePath } from 'next/cache'

// GET /api/admin/content?page_id=1
export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const pageId = parseInt(req.nextUrl.searchParams.get('page_id') || '1')
  const blocks = await contentBlockModel.getBlocksByPage(pageId)

  return NextResponse.json({ success: true, data: blocks })
}

// PUT /api/admin/content — full replace blocks for a page
export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { page_id, blocks } = await req.json()

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

  revalidatePath('/', 'layout')
  return NextResponse.json({ success: true })
}
