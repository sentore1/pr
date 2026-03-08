"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import FeaturesSection from "@/components/features-5"
import ContentSection from "@/components/content-2"
import { Button } from '@/components/ui/button'
import { ChevronRight, Check, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function SmallBusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500 border border-blue-100 rounded-full mb-6">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="text-sm text-white font-medium">Trusted by 10,000+ small businesses</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">Pryro for<br />Small Business</h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Everything you need to run your small business efficiently. Manage finances, inventory, customers, and employees from one powerful platform.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">No credit card required</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">14-day free trial</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Cancel anytime</span>
          </div>
        </div>
      </section>

      <FeaturesSection />
      
      <ContentSection />

      <section className="py-32 px-6 bg-gray-70">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="mb-6">
                <div className="text-3xl font-semibold text-gray-900">$128,450.75</div>
                <div className="text-sm text-gray-500">Total Project Balance</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Materials</div>
                    <div className="text-xs text-gray-500">Current month spend</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">$42,300</div>
                    <div className="text-xs text-green-600">+8.2%</div>
                  </div>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Labor</div>
                    <div className="text-xs text-gray-500">Current month spend</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">$27,980</div>
                    <div className="text-xs text-gray-500">-2.1%</div>
                  </div>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-around p-4">
                <div className="w-4 bg-blue-600 rounded-t" style={{height: '40%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '70%'}}></div>
                <div className="w-4 bg-blue-400 rounded-t" style={{height: '40%'}}></div>
                <div className="w-4 bg-blue-600 rounded-t" style={{height: '85%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '65%'}}></div>
                <div className="w-4 bg-blue-400 rounded-t" style={{height: '55%'}}></div>
                <div className="w-4 bg-blue-600 rounded-t" style={{height: '75%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '65%'}}></div>
                <div className="w-4 bg-blue-400 rounded-t" style={{height: '55%'}}></div>
                <div className="w-4 bg-blue-600 rounded-t" style={{height: '75%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
                <div className="w-4 bg-blue-600 rounded-t" style={{height: '75%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '65%'}}></div>
                <div className="w-4 bg-blue-400 rounded-t" style={{height: '55%'}}></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Workforce Management</h3>
                  <p className="text-sm text-gray-600">Visualize crew schedules and expenses. Pryro provides workforce projections for teams.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Predictive Analytics</h3>
                  <p className="text-sm text-gray-600">Visualize income and expenses. Pryro provides cash flow projections for construction teams.</p>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-between">
                  <span>Income Statement</span>
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">New</span>
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Balance Sheet</button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Cash Flow</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full mb-4">
                Complete Platform
              </div>
              <h2 className="text-4xl font-medium text-gray-900 mb-6">The Pryro ecosystem brings together powerful tools for small businesses.</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Financial management & reporting</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Customer relationship tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Inventory & stock control</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Employee management</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Workforce Management</h3>
                  <p className="text-sm text-gray-600">Visualize crew schedules and expenses. Pryro provides workforce projections for teams.</p>
                </div>
              </div>
              <p className="text-gray-700">Pryro is more than just software. It's a complete business management ecosystem — from financial tracking to customer management and inventory control, helping small businesses grow and thrive.</p>
              <p className="text-gray-700">
                Built for entrepreneurs. <span className="font-semibold">Everything you need in one place</span> — manage your finances, track inventory, handle invoicing, and grow your customer base. Simple, powerful, and designed specifically for small business success.
              </p>
              <div className="flex gap-3 pt-4">
                <Button
                  asChild
                  size="sm"
                  className="gap-1">
                  <Link href="/contact">
                    <span>Get Started Free</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="gap-1">
                  <Link href="/demo">
                    <span>Learn More</span>
                    <ChevronRight className="size-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

