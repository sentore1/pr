import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query, insert, update } from '@/lib/db/connection'
import { revalidatePath } from 'next/cache'

// GET — return all dynamic_content rows
export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const rows = await query('SELECT key_name, value FROM dynamic_content ORDER BY key_name ASC')
  return NextResponse.json({ success: true, data: rows })
}

// PUT — upsert key/value pairs
export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { values } = await req.json()

  for (const [key, value] of Object.entries(values as Record<string, string>)) {
    const existing = await query(
      'SELECT id FROM dynamic_content WHERE key_name = ?',
      [key]
    ) as any[]

    if (existing.length > 0) {
      await update(
        'UPDATE dynamic_content SET value = ? WHERE key_name = ?',
        [value, key]
      )
    } else {
      await insert(
        'INSERT INTO dynamic_content (key_name, value, data_type) VALUES (?, ?, ?)',
        [key, value, 'text']
      )
    }
  }

  // Revalidate site so changes appear immediately
  revalidatePath('/', 'layout')

  return NextResponse.json({ success: true })
}
