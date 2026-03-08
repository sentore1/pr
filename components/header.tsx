"use client"

import { useState } from "react"
import { Menu, X, Zap, DollarSign, FileText, Plug, Building2, Receipt, Briefcase, UserCircle, Boxes, Users, HeartHandshake, Hammer, Truck, Mail, Phone, Bot, Calculator, UsersRound } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false)

  return (
    <>
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-black/10 backdrop-blur-md bg-white/80 rounded-[20px]">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
              <img src="/pryro logo.png" alt="Pryro" className="h-8 w-auto" />
            </a>

            <nav className="hidden md:flex items-center gap-8">
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
                    <div className="bg-white border border-black/10 rounded-2xl shadow-xl p-6 w-[600px] backdrop-blur-md">
                      <div className="grid grid-cols-2 gap-4">
                        <a href="/features" className="flex items-start gap-3 p-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors group">
                          <Zap className="w-5 h-5 text-blue-500 group-hover:text-white mt-0.5" />
                          <div>
                            <div className="font-medium text-sm text-gray-900 group-hover:text-white">Features</div>
                            <div className="text-xs text-gray-500 group-hover:text-white mt-0.5">Explore all capabilities</div>
                          </div>
                        </a>
                        <a href="/pricing" className="flex items-start gap-3 p-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors group">
                          <DollarSign className="w-5 h-5 text-blue-500 group-hover:text-white mt-0.5" />
                          <div>
                            <div className="font-medium text-sm text-gray-900 group-hover:text-white">Pricing</div>
                            <div className="text-xs text-gray-500 group-hover:text-white mt-0.5">Simple, transparent plans</div>
                          </div>
                        </a>
                        <a href="/ai-calculator" className="flex items-start gap-3 p-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors group">
                          <Calculator className="w-5 h-5 text-blue-500 group-hover:text-white mt-0.5" />
                          <div>
                            <div className="font-medium text-sm text-gray-900 group-hover:text-white">AI Calculator</div>
                            <div className="text-xs text-gray-500 group-hover:text-white mt-0.5">Calculate your savings</div>
                          </div>
                        </a>
                        <a href="/documentation" className="flex items-start gap-3 p-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors group">
                          <FileText className="w-5 h-5 text-blue-500 group-hover:text-white mt-0.5" />
                          <div>
                            <div className="font-medium text-sm text-gray-900 group-hover:text-white">Documentation</div>
                            <div className="text-xs text-gray-500 group-hover:text-white mt-0.5">Complete guides</div>
                          </div>
                        </a>
                        <a href="/api" className="flex items-start gap-3 p-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors group">
                          <Plug className="w-5 h-5 text-blue-500 group-hover:text-white mt-0.5" />
                          <div>
                            <div className="font-medium text-sm text-gray-900 group-hover:text-white">API</div>
                            <div className="text-xs text-gray-500 group-hover:text-white mt-0.5">Developer resources</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
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
                    <div className="bg-white border border-black/10 rounded-2xl shadow-xl p-6 w-[700px] backdrop-blur-md">
                      <div className="grid grid-cols-3 gap-3">
                        <a href="/small-business" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Building2 className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Small Business</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">For growing teams</div>
                          </div>
                        </a>
                        <a href="/accountants-bookkeepers" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Receipt className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Accountants</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">Financial experts</div>
                          </div>
                        </a>
                        <a href="/project" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Briefcase className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Project</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">Manage projects</div>
                          </div>
                        </a>
                        <a href="/human-resource" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <UsersRound className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Human Resource</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">HR management</div>
                          </div>
                        </a>
                        <a href="/stock-management" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Boxes className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Stock Management</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">Inventory control</div>
                          </div>
                        </a>
                        <a href="/customer-relation" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Users className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">CRM</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">Customer relations</div>
                          </div>
                        </a>
                        <a href="/self-employed" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <UserCircle className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Self-employed</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">Freelancers</div>
                          </div>
                        </a>
                        <a href="/non-profit" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <HeartHandshake className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Non-profit</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">NGO solutions</div>
                          </div>
                        </a>
                        <a href="/hospitality" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Building2 className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Hospitality</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">Hotels & restaurants</div>
                          </div>
                        </a>
                        <a href="/construction" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Hammer className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Construction</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">Build projects</div>
                          </div>
                        </a>
                        <a href="/logistic" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Truck className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Logistic</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">Supply chain</div>
                          </div>
                        </a>
                        <a href="/marketing-mail" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Mail className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Marketing (Mail)</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">Email campaigns</div>
                          </div>
                        </a>
                        <a href="/marketing-call" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Phone className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">Marketing (Call)</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">Call center</div>
                          </div>
                        </a>
                        <a href="/ai-enterprise" className="flex items-start gap-2 p-2.5 rounded-md hover:bg-blue-600 transition-colors group">
                          <Bot className="w-4 h-4 text-blue-500 group-hover:text-white mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-xs text-gray-900 group-hover:text-white">AI Enterprise</div>
                            <div className="text-[10px] text-gray-500 group-hover:text-white mt-0.5">AI-powered tools</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <a href="/about" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">About</a>
              <a href="/contact" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">Contact</a>
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

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-start justify-end pb-20 pt-20 px-6">
          <div className="flex flex-col gap-8 items-start text-left w-full">
            <a href="/products" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">Products</a>
            <a href="/about" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">About</a>
            <a href="/contact" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      )}
    </>
  )
}
