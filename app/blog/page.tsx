"use client"

import { SimpleFooter } from "@/components/simple-footer"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-[#0f1117] overflow-x-hidden">
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

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, updates, and best practices for modern business management
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">Coming soon. Stay tuned for updates!</p>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}
