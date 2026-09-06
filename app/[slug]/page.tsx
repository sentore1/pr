/**
 * app/[slug]/page.tsx
 *
 * Catch-all renderer for pages created through the CMS admin.
 * - Looks up the page in the `pages` table by slug.
 * - Returns 404 if not found or not published.
 * - Reads the saved PageDef from dynamic_content (_page_def__{slug}) to know
 *   which layout template was chosen (solution | about-style | custom).
 * - Renders the appropriate client layout using CMS content.
 */

import { notFound } from 'next/navigation'
import { pageModel } from '@/lib/db/models'
import { query } from '@/lib/db/connection'
import type { Metadata } from 'next'
import { SolutionLayout } from './layouts/solution-layout'
import { AboutStyleLayout } from './layouts/about-style-layout'
import { CustomLayout } from './layouts/custom-layout'

interface Props {
  params: Promise<{ slug: string }>
}

// These slugs have their own dedicated pages — don't intercept them.
const STATIC_SLUGS = new Set([
  'about', 'features', 'pricing', 'contact', 'api', 'demo',
  'accessibility', 'accountants-bookkeepers', 'human-resource', 'project',
  'stock-management', 'customer-relation', 'self-employed', 'non-profit',
  'hospitality', 'construction', 'logistic', 'marketing-mail',
  'marketing-call', 'ai-enterprise', 'ai-calculator', 'admin',
])

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (STATIC_SLUGS.has(slug)) return {}
  const page = await pageModel.findBySlug(slug)
  if (!page || !page.is_published) return {}
  return {
    title: page.title,
    description: page.meta_description || undefined,
  }
}

export default async function DynamicCMSPage({ params }: Props) {
  const { slug } = await params

  // Don't intercept slugs that have their own dedicated app/ routes.
  if (STATIC_SLUGS.has(slug)) notFound()

  // Check the page exists and is published.
  const page = await pageModel.findBySlug(slug)
  if (!page || !page.is_published) notFound()

  // Read the page definition stored at creation time to find the layout.
  const defRows = await query<{ value: string }>(
    `SELECT value FROM dynamic_content WHERE key_name = ? LIMIT 1`,
    [`_page_def__${slug}`]
  )

  let layout: string = 'custom'
  if (defRows.length > 0 && defRows[0].value) {
    try {
      const def = JSON.parse(defRows[0].value) as { layout?: string; sections?: { id: string }[] }
      if (def.layout) {
        layout = def.layout
      } else if (def.sections?.length) {
        // Fallback: infer from section ids for pages created before the layout field was added
        const ids = def.sections.map((s) => s.id)
        if (ids.includes('features')) layout = 'solution'
        else if (ids.includes('story')) layout = 'about-style'
        else layout = 'custom'
      }
    } catch { /* malformed JSON — default to custom */ }
  }

  const props = { slug, title: page.title }

  if (layout === 'solution') return <SolutionLayout {...props} />
  if (layout === 'about-style') return <AboutStyleLayout {...props} />
  return <CustomLayout {...props} />
}
