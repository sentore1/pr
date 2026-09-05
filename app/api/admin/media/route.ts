import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { mediaLibraryModel } from '@/lib/db/models'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = req.nextUrl
  const page = parseInt(searchParams.get('page') || '1')
  const per_page = parseInt(searchParams.get('per_page') || '24')
  const folder = searchParams.get('folder')

  const result = await mediaLibraryModel.paginate({
    page,
    per_page,
    where: folder ? { folder } : undefined,
    orderBy: { column: 'created_at', direction: 'DESC' },
  })

  return NextResponse.json({ success: true, ...result })
}
