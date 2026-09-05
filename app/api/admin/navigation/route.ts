import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query, insert, update, deleteQuery, transaction } from '@/lib/db/connection'
import { activityLogModel } from '@/lib/db/models'
import { revalidatePath } from 'next/cache'

// GET /api/admin/navigation — return full nav tree for the header menu
export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const topLevel = await query(
    `SELECT * FROM navigation_items WHERE menu_id = 1 AND parent_id IS NULL ORDER BY sort_order ASC`
  )

  const withChildren = await Promise.all(
    topLevel.map(async (item: any) => {
      const children = await query(
        `SELECT * FROM navigation_items WHERE parent_id = ? ORDER BY sort_order ASC`,
        [item.id]
      )
      return { ...item, children }
    })
  )

  return NextResponse.json({ success: true, data: withChildren })
}

// PUT /api/admin/navigation — full replace (upsert) nav items
export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { items } = await req.json()

  await transaction(async (conn) => {
    // Clear existing items for this menu
    await conn.execute(`DELETE FROM navigation_items WHERE menu_id = 1`)

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const [res] = await conn.execute(
        `INSERT INTO navigation_items (menu_id, parent_id, label, url, icon_url, target, sort_order, is_active)
         VALUES (1, NULL, ?, ?, ?, ?, ?, ?)`,
        [item.label, item.url || '', item.icon_url || '', item.target || '_self', i, item.is_active ? 1 : 0]
      ) as any
      const parentId = res.insertId

      for (let j = 0; j < (item.children || []).length; j++) {
        const child = item.children[j]
        await conn.execute(
          `INSERT INTO navigation_items (menu_id, parent_id, label, url, icon_url, target, sort_order, is_active)
           VALUES (1, ?, ?, ?, ?, ?, ?, ?)`,
          [parentId, child.label, child.url || '', child.icon_url || '', child.target || '_self', j, child.is_active ? 1 : 0]
        )
      }
    }
  })

  await activityLogModel.logActivity({ user_id: session.id, action: 'Updated navigation', entity_type: 'navigation' })

  // Revalidate all pages so the new nav appears immediately
  revalidatePath('/', 'layout')

  return NextResponse.json({ success: true })
}
