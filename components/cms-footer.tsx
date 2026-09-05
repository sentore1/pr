"use client"

import { Youtube, Instagram } from 'lucide-react'
import type { CMSData } from '@/lib/cms'

interface Props {
  logos: CMSData['logos']
  footerSections: CMSData['footerSections']
  footerContent: CMSData['footerContent']
  styles: CMSData['styles']
}

export function CMSFooter({ logos, footerSections, footerContent, styles }: Props) {
  const footerLogo = logos.find(l => l.position === 'footer' && l.is_active)
  const tagline = footerContent.tagline || 'Empowering businesses worldwide.'
  const copyright = footerContent.copyright_text || `© ${new Date().getFullYear()} Pryro. All rights reserved.`
  const whatsapp = footerContent.whatsapp_number || '250788715075'
  const radius = styles.borders?.radius || '5px'

  return (
    <footer className="relative px-4 py-8 pt-16 bg-transparent">
      <div className="max-w-[1120px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="/" className="w-fit">
              {footerLogo?.image_url
                ? <img src={footerLogo.image_url} alt={footerLogo.alt_text || 'Logo'} className="h-8 w-auto" />
                : <span className="font-bold text-white text-lg">Pryro</span>}
            </a>
            <p className="text-xs text-white/80 leading-relaxed">{tagline}</p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://twitter.com/pryro.co" target="_blank" rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors" aria-label="X">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://youtube.com/pryroo" target="_blank" rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/pryro.co" target="_blank" rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Dynamic sections */}
          {footerSections.slice(0, 3).map(section => (
            <div key={section.id} className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">
                {section.name}
              </div>
              <div className="flex flex-col gap-3">
                {section.links.filter(l => l.is_active).map(link => (
                  <a key={link.id} href={link.url || '#'} target={link.target}
                    className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* WhatsApp contact */}
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Contact Us</div>
            <p className="text-xs text-white/80 mb-3">Send us a direct message on WhatsApp.</p>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Type your message"
                id="cms-whatsapp-msg"
                className="px-4 py-1.5 bg-white/20 border-0 text-xs text-white placeholder-white/60 focus:outline-none transition-all"
                style={{ borderRadius: radius }}
              />
              <button
                onClick={() => {
                  const msg = (document.getElementById('cms-whatsapp-msg') as HTMLInputElement)?.value || ''
                  window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
                }}
                className="px-4 py-1.5 text-xs font-medium hover:bg-white/90 transition-all bg-white text-blue-600"
                style={{ borderRadius: radius }}>
                Send WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/80">
          <div>{copyright}</div>
          <div className="flex gap-6">
            <a href="/privacy"       className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms"         className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookies"       className="hover:text-white transition-colors">Cookie Settings</a>
            <a href="/accessibility" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
