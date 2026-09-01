"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import { Button } from '@/components/ui/button'
import { Phone, Bot, Mic, Clock, TrendingUp, Users, MessageSquare, BarChart3, Zap, Brain, PhoneCall, CheckCircle, Smile, StarHalfIcon, GlassWaterIcon } from 'lucide-react'
import Link from 'next/link'

export default function MarketingCallPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500 rounded-full mb-6">
            <Bot className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">AI-Powered Calling</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">AI That Calls & Converts</h1>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">Automate outreach with intelligent AI that makes calls, qualifies leads, and books appointments.</p>
          <Button asChild size="lg" className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">
            <Link href="https://login.pryro.com">Start Free Trial</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold mb-1 text-gray-900">AI Agent</h3>
              <p className="text-sm text-gray-600">Natural conversations</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <PhoneCall className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold mb-1 text-gray-900">Auto Dial</h3>
              <p className="text-sm text-gray-600">1000s of calls/day</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GlassWaterIcon className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold mb-1 text-gray-900">Smart Qualify</h3>
              <p className="text-sm text-gray-600">AI filters leads</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold mb-1 text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">Real-time insights</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">How AI Calling Works</h2>
            <p className="text-gray-600">4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3">1</div>
              <h3 className="font-semibold mb-1 text-gray-900">Upload Leads</h3>
              <p className="text-sm text-gray-600">Import contact list</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3">2</div>
              <h3 className="font-semibold mb-1 text-gray-900">AI Calls</h3>
              <p className="text-sm text-gray-600">Automated outreach</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3">3</div>
              <h3 className="font-semibold mb-1 text-gray-900">Qualify</h3>
              <p className="text-sm text-gray-600">AI filters prospects</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3">4</div>
              <h3 className="font-semibold mb-1 text-gray-900">Convert</h3>
              <p className="text-sm text-gray-600">Book appointments</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">AI Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <Mic className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Natural Voice</h3>
              <p className="text-sm text-gray-600">Human-like AI voice that sounds authentic and engaging</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Smart Responses</h3>
              <p className="text-sm text-gray-600">AI handles objections and answers questions instantly</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">24/7 Calling</h3>
              <p className="text-sm text-gray-600">Never miss a lead with round-the-clock automation</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Instant Follow-up</h3>
              <p className="text-sm text-gray-600">Automatic callbacks and follow-up sequences</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <BarChart3 className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Call Analytics</h3>
              <p className="text-sm text-gray-600">Track success rates, duration, and outcomes</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">CRM Sync</h3>
              <p className="text-sm text-gray-600">Seamless integration with your existing tools</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-y border-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Why AI Calling?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Scale Instantly</h3>
              <p className="text-sm text-gray-600">Make 10x more calls per day without hiring more staff</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Reduce Costs</h3>
              <p className="text-sm text-gray-600">Cut your cost per lead by 50% with automation</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Never Stop</h3>
              <p className="text-sm text-gray-600">AI works 24/7 so you never miss an opportunity</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Built for Scale</h2>
              <p className="text-gray-600 mb-4">Handle thousands of calls simultaneously with AI agents that never get tired.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-sm text-gray-700">Unlimited concurrent calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-sm text-gray-700">Multi-language support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-sm text-gray-700">Custom AI training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-sm text-gray-700">Enterprise security</span>
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <img src="/moreimages/cold call.jpg" alt="Dashboard" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}

