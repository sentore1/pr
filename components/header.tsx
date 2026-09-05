"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { useCMS } from "@/components/cms-provider"

interface DropdownPos { top: number; left: number }

export function Header() {
  const cms = useCMS()
  const [isMenuOpen, setIsMenuOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [dropPos, setDropPos]           = useState<DropdownPos | null>(null)
  const triggerRefs                     = useRef<Record<number, HTMLDivElement | null>>({})
  const closeTimer                      = useRef<ReturnType<typeof setTimeout> | null>(null)

  const headerLogo = cms?.logos?.find(l => l.position === 'header' && l.is_active)
  const navItems   = (cms?.nav ?? []).filter(item => item.is_active)

  const CTA_KEYWORDS = ['log in', 'login', 'sign up', 'get started', 'contact']
  const ctaItems  = navItems.filter(n => CTA_KEYWORDS.some(k => n.label.toLowerCase().includes(k)))
  const mainItems = navItems.filter(n => !CTA_KEYWORDS.some(k => n.label.toLowerCase().includes(k)))

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function scheduleClose() {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null)
      setDropPos(null)
    }, 120)
  }

  function openDrop(id: number) {
    cancelClose()
    const el = triggerRefs.current[id]
    if (!el) return
    const rect = el.getBoundingClientRect()
    setDropPos({ top: rect.bottom, left: rect.left })
    setOpenDropdown(id)
  }

  // Close on scroll
  useEffect(() => {
    const close = () => { setOpenDropdown(null); setDropPos(null) }
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [])

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  const activeItem = navItems.find(n => n.id === openDropdown)
  const children   = activeItem?.children?.filter(c => c.is_active) ?? []
  const cols       = children.length > 9 ? 3 : children.length > 4 ? 2 : 1
  const colWidth   = cols === 3 ? 620 : cols === 2 ? 420 : 220

  return (
    <>
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-black/10 backdrop-blur-md bg-white/80 rounded-[6px]">
        <div className="w-full mx-auto px-2">
          <div className="flex items-center gap-6 md:h-12 h-12">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
              <img
                src={headerLogo?.image_url || "/pryro logo.png"}
                alt={headerLogo?.alt_text || "Pryro"}
                className="h-8 w-auto"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-2">
              {mainItems.map(item => (
                <div
                  key={item.id}
                  ref={el => { triggerRefs.current[item.id] = el }}
                  onMouseEnter={() => item.children?.length > 0 ? openDrop(item.id) : scheduleClose()}
                  onMouseLeave={scheduleClose}
                >
                  <a
                    href={item.url || '#'}
                    target={item.target}
                    className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-200 flex items-center gap-1 px-1 py-3 select-none"
                  >
                    {item.label}
                    {item.children?.length > 0 && (
                      <ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-200 ${openDropdown === item.id ? 'rotate-180' : ''}`} />
                    )}
                  </a>
                </div>
              ))}

              {/* CTA pill */}
              {ctaItems.length > 0 && (
                <div className="flex items-center gap-1 bg-black/5 rounded-[9px] p-1 ml-2">
                  {ctaItems.map((item, i) => (
                    <a
                      key={item.id}
                      href={item.url || '#'}
                      target={item.target}
                      className={`text-sm font-medium px-3 py-1.5 rounded-[4px] transition-all duration-200 ${
                        i === ctaItems.length - 1
                          ? 'bg-white text-[#0f1117] shadow-sm hover:bg-white/90'
                          : 'text-[#0f1117] hover:bg-white/60'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-auto p-2 hover:bg-black/5 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── DROPDOWN PANEL ─────────────────────────────────────────────────────
          Rendered outside the header so nothing clips it.
          Uses the same timer so hovering into it cancels the close.
      ── */}
      {openDropdown !== null && dropPos && children.length > 0 && (
        <div
          className="fixed z-[9999]"
          style={{
            top:  dropPos.top,
            left: Math.max(8, Math.min(dropPos.left, window.innerWidth - colWidth - 8)),
            width: colWidth,
            // Invisible top padding bridges the pixel gap between header and panel
            paddingTop: 6,
          }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="bg-white border border-gray-100 rounded-[5px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
            {/* Items grid */}
            <div
              className="p-2 grid gap-0.5"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {children.map(child => (
                <a
                  key={child.id}
                  href={child.url || '#'}
                  target={child.target}
                  onClick={() => { setOpenDropdown(null); setDropPos(null) }}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-[5px] hover:bg-gray-50 transition-colors group"
                >
                  {/* Icon — no border, larger size */}
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    {child.icon_url
                      ? <img src={child.icon_url} alt="" className="w-8 h-8 object-contain" />
                      : <span className="text-xs font-bold text-gray-400 uppercase">{child.label[0]}</span>
                    }
                  </div>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium leading-tight transition-colors">
                    {child.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE MENU ────────────────────────────────────────────────────── */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white/96 backdrop-blur-md z-50 overflow-y-auto pt-20 pb-10 px-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col gap-5 mt-2">
            {navItems.map(item => (
              <div key={item.id}>
                <a
                  href={item.url || '#'}
                  target={item.target}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-serif text-4xl font-light text-[#0f1117] hover:text-blue-500 transition-colors block"
                >
                  {item.label}
                </a>
                {/* Children inline on mobile */}
                {(item.children?.filter(c => c.is_active).length ?? 0) > 0 && (
                  <div className="mt-2 grid grid-cols-2 gap-1.5 pl-1">
                    {item.children!.filter(c => c.is_active).map(child => (
                      <a
                        key={child.id}
                        href={child.url || '#'}
                        target={child.target}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 py-1.5 text-sm text-gray-500 hover:text-blue-600"
                      >
                        {child.icon_url && (
                          <img src={child.icon_url} alt="" className="w-4 h-4 object-contain flex-shrink-0" />
                        )}
                        <span>{child.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
