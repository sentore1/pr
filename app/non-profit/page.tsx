"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Heart, Users, FileText } from 'lucide-react'
import Link from 'next/link'

export default function NonProfitPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-6">
                For Non-Profit Organizations
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Non-Profit</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Manage donations, volunteers, and demonstrate impact with transparent reporting tools.
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
              <img src="/wer.jpg" alt="Dashboard" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Built for non-profit success</h2>
            <p className="text-gray-600">Tools designed to maximize your impact and maintain transparency</p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Donation Management</h3>
                <p className="text-gray-600">Track donations, manage recurring gifts, and send automated thank-you receipts to donors.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Volunteer Coordination</h3>
                <p className="text-gray-600">Schedule volunteers, track hours, and manage your community of supporters efficiently.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Impact Reporting</h3>
                <p className="text-gray-600">Generate transparent reports to demonstrate your impact to donors and stakeholders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Focus on your mission</h2>
              <p className="text-gray-600 mb-8">Comprehensive tools to manage your organization while staying accountable to your supporters.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Donation tracking & receipts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Volunteer management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Grant & fund accounting</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Impact & outcome reporting</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Donor relationship management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Campaign & event management</span>
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
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to maximize your impact?</h2>
          <p className="text-xl text-gray-600 mb-10">Join non-profit organizations using Pryro to manage operations and demonstrate impact.</p>
          <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="https://login.pryro.com">Start Free Trial <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}


