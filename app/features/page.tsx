"use client"

import { Cpu, Lock, Sparkles, Zap, Shield, Users, Check, Package, ShoppingCart, DollarSign, Calendar, BarChart3, MessageSquare, Video, Bell, Globe } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16 md:py-32">
        <div className="mx-auto max-w-5xl space-y-12 px-6">
          <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
            <h2 className="text-4xl font-semibold text-gray-900">The Pryro ecosystem brings together powerful tools</h2>
            <p className="max-w-sm sm:ml-auto text-gray-600">Empower your team with workflows that adapt to your needs, whether you prefer git synchronization or a AI Agents interface.</p>
          </div>
          <div className="px-3 pt-3 md:-mx-8">
            <div className="aspect-88/36 mask-b-from-75% mask-b-to-95% relative">
              <Image
                src="/125902.jpg"
                className="w-full h-full object-cover rounded-lg"
                alt="Pryro ecosystem"
                width={2797}
                height={1137}
              />
            </div>
          </div>
          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="size-4" />
                <h3 className="text-sm font-medium text-gray-600">Fast</h3>
              </div>
              <p className="text-muted-foreground text-sm">It supports an speed and allow company to scale and innovate.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="size-4" />
                <h3 className="text-sm font-medium text-gray-600">Powerful</h3>
              </div>
              <p className="text-muted-foreground text-sm">It supports an large dataset in businesses decisions.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="size-4" />
                <h3 className="text-sm font-medium text-gray-600">Security</h3>
              </div>
              <p className="text-muted-foreground text-sm">It is secured with best FW security measures with 24 security checkups.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4" />
                <h3 className="text-sm font-medium text-gray-600">AI Powered</h3>
              </div>
              <p className="text-muted-foreground text-sm">Has ai in thinks and also intergrated for better prediction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            <div className="pt-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Create Plans & Manage Payments</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">Every business to exist always must have a plan to correct payment and grow so our system do so helps you plan fast than before</p>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                {["Multi-services architecture", "Subscription and customer management", "Multiple integration", "Automatic handling"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] overflow-hidden">
              <img src="/849234.jpg" alt="Dashboard" className="w-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            <div className="pt-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Dashboard & Insights</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">Get a quick overview of your business with visual dashboards showing key metrics across all departments.</p>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                {["Accounting dashboard with income, expenses, cash flow", "HRM overview with attendance and staff details", "CRM summary of leads, deals, and contracts", "Project status, timesheets, and task progress", "POS and sales summary with comparisons", "Real-time reports for quick insights"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] overflow-hidden">
              <img src="/images/2149851004.jpg" alt="Dashboard" className="w-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            <div className="pt-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Human Resource Management</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">Central hub to organize staff details, attendance, recruitment, and performance.</p>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                {["Employee setup and profile management", "Payroll setup and payslip processing", "Leave tracking and attendance logs", "Performance goals and appraisal tracking", "Training plans and job postings", "Employee assets, documents, and policies"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] overflow-hidden">
              <img src="/images/77570.jpg" alt="HRM" className="w-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            <div className="pt-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Accounting & Finance</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">Comprehensive tools to record, track, and report all financial activities.</p>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                {["Banking, account management, and transfers", "Customer, supplier, revenue, and bill tracking", "Invoices, estimates, credit/debit notes", "Expense recording and payment receipts", "Double-entry accounting with general ledger", "Profit & loss reports and budget planning"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] overflow-hidden">
              <img src="/images/25164.jpg" alt="Finance" className="w-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            <div className="pt-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">CRM — Leads, Deals & Contracts</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">Manage your sales pipeline and client relationships in one place.</p>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                {["Add and manage leads and customer contacts", "Convert leads into deals with status tracking", "Store contracts and communication notes", "Form builder for custom CRM input fields", "CRM system settings for tailored workflows", "Contact & inquiry management"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] overflow-hidden">
              <img src="/office.jpg" alt="CRM" className="w-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            <div className="pt-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Project & Task Management</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">Organize work, assign responsibilities, and track productivity.</p>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                {["Create projects with due dates and descriptions", "Task assignment and progress logs", "Timesheet tracking for employee work hours", "Bug management and task calendar view", "Project reports for overview and metrics"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] overflow-hidden">
              <img src="/moreimages/office2.jpg" alt="Projects" className="w-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            <div className="pt-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Products & Inventory</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">Manage products, stock levels, and warehouse operations.</p>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                {["Add products and services with details", "Track product stock and inventory movement", "Warehouse and supplier management", "Import/export stock lists and categories", "Product search and filter utilities"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] overflow-hidden">
              <img src="/images/128613.jpg" alt="Inventory" className="w-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            <div className="pt-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Point of Sale (POS)</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">Integrated POS system for retail and quick sales recording.</p>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                {["Simple and fast POS checkout screen", "Generate sales receipts and print barcodes", "Record and manage purchases", "Warehouse stock updates on POS sales", "POS reports with daily and monthly insights"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] overflow-hidden">
              <img src="/moreimages/shop image 5.jpg" alt="POS" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Integrations & Communication</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Stay connected with your favorite tools and platforms</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MessageSquare, name: "Slack Integration", desc: "Real-time notifications in Slack channels" },
              { icon: Video, name: "Zoom Integration", desc: "Create and manage meetings with calendar sync" },
              { icon: Bell, name: "Telegram Integration", desc: "Instant activity notifications on Telegram" },
              { icon: MessageSquare, name: "Twilio Integration", desc: "SMS alerts for system activities" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Ready to streamline your business?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of businesses using Pryro to manage their operations</p>
          <a href="/demo" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition-colors">
            Start Free Trial
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}

const IntegrationCard = ({ children, className, borderClassName }: { children: React.ReactNode; className?: string; borderClassName?: string }) => {
  return (
    <div className={`relative flex size-20 rounded-xl bg-white ${className || ''}`}>
      <div
        role="presentation"
        className={`absolute inset-0 rounded-xl border border-black/20 ${borderClassName || ''}`}
      />
      <div className="relative z-20 m-auto size-fit text-gray-700">{children}</div>
    </div>
  )
}
