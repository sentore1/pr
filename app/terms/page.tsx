"use client"

import { SimpleFooter } from "@/components/simple-footer"

export default function TermsPage() {
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
            <h1 className="text-5xl md:text-6xl font-light mb-4 text-gray-900">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="space-y-12 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-2xl font-light mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using Pryro enterprise services, you accept and agree to be bound by these Terms of Service and all applicable laws and regulations. These terms constitute a legally binding agreement between your organization and Pryro Inc.</p>
            </div>

            <div>
              <h2 className="text-2xl font-light mb-4">2. Service Level Agreement</h2>
              <p className="mb-4">Pryro guarantees enterprise-grade service availability:</p>
              <ul className="space-y-2 text-sm">
                <li>• 99.99% uptime guarantee for Enterprise plans</li>
                <li>• 24/7 technical support and monitoring</li>
                <li>• Maximum 4-hour response time for critical issues</li>
                <li>• Scheduled maintenance with 7-day advance notice</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-light mb-4">3. Account Responsibilities</h2>
              <p className="mb-4">Organizations using Pryro services are responsible for:</p>
              <ul className="space-y-2 text-sm">
                <li>• Maintaining confidentiality of account credentials</li>
                <li>• All activities conducted under your account</li>
                <li>• Ensuring compliance with applicable laws</li>
                <li>• Timely payment of subscription fees</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-light mb-4">4. Data Ownership</h2>
              <p>Your organization retains full ownership of all data stored in Pryro. We implement enterprise-grade security measures and comply with SOC 2, ISO 27001, GDPR, and other global standards.</p>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}
