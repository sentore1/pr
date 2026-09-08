"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import { SimpleFooter } from "@/components/simple-footer"
import { Header } from "@/components/header"
import { usePageContent } from "@/lib/use-page-content"
import { CmsBlocks } from "@/components/cms-blocks"

export default function ContactPage() {
  const p = usePageContent('contact')
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? "success" : "error")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-20 px-4">
        
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              {p('contact_hero_title', 'Get in Touch')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {p('contact_hero_subtitle', "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-8 shadow-xl border border-gray-100" style={{borderRadius: '5px'}}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 bg-blue-600 flex items-center justify-center flex-shrink-0" style={{borderRadius: '5px'}}>
                    <Mail className="w-2 h-2 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600 text-sm mb-1">{p('contact_email_sales', 'sales@pryro.com')}</p>
                    <p className="text-gray-600 text-sm">{p('contact_email_support', 'support@pryro.com')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 bg-blue-600 flex items-center justify-center flex-shrink-0" style={{borderRadius: '5px'}}>
                    <Phone className="w-2 h-2 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600 text-sm mb-1">{p('contact_phone', '+250 788 715 075')}</p>
                    <p className="text-gray-600 text-sm">{p('contact_hours', '24/7 am-0:00pm EST')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 bg-blue-600 flex items-center justify-center flex-shrink-0" style={{borderRadius: '5px'}}>
                    <MapPin className="w-2 h-2 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Office</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{p('contact_address', '1 kn 78 Nyarugenge Street\nKigali, Rwanda')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 shadow-xl border border-gray-100" style={{borderRadius: '5px'}}>
              {status === "success" ? (
                <div className="text-center py-12">
                  <p className="text-2xl font-semibold text-gray-900 mb-2">Message Sent!</p>
                  <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-3.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
                    placeholder="Your Name"
                    style={{borderRadius: '5px'}}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    className="w-full px-5 py-3.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
                    placeholder="Email Address"
                    style={{borderRadius: '5px'}}
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full px-5 py-3.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
                    placeholder="Company (Optional)"
                    style={{borderRadius: '5px'}}
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-5 py-3.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white resize-none text-gray-900"
                    placeholder="Your Message"
                    style={{borderRadius: '5px'}}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                <Button disabled={status === "loading"} className="w-full bg-blue-600 text-white py-3.5 hover:bg-blue-700 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300" style={{borderRadius: '5px'}}>
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CmsBlocks slug="contact" />
      <SimpleFooter />
    </div>
  )
}
