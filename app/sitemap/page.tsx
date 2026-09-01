import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Sitemap</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Solutions</h2>
              <ul className="space-y-2">
                <li><a href="/small-business" className="text-blue-600 hover:underline">Small Business</a></li>
                <li><a href="/accountants-bookkeepers" className="text-blue-600 hover:underline">Accountants & Bookkeepers</a></li>
                <li><a href="/project" className="text-blue-600 hover:underline">Project Management</a></li>
                <li><a href="/human-resource" className="text-blue-600 hover:underline">Human Resources</a></li>
                <li><a href="/stock-management" className="text-blue-600 hover:underline">Stock Management</a></li>
                <li><a href="/customer-relation" className="text-blue-600 hover:underline">CRM</a></li>
                <li><a href="/self-employed" className="text-blue-600 hover:underline">Self-employed</a></li>
                <li><a href="/non-profit" className="text-blue-600 hover:underline">Non-profit</a></li>
                <li><a href="/hospitality" className="text-blue-600 hover:underline">Hospitality</a></li>
                <li><a href="/construction" className="text-blue-600 hover:underline">Construction</a></li>
                <li><a href="/logistic" className="text-blue-600 hover:underline">Logistics</a></li>
                <li><a href="/marketing-mail" className="text-blue-600 hover:underline">Email Marketing</a></li>
                <li><a href="/marketing-call" className="text-blue-600 hover:underline">Call Marketing</a></li>
                <li><a href="/ai-enterprise" className="text-blue-600 hover:underline">AI Enterprise</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Product</h2>
              <ul className="space-y-2">
                <li><a href="/features" className="text-blue-600 hover:underline">Features</a></li>
                <li><a href="/pricing" className="text-blue-600 hover:underline">Pricing</a></li>
                <li><a href="/ai-calculator" className="text-blue-600 hover:underline">AI Calculator</a></li>
                <li><a href="/documentation" className="text-blue-600 hover:underline">Documentation</a></li>
                <li><a href="/api" className="text-blue-600 hover:underline">API</a></li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Company</h2>
              <ul className="space-y-2">
                <li><a href="/about" className="text-blue-600 hover:underline">About</a></li>
                <li><a href="/careers" className="text-blue-600 hover:underline">Careers</a></li>
                <li><a href="/blog" className="text-blue-600 hover:underline">Blog</a></li>
                <li><a href="/contact" className="text-blue-600 hover:underline">Contact</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Legal</h2>
              <ul className="space-y-2">
                <li><a href="/legal" className="text-blue-600 hover:underline">Legal</a></li>
                <li><a href="/privacy" className="text-blue-600 hover:underline">Privacy Notice</a></li>
                <li><a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a></li>
                <li><a href="/cookies" className="text-blue-600 hover:underline">Manage Cookies</a></li>
                <li><a href="/accessibility" className="text-blue-600 hover:underline">Accessibility</a></li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Get Started</h2>
              <ul className="space-y-2">
                <li><a href="/demo" className="text-blue-600 hover:underline">Request Demo</a></li>
                <li><a href="/" className="text-blue-600 hover:underline">Home</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <SimpleFooter />
    </>
  )
}
