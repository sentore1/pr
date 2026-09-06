"use client"

/**
 * useAnalytics — fires a page-view tracking event to /api/analytics/track
 * on initial mount. Designed to be called once per page component.
 *
 * Usage (in any client page):
 *   useAnalytics('/about', 'About')
 *
 * The hook is a no-op in the admin area and never throws — analytics failures
 * should never break the site for visitors.
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useAnalytics(pageTitle?: string) {
  const pathname = usePathname()

  useEffect(() => {
    // Skip tracking for admin routes entirely
    if (pathname.startsWith('/admin')) return

    const slug = pathname === '/' ? 'home' : pathname.replace(/^\//, '')

    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_slug: slug,
        page_title: pageTitle || document.title || slug,
        referrer: document.referrer || null,
      }),
      // Fire-and-forget — keepalive ensures it completes even if the user
      // navigates away immediately.
      keepalive: true,
    }).catch(() => { /* silently ignore network errors */ })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
}
