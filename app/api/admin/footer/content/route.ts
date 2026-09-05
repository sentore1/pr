import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query, insert, update } from '@/lib/db/connection'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const rows = await query('SELECT key_name, content FROM footer_content') as any[]
  const data: Record<string, string> = {}
  for (const r of rows) data[r.key_name] = r.content || ''
  return NextResponse.json({ success: true, data })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { content } = await req.json()

  for (const [key, val] of Object.entries(content)) {
    const exists = await query('SELECT id FROM footer_content WHERE key_name = ?', [key]) as any[]
    if (exists.length > 0) {
      await update('UPDATE footer_content SET content = ? WHERE key_name = ?', [val, key])
    } else {
      await insert('INSERT INTO footer_content (key_name, content) VALUES (?, ?)', [key, val])
    }
  }

  return NextResponse.json({ success: true })
}
