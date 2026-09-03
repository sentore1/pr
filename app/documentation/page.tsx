"use client"

import { SimpleFooter } from "@/components/simple-footer"
import { Header } from "@/components/header"
import { useState } from "react"

export default function DocumentationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [message, setMessage] = useState("")

  const topics = [
    { title: "Installation & Setup", time: "5 min read" },
    { title: "Authentication & Security", time: "8 min read" },
    { title: "Data Migration Guide", time: "12 min read" },
    { title: "Custom Workflows", time: "10 min read" },
    { title: "Reporting & Analytics", time: "7 min read" },
    { title: "Mobile App Configuration", time: "6 min read" }
  ]

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Documentation</h1>
          <p className="text-xl text-gray-600 mb-12">Everything you need to build, integrate, and scale with Pryro</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { 
                title: "Getting Started", 
                desc: "Quick start guides and tutorials",
                link: "/demo"
              },
              { 
                title: "API Reference", 
                desc: "Complete API documentation",
                link: "/demo"
              },
              { 
                title: "Integrations", 
                desc: "Connect with your tools",
                link: "/demo"
              }
            ].map((item, i) => (
              <a key={i} href={item.link} className="group bg-white border border-gray-200 p-8 hover:border-gray-400 transition-all" style={{borderRadius: '5px'}}>
                <h3 className="text-xl font-normal mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <div className="flex items-center text-sm text-gray-900 group-hover:gap-2 transition-all">
                  <span>Request Demo</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-normal mb-8 text-gray-900">Docs Topics</h2>
              <div className="space-y-4">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic, i) => (
                    <button key={i} onClick={() => handleTopicClick(topic.title)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group" style={{borderRadius: '5px'}}>
                      <span className="text-gray-900 group-hover:text-gray-600">{topic.title}</span>
                      <span className="text-sm text-gray-500">{topic.time}</span>
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No topics found matching "{searchQuery}"</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-normal mb-8 text-gray-900">Developer Resources</h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white via-blue-100 to-blue-200 p-8 border border-gray-200" style={{borderRadius: '5px'}}>
                  <h3 className="text-xl font-normal mb-3 text-gray-900">REST API</h3>
                  <p className="text-gray-600 mb-4">200+ endpoints for complete platform control</p>
                  <a href="/api" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 text-sm hover:bg-gray-800 transition-colors" style={{borderRadius: '5px'}}>
                    <span>View API Docs</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                <div className="bg-white p-8 border border-gray-200" style={{borderRadius: '5px'}}>
                  <h3 className="text-xl font-normal mb-3 text-gray-900">SDK Libraries</h3>
                  <p className="text-gray-600 mb-4">Official libraries for popular languages</p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'JavaScript', 'Java', 'Ruby', 'Go', 'PHP'].map((lang, i) => (
                      <span key={i} className="px-4 py-2 bg-gray-100 text-sm text-gray-700" style={{borderRadius: '5px'}}>{lang}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 border border-gray-200" style={{borderRadius: '5px'}}>
                  <h3 className="text-xl font-normal mb-3 text-gray-900">Support</h3>
                  <p className="text-gray-600 mb-4">24/7 enterprise support with 99.9% SLA</p>
                  <a href="/contact" className="text-sm text-gray-900 hover:text-gray-600 transition-colors">Contact Support →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" style={{borderRadius: '5px'}} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-normal text-gray-900">{selectedTopic}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">This documentation section covers everything you need to know about {selectedTopic.toLowerCase()}.</p>
              <h4 className="text-lg font-medium text-gray-900 mt-6 mb-3">Overview</h4>
              <p className="text-gray-600 mb-4">Learn how to implement and configure {selectedTopic.toLowerCase()} in your Pryro environment. This guide provides step-by-step instructions and best practices.</p>
              <h4 className="text-lg font-medium text-gray-900 mt-6 mb-3">Key Features</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Easy integration with existing systems</li>
                <li>Comprehensive configuration options</li>
                <li>Real-time monitoring and analytics</li>
                <li>Enterprise-grade security</li>
              </ul>
              <h4 className="text-lg font-medium text-gray-900 mt-6 mb-3">Getting Started</h4>
              <p className="text-gray-600 mb-4">To begin, ensure you have the necessary permissions and access to your Pryro dashboard. Follow the steps outlined in this guide to complete the setup.</p>
              <div className="bg-blue-500 border border-white p-4 mt-6" style={{borderRadius: '5px'}}>
                <p className="text-sm text-white"><strong>Tip:</strong> For detailed API documentation and code examples, visit our <a href="/api" className="text-black hover:underline">API Reference</a> page.</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Need more information?</h4>
              <form onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:info@pryro.com?subject=${encodeURIComponent(selectedTopic)}&body=${encodeURIComponent(message)}`; setMessage(""); setIsModalOpen(false); }}>
                <textarea 
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors mb-4 resize-none"
                  style={{borderRadius: '5px'}}
                  rows={4}
                />
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 bg-gray-900 text-white px-6 py-3 hover:bg-gray-800 transition-colors" style={{borderRadius: '5px'}}>
                    Send Message
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 border border-gray-300 text-gray-900 px-6 py-3 hover:bg-gray-50 transition-colors" style={{borderRadius: '5px'}}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
