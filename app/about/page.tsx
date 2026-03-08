"use client"

import { Button } from "@/components/ui/button"
import { Target, Users, Zap, Shield, Award, Globe, TrendingUp, Heart, Rocket, CheckCircle2 } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">About Pryro</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Empowering businesses worldwide with intelligent, integrated solutions.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Founded in 2020, Pryro was born from a vision to solve one of business's biggest challenges: fragmented systems that don't work together.
            </p>
            <p>
              Our founders, experienced entrepreneurs themselves, understood the pain of juggling multiple platforms for ERP, HRM, CRM, accounting, and project management. They knew there had to be a better way.
            </p>
            <p>
              Today, Pryro is the trusted platform for over 64,000 businesses across 5 continents, from startups to enterprises, helping them streamline operations and unlock their full potential.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black text-left">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { icon: Target, title: "Mission-Driven", desc: "We exist to empower businesses through innovative technology solutions" },
              { icon: Users, title: "Customer-First", desc: "Your success is our success. We listen, adapt, and deliver" },
              { icon: Zap, title: "Innovation", desc: "Constantly pushing boundaries to stay ahead of tomorrow's challenges" },
              { icon: Shield, title: "Security & Trust", desc: "Enterprise-grade protection with complete transparency" }
            ].map((value, i) => (
              <div key={i}>
                <value.icon className="w-6 h-6 text-black mb-4" />
                <h3 className="font-bold text-lg mb-2 text-black">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black text-left">Our Journey</h2>
          <div className="space-y-8">
            {[
              { year: "2020", title: "Foundation", desc: "Pryro was founded with a vision to unify business management tools" },
              { year: "2021", title: "First 1,000 Customers", desc: "Reached our first major milestone and expanded to 3 countries" },
              { year: "2022", title: "Series A Funding", desc: "Raised Disclosed funding to accelerate product development and global expansion" },
              { year: "2023", title: "AI Integration", desc: "Launched AI-powered features for predictive analytics and automation" },
              { year: "2024", title: "Global Leader", desc: "Serving 64,000+ businesses with 50+ team members worldwide" }
            ].map((milestone, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-20 font-bold text-black">{milestone.year}</div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1 text-black">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.desc}</p>
                </div>
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
                <feature.icon className="w-6 h-6 text-black mb-3" />
                <h3 className="font-bold mb-2 text-black">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-white">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Join Our Team</h2>
          <p className="text-gray-600 mb-8">
            We're building the future of business software and looking for passionate individuals to join us.
          </p>
          <a href="/careers">
            <Button className="bg-blue-600 text-white px-8 py-6 rounded-full hover:bg-blue-700">
              View Open Positions
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
