import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { pageModel, activityLogModel } from '@/lib/db/models'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  await pageModel.updateById(parseInt(id), body)
  await activityLogModel.logActivity({ user_id: session.id, action: 'Updated page', entity_type: 'page', entity_id: parseInt(id) })
  return NextResponse.json({ success: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  if (session.role !== 'admin') return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  await pageModel.deleteById(parseInt(id))
  return NextResponse.json({ success: true })
}
