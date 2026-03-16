"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"

export default function DemoPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", company: "",
    companySize: "1-10 employees", tool: ""
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    const res = await fetch("/api/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? "success" : "error")
  }

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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">See Pryro in Action</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Schedule a personalized demo and discover how Pryro transforms business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-gray-200">
                <h3 className="text-xl font-normal mb-6 text-gray-900">What You'll Get</h3>
                <div className="space-y-4">
                  {[
                    "30-minute personalized walkthrough",
                    "Industry-specific feature demonstration",
                    "Live Q&A with product experts",
                    "Custom pricing for your business",
                    "No commitment required"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-200">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-normal text-gray-900 mb-1">64K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div>
                    <div className="text-3xl font-normal text-gray-900 mb-1">99.99%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div>
                    <div className="text-3xl font-normal text-gray-900 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200">
              <h2 className="text-2xl font-normal mb-6 text-gray-900">Request Your Demo</h2>
              {status === "success" ? (
                <div className="text-center py-12">
                  <p className="text-2xl font-semibold text-gray-900 mb-2">Request Received!</p>
                  <p className="text-gray-600">Our team will reach out to schedule your demo.</p>
                </div>
              ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-400 transition-colors text-gray-900" placeholder="John"
                      value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Last Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-400 transition-colors text-gray-900" placeholder="Doe"
                      value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Work Email</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-400 transition-colors text-gray-900" placeholder="john@company.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Company</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-400 transition-colors text-gray-900" placeholder="Company Name"
                    value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Company Size</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-400 transition-colors text-gray-700"
                    value={form.companySize} onChange={e => setForm({ ...form, companySize: e.target.value })}>
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>500+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Which tool do you need?</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-400 transition-colors text-gray-700"
                    value={form.tool} onChange={e => setForm({ ...form, tool: e.target.value })}>
                    <option value="">Select a tool</option>
                    <option>ERP System</option>
                    <option>HRM Tools</option>
                    <option>POS System</option>
                    <option>CRM Platform</option>
                    <option>Project Management</option>
                    <option>Accounting</option>
                    <option>NGO Management</option>
                    <option>Logistics & Supply Chain</option>
                    <option>Government Solutions</option>
                    <option>Healthcare Management</option>
                    <option>Education Management</option>
                    <option>Manufacturing</option>
                    <option>Retail Management</option>
                    <option>Warehouse Management</option>
                  </select>
                </div>
                {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={status === "loading"} className="w-full bg-gray-900 text-white rounded-full py-3 hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-60">
                  {status === "loading" ? "Sending..." : "Schedule Demo"}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
                </p>
              </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
