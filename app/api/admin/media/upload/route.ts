import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { join, extname, normalize, resolve } from 'path'
import { randomUUID } from 'crypto'
import { mediaLibraryModel } from '@/lib/db/models'
import { config } from '@/lib/config'

// Allowlist of folders the client is permitted to upload into.
// This prevents path-traversal attacks via a crafted `folder` value.
const ALLOWED_FOLDERS = new Set([
  'general',
  'content',
  'media',
  'images',
  'logos',
  'avatars',
  'pages',
])

// SVG is excluded even though it may be in config.upload.allowedTypes because
// SVG files can embed <script> tags and execute JavaScript when opened directly
// in a browser.  Uploaded files are served from /public/uploads (static), so
// a malicious SVG would be a stored-XSS vector.
const BLOCKED_MIME_TYPES = new Set(['image/svg+xml'])

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get('file') as File | null
  const rawFolder = (form.get('folder') as string | null) || 'general'

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
  }

  // ── Sanitize folder ────────────────────────────────────────────────────────
  // Strip any path separators, dots, or special characters; keep only
  // alphanumeric, hyphens, and underscores, then check against allowlist.
  const sanitizedFolder = rawFolder.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() || 'general'
  if (!ALLOWED_FOLDERS.has(sanitizedFolder)) {
    return NextResponse.json(
      { success: false, error: `Upload folder '${sanitizedFolder}' is not permitted` },
      { status: 400 }
    )
  }

  // ── Validate MIME type ─────────────────────────────────────────────────────
  if (BLOCKED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { success: false, error: 'SVG uploads are not allowed for security reasons' },
      { status: 400 }
    )
  }

  if (!config.upload.allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { success: false, error: `File type '${file.type}' is not allowed` },
      { status: 400 }
    )
  }

  // ── Validate size ──────────────────────────────────────────────────────────
  if (file.size > config.upload.maxFileSize) {
    return NextResponse.json(
      { success: false, error: `File too large (max ${Math.round(config.upload.maxFileSize / 1024 / 1024)}MB)` },
      { status: 400 }
    )
  }

  // ── Build safe upload path ─────────────────────────────────────────────────
  const ext = extname(file.name).toLowerCase() || '.jpg'
  const filename = `${randomUUID()}${ext}`

  // Resolve the final upload directory and verify it stays inside /public/uploads
  const uploadsRoot = resolve(join(process.cwd(), 'public', 'uploads'))
  const uploadDir   = resolve(join(uploadsRoot, sanitizedFolder))

  if (!uploadDir.startsWith(uploadsRoot)) {
    // Should never happen after sanitization, but defence-in-depth
    return NextResponse.json({ success: false, error: 'Invalid upload path' }, { status: 400 })
  }

  await mkdir(uploadDir, { recursive: true })

  const bytes = await file.arrayBuffer()
  await writeFile(join(uploadDir, filename), Buffer.from(bytes))

  const fileUrl = `/uploads/${sanitizedFolder}/${filename}`

  // Optional: get image dimensions via sharp (not required)
  let width: number | null = null
  let height: number | null = null
  try {
    const sharp = (await import('sharp')).default
    const meta = await sharp(Buffer.from(bytes)).metadata()
    width  = meta.width  || null
    height = meta.height || null
  } catch { /* sharp is optional */ }

  const id = await mediaLibraryModel.create({
    filename,
    original_filename: file.name,
    file_path: join('uploads', sanitizedFolder, filename),
    file_url: fileUrl,
    mime_type: file.type,
    file_size: file.size,
    width,
    height,
    alt_text: '',
    title: file.name.replace(/\.[^.]+$/, ''),
    uploaded_by: session.id,
    folder: sanitizedFolder,
  } as any)

  const media = await mediaLibraryModel.findById(id)
  return NextResponse.json({ success: true, data: media })
}
