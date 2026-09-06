"use client"

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import type { CMSData } from '@/lib/cms'

interface Props {
  nav: CMSData['nav']
  logos: CMSData['logos']
  styles: CMSData['styles']
}

export function CMSHeader({ nav, logos, styles }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const headerLogo = logos.find(l => l.position === 'header' && l.is_active)
  const primary = styles.colors?.primary || '#0072FD'
  const radius  = styles.borders?.radius || '6px'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Separate CTAs (Log in / Contact) from regular links
  const ctaLabels = ['log in', 'login', 'contact', 'get started', 'sign up']
  const ctaItems = nav.filter(n => ctaLabels.some(c => n.label.toLowerCase().includes(c)))
  const mainItems = nav.filter(n => !ctaLabels.some(c => n.label.toLowerCase().includes(c)))

  return (
    <>
      <header
        className="fixed top-6 left-6 z-40 border border-black/10 backdrop-blur-md bg-white/80"
        style={{ borderRadius: radius, right: undefined }}
      >
        <div className="px-2 w-full">
          <div className="flex items-center gap-6 h-12">
            {/* Logo */}
            <a href={headerLogo?.link_url || '/'} className="flex items-center hover:opacity-80 transition-opacity">
              {headerLogo?.image_url
                ? <img src={headerLogo.image_url} alt={headerLogo.alt_text || 'Logo'} className="h-8 w-auto" />
                : <span className="font-bold text-lg" style={{ color: primary }}>Logo</span>}
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-2">
              {mainItems.map(item => (
                <div key={item.id} className="relative"
                  onMouseEnter={() => item.children?.length ? setOpenDropdown(item.id) : null}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a
                    href={item.url || '#'}
                    target={item.target}
                    className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors flex items-center gap-1"
                  >
                    {item.label}
                  </a>

                  {/* Dropdown */}
                  {item.children?.length > 0 && openDropdown === item.id && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="bg-white shadow-xl border border-gray-100 p-3 min-w-[180px]"
                        style={{ borderRadius: radius }}>
                        {item.children.map(child => (
                          <a key={child.id} href={child.url || '#'} target={child.target}
                            className="flex items-start gap-2 p-2 rounded hover:bg-gray-50 transition-colors">
                            {child.icon_url && <img src={child.icon_url} alt="" className="w-5 h-5 object-contain mt-0.5" />}
                            <span className="text-sm text-gray-800">{child.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* CTA group */}
              {ctaItems.length > 0 && (
                <div className="flex items-center gap-1 bg-black/5 p-1 ml-2"
                  style={{ borderRadius: `calc(${radius} + 4px)` }}>
                  {ctaItems.map((item, i) => (
                    <a key={item.id} href={item.url || '#'} target={item.target}
                      className="text-sm font-medium px-3 py-1.5 transition-all duration-200 hover:bg-white/80"
                      style={{
                        borderRadius: radius,
                        background: i === ctaItems.length - 1 ? '#fff' : 'transparent',
                        color: '#0f1117',
                      }}>
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </nav>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(v => !v)}
              className="md:hidden ml-auto p-2 rounded-lg hover:bg-black/5 transition-colors">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-start
                        justify-end pb-20 pt-20 px-6"
          onClick={() => setMenuOpen(false)}>
          <div className="flex flex-col gap-8 items-start w-full" onClick={e => e.stopPropagation()}>
            {nav.map(item => (
              <a key={item.id} href={item.url || '#'} target={item.target}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-5xl font-light text-[#0f1117] hover:opacity-60 transition-opacity">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
