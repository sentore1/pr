import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { systemSettingModel } from '@/lib/db/models'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const data = await systemSettingModel.findAll()
  return NextResponse.json({ success: true, data })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'admin') return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  const { settings } = await req.json()
  for (const [key, value] of Object.entries(settings)) {
    await systemSettingModel.updateSetting(key, String(value))
  }
  return NextResponse.json({ success: true })
}
