import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { userModel } from '@/lib/db/models'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session || session.role !== 'admin') return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  const { id } = await params
  const { password } = await req.json()
  if (!password || password.length < 6) return NextResponse.json({ success: false, error: 'Password too short' }, { status: 400 })
  await userModel.updatePassword(parseInt(id), password)
  return NextResponse.json({ success: true })
}
