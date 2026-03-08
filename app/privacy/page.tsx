"use client"

import { Footer } from "@/components/footer"

export default function PrivacyPage() {
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
            <h1 className="text-5xl md:text-6xl font-light mb-4 text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600">SOC 2 Type II certified. GDPR and ISO 27001 compliant.</p>
          </div>

          <div className="space-y-12 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-2xl font-light mb-4">Data Collection & Usage</h2>
              <p>We collect only the information necessary to provide and improve our enterprise services. This includes business information, user credentials, and usage analytics. Your data is used exclusively to deliver Pryro services, ensure platform security, and provide customer support.</p>
            </div>

            <div>
              <h2 className="text-2xl font-light mb-4">Enterprise Security</h2>
              <p className="mb-4">Pryro implements military-grade security measures:</p>
              <ul className="space-y-2 text-sm">
                <li>• AES-256 encryption for data at rest</li>
                <li>• TLS 1.3 encryption for data in transit</li>
                <li>• Multi-factor authentication (MFA)</li>
                <li>• Role-based access control (RBAC)</li>
                <li>• Regular penetration testing</li>
                <li>• 24/7 security monitoring</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-light mb-4">Compliance & Certifications</h2>
              <p className="mb-4">Pryro maintains compliance with global data protection regulations:</p>
              <ul className="space-y-2 text-sm">
                <li>• SOC 2 Type II certified</li>
                <li>• ISO 27001 certified</li>
                <li>• GDPR compliant (EU)</li>
                <li>• CCPA compliant (California)</li>
                <li>• HIPAA compliant (Healthcare)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
