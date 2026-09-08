/**
 * Dynamic sitemap — served at /sitemap.xml
 * Combines static routes with CMS-managed pages from the DB.
 * Revalidated every hour via ISR.
 */
import type { MetadataRoute } from 'next'
import { config } from '@/lib/config'

export const revalidate = 3600 // 1 hour

const BASE = config.seo.siteUrl.replace(/\/$/, '')

// All static routes with their priority / change frequency
const STATIC_ROUTES: Array<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}> = [
  { path: '/',                         priority: 1.0,  changeFrequency: 'weekly'  },
  { path: '/about',                    priority: 0.9,  changeFrequency: 'monthly' },
  { path: '/products',                 priority: 0.9,  changeFrequency: 'weekly'  },
  { path: '/pricing',                  priority: 0.9,  changeFrequency: 'weekly'  },
  { path: '/features',                 priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/contact',                  priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/demo',                     priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/careers',                  priority: 0.7,  changeFrequency: 'weekly'  },
  { path: '/small-business',           priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/human-resource',           priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/non-profit',               priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/hospitality',              priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/construction',             priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/logistic',                 priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/customer-relation',        priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/project',                  priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/stock-management',         priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/self-employed',            priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/ai-enterprise',            priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/accountants-bookkeepers',  priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/marketing-call',           priority: 0.6,  changeFrequency: 'monthly' },
  { path: '/marketing-mail',           priority: 0.6,  changeFrequency: 'monthly' },
  { path: '/ai-calculator',            priority: 0.6,  changeFrequency: 'monthly' },
  { path: '/accessibility',            priority: 0.3,  changeFrequency: 'yearly'  },
  { path: '/privacy',                  priority: 0.3,  changeFrequency: 'yearly'  },
  { path: '/terms',                    priority: 0.3,  changeFrequency: 'yearly'  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Build static entries
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  // Try to pull CMS-managed pages from the DB
  let cmsEntries: MetadataRoute.Sitemap = []
  try {
    const { pageModel } = await import('@/lib/db/models')
    const pages = await pageModel.getPublishedPages()
    const staticPaths = new Set(STATIC_ROUTES.map(r => r.path))

    cmsEntries = pages
      .filter(page => {
        const slug = page.slug?.toLowerCase().trim()
        if (!slug || slug === 'home') return false
        // Skip slugs that already have a dedicated static route
        return !staticPaths.has(`/${slug}`)
      })
      .map(page => ({
        url: `${BASE}/${page.slug}`,
        lastModified: page.updated_at ? new Date(page.updated_at) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  } catch {
    // DB unavailable at build time — sitemap still returns static entries
  }

  return [...staticEntries, ...cmsEntries]
}
