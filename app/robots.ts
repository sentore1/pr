/**
 * Dynamic robots.txt
 * Generated at request time from CMS SEO settings.
 * Served at /robots.txt by Next.js App Router.
 */
import type { MetadataRoute } from 'next'
import { config } from '@/lib/config'
import { seoSettingModel } from '@/lib/db/models'

export const revalidate = 3600 // Revalidate hourly

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = config.seo.siteUrl

  // Check if the global SEO setting has robots = noindex — if so, block all crawlers
  let globalRobots = 'index, follow'
  try {
    const seo = await seoSettingModel.getGlobalSEO()
    if (seo?.robots) globalRobots = seo.robots
  } catch {
    // DB not ready — use default
  }

  const disallowAll = globalRobots.includes('noindex')

  return {
    rules: [
      {
        userAgent: '*',
        allow: disallowAll ? [] : ['/'],
        disallow: disallowAll
          ? ['/']
          : [
              '/admin/',
              '/api/admin/',
              '/api/',
              '/_next/',
            ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
