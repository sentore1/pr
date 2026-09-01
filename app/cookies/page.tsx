"use client"

import { SimpleFooter } from "@/components/simple-footer"
import { useState, useEffect } from "react"

export default function CookiesPage() {
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cookiePreferences')
    if (saved) {
      const prefs = JSON.parse(saved)
      setAnalytics(prefs.analytics || false)
      setMarketing(prefs.marketing || false)
    }
  }, [])

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify({ analytics, marketing }))
    alert('Preferences saved!')
  }
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-black/10 backdrop-blur-md bg-white/80 rounded-[20px]">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/pryro logo.png" alt="Pryro" className="h-8 w-auto" />
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/products" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">Products</a>
              <a href="/about" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">About</a>
              <a href="/demo" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">Demo</a>
              <a href="/contact" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="pt-40 pb-32 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-4 text-gray-900">Cookie Settings</h1>
            <p className="text-gray-600">Manage your cookie preferences.</p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium mb-1 text-gray-900">Essential Cookies</h3>
                  <p className="text-sm text-gray-600">Required for the website to function</p>
                </div>
                <div className="text-sm text-gray-500">Always Active</div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium mb-1 text-gray-900">Analytics Cookies</h3>
                  <p className="text-sm text-gray-600">Help us improve our services</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                  <div className={`w-11 h-6 rounded-full transition-colors relative ${analytics ? 'bg-gray-900' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${analytics ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
              </div>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium mb-1 text-gray-900">Marketing Cookies</h3>
                  <p className="text-sm text-gray-600">Used for personalized advertising</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                  <div className={`w-11 h-6 rounded-full transition-colors relative ${marketing ? 'bg-gray-900' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${marketing ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
              </div>
            </div>

            <button onClick={savePreferences} className="w-full py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}
