"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import FeaturesSection from "@/components/features-5"
import ContentSection from "@/components/content-2"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { usePageContent } from "@/lib/use-page-content"
import { CmsBlocks } from "@/components/cms-blocks"

export default function HumanResourcePage() {
  const p = usePageContent('human-resource')
  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">{p('human-resource_hero_title', 'Pryro for Human Resources')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            {p('human-resource_hero_subtitle', 'Streamline HR operations from recruitment to retirement. Manage employees, payroll, attendance, and performance all in one place.')}
          </p>
          <div className="inline-flex items-center gap-1 bg-black/5 rounded-[9px] p-1">
            <Button asChild size="lg" className="rounded-[4px] bg-black text-white hover:bg-black/90">
              <Link href={p('human-resource_hero_cta1_url', '/demo')}>{p('human-resource_hero_cta1', 'Get Started')}</Link>
            </Button>
            <Button asChild size="lg" className="rounded-[4px] bg-white text-black hover:bg-white/80">
              <Link href={p('human-resource_hero_cta2_url', '/contact')}>{p('human-resource_hero_cta2', 'Contact Sales')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <FeaturesSection variant="hr" />
      
      <ContentSection variant="hr" />
      <CmsBlocks slug="human-resource" />
      <SimpleFooter />
    </div>
  )
}


