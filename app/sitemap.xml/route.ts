/**
 * Dynamic XML sitemap — served at /sitemap.xml
 *
 * Uses a Route Handler instead of Next.js's special app/sitemap.ts file
 * to avoid a route conflict with the human-readable /sitemap page.
 *
 * Revalidated via Next.js ISR — the response is cached and refreshed hourly.
 */
import { NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { query } from '@/lib/db/connection'

export const revalidate = 3600 // revalidate hourly

export async function GET() {
  const siteUrl = config.seo.siteUrl

  let entries: Array<{
    url: string
    changefreq: string
    priority: number
    last_modified: Date | string
  }> = []

  try {
    entries = await query(
      'SELECT url, changefreq, priority, last_modified FROM sitemaps WHERE is_active = TRUE ORDER BY priority DESC'
    ) as typeof entries
  } catch {
    // DB not ready — fall back to a minimal sitemap with just the homepage
    entries = [{ url: '/', changefreq: 'weekly', priority: 1, last_modified: new Date() }]
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (u) => `  <url>
    <loc>${siteUrl}${u.url}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${Number(u.priority).toFixed(1)}</priority>
    <lastmod>${new Date(u.last_modified).toISOString().slice(0, 10)}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
