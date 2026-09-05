import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query, transaction } from '@/lib/db/connection'
import { config } from '@/lib/config'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const urls = await query('SELECT * FROM sitemaps WHERE is_active = TRUE ORDER BY priority DESC') as any[]
  const baseUrl = config.seo.siteUrl

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${baseUrl}${u.url}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <lastmod>${new Date(u.last_modified).toISOString().slice(0, 10)}</lastmod>
  </url>`).join('\n')}
</urlset>`

  await mkdir(join(process.cwd(), 'public'), { recursive: true })
  await writeFile(join(process.cwd(), 'public', 'sitemap.xml'), xml, 'utf-8')

  return NextResponse.json({ success: true, message: 'sitemap.xml generated' })
}
