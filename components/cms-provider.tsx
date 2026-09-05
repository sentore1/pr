"use client"

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import type { CMSData } from '@/lib/cms'
import { buildCSSVars } from '@/lib/cms'

const CMSContext = createContext<CMSData | null>(null)

export function useCMS() {
  return useContext(CMSContext)
}

interface Props {
  data: CMSData
  children: ReactNode
}

export function CMSProvider({ data, children }: Props) {
  // Inject CSS variables into :root so all components can use them
  useEffect(() => {
    const vars = buildCSSVars(data.styles)
    if (vars) {
      const existing = document.getElementById('cms-vars')
      const tag = existing || document.createElement('style')
      tag.id = 'cms-vars'
      tag.textContent = `:root { ${vars} }`
      if (!existing) document.head.appendChild(tag)
    }
  }, [data.styles])

  // Track page view
  useEffect(() => {
    const track = () => {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_slug: window.location.pathname,
          page_title: document.title,
          referrer: document.referrer || null,
        }),
      }).catch(() => {})
    }

    // Small delay so title is set
    const t = setTimeout(track, 500)
    return () => clearTimeout(t)
  }, [])

  return <CMSContext.Provider value={data}>{children}</CMSContext.Provider>
}
