"use client"

import { Button } from "@/components/ui/button"
import { SimpleFooter } from "@/components/simple-footer"
import { Header } from "@/components/header"
import { MapPin, ChevronDown } from "lucide-react"
import { useState } from "react"

const jobOpenings = [
  { title: "Senior Full Stack Engineer", location: "Kigali, Rwanda", description: "Build scalable ERP solutions using React, Node.js, and cloud technologies. 3+ years experience required." },
  { title: "Product Manager", location: "Toronto, Canada", description: "Lead product strategy and roadmap. Experience in B2B SaaS preferred." },
  { title: "DevOps Engineer", location: "New York, US", description: "Manage infrastructure and CI/CD pipelines. AWS/Azure experience required." },
  { title: "UX/UI Designer", location: "Kigali, Rwanda", description: "Create intuitive user experiences. Portfolio showcasing enterprise software design required." },
  { title: "Sales Executive", location: "San Francisco, US", description: "Drive revenue growth with enterprise clients. 2+ years B2B sales experience." },
  { title: "Customer Success Manager", location: "Vancouver, Canada", description: "Ensure customer satisfaction and product adoption. Strong communication skills required." }
]

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  const handleApply = (job: typeof jobOpenings[0]) => {
    const subject = `Application for ${job.title}`
    const body = `Hi,

I would like to apply for the ${job.title} position in ${job.location}.

Please find my resume attached.`
    const mailtoLink = `mailto:careers@pryro.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_self')
  }
  return (
    <div className="min-h-screen bg-white text-[#0f1117] overflow-x-hidden">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us build the future of business software
          </p>
        </div>
      </section>



      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Open Positions</h2>
          
          <div className="space-y-4">
            {jobOpenings.map((job, i) => (
              <div key={i} className="border border-gray-200 rounded-lg hover:border-gray-400 transition overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedJob === i ? 'rotate-180' : ''}`} />
                </div>
                
                {expandedJob === i && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <p className="text-gray-600 text-sm mt-3 mb-4">{job.description}</p>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleApply(job)
                      }}
                      className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-4 py-2 h-9"
                    >
                      Apply via Email
                    </Button>
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
