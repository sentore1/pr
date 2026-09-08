"use client"

import { Button } from "@/components/ui/button"
import { SimpleFooter } from "@/components/simple-footer"
import { Header } from "@/components/header"
import { usePageContent } from "@/lib/use-page-content"
import { useState } from "react"

const products = [
  {
    key: "erp",
    name: "ERP Tool",
    description: "Complete enterprise resource planning with AI-powered insights for finance, inventory, and operations.",
    features: ["Financial Management", "Inventory Control", "Supply Chain", "Analytics Dashboard"],
    badge: "Full ecosystem",
    icon: "/icon/dashboard icon.png",
    url: "/erp",
  },
  {
    key: "hrm",
    name: "HRM Tool",
    description: "Comprehensive human resource management for attendance, payroll, benefits, and employee lifecycle.",
    features: ["Attendance Tracking", "Payroll Processing", "Benefits Admin", "Performance Reviews"],
    badge: "More than Payroll",
    icon: "/icon/HR icon.png",
    url: "/human-resource",
  },
  {
    key: "pos",
    name: "POS Tool",
    description: "Modern point-of-sale system for retail and restaurants with inventory sync and payment processing.",
    features: ["Quick Checkout", "Inventory Sync", "Payment Gateway", "Sales Reports"],
    badge: "Retail",
    icon: "/icon/pos icon.png",
    url: "/pos",
  },
  {
    key: "crm",
    name: "CRM Tool",
    description: "Customer relationship management to track leads, manage pipelines, and grow your business.",
    features: ["Lead Management", "Sales Pipeline", "Email Integration", "Customer Analytics"],
    badge: "Marketing",
    icon: "/icon/CRM icon.png",
    url: "/customer-relation",
  },
  {
    key: "project",
    name: "Project Tool",
    description: "Project management platform for planning, tracking, and collaborating on business initiatives.",
    features: ["Task Management", "Time Tracking", "Team Collaboration", "Gantt Charts"],
    badge: "Teams",
    icon: "/icon/project icon.png",
    url: "/project",
  },
  {
    key: "accounting",
    name: "Accounting Tool",
    description: "Professional accounting software for invoicing, expense tracking, and financial reporting.",
    features: ["Invoicing", "Expense Tracking", "Financial Reports", "Tax Management"],
    badge: "Essential",
    icon: "/icon/accounting icon.png",
    url: "/accountants-bookkeepers",
  },
  {
    key: "small_business",
    name: "Small Business",
    description: "All-in-one solution designed specifically for small businesses to manage operations efficiently.",
    features: ["Business Management", "Financial Tracking", "Customer Relations", "Reporting Tools"],
    badge: "Starter",
    icon: "/icon/business coach icon.png",
    url: "/small-business",
  },
  {
    key: "accountants",
    name: "Accountants",
    description: "Professional tools for accountants and bookkeepers to manage multiple clients and accounts.",
    features: ["Client Management", "Multi-company Support", "Tax Preparation", "Audit Tools"],
    badge: "Professional",
    icon: "/icon/signuture icon.png",
    url: "/accountants-bookkeepers",
  },
  {
    key: "hospital",
    name: "Hospital System",
    description: "Complete hospital management system for patient care, appointments, and medical records.",
    features: ["Patient Management", "Appointment Scheduling", "Medical Records", "Billing System"],
    badge: "Healthcare",
    icon: "/icon/help desk icon.png",
    url: "/hospital",
  },
  {
    key: "pharmacy",
    name: "Pharmacy Software",
    description: "Pharmacy management solution for inventory, prescriptions, and customer management.",
    features: ["Prescription Management", "Drug Inventory", "Customer Records", "Sales Tracking"],
    badge: "Healthcare",
    icon: "/icon/pharmacy icon.png",
    url: "/pharmacy",
  },
  {
    key: "stock",
    name: "Stock Management",
    description: "Inventory and stock management system for tracking products, warehouses, and supply chain.",
    features: ["Inventory Tracking", "Warehouse Management", "Stock Alerts", "Supplier Management"],
    badge: "Inventory",
    icon: "/icon/Inventory icon.png",
    url: "/stock-management",
  },
  {
    key: "self_employed",
    name: "Self-employed",
    description: "Simplified business management for freelancers and self-employed professionals.",
    features: ["Invoice Generation", "Expense Tracking", "Time Management", "Client Portal"],
    badge: "Freelancer",
    icon: "/icon/0coder icon.png",
    url: "/self-employed",
  },
  {
    key: "nonprofit",
    name: "Non-profit software",
    description: "Specialized accounting solution for non-profits with donor management and grant tracking.",
    features: ["Donor Management", "Grant Tracking", "Fund Accounting", "Compliance Reports"],
    badge: "NGO",
    icon: "/icon/knowledge icon.png",
    url: "/non-profit",
  },
  {
    key: "hospitality",
    name: "Hospitality systems",
    description: "Complete management system for hotels, restaurants, and hospitality businesses.",
    features: ["Booking Management", "Guest Services", "Table Reservations", "Billing System"],
    badge: "Industry",
    icon: "/icon/ecommerce icon.png",
    url: "/hospitality",
  },
  {
    key: "construction",
    name: "Construction",
    description: "Project and resource management tailored for construction and contracting businesses.",
    features: ["Project Planning", "Resource Allocation", "Cost Tracking", "Site Management"],
    badge: "Industry",
    icon: "/icon/manufacturers icon.png",
    url: "/construction",
  },
  {
    key: "logistic",
    name: "Logistic",
    description: "Logistics and transportation management for efficient delivery and fleet operations.",
    features: ["Fleet Management", "Route Optimization", "Delivery Tracking", "Dispatch System"],
    badge: "Transport",
    icon: "/icon/logistic icon.png",
    url: "/logistic",
  },
  {
    key: "ai_mail",
    name: "AI Mail Marketing",
    description: "Email marketing platform for campaigns, automation, and customer engagement.",
    features: ["Campaign Builder", "Email Automation", "Analytics Dashboard", "List Management"],
    badge: "AI",
    icon: "/icon/ai email icon.png",
    url: "/marketing-mail",
  },
  {
    key: "ai_call",
    name: "AI Call Marketing",
    description: "Call center and telemarketing solution for managing outbound and inbound calls.",
    features: ["Call Management", "Lead Tracking", "Performance Analytics", "Script Builder"],
    badge: "AI",
    icon: "/icon/cold call icon.png",
    url: "/marketing-call",
  },
  {
    key: "ai_enterprise",
    name: "AI Enterprise",
    description: "AI-powered enterprise solution for advanced automation and intelligent business insights.",
    features: ["AI Automation", "Predictive Analytics", "Smart Insights", "Machine Learning"],
    badge: "New",
    icon: "/icon/ai interprise icon.png",
    url: "/ai-enterprise",
  },
]

