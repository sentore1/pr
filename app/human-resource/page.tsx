"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import FeaturesSection from "@/components/features-5"
import ContentSection from "@/components/content-2"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function HumanResourcePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">Pryro for<br />Human Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
            Streamline HR operations from recruitment to retirement. Manage employees, payroll, attendance, and performance all in one place.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/demo">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <FeaturesSection variant="hr" />
      
      <ContentSection variant="hr" />

      <Footer />
    </div>
  )
}


