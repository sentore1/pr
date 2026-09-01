"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import { Button } from '@/components/ui/button'
import { Mail, Users, Target, TrendingUp } from 'lucide-react'

export default function MarketingMailPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500 rounded-full mb-6">
            <span className="text-sm text-white font-medium">Authentic Reach Out Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Email Marketing Made Simple</h1>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">Reach the right contacts with AI-powered tools that identify high-engagement emails.</p>
          <Button size="lg" className="rounded-full bg-blue-500 hover:bg-blue-600 text-white" asChild>
            <a href="https://login.pryro.com">Get Started Free</a>
          </Button>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6">
              <Mail className="w-5 h-5 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">Authentic Reach Out</h3>
              <p className="text-sm text-gray-600">Identify emails with high opening rates.</p>
            </div>
            <div className="p-6">
              <Users className="w-5 h-5 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">List Segmentation</h3>
              <p className="text-sm text-gray-600">Target the right audience.</p>
            </div>
            <div className="p-6">
              <Target className="w-5 h-5 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">Automation</h3>
              <p className="text-sm text-gray-600">Automated email workflows.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">How It Works</h2>
            <p className="text-gray-600">4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3">1</div>
              <h3 className="font-semibold mb-1 text-gray-900">Upload Contacts</h3>
              <p className="text-sm text-gray-600">Import your list</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3">2</div>
              <h3 className="font-semibold mb-1 text-gray-900">AI Analysis</h3>
              <p className="text-sm text-gray-600">Identify high openers</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3">3</div>
              <h3 className="font-semibold mb-1 text-gray-900">Send Emails</h3>
              <p className="text-sm text-gray-600">Reach best contacts</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3">4</div>
              <h3 className="font-semibold mb-1 text-gray-900">Track Results</h3>
              <p className="text-sm text-gray-600">Monitor engagement</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Built for Marketing Teams</h2>
              <p className="text-gray-600 mb-4">Powerful tools to drive conversions and grow your business.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 mt-1" />
                  <span className="text-sm text-gray-700">Track opens and clicks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-600 mt-1" />
                  <span className="text-sm text-gray-700">Reach high-engagement contacts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-blue-600 mt-1" />
                  <span className="text-sm text-gray-700">AI-powered insights</span>
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-2">
              <img src="/889.jpg" alt="Dashboard" className="w-full rounded" />
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}


