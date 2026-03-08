"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Cpu, Lock, Sparkles, Zap, Package, ShoppingCart, DollarSign, Calendar, BarChart3, Users } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function AIEnterprisePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight">AI-Powered Infrastructure</h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Building intelligent systems that power the future of enterprise software</p>
          <a href="https://login.pryro.com" className="inline-flex px-8 py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Get started</a>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto max-w-5xl space-y-8 md:space-y-12">
          <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
            <p className="text-gray-600">Our AI automation design infrastructure seamlessly integrates across your entire company technology stack — from edge computing to cloud platforms, enabling real-time intelligence and automated decision-making at every layer of your operations.</p>
          </div>
          <img className="rounded-lg grayscale w-full" src="/109919.jpg" alt="team image" loading="lazy" />

          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-gray-900" />
                <h3 className="text-sm font-medium text-gray-900">Fast</h3>
              </div>
              <p className="text-gray-600 text-sm">Lightning-fast processing and real-time responses for your infrastructure needs.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="size-4 text-gray-900" />
                <h3 className="text-sm font-medium text-gray-900">Powerful</h3>
              </div>
              <p className="text-gray-600 text-sm">Enterprise-grade AI models built for complex infrastructure management.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-gray-900" />
                <h3 className="text-sm font-medium text-gray-900">Security</h3>
              </div>
              <p className="text-gray-600 text-sm">Bank-level security with AI-powered threat detection and prevention.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-gray-900" />
                <h3 className="text-sm font-medium text-gray-900">AI Powered</h3>
              </div>
              <p className="text-gray-600 text-sm">Intelligent automation that learns and adapts to your business.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center text-gray-900">Why AI matters</h2>
          
          <div className="w-full overflow-auto lg:overflow-visible">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="*:py-4 *:text-left *:font-semibold *:text-gray-900">
                  <th className="lg:w-2/5"></th>
                  <th>Traditional</th>
                  <th className="text-blue-600">With AI</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="*:py-4 *:border-b">
                  <td className="font-medium text-gray-900">Predictive Intelligence</td>
                  <td className="text-gray-600">Reactive troubleshooting</td>
                  <td className="text-gray-900">Predict issues before they occur, 90% downtime reduction</td>
                </tr>
                <tr className="*:py-4 *:border-b">
                  <td className="font-medium text-gray-900">Resource Optimization</td>
                  <td className="text-gray-600">Manual configuration</td>
                  <td className="text-gray-900">Real-time adaptive optimization and cost efficiency</td>
                </tr>
                <tr className="*:py-4 *:border-b">
                  <td className="font-medium text-gray-900">Workflow Automation</td>
                  <td className="text-gray-600">Hours of manual work</td>
                  <td className="text-gray-900">Seconds with higher accuracy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Building AI for infrastructure</h2>
          <p className="text-lg text-gray-600 mb-16 text-center max-w-2xl mx-auto">Pioneering the next generation of intelligent infrastructure systems.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-full px-6 py-4 hover:border-blue-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Neural Infrastructure</h3>
              </div>
            </div>
            <div className="border border-gray-200 rounded-full px-6 py-4 hover:border-blue-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Real-Time Processing</h3>
              </div>
            </div>
            <div className="border border-gray-200 rounded-full px-6 py-4 hover:border-blue-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Self-Improving Systems</h3>
              </div>
            </div>
            <div className="border border-gray-200 rounded-full px-6 py-4 hover:border-blue-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Distributed Intelligence</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-4">Quick answers to common questions about our AI-powered infrastructure.</p>
          </div>

          <div className="mx-auto mt-12 max-w-xl">
            <Accordion type="single" collapsible className="w-full rounded-2xl border px-8 py-3 shadow-sm">
              <AccordionItem value="item-1" className="border-dashed">
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-gray-900">What makes your AI infrastructure different?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-base text-gray-600">Our AI is embedded at every layer of the infrastructure, from data processing to real-time decision making. We use neural networks trained on billions of operational events to predict and prevent issues before they impact your business.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-dashed">
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-gray-900">How quickly can AI be deployed?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-base text-gray-600">Most implementations are live within 2-4 weeks. Our edge AI processes infrastructure events in milliseconds, and the system begins learning and optimizing from day one.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-dashed">
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-gray-900">Is my data secure with AI processing?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-base text-gray-600">Absolutely. We use federated AI architectures that maintain data privacy and sovereignty. All processing includes bank-level encryption and AI-powered threat detection running 24/7.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-dashed">
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-gray-900">What kind of ROI can I expect?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-base text-gray-600">Our customers typically see 90% reduction in downtime, 40-60% cost savings through intelligent resource optimization, and significant time savings through automated workflows that complete in seconds instead of hours.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-dashed">
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-gray-900">Do I need AI expertise on my team?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-base text-gray-600">No. Our AI infrastructure is designed to work autonomously with self-improving systems. We provide full support and training, and the platform handles complex AI operations automatically.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p className="text-gray-600 mt-6 px-8">
              Can't find what you're looking for? Contact our{' '}
              <Link href="/contact" className="text-blue-600 font-medium hover:underline">
                customer support team
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative mx-auto w-fit">
            <div
              role="presentation"
              className="absolute inset-0 z-10 bg-gradient-radial from-transparent to-white to-75%"
            />
            <div className="mx-auto mb-2 flex w-fit justify-center gap-2">
              <IntegrationCard>
                <Zap className="w-8 h-8" />
              </IntegrationCard>
              <IntegrationCard>
                <Package className="w-8 h-8" />
              </IntegrationCard>
            </div>
            <div className="mx-auto my-2 flex w-fit justify-center gap-2">
              <IntegrationCard>
                <ShoppingCart className="w-8 h-8" />
              </IntegrationCard>
              <IntegrationCard
                borderClassName="shadow-xl border-black/25"
                className="bg-white/50">
                <DollarSign className="w-8 h-8" />
              </IntegrationCard>
              <IntegrationCard>
                <Calendar className="w-8 h-8" />
              </IntegrationCard>
            </div>
            <div className="mx-auto flex w-fit justify-center gap-2">
              <IntegrationCard>
                <BarChart3 className="w-8 h-8" />
              </IntegrationCard>
              <IntegrationCard>
                <Users className="w-8 h-8" />
              </IntegrationCard>
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl text-gray-900">Integrate with your favorite tools</h2>
            <p className="text-gray-600">Connect seamlessly with popular platforms and services to enhance your workflow.</p>
            <a
              href="https://login.pryro.com"
              className="inline-flex items-center justify-center px-6 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-black">
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8">Transform your operations with AI-powered infrastructure.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/demo" className="inline-flex px-8 py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Schedule a demo</a>
            <a href="/contact" className="inline-flex px-8 py-3.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium">Contact sales</a>
          </div>
        </div>
      </section>

      <Footer />
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


