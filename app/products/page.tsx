"use client"

import { Button } from "@/components/ui/button"
import { SimpleFooter } from "@/components/simple-footer"
import { useState } from "react"

const products = [
  {
    name: "ERP Tool",
    description: "Complete enterprise resource planning with AI-powered insights for finance, inventory, and operations.",
    features: ["Financial Management", "Inventory Control", "Supply Chain", "Analytics Dashboard"],
    badge: "Full ecosystem"
  },
  {
    name: "HRM Tool",
    description: "Comprehensive human resource management for attendance, payroll, benefits, and employee lifecycle.",
    features: ["Attendance Tracking", "Payroll Processing", "Benefits Admin", "Performance Reviews"],
    badge: "More than Payroll"
  },
  {
    name: "POS Tool",
    description: "Modern point-of-sale system for retail and restaurants with inventory sync and payment processing.",
    features: ["Quick Checkout", "Inventory Sync", "Payment Gateway", "Sales Reports"],
    badge: "Retail"
  },
  {
    name: "CRM Tool",
    description: "Customer relationship management to track leads, manage pipelines, and grow your business.",
    features: ["Lead Management", "Sales Pipeline", "Email Integration", "Customer Analytics"],
    badge: "Marketing"
  },
  {
    name: "Project Tool",
    description: "Project management platform for planning, tracking, and collaborating on business initiatives.",
    features: ["Task Management", "Time Tracking", "Team Collaboration", "Gantt Charts"],
    badge: "Teams"
  },
  {
    name: "Accounting Tool",
    description: "Professional accounting software for invoicing, expense tracking, and financial reporting.",
    features: ["Invoicing", "Expense Tracking", "Financial Reports", "Tax Management"],
    badge: "Essential"
  },
  {
    name: "Small Business",
    description: "All-in-one solution designed specifically for small businesses to manage operations efficiently.",
    features: ["Business Management", "Financial Tracking", "Customer Relations", "Reporting Tools"],
    badge: "Starter"
  },
  {
    name: "Accountants",
    description: "Professional tools for accountants and bookkeepers to manage multiple clients and accounts.",
    features: ["Client Management", "Multi-company Support", "Tax Preparation", "Audit Tools"],
    badge: "Professional"
  },
  {
    name: "Hospital System",
    description: "Complete hospital management system for patient care, appointments, and medical records.",
    features: ["Patient Management", "Appointment Scheduling", "Medical Records", "Billing System"],
    badge: "Healthcare"
  },
  {
    name: "Pharmacy Software",
    description: "Pharmacy management solution for inventory, prescriptions, and customer management.",
    features: ["Prescription Management", "Drug Inventory", "Customer Records", "Sales Tracking"],
    badge: "Healthcare"
  },
  {
    name: "Stock Management",
    description: "Inventory and stock management system for tracking products, warehouses, and supply chain.",
    features: ["Inventory Tracking", "Warehouse Management", "Stock Alerts", "Supplier Management"],
    badge: "Inventory"
  },
  {
    name: "Self-employed",
    description: "Simplified business management for freelancers and self-employed professionals.",
    features: ["Invoice Generation", "Expense Tracking", "Time Management", "Client Portal"],
    badge: "Freelancer"
  },
  {
    name: "Non-profit software",
    description: "Specialized accounting solution for non-profits with donor management and grant tracking.",
    features: ["Donor Management", "Grant Tracking", "Fund Accounting", "Compliance Reports"],
    badge: "NGO"
  },
  {
    name: "Hospitality systems",
    description: "Complete management system for hotels, restaurants, and hospitality businesses.",
    features: ["Booking Management", "Guest Services", "Table Reservations", "Billing System"],
    badge: "Industry"
  },
  {
    name: "Construction",
    description: "Project and resource management tailored for construction and contracting businesses.",
    features: ["Project Planning", "Resource Allocation", "Cost Tracking", "Site Management"],
    badge: "Industry"
  },
  {
    name: "Logistic",
    description: "Logistics and transportation management for efficient delivery and fleet operations.",
    features: ["Fleet Management", "Route Optimization", "Delivery Tracking", "Dispatch System"],
    badge: "Transport"
  },
  {
    name: "AI Mail Marketing",
    description: "Email marketing platform for campaigns, automation, and customer engagement.",
    features: ["Campaign Builder", "Email Automation", "Analytics Dashboard", "List Management"],
    badge: "AI"
  },
  {
    name: "AI Call Marketing",
    description: "Call center and telemarketing solution for managing outbound and inbound calls.",
    features: ["Call Management", "Lead Tracking", "Performance Analytics", "Script Builder"],
    badge: "AI"
  },
  {
    name: "AI Enterprise",
    description: "AI-powered enterprise solution for advanced automation and intelligent business insights.",
    features: ["AI Automation", "Predictive Analytics", "Smart Insights", "Machine Learning"],
    badge: "New"
  }
]

export default function ProductsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white text-[#0f1117] overflow-x-hidden">
      <header className="absolute top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-black/10 backdrop-blur-md bg-white/80 rounded-[20px]">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/pryro logo.png" alt="Pryro" className="h-8 w-auto" />
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/products" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">Products</a>
              <a href="/about" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">About</a>
              <a href="/demo" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">Demo</a>
              <a href="/contact" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Our Solutions</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive business tools designed to streamline your operations and accelerate growth
            </p>
          </div>

          <div className="space-y-4">
            {products.map((product, i) => (
              <div key={i} className="border border-gray-200 rounded-3xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-semibold rounded-full uppercase">{product.badge}</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-gray-600 mb-4 mt-4">{product.description}</p>
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <a href="/demo">
                      <Button className="bg-gray-900 text-white rounded-full px-6 py-2.5 hover:bg-gray-700 text-sm font-medium transition-colors">
                        Learn More
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to transform your business?</h2>
          <p className="text-lg text-gray-600 mb-8">Start with a free trial or schedule a demo with our team</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/demo">
              <Button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 text-base font-medium shadow-lg hover:shadow-xl transition-all">
                Start Free Trial
              </Button>
            </a>
            <a href="/demo">
              <Button className="bg-white text-gray-900 px-8 py-3 rounded-full border border-gray-300 hover:bg-gray-50 text-base font-medium shadow-md hover:shadow-lg transition-all">
                Schedule Demo
              </Button>
            </a>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}
