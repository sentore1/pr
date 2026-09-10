"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import FeaturesSection from "@/components/features-5"
import ContentSection from "@/components/content-2"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { usePageContent } from "@/lib/use-page-content"
import { CmsBlocks } from "@/components/cms-blocks"

export default function AccountantsBookkeepersPage() {
  const p = usePageContent('accountants-bookkeepers')
  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">{p('accountants-bookkeepers_hero_title', 'Pryro for Accountants & Bookkeepers')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            {p('accountants-bookkeepers_hero_subtitle', 'Professional accounting tools designed for accountants and bookkeepers. Manage multiple clients with ease and deliver exceptional service.')}
          </p>
          <div className="inline-flex items-center gap-1 bg-black/5 rounded-[9px] p-1">
            <Button asChild size="lg" className="rounded-[4px] bg-black text-white hover:bg-black/90">
              <Link href={p('accountants-bookkeepers_hero_cta1_url', '/demo')}>{p('accountants-bookkeepers_hero_cta1', 'Get Started')}</Link>
            </Button>
            <Button asChild size="lg" className="rounded-[4px] bg-white text-black hover:bg-white/80">
              <Link href={p('accountants-bookkeepers_hero_cta2_url', '/contact')}>{p('accountants-bookkeepers_hero_cta2', 'Contact Sales')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <FeaturesSection variant="accounting" />
      
      <ContentSection variant="accounting" />

      <section className="py-32 px-6 bg-gray-70">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-[5px] p-8">
              <div className="mb-6">
                <div className="text-3xl font-semibold text-gray-900">$128,450.75</div>
                <div className="text-sm text-gray-500">Total Client Balance</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Revenue</div>
                    <div className="text-xs text-gray-500">Current month</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">$42,300</div>
                    <div className="text-xs text-green-600">+8.2%</div>
                  </div>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Expenses</div>
                    <div className="text-xs text-gray-500">Current month</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">$27,980</div>
                    <div className="text-xs text-gray-500">-2.1%</div>
                  </div>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-r from-blue-50 to-blue-100 rounded-[5px] flex items-end justify-around p-4">
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
                <div className="w-10 h-10 bg-blue-600 rounded-[5px] flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Client Management</h3>
                  <p className="text-sm text-gray-600">Manage multiple clients and track their financial data. Pryro provides insights for accounting teams.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-[5px] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Financial Reporting</h3>
                  <p className="text-sm text-gray-600">Generate comprehensive financial reports. Pryro provides automated reporting for accountants.</p>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-[5px] text-sm font-medium text-gray-700 transition-colors flex items-center justify-between">
                  <span>Income Statement</span>
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-[5px]">New</span>
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-[5px] text-sm font-medium text-gray-700 transition-colors text-left">Balance Sheet</button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-[5px] text-sm font-medium text-gray-700 transition-colors text-left">Cash Flow</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CmsBlocks slug="accountants-bookkeepers" />
      <SimpleFooter />
    </div>
  )
}
