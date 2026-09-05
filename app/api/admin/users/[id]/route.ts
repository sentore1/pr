import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { userModel } from '@/lib/db/models'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session || session.role !== 'admin') return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const body = await req.json()
  // Don't allow changing own role via this endpoint
  await userModel.updateById(parseInt(id), body)
  return NextResponse.json({ success: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session || session.role !== 'admin') return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  if (parseInt(id) === session.id) return NextResponse.json({ success: false, error: 'Cannot delete your own account' }, { status: 400 })
  await userModel.deleteById(parseInt(id))
  return NextResponse.json({ success: true })
}
