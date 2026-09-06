import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query } from '@/lib/db/connection'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  // Return ALL entries (active and inactive) for the admin UI
  const data = await query('SELECT * FROM sitemaps ORDER BY priority DESC, url ASC')
  return NextResponse.json({ success: true, data })
}
