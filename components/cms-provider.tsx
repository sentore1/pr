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
  // Update CSS variables on the client when styles change.
  // The SSR pass already injected a <style id="cms-vars-ssr"> tag before paint,
  // so border radius is correct from the very first frame — no flash.
  // Here we just keep it in sync if data changes (e.g. hot-reload in dev).
  useEffect(() => {
    const vars = buildCSSVars(data.styles)
    if (!vars) return
    // Reuse the SSR tag if present, otherwise create one
    const id = 'cms-vars-ssr'
    let tag = document.getElementById(id) as HTMLStyleElement | null
    if (!tag) {
      tag = document.createElement('style')
      tag.id = id
      document.head.insertBefore(tag, document.head.firstChild)
    }
    tag.textContent = `:root { ${vars} }`
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
