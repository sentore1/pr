import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query, insert, update } from '@/lib/db/connection'
import { revalidatePath } from 'next/cache'
import { DEFAULTS } from '@/lib/page-content'

// GET — return all dynamic_content rows, pre-populated with DEFAULTS for keys
// that have never been saved to the DB yet (so the admin always shows current
// effective values rather than empty fields).
export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const rows = await query('SELECT key_name, value FROM dynamic_content ORDER BY key_name ASC') as any[]

  // Build a map from DB rows
  const dbMap: Record<string, string> = {}
  for (const r of rows) dbMap[r.key_name] = r.value ?? ''

  // Merge: DEFAULTS first, then DB values override. Convert back to array shape.
  const merged = Object.entries({ ...DEFAULTS, ...dbMap }).map(([key_name, value]) => ({
    key_name,
    value,
  }))

  return NextResponse.json({ success: true, data: merged })
}

// PUT — upsert key/value pairs
export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { values, slug } = await req.json()

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

  // Revalidate the root layout (covers CMS context for all pages)
  revalidatePath('/', 'layout')
  // Revalidate the specific page slug if provided (for dynamic CMS pages)
  if (slug && typeof slug === 'string' && slug !== 'home') {
    revalidatePath(`/${slug}`)
  }

  return NextResponse.json({ success: true })
}
