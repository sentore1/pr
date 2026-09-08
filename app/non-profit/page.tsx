"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Heart, Users, FileText } from 'lucide-react'
import Link from 'next/link'
import { CmsBlocks } from "@/components/cms-blocks"
import { usePageContent } from "@/lib/use-page-content"

export default function NonProfitPage() {
  const p = usePageContent('non-profit')

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-[5px] mb-6">
                {p('hero_badge', 'For Non-Profit Organizations')}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">{p('hero_title', 'Non-Profit')}</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {p('hero_description', 'Manage donations, volunteers, and demonstrate impact with transparent reporting tools.')}
              </p>
              <div className="inline-flex items-center gap-1 bg-black/5 rounded-[9px] p-1">
                <Button asChild size="lg" className="rounded-[4px] bg-black text-white hover:bg-black/90">
                  <Link href="https://login.pryro.com">{p('hero_cta_primary', 'Start Free Trial')} <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild size="lg" className="rounded-[4px] bg-white text-black hover:bg-white/80">
                  <Link href="/contact">{p('hero_cta_secondary', 'Learn More')}</Link>
                </Button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-[5px] overflow-hidden shadow-sm">
              <img src="/wer.jpg" alt="Dashboard" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">{p('features_title', 'Built for non-profit success')}</h2>
            <p className="text-gray-600">{p('features_subtitle', 'Tools designed to maximize your impact and maintain transparency')}</p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-[5px] flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{p('feature1_title', 'Donation Management')}</h3>
                <p className="text-gray-600">{p('feature1_description', 'Track donations, manage recurring gifts, and send automated thank-you receipts to donors.')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-[5px] flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{p('feature2_title', 'Volunteer Coordination')}</h3>
                <p className="text-gray-600">{p('feature2_description', 'Schedule volunteers, track hours, and manage your community of supporters efficiently.')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-[5px] flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{p('feature3_title', 'Impact Reporting')}</h3>
                <p className="text-gray-600">{p('feature3_description', 'Generate transparent reports to demonstrate your impact to donors and stakeholders.')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{p('mission_title', 'Focus on your mission')}</h2>
              <p className="text-gray-600 mb-8">{p('mission_description', 'Comprehensive tools to manage your organization while staying accountable to your supporters.')}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black flex-shrink-0" />
                  <span className="text-gray-700">{p('checklist_item1', 'Donation tracking & receipts')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black flex-shrink-0" />
                  <span className="text-gray-700">{p('checklist_item2', 'Volunteer management')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black flex-shrink-0" />
                  <span className="text-gray-700">{p('checklist_item3', 'Grant & fund accounting')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black flex-shrink-0" />
                  <span className="text-gray-700">{p('checklist_item4', 'Impact & outcome reporting')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black flex-shrink-0" />
                  <span className="text-gray-700">{p('checklist_item5', 'Donor relationship management')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black flex-shrink-0" />
                  <span className="text-gray-700">{p('checklist_item6', 'Campaign & event management')}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[5px] p-8 border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-black mb-3">{p('pricing_amount', '$0')}</div>
                <p className="text-lg text-gray-900 font-semibold mb-6">{p('pricing_subtitle', 'to get started')}</p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-black flex-shrink-0" />
                    <span className="text-gray-700">{p('pricing_item1', 'No credit card required')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-black flex-shrink-0" />
                    <span className="text-gray-700">{p('pricing_item2', '14-day free trial')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-black flex-shrink-0" />
                    <span className="text-gray-700">{p('pricing_item3', 'Cancel anytime')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">{p('cta_title', 'Ready to maximize your impact?')}</h2>
          <p className="text-xl text-gray-600 mb-10">{p('cta_description', 'Join non-profit organizations using Pryro to manage operations and demonstrate impact.')}</p>
          <Button asChild size="lg" className="rounded-[5px] bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="https://login.pryro.com">{p('cta_button', 'Start Free Trial')} <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      <CmsBlocks slug="non-profit" />
      <SimpleFooter />
    </div>
  )
}
