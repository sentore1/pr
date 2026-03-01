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

export default function PryroPage() {
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

  const dynamicWords = ["business", "operations", "workflows", "processes", "everything", "teams", "growth"]

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
                Streamline <AnimatedText key={dynamicWordIndex} text={dynamicWords[dynamicWordIndex]} delay={0} />
              </span>
              <span className="block stagger-reveal text-7xl font-light md:text-8xl text-white" style={{ animationDelay: "90ms", textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)" }}>
                effortlessly
              </span>
            </h1>
            <p
              className="text-white text-base md:text-lg max-w-[520px] mx-auto mb-8 leading-relaxed stagger-reveal"
              style={{ animationDelay: "180ms", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              Complete ERP solution with AI-powered insights. Manage finance, inventory, HR, and operations in one unified platform.
            </p>
            <div className="stagger-reveal" style={{ animationDelay: "270ms" }}>
              <Button className="glass-button px-8 py-6 text-base rounded-full bg-white border border-white hover:bg-white/90 hover:border-white/90 transition-all duration-300 text-gray-900">
                Start Free Trial
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
            Trusted by leading enterprises worldwide
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
            Business{" "}
            <span
              className="inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, #3B82F6 0%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Performance
            </span>{" "}
            at Scale
          </h2>

          <p className="text-[#4a5568] text-sm md:text-base mb-12 md:mb-16 text-center max-w-[600px] mx-auto leading-relaxed">
            Trusted by enterprises worldwide. Powered by intelligent automation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[800px] mx-auto">
            {[
              { label: "ACTIVE USERS", value: "50K+", desc: "worldwide", color: "blue" },
              { label: "TRANSACTIONS PROCESSED", value: "2.4M", desc: "monthly", color: "blue" },
              { label: "COST REDUCTION", value: "35%", desc: "average savings", color: "pink" },
              { label: "UPTIME", value: "99.9%", desc: "reliability", color: "purple" },
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
                    { name: "Q4 Financial Close", status: "Active", progress: 85 },
                    { name: "Inventory Optimization", status: "Active", progress: 72 },
                    { name: "HR System Migration", status: "Planning", progress: 45 },
                    { name: "Sales Dashboard", status: "Active", progress: 90 },
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
                Plan, organize, and collaborate your work - all in one place. Track progress, manage resources, and achieve your business goals.
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
                Create detailed invoices, track payments, and monitor your business finances. Keep track of your revenue, expenses, and cash flow all in one place.
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
            Serving Businesses Worldwide
          </h2>
          <p className="text-[#4a5568] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
            Empowering enterprises across five continents with intelligent ERP solutions
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
                ENTERPRISE TECHNOLOGY
              </div>
              <h2 className="font-serif text-[36px] leading-[1.15] md:text-[56px] md:leading-[1.1] font-medium mb-8 text-balance">
                Every business process{" "}
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  optimized
                </span>
              </h2>
              <p className="text-[#4a5568] text-base md:text-lg leading-relaxed mb-12">
                Our AI-powered ERP platform automates workflows, manages inventory, tracks finances, and provides real-time analytics. Business intelligence at the speed your company demands.
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
                    title: "Financial Management",
                    desc: "Complete accounting, invoicing, and financial reporting",
                    icon: Receipt,
                    image: "/drone.png",
                  },
                  {
                    title: "Real-time Analytics",
                    desc: "24/7 business intelligence with instant insights",
                    icon: BarChart3,
                    image: "/real-time-satellite.png",
                  },
                  {
                    title: "Inventory Management",
                    desc: "Track stock levels and supply chain across locations",
                    icon: ListTodo,
                    image: "/biodiversity-tracking.png",
                  },
                  {
                    title: "HR & Payroll",
                    desc: "Manage employees, attendance, and payroll seamlessly",
                    icon: Clock,
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
                    title: "Financial Management",
                    image: "/drone.png",
                  },
                  {
                    title: "Real-time Analytics",
                    image: "/real-time-satellite.png",
                  },
                  {
                    title: "Inventory Management",
                    image: "/biodiversity-tracking.png",
                  },
                  {
                    title: "HR & Payroll",
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

      <section className="relative py-20 md:py-32 px-4 animate-on-scroll bg-white">
        <div className="max-w-[1200px] w-full mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 md:gap-12 items-start">
            <div className="group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-[28px] md:text-[36px] font-normal leading-tight text-gray-900 flex-1">
                  Financial Management Suite
                </h2>
                <div className="transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 mt-1">
                  <svg className="w-5 h-5 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Complete accounting, invoicing, and financial reporting system. Track revenue, expenses, and cash flow in real-time.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-[48px] p-8 flex items-center justify-center h-[420px] relative overflow-hidden">
              <div className="bg-white rounded-[32px] p-5 w-[85%] h-[70%] flex flex-col">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Revenue Overview</h3>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-500 mb-1">Q4 Revenue</div>
                    <div className="text-base font-bold text-gray-900">$2.4M</div>
                    <div className="text-[10px] text-green-600 mt-1">↑ 18.3%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-500 mb-1">Expenses</div>
                    <div className="text-base font-bold text-gray-900">$1.8M</div>
                    <div className="text-[10px] text-gray-500 mt-1">75.0%</div>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Monthly Trends</h3>
                <div className="flex-1 bg-gradient-to-br from-blue-50 to-white rounded-lg flex items-end justify-around p-2">
                  {[55, 70, 48, 85, 65, 92].map((height, i) => (
                    <div key={i} className="w-5 bg-blue-500 rounded-t" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 md:gap-12 items-start">
            <div className="group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-[28px] md:text-[36px] font-normal leading-tight text-gray-900 flex-1">
                  Inventory Management
                </h2>
                <div className="transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 mt-1">
                  <svg className="w-5 h-5 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Track stock levels, manage suppliers, and optimize supply chain across multiple locations with real-time updates.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-[48px] p-8 flex items-center justify-center h-[420px] relative overflow-hidden">
              <div className="bg-white rounded-[32px] p-5 w-[85%] h-[70%] flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold">Stock Levels</h3>
                  <button className="text-xs text-blue-600">Details</button>
                </div>
                <div className="flex-1 space-y-2 overflow-auto">
                  {[
                    { name: "Raw Materials", stock: 3420, status: "Optimal", color: "green" },
                    { name: "Finished Goods", stock: 1890, status: "Reorder Soon", color: "yellow" },
                    { name: "Components", stock: 5200, status: "Optimal", color: "green" },
                    { name: "Packaging", stock: 780, status: "Critical", color: "red" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-900">{item.name}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{item.status}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-700">{item.stock}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.color === 'green' ? 'bg-green-500' : item.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 md:gap-12 items-start">
            <div className="group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-[28px] md:text-[36px] font-normal leading-tight text-gray-900 flex-1">
                  HR & Payroll System
                </h2>
                <div className="transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 mt-1">
                  <svg className="w-5 h-5 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Manage employees, attendance, payroll processing, and benefits administration all in one unified platform.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-[48px] p-8 flex items-center justify-center h-[420px] relative overflow-hidden">
              <div className="bg-white rounded-[32px] p-5 w-[85%] h-[70%] flex flex-col overflow-hidden">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Workforce Analytics</h3>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-500 mb-1">Active Staff</div>
                    <div className="text-base font-bold text-gray-900">342</div>
                    <div className="text-[10px] text-green-600 mt-1">↑ 12.4%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-500 mb-1">Total Cost</div>
                    <div className="text-base font-bold text-gray-900">$685K</div>
                    <div className="text-[10px] text-gray-500 mt-1">Per Month</div>
                  </div>
                </div>
                <div className="flex-1 space-y-1 overflow-auto">
                  {[
                    { dept: "Technology", count: 128 },
                    { dept: "Marketing", count: 74 },
                    { dept: "Finance", count: 56 },
                    { dept: "Operations", count: 84 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">{item.dept}</span>
                      <span className="font-medium text-gray-900">{item.count}</span>
                    </div>
                  ))}
                </div>
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
              Everything you need to know about our ERP platform and enterprise solutions.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How does the ERP system integrate with existing tools?",
                answer:
                  "Our platform offers seamless integration with popular business tools through REST APIs and pre-built connectors. We support integration with accounting software, CRM systems, e-commerce platforms, and more. Our technical team provides full support during implementation.",
              },
              {
                question: "What industries does the ERP solution support?",
                answer:
                  "Our ERP platform is designed for versatility across industries including manufacturing, retail, healthcare, logistics, professional services, and more. We offer industry-specific modules and can customize workflows to match your business processes.",
              },
              {
                question: "How secure is our business data?",
                answer:
                  "We implement enterprise-grade security with 256-bit encryption, regular security audits, and compliance with SOC 2, GDPR, and ISO 27001 standards. Your data is backed up daily with 99.9% uptime guarantee and stored in secure data centers.",
              },
              {
                question: "Can we customize the ERP to our specific needs?",
                answer:
                  "Yes, our platform is highly customizable. You can configure workflows, create custom fields, design reports, and build automation rules without coding. For advanced customization, our development team can create bespoke modules.",
              },
              {
                question: "What is the implementation timeline?",
                answer:
                  "Implementation typically takes 4-12 weeks depending on company size and complexity. This includes data migration, system configuration, staff training, and testing. We provide dedicated project managers to ensure smooth deployment.",
              },
              {
                question: "What kind of support and training do you provide?",
                answer:
                  "We offer 24/7 customer support via phone, email, and chat. All plans include comprehensive onboarding, video tutorials, documentation, and live training sessions. Enterprise customers get dedicated account managers and priority support.",
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

            <div className="bg-white rounded-3xl p-8 border border-gray-200 relative">
              {pricingToggle === "annually" && <div className="absolute top-4 right-4 bg-green-400 text-xs font-medium px-3 py-1 rounded-full">Save 20%</div>}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Dreelio Premium</div>
                <div className="text-4xl font-bold mb-2 h-12 flex items-center">
                  <span key={pricingToggle} className="inline-block animate-[flip_0.5s_ease-in-out]">
                    {pricingToggle === "annually" ? "$189/mo" : "$229/mo"}
                  </span>
                </div>
                <div className="text-sm text-gray-600">For pro use with light needs.</div>
              </div>
              <div className="space-y-3 mb-8">
                {['Everything in Basic', 'Invoices & payments', 'Expense tracking', 'Income tracking', 'Scheduling'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {feature}
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-all">Get started</button>
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
            "This ERP platform transformed<br />how we run our business"
          </h2>
          <div className="flex justify-center mb-4">
            <img src="/placeholder-user.jpg" alt="Featured" className="w-16 h-16 rounded-full object-cover" />
          </div>
          <div className="text-base font-medium mb-1">Sarah Mitchell</div>
          <div className="text-sm text-gray-600 mb-16">CEO, TechCorp Industries</div>

          <div className="relative max-w-6xl mx-auto">
            <div className="flex items-stretch justify-center gap-6">
              {[
                { text: '"Duct-tape tools together. Contracts, time tracking, and invoices in one clean system. It\'s a small team needs to stay organized."', name: 'Kwame Osei', role: 'Founder, Google', avatar: 'https://i.pravatar.cc/150?img=12' },
                { text: '"Managing projects used to mean spreadsheets, DMs, and missed invoices. This platform keeps our workflows tight and our clients impressed."', name: 'Sarah Johnson', role: 'Art Director, Instagram', avatar: 'https://i.pravatar.cc/150?img=47' },
                { text: '"As a fast-moving design team, we needed a tool that matched our pace. From client onboarding to getting paid, this just works clean, fast, and beautifully built."', name: 'Amara Nwosu', role: 'Design Ops Lead, Teamwork', avatar: 'https://i.pravatar.cc/150?img=38' },
                { text: '"The financial automation has saved us 20+ hours per week. Real-time reporting gives us insights we never had before."', name: 'Michael Chen', role: 'CFO, Global Manufacturing', avatar: 'https://i.pravatar.cc/150?img=33' },
                { text: '"Inventory management across 15 warehouses is now seamless. We\'ve reduced stockouts by 75% and improved cash flow significantly."', name: 'Fatima Diallo', role: 'Operations Director, RetailCo', avatar: 'https://i.pravatar.cc/150?img=45' },
                { text: '"We\'ve cut operational costs by 35% since implementing this ERP. The automation and analytics are game-changing for our business."', name: 'James Anderson', role: 'VP Operations, LogisticsPro', avatar: 'https://i.pravatar.cc/150?img=15' },
                { text: '"From HR to finance to inventory, everything we need is in one platform. It\'s made our entire organization so much more efficient."', name: 'Chioma Okeke', role: 'COO, Enterprise Solutions', avatar: 'https://i.pravatar.cc/150?img=44' },
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
            Transform your business
          </div>

          <h2 className="font-serif text-[40px] leading-[1.15] md:text-[64px] md:leading-[1.1] font-medium mb-6 text-balance">
            Join thousands of successful businesses
          </h2>
          <p className="text-[#4a5568] text-base md:text-lg mb-10 leading-relaxed max-w-[560px] mx-auto">
            Together, we're building smarter enterprises. Start optimizing your operations today.
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
              <div className="text-lg font-semibold font-mono text-white">Pryro</div>
              <p className="text-xs text-white/80 leading-relaxed">
                Empowering businesses worldwide with intelligent ERP solutions and automation.
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
              <p className="text-xs text-white/80 mb-3">Get updates on business optimization insights.</p>
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
            <div>© 2025 Pryro. All rights reserved.</div>
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
