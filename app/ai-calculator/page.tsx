"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function AICalculatorPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    businessSize: "",
    softwareTool: "",
    tasks: "",
    budget: "",
    email: ""
  })
  const [result, setResult] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const budgetNum = parseFloat(formData.budget) || 0
    const highSavingsTools = ['marketing-call', 'marketing-mail', 'ai-enterprise', 'crm', 'hr']
    const savingsRate = highSavingsTools.includes(formData.softwareTool) ? 0.45 : 0.35
    const savings = Math.round(budgetNum * savingsRate)
    setResult(savings)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">AI and Calculate</h1>
          <div className="text-sm text-gray-500">
            <a href="/" className="hover:text-gray-700">Home</a> &gt; AI and Calculate
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 p-8 md:p-12" style={{borderRadius: '5px'}}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center text-gray-900">
              Calculurate how much you can save just by using pryro AI tool
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Answer a few quick questions and see how much you could save using Pryro's smart tools.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Business Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kigali Eats"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                  style={{borderRadius: '5px'}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Industry:
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  style={{borderRadius: '5px'}}
                >
                  <option value="">Choose one</option>
                  <option value="retail">Retail</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="construction">Construction</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="technology">Technology</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Business Size:
                </label>
                <select
                  value={formData.businessSize}
                  onChange={(e) => setFormData({...formData, businessSize: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  style={{borderRadius: '5px'}}
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                  <option value="1m+">1M+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Which software tool are you most interested in?
                </label>
                <select
                  value={formData.softwareTool}
                  onChange={(e) => setFormData({...formData, softwareTool: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  style={{borderRadius: '5px'}}
                >
                  <option value="">Select one</option>
                  <option value="small-business">Small Business</option>
                  <option value="accountants">Accountants & Bookkeepers</option>
                  <option value="project">Project</option>
                  <option value="hr">Human Resource</option>
                  <option value="stock">Stock Management</option>
                  <option value="crm">Customer Relation</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="non-profit">Non-profit</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="construction">Construction</option>
                  <option value="logistic">Logistic</option>
                  <option value="marketing-mail">Marketing (Mail)</option>
                  <option value="marketing-call">Marketing (Call)</option>
                  <option value="ai-enterprise">AI for Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Tasks You Spend Time On:
                </label>
                <textarea
                  placeholder="e.g. Reporting, managing clients, manual billing..."
                  value={formData.tasks}
                  onChange={(e) => setFormData({...formData, tasks: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-500"
                  style={{borderRadius: '5px'}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Current Monthly Budget (USD):
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1000"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                  style={{borderRadius: '5px'}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Your Email (optional):
                </label>
                <input
                  type="email"
                  placeholder="To receive your full report"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                  style={{borderRadius: '5px'}}
                />
              </div>

              <Button type="submit" className="w-full py-6 text-base bg-green-600 hover:bg-green-700 text-white">
                Estimate My AI Savings
              </Button>

              {result !== null && (
                <div className="mt-6 p-6 bg-gray-50 border border-gray-200 text-center" style={{borderRadius: '5px'}}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Estimated Monthly Savings</h3>
                  <p className="text-4xl font-bold text-green-600">${result}</p>
                  <p className="text-sm text-gray-600 mt-2">You could save approximately ${result} per month using Pryro AI tools</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      <CmsBlocks slug="ai-calculator" />
      <SimpleFooter />
    </div>
  )
}
