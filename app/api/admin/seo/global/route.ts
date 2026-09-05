import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { seoSettingModel } from '@/lib/db/models'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const data = await seoSettingModel.getGlobalSEO()
  return NextResponse.json({ success: true, data })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const existing = await seoSettingModel.getGlobalSEO()

  if (existing) {
    await seoSettingModel.updateById(existing.id, body)
  } else {
    await seoSettingModel.create({ ...body, page_id: null } as any)
  }

  return NextResponse.json({ success: true })
}
