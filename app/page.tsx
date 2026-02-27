"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { PawPrint, Trees, Satellite, Menu, X, Youtube, Instagram, ChevronDown, ListTodo, Clock, FileText, BarChart3, Receipt, Wallet, TrendingUp, Plug } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedText } from "@/components/animated-text"
import { CustomDroneIcon } from "@/components/drone-icon"
import { WorldMap } from "@/components/world-map"
import { experiences } from "@/lib/experience-data"
import type { Experience } from "@/lib/experience-data"

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numericStr = value.replace(/[^0-9.]/g, "")
          const targetNum = Number.parseFloat(numericStr)
          const unit = value.replace(/[0-9.]/g, "")

          let current = 0
          const increment = targetNum / 60
          const interval = setInterval(() => {
            current += increment
            if (current >= targetNum) {
              setDisplayValue(`${targetNum}${unit}`)
              clearInterval(interval)
            } else {
              setDisplayValue(`${current.toFixed(1)}${unit}`.replace(".0", ""))
            }
          }, 16)

          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="text-8xl" ref={ref}>
      {displayValue}
    </div>
  )
}

export default function TerraPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [imageFade, setImageFade] = useState(true)
  const [autoRotationKey, setAutoRotationKey] = useState(0)
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0)
  const [wordFade, setWordFade] = useState(true)
  const [dashboardScrollOffset, setDashboardScrollOffset] = useState(0)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [selectedDevice, setSelectedDevice] = useState(0)
  const [imageScale, setImageScale] = useState(1)
  const [pricingToggle, setPricingToggle] = useState("annually")
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % 7)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  const dashboardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)

  const dynamicWords = ["forests", "nature", "animals", "ecosystems", "biodiversity", "wildlife", "habitats"]

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordFade(false)
      setTimeout(() => {
        setDynamicWordIndex((prev) => (prev + 1) % dynamicWords.length)
        setWordFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(wordInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (dashboardRef.current) {
        const dashboardRect = dashboardRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        const rotationStart = viewportHeight * 0.8
        const rotationEnd = viewportHeight * 0.2

        if (dashboardRect.top >= rotationStart) {
          setDashboardScrollOffset(0)
        } else if (dashboardRect.top <= rotationEnd) {
          setDashboardScrollOffset(15)
        } else {
          const scrollRange = rotationStart - rotationEnd
          const currentProgress = rotationStart - dashboardRect.top
          const rotationProgress = currentProgress / scrollRange
          const tiltAngle = rotationProgress * 15
          setDashboardScrollOffset(tiltAngle)
        }
      }

      if (imageRef.current) {
        const imageRect = imageRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const imageCenter = imageRect.top + imageRect.height / 2
        const viewportCenter = viewportHeight / 2
        const distance = Math.abs(imageCenter - viewportCenter)
        const maxDistance = viewportHeight / 2
        const scale = 1 + (1 - Math.min(distance / maxDistance, 1)) * 0.1
        setImageScale(scale)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const featuresCount = 4

    const interval = setInterval(() => {
      setImageFade(false)
      setTimeout(() => {
        setSelectedFeature((prev) => (prev + 1) % featuresCount)
        setImageFade(true)
      }, 300)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoRotationKey])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-white text-[#0f1117] overflow-x-hidden">
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-black/10 backdrop-blur-md bg-white/80 rounded-[20px]">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
            >
              <img src="/pryro logo.png" alt="Pryro" className="h-8 w-auto" />
            </button>

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("metrics")}
                className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300"
              >
                Impact
              </button>
              <button
                onClick={() => scrollToSection("map")}
                className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("narrative")}
                className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300"
              >
                Technology
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("cta")}
                className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300"
              >
                Join us
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-auto p-2 hover:bg-black/5 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-start justify-end pb-20 pt-20 px-6">
          <div className="flex flex-col gap-8 items-start text-left w-full">
            <button
              onClick={() => scrollToSection("metrics")}
              className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300"
            >
              Impact
            </button>
            <button
              onClick={() => scrollToSection("map")}
              className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("narrative")}
              className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300"
            >
              Technology
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300"
            >
              Join us
            </button>
          </div>
        </div>
      )}

      <section
        ref={heroRef}
        className={`relative min-h-[120vh] flex flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isLoaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
        style={{
          background: "linear-gradient(to bottom, #1E40AF 0%, #2563EB 10%, #3B82F6 25%, #60A5FA 40%, #93C5FD 55%, #DBEAFE 75%, #FFFFFF 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none" />

        <div
          className="max-w-[1120px] w-full mx-auto relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-serif text-[44px] leading-[1.1] md:text-[72px] md:leading-[1.05] font-medium mb-6 text-balance">
              <span
                className={`block stagger-reveal text-7xl font-light transition-all duration-500 md:text-8xl text-white ${
                  wordFade ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                }`}
                style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)" }}
              >
                Protect <AnimatedText key={dynamicWordIndex} text={dynamicWords[dynamicWordIndex]} delay={0} />
              </span>
              <span className="block stagger-reveal text-7xl font-light md:text-8xl text-white" style={{ animationDelay: "90ms", textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)" }}>
                at scale
              </span>
            </h1>
            <p
              className="text-white text-base md:text-lg max-w-[520px] mx-auto mb-8 leading-relaxed stagger-reveal"
              style={{ animationDelay: "180ms", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              Real-time forest monitoring with AI. Detect threats, track biodiversity, preserve nature for future
              generations.
            </p>
            <div className="stagger-reveal" style={{ animationDelay: "270ms" }}>
              <Button className="glass-button px-8 py-6 text-base rounded-full bg-white border border-white hover:bg-white/90 hover:border-white/90 transition-all duration-300 text-gray-900">
                Start Protecting
              </Button>
            </div>
          </div>

          <div className="mt-12 md:mt-20 stagger-reveal" style={{ animationDelay: "360ms" }} ref={dashboardRef}>
            <div style={{ perspective: "1200px" }}>
              <div
                className="relative aspect-[16/10] md:aspect-[16/9] rounded-[24px] overflow-hidden"
                style={{
                  transform: `rotateX(${dashboardScrollOffset}deg)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.05s linear",
                }}
              >
                <img
                  src="/dashboard-screenshot.png"
                  alt="Acme Inc. Analytics Dashboard"
                  className="object-cover dashboard-image w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 border-y border-black/5 bg-white overflow-hidden md:py-8 md:pt-8 md:pb-4">
        <div className="w-full">
          <p className="text-center text-xs md:text-sm uppercase tracking-[0.2em] text-[#4a5568] mb-8">
            Trusted by leading conservation organizations
          </p>
          <div className="logo-marquee">
            <div className="logo-marquee-content">
              {[
                "/logos/frame-11.png",
                "/logos/frame-55.png",
                "/logos/frame-4.png",
                "/logos/frame-6.png",
                "/logos/frame-8.png",
                "/logos/frame-2.png",
                "/logos/frame-3.png",
                "/logos/frame-7.png",
                "/logos/frame-11.png",
                "/logos/frame-55.png",
                "/logos/frame-4.png",
                "/logos/frame-6.png",
                "/logos/frame-8.png",
                "/logos/frame-2.png",
                "/logos/frame-3.png",
                "/logos/frame-7.png",
              ].map((logo, i) => (
                <div key={i} className="px-8 md:px-12 flex items-center justify-center flex-shrink-0">
                  <img
                    src={logo || "/placeholder.svg"}
                    alt={`Partner logo ${i + 1}`}
                    className="h-32 md:h-24 w-auto object-contain opacity-60 hover:opacity-60 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="metrics" className="relative py-20 md:py-32 px-4 animate-on-scroll md:pt-24 md:pb-20">
        <div className="max-w-[1120px] w-full mx-auto">
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 md:mb-8 text-center text-balance">
            Conservation{" "}
            <span
              className="inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, #3B82F6 0%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Impact
            </span>{" "}
            at Scale
          </h2>

          <p className="text-[#4a5568] text-sm md:text-base mb-12 md:mb-16 text-center max-w-[600px] mx-auto leading-relaxed">
            Trusted by conservation organizations worldwide. Powered by nature-first technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[800px] mx-auto">
            {[
              { label: "FORESTS PROTECTED", value: "2.4M", desc: "hectares globally", color: "pink" },
              { label: "SPECIES MONITORED", value: "12K+", desc: "wildlife species", color: "purple" },
              { label: "CARBON SEQUESTERED", value: "18M", desc: "tons CO2", color: "pink" },
              { label: "THREAT DETECTION", value: "99.4%", desc: "accuracy rate", color: "purple" },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-6 md:p-10 text-center border border-black/10 border-t-0 border-b border-l-0 border-r-0 md:py-10 md:pb-20"
              >
                <div
                  className={`text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-4 flex items-center justify-center gap-2`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${metric.color === "pink" ? "bg-pink-400/60" : "bg-purple-400/60"}`}
                  />
                  {metric.label}
                </div>
                <div className="font-serif text-[48px] md:text-[72px] leading-none font-medium">
                  <AnimatedCounter value={metric.value} />
                </div>
                <div className="text-[11px] md:text-xs text-[#4a5568] mt-3">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-4">SEAMLESS ACROSS DEVICES</div>
            <h2 className="text-[32px] md:text-[48px] font-bold mb-6 leading-tight text-gray-900">
              Work from anywhere,<br />stay in sync
            </h2>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="rounded-[32px] overflow-hidden relative">
              <div className="relative w-full">
                <img
                  src="/image switch 1.png"
                  alt="Mobile App"
                  className={`w-full h-auto object-cover transition-transform duration-500 ease-in-out ${
                    selectedDevice === 0 ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{ position: selectedDevice === 0 ? "relative" : "absolute", top: 0, left: 0 }}
                />
                <img
                  src="/image switch 2.png"
                  alt="Web App"
                  className={`w-full h-auto object-cover transition-transform duration-500 ease-in-out ${
                    selectedDevice === 1 ? "translate-x-0" : "translate-x-full"
                  }`}
                  style={{ position: selectedDevice === 1 ? "relative" : "absolute", top: 0, left: 0 }}
                />
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 bg-transparent backdrop-blur-sm rounded-full p-2">
                <button
                  onClick={() => setSelectedDevice(0)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selectedDevice === 0
                      ? "bg-white text-gray-900"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Mobile App
                </button>
                <button
                  onClick={() => setSelectedDevice(1)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selectedDevice === 1
                      ? "bg-white text-gray-900"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Web App
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 px-4 animate-on-scroll bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 items-stretch">
            {/* Left - Card */}
            <div className="rounded-[32px] p-8 md:p-12 flex items-center justify-center min-h-[600px]" style={{ background: "linear-gradient(to bottom, #3B82F6 0%, #60A5FA 30%, #DBEAFE 60%, #FFFFFF 100%)" }}>
              <div className="bg-white rounded-[24px] p-8 shadow-lg w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Projects</h3>
                  <button className="text-sm text-gray-600">View</button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Amazon Rainforest", status: "Active", progress: 85 },
                    { name: "Congo Basin", status: "Active", progress: 72 },
                    { name: "Borneo Forest", status: "Planning", progress: 45 },
                    { name: "Pacific Northwest", status: "Active", progress: 90 },
                  ].map((project, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                      <div className="flex-1">
                        <div className="text-base font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{project.status}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-base font-medium text-gray-700">{project.progress}%</span>
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Text */}
            <div className="flex flex-col justify-center min-h-[600px]">
              <div className="text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-4">PROJECT MANAGEMENT</div>
              <h2 className="text-[32px] md:text-[42px] font-bold mb-6 leading-tight text-gray-900">
                Keep every project moving forward
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                Plan, organize, and collaborate your work - all in one place. Track progress, manage resources, and achieve your conservation goals.
              </p>
              <div className="mb-8">
                <Button className="bg-gray-900 text-white px-8 py-6 rounded-full text-base hover:bg-gray-800 transition-all">
                  Get Started
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {[
                  { label: "Tasks", icon: ListTodo },
                  { label: "Time tracking", icon: Clock },
                  { label: "Timesheets", icon: FileText },
                  { label: "Reports", icon: BarChart3 },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-3">
                    <feature.icon className="w-4 h-4" />
                    {feature.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            {/* Left - Text */}
            <div className="flex flex-col justify-center min-h-[600px]">
              <div className="text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-4">FINANCIAL MANAGEMENT</div>
              <h2 className="text-[32px] md:text-[42px] font-bold mb-6 leading-tight text-gray-900">
                Track income, get paid, stress less
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                Create detailed invoices, track payments, and monitor your conservation project finances. Keep track of your project, membership, and donor funds all in one place.
              </p>
              <div className="mb-8">
                <Button className="bg-gray-900 text-white px-8 py-6 rounded-full text-base hover:bg-gray-800 transition-all">
                  Get Started
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {[
                  { label: "Invoicing", icon: Receipt },
                  { label: "Budgets", icon: Wallet },
                  { label: "Forecasting", icon: TrendingUp },
                  { label: "Integrations", icon: Plug },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-3">
                    <feature.icon className="w-4 h-4" />
                    {feature.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Card */}
            <div className="rounded-[32px] p-8 md:p-12 flex items-center justify-center min-h-[600px]" style={{ background: "linear-gradient(to bottom, #3B82F6 0%, #60A5FA 30%, #DBEAFE 60%, #FFFFFF 100%)" }}>
              <div className="bg-white rounded-[24px] p-8 shadow-lg w-full max-w-md">
                <div className="mb-8">
                  <h3 className="text-base font-semibold text-gray-700 mb-6">Project budget</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-5">
                      <div className="text-xs text-gray-500 mb-2">Total Budget</div>
                      <div className="text-2xl font-bold text-gray-900">$78,000</div>
                      <div className="text-xs text-green-600 mt-2">↑ 12.5%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-5">
                      <div className="text-xs text-gray-500 mb-2">Spent</div>
                      <div className="text-2xl font-bold text-gray-900">$22,000</div>
                      <div className="text-xs text-gray-500 mt-2">28.2%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-6">Analytics</h3>
                  <div className="h-40 bg-gradient-to-br from-blue-50 to-white rounded-lg flex items-end justify-around p-4">
                    {[40, 65, 45, 80, 60, 90].map((height, i) => (
                      <div key={i} className="w-10 bg-blue-500 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="map" className="relative py-20 md:py-32 animate-on-scroll bg-white">
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            GLOBAL REACH
          </div>
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
            Conservation Projects Worldwide
          </h2>
          <p className="text-[#4a5568] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
            Monitoring and protecting critical forest ecosystems across five continents
          </p>
        </div>

        <WorldMap
          experiences={experiences}
          selectedExperience={selectedExperience}
          onSelectExperience={setSelectedExperience}
        />
      </section>

      <section id="narrative" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            <div className="max-w-[720px]">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                CONSERVATION TECHNOLOGY
              </div>
              <h2 className="font-serif text-[36px] leading-[1.15] md:text-[56px] md:leading-[1.1] font-medium mb-8 text-balance">
                Every forest ecosystem{" "}
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  matters
                </span>
              </h2>
              <p className="text-[#4a5568] text-base md:text-lg leading-relaxed mb-12">
                Our satellite and AI technology monitors biodiversity, detects illegal logging, tracks deforestation
                patterns, and alerts teams in real-time. Preservation at the speed of nature demands.
              </p>

              <div className="md:hidden mb-8">
                <div className="rounded-[24px] p-1 w-full aspect-square overflow-hidden">
                  <img
                    src={
                      [
                        "/drone.png",
                        "/real-time-satellite.png",
                        "/biodiversity-tracking.png",
                        "/deforestation-detect.png",
                      ][selectedFeature] || "/placeholder.svg"
                    }
                    alt="Feature preview"
                    className={`w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
                      imageFade ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Drone Surveys",
                    desc: "Aerial surveys to catalog wildlife and species diversity",
                    icon: CustomDroneIcon,
                    image: "/drone.png",
                  },
                  {
                    title: "Real-time Monitoring",
                    desc: "24/7 satellite surveillance with instant alerts",
                    icon: Satellite,
                    image: "/real-time-satellite.png",
                  },
                  {
                    title: "Biodiversity Tracking",
                    desc: "Map and monitor wildlife populations across regions",
                    icon: PawPrint,
                    image: "/biodiversity-tracking.png",
                  },
                  {
                    title: "Deforestation Prevention",
                    desc: "Detect threats before they escalate",
                    icon: Trees,
                    image: "/deforestation-detect.png",
                  },
                ].map((feature, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setImageFade(false)
                      setTimeout(() => {
                        setSelectedFeature(i)
                        setImageFade(true)
                        setAutoRotationKey((prev) => prev + 1)
                      }, 300)
                    }}
                    className={`relative w-full text-left flex gap-4 items-start p-5 transition-all duration-300 rounded-xs py-4 overflow-hidden ${
                      selectedFeature === i ? "border border-black/20" : "border border-black/10"
                    }`}
                  >
                    <feature.icon
                      className={`w-6 h-6 flex-shrink-0 mt-1 transition-colors ${
                        selectedFeature === i ? "text-green-400" : "text-green-500/60"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm md:text-base text-[#4a5568]">{feature.desc}</p>
                    </div>
                    {selectedFeature === i && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/10">
                        <div className="h-full bg-gray-900 progress-bar" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-stretch justify-center">
              <div className="relative w-full h-full min-h-[500px]">
                {[
                  {
                    title: "Drone Surveys",
                    image: "/drone.png",
                  },
                  {
                    title: "Real-time Monitoring",
                    image: "/real-time-satellite.png",
                  },
                  {
                    title: "Biodiversity Tracking",
                    image: "/biodiversity-tracking.png",
                  },
                  {
                    title: "Deforestation Prevention",
                    image: "/deforestation-detect.png",
                  },
                ].map((feature, i) => {
                  const positionInStack = (i - selectedFeature + 4) % 4
                  const isActive = positionInStack === 0

                  return (
                    <div
                      key={i}
                      className="absolute inset-0 p-1 transition-all duration-600 ease-out"
                      style={{
                        zIndex: 4 - positionInStack,
                        transform: `translateX(${positionInStack * 16}px) scale(${1 - positionInStack * 0.02})`,
                        opacity: isActive ? (imageFade ? 1 : 1) : 0.6 - positionInStack * 0.15,
                      }}
                    >
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        className="w-full h-full object-cover rounded-[20px]"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[800px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Got{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                questions
              </span>
              ?
            </h2>
            <p className="text-[#4a5568] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
              Everything you need to know about TERRA and our conservation technology platform.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How does TERRA's satellite monitoring work?",
                answer:
                  "Our platform uses a network of satellites combined with AI algorithms to analyze forest coverage in real-time. We detect changes as small as 0.5 hectares within 24 hours, allowing for rapid response to threats like illegal logging or forest fires.",
              },
              {
                question: "What regions does TERRA currently cover?",
                answer:
                  "TERRA currently monitors over 2.4 million hectares across five continents, including the Amazon rainforest, Congo Basin, Borneo, Russian Taiga, and Pacific Northwest. We're continuously expanding our coverage to protect more critical ecosystems.",
              },
              {
                question: "How accurate is the threat detection system?",
                answer:
                  "Our AI-powered threat detection achieves a 99.4% accuracy rate. We use machine learning models trained on millions of satellite images to distinguish between natural changes and human-caused deforestation or illegal activities.",
              },
              {
                question: "Can organizations integrate TERRA with their existing systems?",
                answer:
                  "Yes, TERRA offers a comprehensive API that allows seamless integration with existing conservation management systems, GIS platforms, and alert systems. Our documentation provides detailed guides for implementation.",
              },
              {
                question: "What is the pricing model for TERRA?",
                answer:
                  "We offer tiered pricing based on coverage area and feature requirements. Non-profit conservation organizations may qualify for discounted rates or grants. Contact our team for a customized quote based on your needs.",
              },
              {
                question: "How can I contribute to forest conservation through TERRA?",
                answer:
                  "There are several ways to contribute: donate to support monitoring of unprotected regions, volunteer for on-ground verification teams, or partner with us as a corporate sponsor. Every contribution helps protect critical ecosystems.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-black/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-black/20"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base md:text-lg font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#4a5568] transition-transform duration-300 ${
                      openFaqIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-sm md:text-base text-[#4a5568] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative py-20 md:py-32 px-4 animate-on-scroll bg-gray-50">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-4">PRICING</div>
            <h2 className="text-[32px] md:text-[48px] font-bold mb-6 leading-tight text-gray-900">
              Simple plans<br />for serious work
            </h2>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-full p-1 border border-gray-200">
              <button onClick={() => setPricingToggle("annually")} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${pricingToggle === "annually" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"}`}>Annually</button>
              <button onClick={() => setPricingToggle("monthly")} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${pricingToggle === "monthly" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"}`}>Monthly</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border border-gray-200">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Dreelio Basic</div>
                <div className="text-4xl font-bold mb-2">Free</div>
                <div className="text-sm text-gray-600">For solo use with light needs.</div>
              </div>
              <div className="space-y-3 mb-8">
                {['Unlimited projects', 'Unlimited users', 'Time tracking', 'CRM', 'iOS & Android app'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {feature}
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-all">Try Freelio free</button>
            </div>

            <div className="bg-blue-100 rounded-3xl p-8 border-2 border-blue-400 relative">
              <div className="absolute top-4 right-4 bg-green-400 text-xs font-medium px-3 py-1 rounded-full">Save 20%</div>
              <div className="mb-6">
                <div className="text-sm text-gray-700 mb-2">Dreelio Premium</div>
                <div className="text-4xl font-bold mb-2">$189/mo</div>
                <div className="text-sm text-gray-700">For pro use with light needs.</div>
              </div>
              <div className="space-y-3 mb-8">
                {['Everything in Basic', 'Invoices & payments', 'Expense tracking', 'Income tracking', 'Scheduling'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {feature}
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all">Get started</button>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Dreelio Enterprise</div>
                <div className="text-4xl font-bold mb-2">Flexible</div>
                <div className="text-sm text-gray-600">For team use with light needs.</div>
              </div>
              <div className="space-y-3 mb-8">
                {['Everything in Premium', 'Custom data import', 'Advanced onboarding', 'Hubspot integration', 'Timesheets'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {feature}
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-all">Contact sales</button>
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-gray-600">Trusted by 7,000+ top startups, freelancers and studios</div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 px-4 animate-on-scroll overflow-hidden bg-gray-50">
        <div className="max-w-[1120px] w-full mx-auto text-center">
          <h2 className="text-[32px] md:text-[48px] font-bold mb-12 leading-tight text-gray-900">
            "TERRA is by far the best<br />conservation tool I have ever used"
          </h2>
          <div className="flex justify-center mb-4">
            <img src="/placeholder-user.jpg" alt="Featured" className="w-16 h-16 rounded-full object-cover" />
          </div>
          <div className="text-base font-medium mb-1">Martha Panta</div>
          <div className="text-sm text-gray-600 mb-16">VP Conservation, WWF</div>

          <div className="relative max-w-6xl mx-auto">
            <div className="flex items-stretch justify-center gap-6">
              {[
                { text: '"Duct-tape tools together. Contracts, time tracking, and invoices in one clean system. It\'s a small team needs to stay organized."', name: 'Kwame Osei', role: 'Founder, Google', avatar: 'https://i.pravatar.cc/150?img=12' },
                { text: '"Managing projects used to mean spreadsheets, DMs, and missed invoices. This platform keeps our workflows tight and our clients impressed."', name: 'Sarah Johnson', role: 'Art Director, Instagram', avatar: 'https://i.pravatar.cc/150?img=47' },
                { text: '"As a fast-moving design team, we needed a tool that matched our pace. From client onboarding to getting paid, this just works clean, fast, and beautifully built."', name: 'Amara Nwosu', role: 'Design Ops Lead, Teamwork', avatar: 'https://i.pravatar.cc/150?img=38' },
                { text: '"Real-time monitoring has transformed how we protect endangered species. The AI detection is incredibly accurate and saves us countless hours."', name: 'Michael Chen', role: 'Wildlife Biologist, National Parks', avatar: 'https://i.pravatar.cc/150?img=33' },
                { text: '"The satellite imagery combined with drone surveys gives us unprecedented visibility into forest health. This is the future of conservation."', name: 'Fatima Diallo', role: 'Forest Manager, Amazon Watch', avatar: 'https://i.pravatar.cc/150?img=45' },
                { text: '"We\'ve reduced illegal logging incidents by 60% since implementing TERRA. The real-time alerts are game-changing for rapid response."', name: 'James Anderson', role: 'Conservation Director, Wildlife Trust', avatar: 'https://i.pravatar.cc/150?img=15' },
                { text: '"From biodiversity tracking to carbon sequestration reporting, everything we need is in one platform. It\'s made our work so much more efficient."', name: 'Chioma Okeke', role: 'Program Lead, Global Forest Alliance', avatar: 'https://i.pravatar.cc/150?img=44' },
              ].map((testimonial, i) => {
                const offset = (i - testimonialIndex + 7) % 7
                const isCenter = offset === 0
                const isLeft = offset === 6
                const isRight = offset === 1
                const isVisible = isCenter || isLeft || isRight
                
                if (!isVisible) return null
                
                return (
                  <div
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className="transition-all duration-500 cursor-pointer flex-shrink-0"
                    style={{
                      width: isCenter ? "400px" : "350px",
                      opacity: isCenter ? 1 : 0.3,
                      transform: isCenter ? "scale(1)" : "scale(0.9)",
                    }}
                  >
                    <div className="bg-white rounded-2xl p-6 text-left h-full flex flex-col">
                      <p className="text-sm text-gray-700 mb-6 leading-relaxed flex-grow">{testimonial.text}</p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{testimonial.name}</div>
                          <div className="text-xs text-gray-600">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${testimonialIndex === i ? "bg-gray-900 w-8" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="cta"
        className="relative py-24 md:py-40 px-4 animate-on-scroll overflow-hidden pt-0"
        style={{
          backgroundImage: `url('/earth-cta.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none" />
        <div className="max-w-[800px] w-full mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-2 rounded-full mb-8 text-xs md:text-sm text-[#4a5568]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Save the world
          </div>

          <h2 className="font-serif text-[40px] leading-[1.15] md:text-[64px] md:leading-[1.1] font-medium mb-6 text-balance">
            Join the global conservation movement
          </h2>
          <p className="text-[#4a5568] text-base md:text-lg mb-10 leading-relaxed max-w-[560px] mx-auto">
            Together, we're building a sustainable future. Start protecting forests today.
          </p>

          <Button className="glass-button text-base rounded-full bg-black/5 border border-black/20 hover:bg-black/15 hover:border-black/30 transition-all duration-300 text-gray-900 px-8 py-6 md:text-base">
            Get Started Today
          </Button>
        </div>
      </section>

      <footer className="relative px-4 py-8 pt-48" style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #DBEAFE 15%, #93C5FD 30%, #60A5FA 45%, #3B82F6 60%, #2563EB 80%, #1E40AF 100%)" }}>
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            {/* Brand Column */}
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold font-mono text-white">TERRA</div>
              <p className="text-xs text-white/80 leading-relaxed">
                Protecting global forests through real-time monitoring and AI technology.
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product Menu */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Product</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Pricing
                </a>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Documentation
                </a>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  API
                </a>
              </div>
            </div>

            {/* Company Menu */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Company</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  About
                </a>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Blog
                </a>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Careers
                </a>
                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Newsletter</div>
              <p className="text-xs text-white/80 mb-3">Get updates on forest conservation insights.</p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-xs text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30 transition-all"
                />
                <button className="px-4 py-2 border rounded-lg text-xs font-medium hover:bg-white/90 transition-all bg-white border-white text-blue-600">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/80">
            <div>© 2025 TERRA. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
