import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { randomUUID } from 'crypto'
import { mediaLibraryModel } from '@/lib/db/models'
import { config } from '@/lib/config'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const form = await req.formData()
  const file = form.get('file') as File | null
  const folder = (form.get('folder') as string) || 'general'

  if (!file) return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })

  // Validate type
  if (!config.upload.allowedTypes.includes(file.type)) {
    return NextResponse.json({ success: false, error: 'File type not allowed' }, { status: 400 })
  }

  // Validate size
  if (file.size > config.upload.maxFileSize) {
    return NextResponse.json({ success: false, error: 'File too large (max 10MB)' }, { status: 400 })
  }

  const ext = extname(file.name) || '.jpg'
  const filename = `${randomUUID()}${ext}`
  const uploadDir = join(process.cwd(), 'public', 'uploads', folder)
  await mkdir(uploadDir, { recursive: true })

  const bytes = await file.arrayBuffer()
  await writeFile(join(uploadDir, filename), Buffer.from(bytes))

  const fileUrl = `/uploads/${folder}/${filename}`

  // Try to get dimensions for images
  let width: number | null = null
  let height: number | null = null
  try {
    const sharp = (await import('sharp')).default
    const meta = await sharp(Buffer.from(bytes)).metadata()
    width = meta.width || null
    height = meta.height || null
  } catch { /* sharp optional */ }

  const id = await mediaLibraryModel.create({
    filename,
    original_filename: file.name,
    file_path: join('uploads', folder, filename),
    file_url: fileUrl,
    mime_type: file.type,
    file_size: file.size,
    width,
    height,
    alt_text: '',
    title: file.name.replace(/\.[^.]+$/, ''),
    uploaded_by: session.id,
    folder,
  } as any)

  const media = await mediaLibraryModel.findById(id)
  return NextResponse.json({ success: true, data: media })
}
