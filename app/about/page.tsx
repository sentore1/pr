"use client"

import { Button } from "@/components/ui/button"
import { Target, Users, Zap, Shield, Award, Globe, TrendingUp, Heart, Rocket, CheckCircle2 } from "lucide-react"
import { SimpleFooter } from "@/components/simple-footer"
import { Header } from "@/components/header"
import { usePageContent } from "@/lib/use-page-content"
import { CmsBlocks } from "@/components/cms-blocks"

export default function AboutPage() {
  const p = usePageContent('about')

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            {p('about_hero_title', 'About Pryro')}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {p('about_hero_subtitle', 'Empowering businesses worldwide with intelligent, integrated solutions.')}
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
            {p('about_story_title', 'Our Story')}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              {p('about_story_p1', 'Founded in 2020, Pryro was born from a vision to solve one of business\'s biggest challenges: fragmented systems that don\'t work together.')}
            </p>
            <p>
              {p('about_story_p2', 'Our founders, experienced entrepreneurs themselves, understood the pain of juggling multiple platforms for ERP, HRM, CRM, accounting, and project management. They knew there had to be a better way.')}
            </p>
            <p>
              {p('about_story_p3', 'Today, Pryro is the trusted platform for over 64K+ businesses across 2 continents, from startups to enterprises, helping them streamline operations and unlock their full potential.')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black text-left">
            {p('about_values_title', 'Our Values')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { icon: Target, titleKey: 'about_value_1_title', descKey: 'about_value_1_desc', titleDefault: 'Mission-Driven', descDefault: 'We exist to empower businesses through innovative technology solutions' },
              { icon: Users, titleKey: 'about_value_2_title', descKey: 'about_value_2_desc', titleDefault: 'Customer-First', descDefault: 'Your success is our success. We listen, adapt, and deliver' },
              { icon: Zap, titleKey: 'about_value_3_title', descKey: 'about_value_3_desc', titleDefault: 'Innovation', descDefault: 'Constantly pushing boundaries to stay ahead of tomorrow\'s challenges' },
              { icon: Shield, titleKey: 'about_value_4_title', descKey: 'about_value_4_desc', titleDefault: 'Security & Trust', descDefault: 'Enterprise-grade protection with complete transparency' }
            ].map((value, i) => (
              <div key={i}>
                <value.icon className="w-4 h-4 text-black mb-4" />
                <h3 className="font-bold text-lg mb-2 text-black">{p(value.titleKey, value.titleDefault)}</h3>
                <p className="text-gray-600 leading-relaxed">{p(value.descKey, value.descDefault)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black text-left">Why Choose Pryro</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Globe, title: "Global Scale", desc: "Trusted by businesses in 150+ countries with multi-language support" },
              { icon: TrendingUp, title: "Proven Results", desc: "40% increase in productivity and 60% reduction in operational costs" },
              { icon: Heart, title: "Dedicated Support", desc: "24/7 customer support with under 2 minutes response time" },
              { icon: Rocket, title: "Rapid Innovation", desc: "Monthly updates with new features based on customer feedback" },
              { icon: Award, title: "Industry Recognition", desc: "Winner of 15+ industry awards for innovation and satisfaction" },
              { icon: Shield, title: "Bank-Level Security", desc: "256-bit encryption and compliance with global data protection" }
            ].map((feature, i) => (
              <div key={i}>
                <feature.icon className="w-4 h-4 text-black mb-3" />
                <h3 className="font-bold mb-2 text-black">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-6">
            {p('about_cta_badge', "We're Hiring")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            {p('about_cta_title', 'Join Our Team')}
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {p('about_cta_body', "We're building the future of business software and looking for passionate individuals to join us on this exciting journey.")}
          </p>
          <a href={p('about_cta_url', '/careers')}>
            <Button className="bg-blue-600 text-white px-10 py-7 rounded-full hover:bg-blue-700 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
              {p('about_cta_btn', 'View Open Positions')}
            </Button>
          </a>
        </div>
      </section>

      <CmsBlocks slug="about" />
      <SimpleFooter />
    </div>
  )
}
