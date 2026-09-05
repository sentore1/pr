import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { pageModel, activityLogModel } from '@/lib/db/models'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const pages = await pageModel.findAll({ orderBy: { column: 'created_at', direction: 'DESC' } })
  return NextResponse.json({ success: true, data: pages })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const { title, slug } = await req.json()
  if (!title || !slug) return NextResponse.json({ success: false, error: 'title and slug required' }, { status: 400 })
  const exists = await pageModel.findBySlug(slug)
  if (exists) return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 409 })
  const id = await pageModel.create({ title, slug, created_by: session.id } as any)
  await activityLogModel.logActivity({ user_id: session.id, action: 'Created page', entity_type: 'page', entity_id: id })
  return NextResponse.json({ success: true, id })
}
