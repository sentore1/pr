"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-20 px-4">
        
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-2 h-2 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600 text-sm mb-1">sales@pryro.com</p>
                    <p className="text-gray-600 text-sm">support@pryro.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-2 h-2 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600 text-sm mb-1">+250 788 715 075</p>
                    <p className="text-gray-600 text-sm">24/7 am-0:00pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-2 h-2 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Office</h3>
                    <p className="text-gray-600 text-sm mb-1">1 kn 78  Nyarugenge Street</p>
                    <p className="text-gray-600 text-sm">Kigali, Rwanda</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <form className="space-y-5">
                <div>
                  <input 
                    type="text" 
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white" 
                    placeholder="Your Name" 
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white" 
                    placeholder="Email Address" 
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white" 
                    placeholder="Company (Optional)" 
                  />
                </div>
                <div>
                  <textarea 
                    rows={5} 
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 transition-all duration-200 bg-gray-50 focus:bg-white resize-none" 
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <Button className="w-full bg-blue-600 text-white rounded-xl py-3.5 hover:bg-blue-700 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
