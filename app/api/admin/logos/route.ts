import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { logoModel } from '@/lib/db/models'
import { transaction } from '@/lib/db/connection'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const logos = await logoModel.findAll({ orderBy: { column: 'position', direction: 'ASC' } })
  return NextResponse.json({ success: true, data: logos })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const { logos } = await req.json()

  await transaction(async (conn) => {
    await conn.execute('DELETE FROM logos')
    for (const logo of logos) {
      await conn.execute(
        `INSERT INTO logos (name, image_url, alt_text, position, link_url, is_active)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [logo.name, logo.image_url, logo.alt_text || '', logo.position, logo.link_url || '/', logo.is_active ? 1 : 0]
      )
    }
  })

  return NextResponse.json({ success: true })
}
