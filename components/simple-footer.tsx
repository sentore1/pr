"use client"

import { Youtube, Instagram } from "lucide-react"
import { useCMS } from "@/components/cms-provider"

const FALLBACK_SECTIONS = [
  {
    name: 'Solutions',
    links: [
      { label: 'Small Business',            url: '/small-business' },
      { label: 'Accountants & Bookkeepers', url: '/accountants-bookkeepers' },
      { label: 'Project',                   url: '/project' },
      { label: 'Human Resource',            url: '/human-resource' },
      { label: 'Stock Management',          url: '/stock-management' },
      { label: 'Customer Relation',         url: '/customer-relation' },
      { label: 'Self-employed',             url: '/self-employed' },
      { label: 'Non-profit',                url: '/non-profit' },
      { label: 'Hospitality',               url: '/hospitality' },
      { label: 'Construction',              url: '/construction' },
      { label: 'Logistic',                  url: '/logistic' },
      { label: 'Marketing (Mail)',           url: '/marketing-mail' },
      { label: 'Marketing (Call)',           url: '/marketing-call' },
      { label: 'AI for Enterprise',         url: '/ai-enterprise' },
    ],
  },
  {
    name: 'Product',
    links: [
      { label: 'Features',      url: '/features' },
      { label: 'Pricing',       url: '/pricing' },
      { label: 'Documentation', url: '/documentation' },
      { label: 'API',           url: '/api' },
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

  const tagline     = cms?.footerContent?.tagline         || 'Empowering businesses worldwide with intelligent ERP solutions and automation.'
  const copyright   = cms?.footerContent?.copyright_text  || `© ${new Date().getFullYear()} Pryro. All rights reserved.`
  const whatsappNum = cms?.footerContent?.whatsapp_number || '250788715075'

  return (
    <div className="footer-gradient">
      <footer className="relative px-4 py-8 pt-16 bg-transparent">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-12">

            {/* Brand Column */}
            <div className="flex flex-col gap-4">
              <div className="w-fit">
                <img src="/pryro logo.png" alt="Pryro" className="h-8 w-auto" />
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                {tagline}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://twitter.com/pryro.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/pryroo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/pryro.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CMS-driven link sections — same structure as landing page */}
            {sections.map((section) => (
              <div key={section.name} className="flex flex-col gap-4">
                <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">
                  {section.name}
                </div>
                <div className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <a
                      key={link.label + link.url}
                      href={link.url || '#'}
                      target={(link as any).target === '_blank' ? '_blank' : '_self'}
                      rel={(link as any).target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp Contact */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Contact Us</div>
              <p className="text-xs text-white/80 mb-3">Send us a direct message on WhatsApp.</p>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Type your message"
                  id="simple-footer-whatsapp"
                  className="px-4 py-1.5 bg-white/20 border-0 rounded-[5px] text-xs text-white placeholder-white/60 focus:outline-none transition-all"
                />
                <button
                  onClick={() => {
                    const message = (document.getElementById('simple-footer-whatsapp') as HTMLInputElement)?.value || ''
                    window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`, '_blank')
                  }}
                  className="px-4 py-1.5 border rounded-[5px] text-xs font-medium hover:bg-white/90 transition-all bg-white border-white text-blue-600"
                >
                  Send WhatsApp
                </button>
              </div>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/80">
            <div>{copyright}</div>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms"   className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
