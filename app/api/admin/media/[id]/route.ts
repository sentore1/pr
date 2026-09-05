import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { mediaLibraryModel } from '@/lib/db/models'
import { unlink } from 'fs/promises'
import { join } from 'path'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { alt_text, title } = await req.json()
  await mediaLibraryModel.updateById(parseInt(id), { alt_text, title } as any)
  return NextResponse.json({ success: true })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const item = await mediaLibraryModel.findById(parseInt(id))
  if (!item) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })

  // Delete physical file
  try {
    await unlink(join(process.cwd(), 'public', item.file_path))
  } catch { /* file may not exist */ }

  await mediaLibraryModel.deleteById(parseInt(id))
  return NextResponse.json({ success: true })
}
