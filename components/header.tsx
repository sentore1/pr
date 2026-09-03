"use client"

import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false)

  return (
    <>
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-black/10 backdrop-blur-md bg-white/80 rounded-[6px]">
        <div className="w-full mx-auto px-2">
          <div className="flex items-center gap-6 md:h-12 h-12">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
              <img src="/pryro logo.png" alt="Pryro" className="h-8 w-auto" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-2">

              {/* Products dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowProductsMenu(true)}
                onMouseLeave={() => setShowProductsMenu(false)}
              >
                <a href="/products" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">
                  Products
                </a>

                {showProductsMenu && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white rounded-[5px] shadow-xl p-6 w-[600px] backdrop-blur-md">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { href: "/features",      icon: "/icon/dashboard icon.png",     label: "Features",       sub: "Explore all capabilities"  },
                          { href: "/pricing",       icon: "/icon/budget icon.png",        label: "Pricing",        sub: "Simple, transparent plans" },
                          { href: "/ai-calculator", icon: "/icon/ai business review icon.png", label: "AI Calculator",  sub: "Calculate your savings"    },
                          { href: "/documentation", icon: "/icon/document icon.png",      label: "Documentation",  sub: "Guides & references"       },
                          { href: "/api",           icon: "/icon/0code icon.png",         label: "API",            sub: "Developer resources"       },
                        ].map(({ href, icon, label, sub }) => (
                          <a key={href} href={href} className="flex items-start gap-3 p-3 rounded-[4px] hover:bg-gray-50/50 transition-colors">
                            <img src={icon} alt={label} className="w-8 h-8 object-contain mt-0.5" />
                            <div>
                              <div className="font-medium text-sm text-gray-900">{label}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{sub}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowSolutionsMenu(true)}
                onMouseLeave={() => setShowSolutionsMenu(false)}
              >
                <button className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">
                  Solutions
                </button>

                {showSolutionsMenu && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white rounded-[5px] shadow-xl p-6 w-[700px] backdrop-blur-md">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { href: "/small-business",          icon: "/icon/business coach icon.png",  label: "Small Business",   sub: "For growing teams"     },
                          { href: "/accountants-bookkeepers", icon: "/icon/accounting icon.png",      label: "Accountants",      sub: "Financial experts"     },
                          { href: "/project",                 icon: "/icon/project icon.png",         label: "Project",          sub: "Manage projects"       },
                          { href: "/human-resource",          icon: "/icon/HR icon.png",              label: "Human Resource",   sub: "HR management"         },
                          { href: "/stock-management",        icon: "/icon/Inventory icon.png",       label: "Stock Management", sub: "Inventory control"     },
                          { href: "/customer-relation",       icon: "/icon/CRM icon.png",             label: "CRM",              sub: "Customer relations"    },
                          { href: "/self-employed",           icon: "/icon/0coder icon.png",          label: "Self-employed",    sub: "Freelancers"           },
                          { href: "/non-profit",              icon: "/icon/help desk icon.png",       label: "Non-profit",       sub: "NGO solutions"         },
                          { href: "/hospitality",             icon: "/icon/pos icon.png",             label: "Hospitality",      sub: "Hotels & restaurants"  },
                          { href: "/construction",            icon: "/icon/manufacturers icon.png",   label: "Construction",     sub: "Build projects"        },
                          { href: "/logistic",                icon: "/icon/logistic icon.png",        label: "Logistic",         sub: "Supply chain"          },
                          { href: "/marketing-mail",          icon: "/icon/ai email icon.png",        label: "Marketing Mail",   sub: "Email campaigns"       },
                          { href: "/marketing-call",          icon: "/icon/cold call icon.png",       label: "Marketing Call",   sub: "Call center"           },
                          { href: "/ai-enterprise",           icon: "/icon/ai interprise icon.png",   label: "AI Enterprise",    sub: "AI-powered tools"      },
                        ].map(({ href, icon, label, sub }) => (
                          <a key={href} href={href} className="flex items-start gap-2 p-2.5 rounded-[4px] hover:bg-gray-50/50 transition-colors">
                            <img src={icon} alt={label} className="w-6 h-6 object-contain mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-xs text-gray-900">{label}</div>
                              <div className="text-[10px] text-gray-500 mt-0.5">{sub}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a href="/about" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">About</a>

              {/* Nav CTA group */}
              <div className="flex items-center gap-1 bg-black/5 rounded-[9px] p-1 ml-2">
                <a
                  href="/contact"
                  className="text-sm text-[#0f1117] font-medium px-3 py-1.5 rounded-[4px] hover:bg-white/80 transition-all duration-200"
                >
                  Contact
                </a>
                <a
                  href="https://login.pryro.com"
                  className="text-sm font-medium px-3 py-1.5 rounded-[4px] bg-white text-[#0f1117] hover:bg-white/80 transition-all duration-200"
                >
                  Log in
                </a>
              </div>
            </nav>

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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-start justify-end pb-20 pt-20 px-6">
          <div className="flex flex-col gap-8 items-start text-left w-full">
            <a href="/products" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">Products</a>
            <a href="/about" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">About</a>
            <a href="/demo" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">Demo</a>
            <a href="/contact" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      )}
    </>
  )
}