export default function ProductsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const p = usePageContent('products')

  return (
    <div className="min-h-screen bg-white text-[#0f1117] overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            {p('products_hero_title', 'Our Solutions')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {p('products_hero_subtitle', 'Comprehensive business tools designed to streamline your operations and accelerate growth')}
          </p>
        </div>
      </section>

      {/* Product accordion */}
      <section className="pb-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {products.map((product, i) => (
              <div key={i} className="border border-gray-200 rounded-[6px] overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left flex items-center gap-3">
                    {/* Product icon */}
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                      <img
                        src={p(`products_${product.key}_icon`, product.icon)}
                        alt={product.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {p(`products_${product.key}_name`, product.name)}
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-semibold rounded-full uppercase">
                      {p(`products_${product.key}_badge`, product.badge)}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-3 ${openIndex === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openIndex === i && (
                  <div className="px-5 pb-6 border-t border-gray-100">
                    <p className="text-gray-600 mb-4 mt-4 text-sm leading-relaxed">
                      {p(`products_${product.key}_description`, product.description)}
                    </p>
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0" />
                          {p(`products_${product.key}_feat${j + 1}`, feature)}
                        </div>
                      ))}
                    </div>
                    <a
                      href={p(`products_${product.key}_url`, product.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-gray-900 text-white rounded-full px-6 py-2.5 hover:bg-gray-700 text-sm font-medium transition-colors">
                        {p(`products_${product.key}_cta`, 'Learn More')}
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}
