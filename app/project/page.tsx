"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import FeaturesSection from "@/components/features-5"
import ContentSection from "@/components/content-2"
import { Button } from '@/components/ui/button'
import { ChevronRight, Check, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500 border border-blue-100 rounded-full mb-6">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="text-sm text-white font-medium">Used by 12,000+ project teams</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">Pryro for<br />Project Management</h1>
          <p className="text-l text-gray-600 max-w-3xl leading-relaxed mb-8">
            Plan, track, and deliver projects on time. Collaborate with your team and keep stakeholders informed with powerful project management tools.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Free for small teams</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Unlimited projects</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Real-time collaboration</span>
          </div>
        </div>
      </section>

      <FeaturesSection variant="project" />
      
      <ContentSection variant="project" />

      <section className="py-32 px-6 bg-gray-70">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="mb-6">
                <div className="text-3xl font-semibold text-gray-900">$78,450.75</div>
                <div className="text-sm text-gray-500">Total Project Budget</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Completed Tasks</div>
                    <div className="text-xs text-gray-500">Current month</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">342</div>
                    <div className="text-xs text-green-600">+8.2%</div>
                  </div>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Active Projects</div>
                    <div className="text-xs text-gray-500">Current month</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">28</div>
                    <div className="text-xs text-gray-500">-2.1%</div>
                  </div>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-around p-4">
                <div className="w-4 bg-blue-600 rounded-t" style={{height: '40%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '70%'}}></div>
                <div className="w-4 bg-blue-400 rounded-t" style={{height: '40%'}}></div>
                <div className="w-4 bg-blue-600 rounded-t" style={{height: '85%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '65%'}}></div>
                <div className="w-4 bg-blue-400 rounded-t" style={{height: '55%'}}></div>
                <div className="w-4 bg-blue-600 rounded-t" style={{height: '75%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '65%'}}></div>
                <div className="w-4 bg-blue-400 rounded-t" style={{height: '55%'}}></div>
                <div className="w-4 bg-blue-600 rounded-t" style={{height: '75%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
                <div className="w-4 bg-blue-600 rounded-t" style={{height: '75%'}}></div>
                <div className="w-4 bg-blue-500 rounded-t" style={{height: '65%'}}></div>
                <div className="w-4 bg-blue-400 rounded-t" style={{height: '55%'}}></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Team Collaboration</h3>
                  <p className="text-sm text-gray-600">Manage team tasks and deadlines. Pryro provides collaboration tools for project teams.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Progress Tracking</h3>
                  <p className="text-sm text-gray-600">Track project milestones and deliverables. Pryro provides real-time progress insights.</p>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-between">
                  <span>Gantt Chart</span>
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">New</span>
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Kanban Board</button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Timeline View</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-4">
                Project Platform
              </div>
              <h2 className="text-4xl font-medium text-gray-900 mb-6">The Pryro ecosystem brings together powerful tools for project teams.</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Task & milestone tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Team collaboration tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Resource management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Progress reporting</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-gray-700">Pryro is more than just software. It's a complete project management ecosystem — from planning to execution and delivery, helping teams stay aligned and deliver on time.</p>
              <p className="text-gray-700">
                Built for teams. <span className="font-semibold">Everything you need in one place</span> — plan projects, assign tasks, track progress, and collaborate seamlessly. Simple, powerful, and designed for modern project teams.
              </p>
              <div className="flex gap-3 pt-4">
                <Button
                  asChild
                  size="sm"
                  className="gap-1">
                  <Link href="https://login.pryro.com"> <span>Get Started Free</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="gap-1">
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

      <SimpleFooter />
    </div>
  )
}

