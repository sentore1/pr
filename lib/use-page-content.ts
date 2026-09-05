/**
 * usePageContent — client-side hook that reads CMS values from CMSProvider
 * and falls back to the provided defaults.
 *
 * Usage:
 *   const p = usePageContent('about', ABOUT_DEFAULTS)
 *   <h1>{p('about_hero_title', 'About Pryro')}</h1>
 */
"use client"

import { useCMS } from '@/components/cms-provider'

export function usePageContent(slug: string) {
  const cms = useCMS()
  const pageContent = cms?.pageContent ?? {}

  /**
   * Get a CMS value by key, falling back to the provided default.
   * Key can be either:
   *   - Already namespaced:  'about_hero_title'
   *   - Short form:          'hero_title' → auto-prefixed to 'about_hero_title'
   */
  return function get(key: string, fallback: string = ''): string {
    // Try exact key first
    if (pageContent[key] !== undefined && pageContent[key] !== '') return pageContent[key]
    // Try prefixed key
    const prefixed = `${slug}_${key}`
    if (pageContent[prefixed] !== undefined && pageContent[prefixed] !== '') return pageContent[prefixed]
    return fallback
  }
}
