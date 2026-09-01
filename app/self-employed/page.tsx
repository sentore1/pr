"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Zap, Clock, FileText } from 'lucide-react'
import Link from 'next/link'

export default function SelfEmployedPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-6">
                For Freelancers & Solo Entrepreneurs
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Self-Employed</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Simple business management for freelancers. Invoice clients, track expenses, and focus on what you do best.
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
              <img src="moreimages/pryro small business 2.jpg" alt="Dashboard" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Everything you need to run your business</h2>
            <p className="text-gray-600">Powerful tools designed specifically for self-employed professionals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Invoicing Made Simple</h3>
              <p className="text-gray-600">Create professional invoices in seconds. Get paid faster with automated reminders.</p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Time Management</h3>
              <p className="text-gray-600">Log billable hours and convert them to invoices instantly. Never miss time again.</p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Expense Tracking</h3>
              <p className="text-gray-600">Track every business expense automatically. Maximize tax deductions effortlessly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Built for your success</h2>
              <p className="text-gray-600 mb-8">Everything you need to manage your freelance business efficiently and professionally.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Professional invoicing & payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Automated expense tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Time tracking & billing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Client management tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Financial reports & insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Tax preparation support</span>
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

      <section className="py-32 px-6 bg-gradient-to-b from-white via-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to simplify your business?</h2>
          <p className="text-xl text-gray-600 mb-10">Join thousands of self-employed professionals using Pryro.</p>
          <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="https://login.pryro.com">Start Free Trial <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}
