"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import FeaturesSection from "@/components/features-5"
import ContentSection from "@/components/content-2"
import { Button } from '@/components/ui/button'
import { ChevronRight, Check } from 'lucide-react'
import Link from 'next/link'
import { CmsBlocks } from "@/components/cms-blocks"
import { usePageContent } from "@/lib/use-page-content"

export default function StockManagementPage() {
  const p = usePageContent('stock-management')
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-700 border border-blue-100 rounded-[5px] mb-6">
            <span className="w-2 h-2 bg-white rounded-[5px]"></span>
            <span className="text-sm text-white font-medium">{p('hero_badge', 'Trusted by 6,500+ inventory teams')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">{p('hero_title', 'Pryro for Stock Management')}</h1>
          <p className="text-l text-gray-600 max-w-3xl leading-relaxed mb-8">
            {p('hero_description', 'Take control of your inventory with real-time tracking, automated reordering, and comprehensive stock analytics.')}
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-[5px]">Real-time tracking</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-[5px]">Auto reorder alerts</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-[5px]">Multi-location support</span>
          </div>
        </div>
      </section>

      <FeaturesSection variant="stock" />
      
      <ContentSection variant="stock" />

      <section className="py-24 md:py-40 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-[5px] mb-4">
                Inventory Platform
              </div>
              <h2 className="text-4xl font-medium text-gray-900 mb-6">{p('ecosystem_title', 'The Pryro ecosystem brings together powerful tools for inventory management.')}</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Real-time stock tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Automated reorder points</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Multi-warehouse management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Stock level analytics</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-gray-700">Pryro is more than just software. It's a complete inventory management ecosystem — from stock tracking to demand forecasting and supplier management, helping businesses optimize inventory levels.</p>
              <p className="text-gray-700">
                Built for efficiency. <span className="font-semibold">Everything you need in one place</span> — track stock levels, manage suppliers, automate reordering, and prevent stockouts. Simple, powerful, and designed for modern inventory management.
              </p>
              <div className="inline-flex items-center gap-1 bg-black/5 rounded-[9px] p-1">
                <Button
                  asChild
                  size="sm"
                  className="rounded-[4px] bg-black text-white hover:bg-black/90">
                  <Link href="/contact">
                    <span>Get Started Free</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-[4px] bg-white text-black hover:bg-white/80">
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
      <CmsBlocks slug="stock-management" />
      <SimpleFooter />
    </div>
  )
}



