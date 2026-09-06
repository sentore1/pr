"use client"

import { Youtube, Instagram } from "lucide-react"
import { useCMS } from "@/components/cms-provider"

// ── Static fallback used when the DB has no footer sections ────────────────
const FALLBACK_SECTIONS = [
  {
    name: 'Solutions',
    links: [
      { label: 'Small Business',   url: '/small-business' },
      { label: 'Accountants',      url: '/accountants-bookkeepers' },
      { label: 'Project',          url: '/project' },
      { label: 'HR',               url: '/human-resource' },
      { label: 'Stock',            url: '/stock-management' },
      { label: 'CRM',              url: '/customer-relation' },
      { label: 'Self-employed',    url: '/self-employed' },
      { label: 'Non-profit',       url: '/non-profit' },
      { label: 'Hospitality',      url: '/hospitality' },
      { label: 'Construction',     url: '/construction' },
      { label: 'Logistic',         url: '/logistic' },
      { label: 'Mail Marketing',   url: '/marketing-mail' },
      { label: 'Call Marketing',   url: '/marketing-call' },
      { label: 'AI Enterprise',    url: '/ai-enterprise' },
    ],
  },
  {
    name: 'Product',
    links: [
      { label: 'Features',       url: '/features' },
      { label: 'Pricing',        url: '/pricing' },
      { label: 'AI Calculator',  url: '/ai-calculator' },
      { label: 'Documentation',  url: '/documentation' },
      { label: 'API',            url: '/api' },
    ],
  },
  {
    name: 'Company',
    links: [
      { label: 'About',   url: '/about' },
      { label: 'Careers', url: '/careers' },
      { label: 'Contact', url: '/contact' },
    ],
  },
]

export function SimpleFooter() {
  const cms = useCMS()

  // Use CMS sections if they exist, otherwise fall back to hardcoded
  const sections = (cms?.footerSections && cms.footerSections.length > 0)
    ? cms.footerSections
        .filter(s => s.is_active)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(s => ({
          name: s.name,
          links: s.links
            .filter(l => l.is_active)
            .sort((a, b) => a.sort_order - b.sort_order),
        }))
    : FALLBACK_SECTIONS

  const tagline       = cms?.footerContent?.tagline       || 'Empowering businesses worldwide with intelligent ERP solutions and automation.'
  const copyright     = cms?.footerContent?.copyright_text || `© ${new Date().getFullYear()} Pryro. All rights reserved.`
  const whatsappNum   = cms?.footerContent?.whatsapp_number || '250788715075'

  // We always render the brand column + Contact Us column alongside CMS sections.
  // Total columns = 1 (brand) + sections.length + 1 (contact)
  const colCount = 2 + sections.length

  return (
    <footer className="relative px-4 pb-16 pt-[180px] -mt-[60px]">
      {/* Gradient background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #80C2FF 20%, #40A3FF 35%, #2094FF 50%, #108CFF 65%, #0084FF 80%, #0084FF 100%)" }} />

      <div className="max-w-[1120px] w-full mx-auto relative z-10">
        <div
          className="grid gap-12 md:gap-8 mb-12"
          style={{ gridTemplateColumns: `repeat(${Math.min(colCount, 6)}, minmax(0, 1fr))` }}
        >
          {/* ── Brand column ── */}
          <div className="flex flex-col gap-4">
            <div className="w-fit">
              <img src="/pryro logo.png" alt="Pryro" className="h-8 w-auto" />
            </div>
            <p className="text-xs text-white/90 leading-relaxed">{tagline}</p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://twitter.com/pryro.co" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://youtube.com/pryroo" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/pryro.co" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── CMS-driven link sections ── */}
          {sections.map((section) => (
            <div key={section.name} className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-1">
                {section.name}
              </div>
              <div className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <a
                    key={link.label + link.url}
                    href={link.url || '#'}
                    target={(link as any).target === '_blank' ? '_blank' : '_self'}
                    rel={(link as any).target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-xs text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* ── Contact / WhatsApp column ── */}
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Contact Us</div>
            <p className="text-xs text-white/90 mb-3">Send us a direct message on WhatsApp.</p>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Type your message"
                id="whatsapp-message"
                className="px-4 py-2 bg-white/20 rounded-[5px] text-xs text-white placeholder-white/60 focus:outline-none border-0 transition-all"
              />
              <button
                onClick={() => {
                  const msg = (document.getElementById('whatsapp-message') as HTMLInputElement)?.value || ''
                  window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`, '_blank')
                }}
                className="px-4 py-2 border rounded-[5px] text-xs font-medium hover:bg-white/90 transition-all bg-white border-white text-blue-600"
              >
                Send WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/20 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/90">
          <div>{copyright}</div>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <a href="/legal"         className="hover:text-white transition-colors">Legal</a>
            <a href="/privacy"       className="hover:text-white transition-colors">Privacy notice</a>
            <a href="/sitemap"       className="hover:text-white transition-colors">Sitemap</a>
            <a href="/accessibility" className="hover:text-white transition-colors">Accessibility</a>
            <a href="/cookies"       className="hover:text-white transition-colors">Manage cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
