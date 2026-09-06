import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { transaction } from '@/lib/db/connection'
import { footerSectionModel, footerLinkModel } from '@/lib/db/models'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const sections = await footerSectionModel.getActiveSections()
  const withLinks = await Promise.all(
    sections.map(async (s) => ({
      ...s,
      links: await footerLinkModel.getLinksBySection(s.id),
    }))
  )
  return NextResponse.json({ success: true, data: withLinks })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { sections } = await req.json()

  await transaction(async (conn) => {
    await conn.execute('DELETE FROM footer_links')
    await conn.execute('DELETE FROM footer_sections')

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i]
      const [res] = await conn.execute(
        `INSERT INTO footer_sections (name, sort_order, is_active) VALUES (?, ?, ?)`,
        [sec.name, i, sec.is_active ? 1 : 0]
      ) as any
      const sectionId = res.insertId

      for (let j = 0; j < (sec.links || []).length; j++) {
        const link = sec.links[j]
        await conn.execute(
          `INSERT INTO footer_links (section_id, label, url, target, sort_order, is_active)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [sectionId, link.label, link.url || '/', link.target || '_self', j, link.is_active ? 1 : 0]
        )
      }
    }
  })

  revalidatePath('/', 'layout')
  return NextResponse.json({ success: true })
}
