import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { userModel } from '@/lib/db/models'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const users = await userModel.raw(
    'SELECT id, email, name, role, is_active, last_login, created_at FROM users ORDER BY created_at ASC'
  )
  return NextResponse.json({ success: true, data: users })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'admin') return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  const { name, email, password, role } = await req.json()
  if (!name || !email || !password) return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 })
  const exists = await userModel.findByEmail(email)
  if (exists) return NextResponse.json({ success: false, error: 'Email already in use' }, { status: 409 })
  const hash = await userModel.hashPassword(password)
  const id = await userModel.createUser({ email, password_hash: hash, name, role: role || 'editor' })
  return NextResponse.json({ success: true, id })
}
