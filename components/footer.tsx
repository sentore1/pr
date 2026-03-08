"use client"

import { Youtube, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative px-4 py-16 pt-48" style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #DBEAFE 15%, #93C5FD 30%, #60A5FA 45%, #3B82F6 60%, #2563EB 80%, #1E40AF 100%)" }}>
      <div className="max-w-[1120px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-12">
          <div className="flex flex-col gap-4">
            <div className="w-fit">
              <img src="/pryro logo.png" alt="Pryro" className="h-8 w-auto" />
            </div>
            <p className="text-xs text-white/90 leading-relaxed">
              Empowering businesses worldwide with intelligent ERP solutions and automation.
            </p>
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
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-1">Solutions</div>
            <div className="flex flex-col gap-3">
              <a href="/small-business" className="text-xs text-white/90 hover:text-white transition-colors">Small Business</a>
              <a href="/accountants-bookkeepers" className="text-xs text-white/90 hover:text-white transition-colors">Accountants</a>
              <a href="/project" className="text-xs text-white/90 hover:text-white transition-colors">Project</a>
              <a href="/human-resource" className="text-xs text-white/90 hover:text-white transition-colors">HR</a>
              <a href="/stock-management" className="text-xs text-white/90 hover:text-white transition-colors">Stock</a>
              <a href="/customer-relation" className="text-xs text-white/90 hover:text-white transition-colors">CRM</a>
              <a href="/self-employed" className="text-xs text-white/90 hover:text-white transition-colors">Self-employed</a>
              <a href="/non-profit" className="text-xs text-white/90 hover:text-white transition-colors">Non-profit</a>
              <a href="/hospitality" className="text-xs text-white/90 hover:text-white transition-colors">Hospitality</a>
              <a href="/construction" className="text-xs text-white/90 hover:text-white transition-colors">Construction</a>
              <a href="/logistic" className="text-xs text-white/90 hover:text-white transition-colors">Logistic</a>
              <a href="/marketing-mail" className="text-xs text-white/90 hover:text-white transition-colors">Mail Marketing</a>
              <a href="/marketing-call" className="text-xs text-white/90 hover:text-white transition-colors">Call Marketing</a>
              <a href="/ai-enterprise" className="text-xs text-white/90 hover:text-white transition-colors">AI Enterprise</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Product</div>
            <div className="flex flex-col gap-3">
              <a href="/features" className="text-sm text-white/90 hover:text-white transition-colors">Features</a>
              <a href="/pricing" className="text-sm text-white/90 hover:text-white transition-colors">Pricing</a>
              <a href="/ai-calculator" className="text-sm text-white/90 hover:text-white transition-colors">AI Calculator</a>
              <a href="/documentation" className="text-sm text-white/90 hover:text-white transition-colors">Documentation</a>
              <a href="/api" className="text-sm text-white/90 hover:text-white transition-colors">API</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Company</div>
            <div className="flex flex-col gap-3">
              <a href="/about" className="text-sm text-white/90 hover:text-white transition-colors">About</a>
              <a href="/careers" className="text-sm text-white/90 hover:text-white transition-colors">Careers</a>
              <a href="/contact" className="text-sm text-white/90 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Contact Us</div>
            <p className="text-xs text-white/90 mb-3">Send us a direct message on WhatsApp.</p>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Type your message"
                id="whatsapp-message"
                className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-xs text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30 transition-all"
              />
              <button 
                onClick={() => {
                  const message = (document.getElementById('whatsapp-message') as HTMLInputElement)?.value || '';
                  window.open(`https://wa.me/250788715075?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="px-4 py-2 border rounded-lg text-xs font-medium hover:bg-white/90 transition-all bg-white border-white text-blue-600"
              >
                Send WhatsApp
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/90">
          <div>© 2026 Pryro. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
