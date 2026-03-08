"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Users, Calendar, ClipboardList } from 'lucide-react'
import Link from 'next/link'

export default function HospitalityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full mb-6">
                For Hotels & Restaurants
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Hospitality</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Manage bookings, staff, inventory, and guest experiences. Deliver exceptional service every time.
              </p>
              <div className="flex gap-3">
                <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="https://login.pryro.com">Start Free Trial <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-white border-gray-300 text-gray-900">
                  <Link href="/contact">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <img src="/dashboard-screenshot.png" alt="Dashboard" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Complete hospitality management</h2>
            <p className="text-gray-600">Everything you need to run your hotel or restaurant efficiently</p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Reservation Management</h3>
                <p className="text-gray-600">Handle bookings, table assignments, and room reservations seamlessly in one place.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Staff Coordination</h3>
                <p className="text-gray-600">Schedule shifts, assign tasks, and manage your team efficiently across all departments.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Inventory Tracking</h3>
                <p className="text-gray-600">Monitor stock levels, automate reordering, and reduce waste with real-time inventory insights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Built for hospitality excellence</h2>
              <p className="text-gray-600 mb-8">Streamline operations and deliver outstanding guest experiences with our comprehensive platform.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Online booking & reservations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Staff scheduling & management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Inventory & supply tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Guest feedback & reviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Revenue & performance analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Multi-location support</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-3">$0</div>
                <p className="text-lg text-gray-900 font-semibold mb-6">to get started</p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to elevate your hospitality business?</h2>
          <p className="text-xl text-gray-600 mb-10">Join hotels and restaurants using Pryro to deliver exceptional experiences.</p>
          <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="https://login.pryro.com">Start Free Trial <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}


