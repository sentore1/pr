import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query } from '@/lib/db/connection'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const data = await query('SELECT * FROM sitemaps WHERE is_active = TRUE ORDER BY priority DESC')
  return NextResponse.json({ success: true, data })
}
