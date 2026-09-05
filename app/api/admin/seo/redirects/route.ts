import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query, transaction } from '@/lib/db/connection'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const data = await query('SELECT * FROM redirects ORDER BY created_at DESC')
  return NextResponse.json({ success: true, data })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { redirects } = await req.json()

  await transaction(async (conn) => {
    await conn.execute('DELETE FROM redirects')
    for (const r of redirects) {
      await conn.execute(
        `INSERT INTO redirects (source_url, destination_url, redirect_type, is_active)
         VALUES (?, ?, ?, ?)`,
        [r.source_url, r.destination_url, r.redirect_type || '301', r.is_active ? 1 : 0]
      )
    }
  })

  return NextResponse.json({ success: true })
}
