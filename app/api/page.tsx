"use client"

import { SimpleFooter } from "@/components/simple-footer"
import { Header } from "@/components/header"
import { useState } from "react"

export default function APIPage() {
  const [activeTab, setActiveTab] = useState('curl')
  
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Pryro API</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">RESTful API built for enterprise scale. 200+ endpoints, 99.99% uptime.</p>
          </div>

          <div className="flex gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32 bg-white border border-gray-200 p-6" style={{borderRadius: '5px'}}>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Navigation</h3>
                <nav className="space-y-2">
                  {[
                    { label: "Overview", href: "#overview" },
                    { label: "Authentication", href: "#authentication" },
                    { label: "Endpoints", href: "#endpoints" },
                    { label: "SDK Libraries", href: "#sdks" },
                    { label: "Rate Limits", href: "#rate-limits" },
                    { label: "Error Handling", href: "#errors" },
                    { label: "Webhooks", href: "#webhooks" }
                  ].map((item, i) => (
                    <a key={i} href={item.href} className="block text-sm text-gray-600 hover:text-gray-900 py-2 px-3 hover:bg-gray-50 transition-colors" style={{borderRadius: '5px'}}>
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="bg-white border border-gray-200 p-6 mb-12" style={{borderRadius: '5px'}}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-normal text-gray-900">Quick Start</h2>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm text-gray-900 hover:bg-gray-50 transition-colors" style={{borderRadius: '5px'}}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>
                      Postman Collection
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm text-gray-900 hover:bg-gray-50 transition-colors" style={{borderRadius: '5px'}}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/></svg>
                      OpenAPI Spec
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 mb-4 border-b border-gray-200">
                  {['curl', 'python', 'javascript', 'ruby'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveTab(lang)}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === lang
                          ? 'text-gray-900 border-b-2 border-gray-900'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="bg-gray-900 p-6 font-mono text-sm overflow-x-auto" style={{borderRadius: '5px'}}>
                  {activeTab === 'curl' && (
                    <>
                      <div className="text-green-400">curl -X GET https://api.pryro.com/v1/financials \</div>
                      <div className="text-blue-400 ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                      <div className="text-blue-400 ml-4">-H "Content-Type: application/json"</div>
                    </>
                  )}
                  {activeTab === 'python' && (
                    <>
                      <div className="text-blue-400">import <span className="text-white">requests</span></div>
                      <div className="text-white mt-2">response = requests.get(</div>
                      <div className="text-green-400 ml-4">"https://api.pryro.com/v1/financials",</div>
                      <div className="text-white ml-4">headers={`{`}<span className="text-green-400">"Authorization"</span>: <span className="text-green-400">"Bearer YOUR_API_KEY"</span>{`}`}</div>
                      <div className="text-white">)</div>
                    </>
                  )}
                  {activeTab === 'javascript' && (
                    <>
                      <div className="text-blue-400">const <span className="text-white">response = </span>await <span className="text-yellow-400">fetch</span><span className="text-white">(</span></div>
                      <div className="text-green-400 ml-4">"https://api.pryro.com/v1/financials",</div>
                      <div className="text-white ml-4">{`{`} headers: {`{`} <span className="text-green-400">"Authorization"</span>: <span className="text-green-400">"Bearer YOUR_API_KEY"</span> {`}`} {`}`}</div>
                      <div className="text-white">)</div>
                    </>
                  )}
                  {activeTab === 'ruby' && (
                    <>
                      <div className="text-blue-400">require <span className="text-green-400">'net/http'</span></div>
                      <div className="text-white mt-2">uri = URI(<span className="text-green-400">"https://api.pryro.com/v1/financials"</span>)</div>
                      <div className="text-white">request = Net::HTTP::Get.new(uri)</div>
                      <div className="text-white">request[<span className="text-green-400">"Authorization"</span>] = <span className="text-green-400">"Bearer YOUR_API_KEY"</span></div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[
                  { title: "200+ Endpoints", desc: "Complete API coverage" },
                  { title: "99.99% Uptime", desc: "Enterprise reliability" },
                  { title: "10K req/sec", desc: "High performance" },
                  { title: "<50ms avg", desc: "Response time" }
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-gray-200 p-6 text-center" style={{borderRadius: '5px'}}>
                    <div className="text-2xl font-normal text-gray-900 mb-2">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 p-8 mb-12" style={{borderRadius: '5px'}}>
                <h2 className="text-2xl font-normal mb-6 text-gray-900">Response Time Metrics</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { category: "Accounts Payable", time: "42ms", color: "bg-green-500" },
                    { category: "Accounts Receivable", time: "38ms", color: "bg-green-500" },
                    { category: "General Ledger", time: "45ms", color: "bg-green-500" },
                    { category: "Inventory", time: "52ms", color: "bg-yellow-500" },
                    { category: "Financial Reports", time: "68ms", color: "bg-yellow-500" },
                    { category: "Tax & Compliance", time: "55ms", color: "bg-yellow-500" }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-gray-50" style={{borderRadius: '5px'}}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">{item.category}</span>
                        <span className={`w-2 h-2 ${item.color}`}></span>
                      </div>
                      <div className="text-2xl font-normal text-gray-900">{item.time}</div>
                      <div className="text-xs text-gray-500 mt-1">avg response</div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="endpoints" className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white border border-gray-200 p-8" style={{borderRadius: '5px'}}>
                  <h2 className="text-2xl font-normal mb-6 text-gray-900">API Features</h2>
                  <div className="space-y-4">
                    {[
                      "RESTful & GraphQL support",
                      "OAuth 2.0 authentication",
                      "Real-time webhooks",
                      "Rate limiting & throttling",
                      "Comprehensive documentation",
                      "SDK libraries (Python, JS, Java, Ruby)"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-8" style={{borderRadius: '5px'}}>
                  <h2 className="text-2xl font-normal mb-6 text-gray-900">API Endpoints</h2>
                  <div className="space-y-3">
                    {[
                      { method: "GET", path: "/v1/financials" },
                      { method: "POST", path: "/v1/invoices" },
                      { method: "GET", path: "/v1/inventory" },
                      { method: "PUT", path: "/v1/customers/:id" },
                      { method: "GET", path: "/v1/analytics" },
                      { method: "POST", path: "/v1/payments" },
                      { method: "GET", path: "/v1/expenses" },
                      { method: "POST", path: "/v1/purchase-orders" },
                      { method: "GET", path: "/v1/ledger" },
                      { method: "POST", path: "/v1/journal-entries" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors" style={{borderRadius: '5px'}}>
                        <span className={`text-xs font-medium px-3 py-1 ${
                          item.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                          item.method === 'POST' ? 'bg-green-100 text-green-700' :
                          item.method === 'PUT' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>{item.method}</span>
                        <span className="text-sm font-mono text-gray-900">{item.path}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div id="authentication" className="bg-white border border-gray-200 p-8 mb-12" style={{borderRadius: '5px'}}>
                <h2 className="text-2xl font-normal mb-6 text-gray-900">OAuth 2.0 Authentication Flow</h2>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex-1">
                    <div className="bg-gray-900 text-white p-4 text-center">
                      <div className="text-sm mb-1">1. Authorization Request</div>
                      <div className="text-xs text-gray-400">User initiates login</div>
                    </div>
                  </div>
                  <svg className="w-8 h-8 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  <div className="flex-1">
                    <div className="bg-gray-900 text-white p-4 text-center">
                      <div className="text-sm mb-1">2. User Consent</div>
                      <div className="text-xs text-gray-400">Approve permissions</div>
                    </div>
                  </div>
                  <svg className="w-8 h-8 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  <div className="flex-1">
                    <div className="bg-gray-900 text-white p-4 text-center">
                      <div className="text-sm mb-1">3. Access Token</div>
                      <div className="text-xs text-gray-400">API access granted</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-8 mb-12" style={{borderRadius: '5px'}}>
                <h2 className="text-2xl font-normal mb-6 text-white">Authentication</h2>
                <div className="bg-gray-800 p-6 font-mono text-sm overflow-x-auto" style={{borderRadius: '5px'}}>
                  <div className="text-gray-400 mb-2">// Using Bearer Token</div>
                  <div className="text-blue-400">const</div> <span className="text-white">response = </span><span className="text-blue-400">await</span> <span className="text-yellow-400">fetch</span><span className="text-white">(</span><span className="text-green-400">'https://api.pryro.com/v1/data'</span><span className="text-white">, {`{`}</span>
                  <div className="ml-4 text-white">headers: {`{`}</div>
                  <div className="ml-8 text-purple-400">'Authorization': <span className="text-green-400">'Bearer YOUR_API_KEY'</span>,</div>
                  <div className="ml-8 text-purple-400">'Content-Type': <span className="text-green-400">'application/json'</span></div>
                  <div className="ml-4 text-white">{`}`}</div>
                  <div className="text-white">{`});`}</div>
                </div>
              </div>

              <div id="sdks" className="mb-12">
                <h2 className="text-2xl font-normal mb-6 text-gray-900">Accounting & Finance Endpoints</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '5px'}}>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Accounts Payable</h3>
                    <div className="space-y-2 text-sm">
                      {[
                        { method: "GET", path: "/v1/ap/bills" },
                        { method: "POST", path: "/v1/ap/payments" },
                        { method: "GET", path: "/v1/ap/vendors" },
                        { method: "PUT", path: "/v1/ap/bills/:id" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 hover:bg-gray-50" style={{borderRadius: '5px'}}>
                          <span className={`text-xs px-2 py-1 ${
                            item.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                            item.method === 'POST' ? 'bg-green-100 text-green-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>{item.method}</span>
                          <span className="font-mono text-xs text-gray-900">{item.path}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '5px'}}>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Accounts Receivable</h3>
                    <div className="space-y-2 text-sm">
                      {[
                        { method: "GET", path: "/v1/ar/invoices" },
                        { method: "POST", path: "/v1/ar/receipts" },
                        { method: "GET", path: "/v1/ar/customers" },
                        { method: "PUT", path: "/v1/ar/invoices/:id" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 hover:bg-gray-50" style={{borderRadius: '5px'}}>
                          <span className={`text-xs px-2 py-1 ${
                            item.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                            item.method === 'POST' ? 'bg-green-100 text-green-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>{item.method}</span>
                          <span className="font-mono text-xs text-gray-900">{item.path}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '5px'}}>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">General Ledger</h3>
                    <div className="space-y-2 text-sm">
                      {[
                        { method: "GET", path: "/v1/gl/accounts" },
                        { method: "POST", path: "/v1/gl/journal-entries" },
                        { method: "GET", path: "/v1/gl/trial-balance" },
                        { method: "GET", path: "/v1/gl/chart-of-accounts" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 hover:bg-gray-50" style={{borderRadius: '5px'}}>
                          <span className={`text-xs px-2 py-1 ${
                            item.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>{item.method}</span>
                          <span className="font-mono text-xs text-gray-900">{item.path}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '5px'}}>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Inventory Management</h3>
                    <div className="space-y-2 text-sm">
                      {[
                        { method: "GET", path: "/v1/inventory/items" },
                        { method: "POST", path: "/v1/inventory/adjustments" },
                        { method: "GET", path: "/v1/inventory/stock-levels" },
                        { method: "PUT", path: "/v1/inventory/items/:id" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 hover:bg-gray-50" style={{borderRadius: '5px'}}>
                          <span className={`text-xs px-2 py-1 ${
                            item.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                            item.method === 'POST' ? 'bg-green-100 text-green-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>{item.method}</span>
                          <span className="font-mono text-xs text-gray-900">{item.path}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-8 mb-12" style={{borderRadius: '5px'}}>
                <h2 className="text-2xl font-normal mb-6 text-white">Invoice Creation Example</h2>
                <div className="bg-gray-800 p-6 font-mono text-sm overflow-x-auto" style={{borderRadius: '5px'}}>
                  <div className="text-gray-400 mb-2">// POST /v1/ar/invoices</div>
                  <div className="text-white">{`{`}</div>
                  <div className="ml-4 text-purple-400">"customer_id": <span className="text-green-400">"CUST-001"</span>,</div>
                  <div className="ml-4 text-purple-400">"invoice_date": <span className="text-green-400">"2025-01-15"</span>,</div>
                  <div className="ml-4 text-purple-400">"due_date": <span className="text-green-400">"2025-02-15"</span>,</div>
                  <div className="ml-4 text-purple-400">"line_items": [</div>
                  <div className="ml-8 text-white">{`{`}</div>
                  <div className="ml-12 text-blue-400">"description": <span className="text-green-400">"Professional Services"</span>,</div>
                  <div className="ml-12 text-blue-400">"quantity": <span className="text-yellow-400">10</span>,</div>
                  <div className="ml-12 text-blue-400">"unit_price": <span className="text-yellow-400">150.00</span>,</div>
                  <div className="ml-12 text-blue-400">"tax_rate": <span className="text-yellow-400">0.10</span></div>
                  <div className="ml-8 text-white">{`}`}</div>
                  <div className="ml-4 text-purple-400">],</div>
                  <div className="ml-4 text-purple-400">"currency": <span className="text-green-400">"USD"</span></div>
                  <div className="text-white">{`}`}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '5px'}}>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Python SDK</h3>
              <div className="bg-gray-50 p-4 font-mono text-xs mb-3" style={{borderRadius: '5px'}}>
                <div className="text-gray-600">pip install pryro-sdk</div>
              </div>
              <div className="bg-gray-900 p-8 font-mono text-xs" style={{borderRadius: '5px'}}>
                <div className="text-blue-400">from</div> <span className="text-white">pryro </span><span className="text-blue-400">import</span> <span className="text-white">Client</span>
                <div className="text-white mt-2">client = Client(api_key)</div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '5px'}}>
              <h3 className="text-lg font-medium mb-3 text-gray-900">JavaScript SDK</h3>
              <div className="bg-gray-50 p-4 font-mono text-xs mb-3" style={{borderRadius: '5px'}}>
                <div className="text-gray-600">npm install @pryro/sdk</div>
              </div>
              <div className="bg-gray-900 p-8 font-mono text-xs" style={{borderRadius: '5px'}}>
                <div className="text-blue-400">import</div> <span className="text-white">Pryro </span><span className="text-blue-400">from</span> <span className="text-green-400">'@pryro/sdk'</span>
                <div className="text-white mt-2">const pryro = new Pryro()</div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '5px'}}>
              <h3 className="text-lg font-medium mb-3 text-gray-900">Ruby SDK</h3>
              <div className="bg-gray-50 p-4 font-mono text-xs mb-3" style={{borderRadius: '5px'}}>
                <div className="text-gray-600">gem install pryro</div>
              </div>
              <div className="bg-gray-900 p-8 font-mono text-xs" style={{borderRadius: '5px'}}>
                <div className="text-blue-400">require</div> <span className="text-green-400">'pryro'</span>
                <div className="text-white mt-2">client = Pryro::Client.new</div>
              </div>
            </div>
          </div>

              <div id="rate-limits" className="mb-12">
                <h2 className="text-2xl font-normal mb-6 text-gray-900">Financial Reports API</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '5px'}}>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Financial Statements</h3>
                    <div className="space-y-2 text-sm">
                      {[
                        { method: "GET", path: "/v1/reports/balance-sheet" },
                        { method: "GET", path: "/v1/reports/income-statement" },
                        { method: "GET", path: "/v1/reports/cash-flow" },
                        { method: "GET", path: "/v1/reports/profit-loss" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 hover:bg-gray-50" style={{borderRadius: '5px'}}>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700" style={{borderRadius: '5px'}}>{item.method}</span>
                          <span className="font-mono text-xs text-gray-900">{item.path}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '5px'}}>
                    <h3 className="text-lg font-medium mb-4 text-gray-900">Tax & Compliance</h3>
                    <div className="space-y-2 text-sm">
                      {[
                        { method: "GET", path: "/v1/tax/vat-report" },
                        { method: "GET", path: "/v1/tax/sales-tax" },
                        { method: "POST", path: "/v1/tax/filing" },
                        { method: "GET", path: "/v1/compliance/audit-trail" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 hover:bg-gray-50" style={{borderRadius: '5px'}}>
                          <span className={`text-xs px-2 py-1 ${
                            item.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>{item.method}</span>
                          <span className="font-mono text-xs text-gray-900">{item.path}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 p-8" style={{borderRadius: '5px'}}>
              <h2 className="text-2xl font-normal mb-6 text-gray-900">Rate Limits</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50" style={{borderRadius: '5px'}}>
                  <span className="text-gray-700">Free Tier</span>
                  <span className="font-mono text-sm text-gray-900">1,000 req/day</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50" style={{borderRadius: '5px'}}>
                  <span className="text-gray-700">Pro Tier</span>
                  <span className="font-mono text-sm text-gray-900">100,000 req/day</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50" style={{borderRadius: '5px'}}>
                  <span className="text-gray-700">Enterprise</span>
                  <span className="font-mono text-sm text-gray-900">Unlimited</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8" style={{borderRadius: '5px'}}>
              <h2 className="text-2xl font-normal mb-6 text-gray-900">Response Codes</h2>
              <div className="space-y-3">
                {[
                  { code: "200", desc: "Success", color: "text-green-700" },
                  { code: "400", desc: "Bad Request", color: "text-orange-700" },
                  { code: "401", desc: "Unauthorized", color: "text-red-700" },
                  { code: "429", desc: "Rate Limit Exceeded", color: "text-purple-700" },
                  { code: "500", desc: "Server Error", color: "text-red-700" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors" style={{borderRadius: '5px'}}>
                    <span className={`font-mono text-sm font-medium ${item.color}`}>{item.code}</span>
                    <span className="text-gray-700">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
              </div>

              <div id="errors" className="bg-gray-900 p-8 mb-12" style={{borderRadius: '5px'}}>
            <h2 className="text-2xl font-normal mb-6 text-white">Error Handling</h2>
            <div className="bg-gray-800 p-6 font-mono text-sm overflow-x-auto" style={{borderRadius: '5px'}}>
              <div className="text-gray-400 mb-2">// Error Response Format</div>
              <div className="text-white">{`{`}</div>
              <div className="ml-4 text-purple-400">"error": {`{`}</div>
              <div className="ml-8 text-blue-400">"code": <span className="text-green-400">"INVALID_REQUEST"</span>,</div>
              <div className="ml-8 text-blue-400">"message": <span className="text-green-400">"Missing required parameter"</span>,</div>
              <div className="ml-8 text-blue-400">"details": <span className="text-green-400">"Field 'email' is required"</span></div>
              <div className="ml-4 text-purple-400">{`}`}</div>
              <div className="text-white">{`}`}</div>
            </div>
              </div>

              <div className="bg-white border border-gray-200 p-8 mb-12" style={{borderRadius: '5px'}}>
                <h2 className="text-2xl font-normal mb-6 text-gray-900">Changelog & Updates</h2>
                <div className="space-y-6">
                  {[
                    { date: "Jan 15, 2025", version: "v1.8.0", changes: ["Added bulk invoice creation endpoint", "Improved tax calculation accuracy", "New webhook events for inventory updates"] },
                    { date: "Dec 20, 2024", version: "v1.7.5", changes: ["Enhanced rate limiting for enterprise tier", "Fixed pagination issue in ledger endpoints", "Added support for multi-currency transactions"] },
                    { date: "Nov 30, 2024", version: "v1.7.0", changes: ["Launched Financial Reports API", "OAuth 2.0 authentication now available", "Deprecated v0.9 endpoints (sunset: March 2025)"] }
                  ].map((item, i) => (
                    <div key={i} className="border-l-4 border-gray-900 pl-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-gray-900">{item.version}</span>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <ul className="space-y-1">
                        {item.changes.map((change, j) => (
                          <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-gray-400 mt-1">ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-normal mb-4 text-gray-900">Ready to integrate?</h3>
                <p className="text-gray-600 mb-6">Get your API key and start building in minutes</p>
                <a href="/demo" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors">
                  <span>Get API Access</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  )
}
