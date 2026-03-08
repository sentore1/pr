"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from '@/components/ui/button'
import { Users, Mail, TrendingUp, Target, Phone, MessageSquare, BarChart3, Zap } from 'lucide-react'
import Link from 'next/link'

export default function CustomerRelationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-medium mb-6 text-gray-900">Explore Everything Pryro Can Do</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">From lead management to customer insights, Pryro gives sales teams complete control over relationships, pipelines, and revenue growth.</p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/demo">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="mb-6">
                <div className="text-3xl font-semibold text-gray-900">$2.4M</div>
                <div className="text-sm text-gray-500">Total Pipeline Value</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Qualified Leads</div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">342</div>
                    <div className="text-xs text-green-600">+15.3%</div>
                  </div>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Closed Deals</div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">87</div>
                    <div className="text-xs text-green-600">+22.1%</div>
                  </div>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-around p-4">
                <div className="w-8 bg-blue-600 rounded-t" style={{height: '45%'}}></div>
                <div className="w-8 bg-blue-500 rounded-t" style={{height: '65%'}}></div>
                <div className="w-8 bg-blue-400 rounded-t" style={{height: '50%'}}></div>
                <div className="w-8 bg-blue-600 rounded-t" style={{height: '80%'}}></div>
                <div className="w-8 bg-blue-500 rounded-t" style={{height: '70%'}}></div>
                <div className="w-8 bg-blue-400 rounded-t" style={{height: '60%'}}></div>
                <div className="w-8 bg-blue-600 rounded-t" style={{height: '85%'}}></div>
                <div className="w-8 bg-blue-500 rounded-t" style={{height: '55%'}}></div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <img src="/greeen.jpg" alt="CRM Dashboard" className="w-full h-full object-container" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 relative">
                <Users className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">✓</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Contact Management</h3>
              <p className="text-sm text-gray-600">Organize all customer information in one place with detailed profiles and interaction history.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Pipeline Management</h3>
              <p className="text-sm text-gray-600">Track deals through every stage with visual pipelines and automated workflows.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Sales Analytics</h3>
              <p className="text-sm text-gray-600">Get real-time insights into sales performance and customer behavior patterns.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Email Integration</h3>
              <p className="text-sm text-gray-600">Sync emails automatically and track all customer communications in one place.</p>
            </div>
          </div>

          <div className="text-center py-12">
            <p className="text-xs text-gray-500">Trusted by 5,000+ sales & customer success teams</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Call Tracking</h3>
                  <p className="text-sm text-gray-600">Log calls, record conversations, and track follow-ups with built-in telephony.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Live Chat Support</h3>
                  <p className="text-sm text-gray-600">Engage customers in real-time with integrated chat and support ticketing.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Revenue Forecasting</h3>
                  <p className="text-sm text-gray-600">Predict future revenue with AI-powered forecasting based on pipeline data.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Workflow Automation</h3>
                  <p className="text-sm text-gray-600">Automate repetitive tasks and focus on building customer relationships.</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-between">
                <span>Lead Scoring</span>
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">AI</span>
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Deal Tracking</button>
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-between">
                <span>Sales Automation</span>
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">Pro</span>
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Reports</button>
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-between">
                <span>Customer Insights</span>
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">New</span>
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Activity Timeline</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-xl p-6 border border-gray-200">
              <summary className="font-semibold text-gray-900 cursor-pointer">How does Pryro CRM help manage customer relationships?</summary>
              <p className="mt-3 text-sm text-gray-600">Pryro centralizes all customer data, interactions, and communications in one platform. Track every touchpoint, automate follow-ups, and get insights into customer behavior to build stronger relationships.</p>
            </details>
            <details className="bg-white rounded-xl p-6 border border-gray-200">
              <summary className="font-semibold text-gray-900 cursor-pointer">Can I track sales pipeline and deals?</summary>
              <p className="mt-3 text-sm text-gray-600">Yes, Pryro provides visual pipeline management with customizable stages. Track deal progress, forecast revenue, and identify bottlenecks to close more deals faster.</p>
            </details>
            <details className="bg-white rounded-xl p-6 border border-gray-200">
              <summary className="font-semibold text-gray-900 cursor-pointer">Does Pryro integrate with email and calendar?</summary>
              <p className="mt-3 text-sm text-gray-600">Pryro integrates seamlessly with Gmail, Outlook, and popular calendar apps. All emails and meetings sync automatically to customer records.</p>
            </details>
            <details className="bg-white rounded-xl p-6 border border-gray-200">
              <summary className="font-semibold text-gray-900 cursor-pointer">How do I get my team started with Pryro CRM?</summary>
              <p className="mt-3 text-sm text-gray-600">Sign up for a free trial, import your contacts, and invite your team. We provide onboarding training and support to ensure smooth adoption.</p>
            </details>
            <details className="bg-white rounded-xl p-6 border border-gray-200">
              <summary className="font-semibold text-gray-900 cursor-pointer">Is customer data secure in Pryro?</summary>
              <p className="mt-3 text-sm text-gray-600">Yes, Pryro uses enterprise-grade encryption and complies with GDPR and SOC 2 standards. Your customer data is protected with the highest security measures.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Trusted By Sales Teams Worldwide</h2>
          <p className="text-gray-600 mb-10">See how businesses use Pryro to close more deals and grow revenue.</p>
          <div className="bg-gray-50 rounded-xl p-8 mb-8 text-left">
            <p className="text-gray-700 mb-4">"Pryro transformed our sales process. We now have complete visibility into our pipeline, and our team closes 40% more deals with automated workflows and better customer insights."</p>
            <div>
              <p className="font-semibold text-sm text-gray-900">Sarah Chen</p>
              <p className="text-xs text-gray-600">Sales Director, TechFlow Solutions</p>
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="https://login.pryro.com">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


