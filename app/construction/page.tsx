"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import { Button } from '@/components/ui/button'
import { HardHat, Truck, Calendar, DollarSign, FileText, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function ConstructionPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-medium mb-6 text-gray-900">Explore Everything Pryro Can Do</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">From project management to cost tracking, Pryro gives construction teams complete control over budgets, jobs, and timelines.</p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="https://login.pryro.com">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center mb-4 relative">
                <HardHat className="w-4 h-4-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">✓</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Project Management</h3>
              <p className="text-sm text-gray-600">Track every job from bid to completion with real-time updates while predicting timelines.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Job Costing</h3>
              <p className="text-sm text-gray-600">Understand cost fluctuations and predict expenses across reports with forecasting.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Equipment Tracking</h3>
              <p className="text-sm text-gray-600">Track equipment and materials, identify risks early with intelligent alerts.</p>
            </div>
          </div>

          <div className="text-center py-12">
            <p className="text-xs text-gray-500">Trusted by 2,000+ construction & project teams</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Executive Project Reports</h3>
                  <p className="text-sm text-gray-600">Get a real-time view of project status, costs, and timelines needing accuracy.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Cost Breakdown Analysis</h3>
                  <p className="text-sm text-gray-600">Get transparency into financial movements. Pryro categorizes costs automatically.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Scheduling & Time Tracking</h3>
                  <p className="text-sm text-gray-600">Schedule crews and track time across multiple sites with automated management.</p>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-between">
                  <span>Forecasting</span>
                  <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">AI</span>
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Budget Control</button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-between">
                  <span>Cash Flow</span>
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">Pro</span>
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Reporting</button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <img src="/images/64658.jpg" alt="Construction" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-70">
        <div className="max-w-4xl mx-auto">
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

      <section className="py-20 px-6 bg-gray-70">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-xl p-6 border border-gray-200">
              <summary className="font-semibold text-gray-900 cursor-pointer">How does Pryro help with construction project management?</summary>
              <p className="mt-3 text-sm text-gray-600">Pryro provides real-time tracking of project status, costs, and timelines. You can manage multiple job sites, track materials and equipment, schedule crews, and monitor budgets all in one platform.</p>
            </details>
            <details className="bg-white rounded-xl p-6 border border-gray-200">
              <summary className="font-semibold text-gray-900 cursor-pointer">Can I track costs and expenses for multiple projects?</summary>
              <p className="mt-3 text-sm text-gray-600">Yes, Pryro allows you to track costs across unlimited projects. Each project has its own budget, expense tracking, and financial reporting so you can see profitability at a glance.</p>
            </details>
            <details className="bg-white rounded-xl p-6 border border-gray-200">
              <summary className="font-semibold text-gray-900 cursor-pointer">Does Pryro integrate with accounting software?</summary>
              <p className="mt-3 text-sm text-gray-600">Pryro integrates with popular accounting platforms like QuickBooks and Xero. Financial data syncs automatically, eliminating double entry and ensuring accurate records.</p>
            </details>
            <details className="bg-white rounded-xl p-6 border border-gray-200">
              <summary className="font-semibold text-gray-900 cursor-pointer">How do I get started with Pryro?</summary>
              <p className="mt-3 text-sm text-gray-600">Getting started is easy. Sign up for a free trial, import your existing projects, and start tracking immediately. Our team provides onboarding support to help you set up your account.</p>
            </details>
            <details className="bg-white rounded-xl p-6 border border-gray-200">
              <summary className="font-semibold text-gray-900 cursor-pointer">Is my construction data secure?</summary>
              <p className="mt-3 text-sm text-gray-600">Absolutely. Pryro uses bank-level encryption and secure cloud storage. Your data is backed up daily and protected with industry-standard security protocols.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Trusted By Construction Teams Worldwide</h2>
          <p className="text-gray-600 mb-10">See how businesses use Pryro to save time, cut costs, and grow faster.</p>
          <div className="bg-gray-50 rounded-xl p-8 mb-8 text-center">
            <p className="text-gray-700 mb-4">"Pryro's project tracking transformed how we manage budgets across teams. We now plan cash flow with confidence, avoid unexpected costs, and reclaim hours each week."</p>
            <div>
              <p className="font-semibold text-sm text-gray-900">Michael Rodriguez</p>
              <p className="text-xs text-gray-600">Construction Manager, ProBuild</p>
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="https://login.pryro.com">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}


