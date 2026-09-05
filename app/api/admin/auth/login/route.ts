import { NextRequest, NextResponse } from 'next/server'
import { userModel } from '@/lib/db/models'
import { createToken, setSessionCookie } from '@/lib/auth'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data
    const user = await userModel.findByEmail(email)

    if (!user || !user.is_active) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const passwordValid = await userModel.verifyPassword(password, user.password_hash)
    if (!passwordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    await userModel.updateLastLogin(user.id)

    const token = await createToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    })

    return setSessionCookie(response, token)
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
