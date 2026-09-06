/**
 * CMS data fetcher — used by server components and pages
 * Fetches from /api/cms/data with ISR caching
 */

export interface CMSNav {
  id: number
  label: string
  url: string
  icon_url: string
  target: '_self' | '_blank'
  is_active: boolean
  children: CMSNav[]
}

export interface CMSLogo {
  id: number
  name: string
  image_url: string
  alt_text: string
  position: 'header' | 'footer' | 'mobile'
  link_url: string
  is_active: boolean
}

export interface CMSFooterLink {
  id: number
  label: string
  url: string
  target: '_self' | '_blank'
  is_active: boolean
}

export interface CMSFooterSection {
  id: number
  name: string
  sort_order: number
  is_active: boolean
  links: CMSFooterLink[]
}

export interface CMSBlock {
  id: number
  block_type: string
  title: string
  content: string
  settings: Record<string, any>
  sort_order: number
  is_active: boolean
}

export interface CMSStyles {
  colors?: { primary?: string; secondary?: string; background?: string; text?: string }
  gradient?: { hero_from?: string; hero_to?: string; hero_full?: string }
  fonts?: { heading?: string; body?: string; size_base?: string }
  borders?: { radius?: string; radius_btn?: string; width?: string }
  spacing?: { base?: string; section_py?: string }
}

export interface CMSData {
  nav: CMSNav[]
  logos: CMSLogo[]
  footerSections: CMSFooterSection[]
  footerContent: Record<string, string>
  contentBlocks: CMSBlock[]
  styles: CMSStyles
  seo: Record<string, string> | null
  settings: Record<string, string>
  pageContent: Record<string, string>
  carouselIcons: { url: string; name: string }[]
}

// Fallback data when DB is not yet set up
const FALLBACK: CMSData = {
  nav: [
    { id: 1, label: 'Products',  url: '/products', icon_url: '', target: '_self', is_active: true, children: [] },
    { id: 2, label: 'Solutions', url: '/solutions', icon_url: '', target: '_self', is_active: true, children: [] },
    { id: 3, label: 'About',     url: '/about',    icon_url: '', target: '_self', is_active: true, children: [] },
    { id: 4, label: 'Contact',   url: '/contact',  icon_url: '', target: '_self', is_active: true, children: [] },
  ],
  logos: [
    { id: 1, name: 'Header Logo', image_url: '/pryro logo.png', alt_text: 'Pryro', position: 'header', link_url: '/', is_active: true },
    { id: 2, name: 'Footer Logo', image_url: '/pryro logo.png', alt_text: 'Pryro', position: 'footer', link_url: '/', is_active: true },
  ],
  footerSections: [],
  footerContent: {
    tagline: 'Empowering businesses worldwide with intelligent ERP solutions and automation.',
    copyright_text: `© ${new Date().getFullYear()} Pryro. All rights reserved.`,
    whatsapp_number: '250788715075',
  },
  contentBlocks: [],
  styles: {
    colors:  { primary: '#0072FD', secondary: '#4a5568', background: '#ffffff', text: '#0f1117' },
    gradient: { hero_from: '#0072FD', hero_to: '#E5EDFC', hero_full: '' },
    fonts:   { heading: 'serif', body: 'sans-serif', size_base: '16px' },
    borders: { radius: '5px', radius_btn: '5px', width: '1px' },
    spacing: { base: '1rem', section_py: '5rem' },
  },
  seo: null,
  settings: { site_name: 'Pryro' },
  pageContent: {},
  carouselIcons: [
    { url: '/icon/accounting icon.png',         name: 'Accounting' },
    { url: '/icon/ai business review icon.png', name: 'AI Business Review' },
    { url: '/icon/ai email icon.png',           name: 'AI Email' },
    { url: '/icon/ai interprise icon.png',      name: 'AI Enterprise' },
    { url: '/icon/budget icon.png',             name: 'Budget' },
    { url: '/icon/business coach icon.png',     name: 'Business Coach' },
    { url: '/icon/CRM icon.png',               name: 'CRM' },
    { url: '/icon/dashboard icon.png',         name: 'Dashboard' },
    { url: '/icon/document icon.png',          name: 'Document' },
    { url: '/icon/HR icon.png',               name: 'HR' },
    { url: '/icon/Inventory icon.png',        name: 'Inventory' },
    { url: '/icon/knowledge icon.png',        name: 'Knowledge' },
    { url: '/icon/logistic icon.png',         name: 'Logistics' },
    { url: '/icon/project icon.png',          name: 'Project' },
    { url: '/icon/sales icon.png',            name: 'Sales' },
    { url: '/icon/subscription icon.png',    name: 'Subscription' },
  ],
}

let _cache: CMSData | null = null
let _cacheTime = 0
const CACHE_TTL = 5_000 // 5s in-process cache — short so CMS changes appear quickly

export function clearCMSCache() {
  _cache = null
  _cacheTime = 0
}

export async function getCMSData(): Promise<CMSData> {
  // Return in-process cache if fresh
  if (_cache && Date.now() - _cacheTime < CACHE_TTL) return _cache

  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(`${base}/api/cms/data`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('CMS fetch failed')
    const json = await res.json()
    if (json.success && json.data) {
      _cache = json.data
      _cacheTime = Date.now()
      return json.data
    }
  } catch {
    // DB not ready yet — use fallback silently
  }

  return FALLBACK
}

/** Build CSS variable string from CMS styles — colors use --cms-* prefix to avoid
 *  colliding with Tailwind's --color-* variables. Radius keeps the original
 *  --radius / --radius-btn names so Tailwind rounded-* classes still work. */
export function buildCSSVars(styles: CMSStyles): string {
  const c = styles.colors || {}
  const f = styles.fonts  || {}
  const b = styles.borders || {}
  const g = styles.gradient || {}
  return [
    // Colors — prefixed with --cms- so they don't clash with Tailwind's --color-*
    c.primary    && `--cms-primary:${c.primary}`,
    c.secondary  && `--cms-secondary:${c.secondary}`,
    c.background && `--cms-bg:${c.background}`,
    c.text       && `--cms-text:${c.text}`,
    // Fonts
    f.heading    && `--cms-font-heading:${f.heading}`,
    f.body       && `--cms-font-body:${f.body}`,
    f.size_base  && `--cms-font-size:${f.size_base}`,
    // Radius — injected with !important so they override the globals.css :root defaults
    // regardless of stylesheet load order.
    b.radius     && `--radius:${b.radius}`,
    b.radius_btn && `--radius-btn:${b.radius_btn}`,
    // Gradient
    g.hero_full  && `--cms-hero-gradient:${g.hero_full}`,
    !g.hero_full && g.hero_from && g.hero_to &&
      `--cms-hero-gradient:linear-gradient(to bottom,${g.hero_from},${g.hero_to})`,
  ].filter(Boolean).join(';')
}
