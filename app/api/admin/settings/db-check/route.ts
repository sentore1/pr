import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { testConnection } from '@/lib/db/connection'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const ok = await testConnection()
  return NextResponse.json({ success: ok })
}
