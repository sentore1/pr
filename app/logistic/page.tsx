"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import { Button } from '@/components/ui/button'
import { Truck, MapPin, Package, BarChart, TrendingUp } from 'lucide-react'

export default function LogisticPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Explore Everything Pryro Can Do<br/>For Logistics</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">From shipment tracking to fleet management, Pryro gives logistics teams complete visibility over operations, routes, and deliveries.</p>
          <Button size="lg" className="rounded-full" asChild>
            <a href="https://login.pryro.com">Get Started Free</a>
          </Button>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Fleet Management</h3>
              <p className="text-gray-600">Track vehicles, drivers, and maintenance schedules to optimize your fleet operations.</p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Route Optimization</h3>
              <p className="text-gray-600">Plan efficient delivery routes to reduce costs and ensure on-time deliveries.</p>
            </div>
            <div className="bg-blue-500 rounded-2xl p-8">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Shipment Tracking</h3>
              <p className="text-white">Real-time visibility into every shipment from warehouse to final destination.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Built for Logistics Operations</h2>
              <p className="text-gray-600 mb-6">Pryro streamlines your entire supply chain with powerful tools for tracking, planning, and optimizing logistics operations.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <BarChart className="w-5 h-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Real-time analytics and performance monitoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Warehouse management and inventory control</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Delivery scheduling and tracking</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <img src="/dashboard-screenshot.png" alt="Logistics Dashboard" className="w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gray-70">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="mb-6">
                <div className="text-3xl font-semibold text-gray-900">1,245</div>
                <div className="text-sm text-gray-500">Active Shipments</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Deliveries</div>
                    <div className="text-xs text-gray-500">This week</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">423</div>
                    <div className="text-xs text-green-600">+12.5%</div>
                  </div>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Fleet Vehicles</div>
                    <div className="text-xs text-gray-500">Active today</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">87</div>
                    <div className="text-xs text-gray-500">+3.2%</div>
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
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Fleet Optimization</h3>
                  <p className="text-sm text-gray-600">Monitor fleet performance and fuel costs. Pryro provides optimization insights for logistics.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Delivery Analytics</h3>
                  <p className="text-sm text-gray-600">Track delivery times and routes. Pryro provides real-time analytics for logistics teams.</p>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-between">
                  <span>Route Planner</span>
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">New</span>
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Shipment Tracker</button>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors text-left">Fleet Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Streamline Your Logistics Operations</h2>
          <p className="text-gray-600 mb-10">Join thousands of logistics companies using Pryro to optimize deliveries and reduce costs.</p>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-1">98%</div>
              <p className="text-sm text-gray-600">On-time delivery rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-1">35%</div>
              <p className="text-sm text-gray-600">Cost reduction average</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-1">24/7</div>
              <p className="text-sm text-gray-600">Real-time tracking</p>
            </div>
          </div>
          <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <a href="/demo">Start Free Trial</a>
          </Button>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}


