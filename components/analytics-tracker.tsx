"use client"

/**
 * AnalyticsTracker — invisible client component mounted in the root layout.
 * Tracks every page navigation automatically without modifying individual pages.
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Never track admin routes
    if (pathname.startsWith('/admin')) return

    const slug = pathname === '/' ? 'home' : pathname.replace(/^\//, '')
    const title = document.title || slug

    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_slug: slug,
        page_title: title,
        referrer: document.referrer || null,
      }),
      keepalive: true,
    }).catch(() => { /* never break the site */ })
  }, [pathname])

  return null
}
