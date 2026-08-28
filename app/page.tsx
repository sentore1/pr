"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { PawPrint, Zap, Package, ShoppingCart, DollarSign, Calendar, Users, Trees, Satellite, Menu, X, Youtube, Instagram, ChevronDown, ListTodo, Clock, FileText, BarChart3, Receipt, Wallet, TrendingUp, Plug, Building2, Briefcase, UserCircle, Boxes, HeartHandshake, Hammer, Truck, Mail, Phone, Bot, Check, Minus, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedText } from "@/components/animated-text"
import { CustomDroneIcon } from "@/components/drone-icon"
import { WorldMap } from "@/components/world-map"
import { experiences } from "@/lib/experience-data"
import type { Experience } from "@/lib/experience-data"

function CardCounter({ target, prefix = "", suffix = "", className = "" }: { target: number; prefix?: string; suffix?: string; className?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1200
          const steps = 60
          const increment = target / steps
          let current = 0
          const interval = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(interval)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.4 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/* Ticks up by 1–2 every second, indefinitely — feels like a live counter */
function LiveCounter({ start, step = 1, intervalMs = 1000, prefix = "", suffix = "" }: {
  start: number
  step?: number
  intervalMs?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timerRef.current) {
          timerRef.current = setInterval(() => {
            setCount(prev => prev + step)
          }, intervalMs)
        }
      },
      { threshold: 0.4 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [step, intervalMs])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/* Randomly increases or decreases by ±range every intervalMs */
function FluctuatingCounter({ start, range = 5, intervalMs = 3000, prefix = "", suffix = "", min = 0, max = Infinity, decimals = 0 }: {
  start: number
  range?: number
  intervalMs?: number
  prefix?: string
  suffix?: string
  min?: number
  max?: number
  decimals?: number
}) {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timerRef.current) {
          timerRef.current = setInterval(() => {
            const change = (Math.random() * (range * 2) - range) // -range to +range
            setCount(prev => {
              const newVal = prev + change
              return Math.min(max, Math.max(min, decimals > 0 ? parseFloat(newVal.toFixed(decimals)) : Math.floor(newVal)))
            })
          }, intervalMs)
        }
      },
      { threshold: 0.4 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [range, intervalMs, min, max, decimals])

  const displayValue = decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

/* Live category breakdown with fluctuating bars and amounts */
function LiveCategoryBreakdown() {
  const [categories, setCategories] = useState([
    { label: "Operations",  amount: 9200,  pct: 42 },
    { label: "Marketing",   amount: 5800,  pct: 26 },
    { label: "Engineering", amount: 4100,  pct: 19 },
    { label: "HR & Admin",  amount: 2900,  pct: 13 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCategories(prev => prev.map(cat => ({
        ...cat,
        amount: Math.max(cat.amount - 500, Math.min(cat.amount + 500, cat.amount + (Math.random() * 400 - 200))),
        pct: Math.max(10, Math.min(50, cat.pct + (Math.random() * 6 - 3)))
      })))
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {categories.map((cat, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 w-20 shrink-0">{cat.label}</span>
          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-in-out" 
              style={{ width: `${Math.floor(cat.pct)}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-600 font-medium w-12 text-right shrink-0">${Math.floor(cat.amount).toLocaleString()}</span>
        </div>
      ))}
    </>
  )
}

/* Animates only last 2 digits of a price like $43.99 */
function FluctuatingPrice({ basePrice }: { basePrice: string }) {
  const parts = basePrice.match(/\$(\d+)\.(\d{2})/)
  if (!parts) return <span>{basePrice}</span>
  
  const dollars = parts[1]
  const centsStart = parseInt(parts[2], 10)
  
  const [cents, setCents] = useState(centsStart)
  const ref = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timerRef.current) {
          timerRef.current = setInterval(() => {
            const change = Math.floor(Math.random() * 21) - 10 // -10 to +10
            setCents(prev => Math.min(99, Math.max(0, prev + change)))
          }, 3000) // every 3s
        }
      },
      { threshold: 0.4 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <span ref={ref}>
      ${dollars}.{cents.toString().padStart(2, '0')}
    </span>
  )
}

/* Live customer table that adds new entries */
function LiveCustomerTable() {
  const newCustomers = [
    { customer: "Sarah Chen",     initials: "SC", status: "Paid" as const },
    { customer: "James Wilson",   initials: "JW", status: "Ref" as const },
    { customer: "Maya Patel",     initials: "MP", status: "Paid" as const },
    { customer: "Alex Rodriguez", initials: "AR", status: "Paid" as const },
    { customer: "Emma Johnson",   initials: "EJ", status: "Ref" as const },
    { customer: "David Kim",      initials: "DK", status: "Paid" as const },
  ]

  const [rows, setRows] = useState([
    { date: "10/31/2027", status: "Paid" as const,      customer: "Bernard Ng",    initials: "BN", revenue: "$43.79" },
    { date: "10/21/2027", status: "Ref" as const,       customer: "Méschac Irung", initials: "MI", revenue: "$19.99" },
    { date: "10/15/2027", status: "Paid" as const,      customer: "Glodie Ng",     initials: "GN", revenue: "$99.99" },
    { date: "10/12/2027", status: "Cancelled" as const, customer: "Theo Ng",       initials: "TN", revenue: "$19.72" },
    { date: "10/08/2027", status: "Paid" as const,      customer: "Amara Diop",    initials: "AD", revenue: "$74.73" },
    { date: "10/05/2027", status: "Ref" as const,       customer: "Kofi Mensah",   initials: "KM", revenue: "$54.18" },
  ])

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const customerIndexRef = useRef(0)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const newCustomer = newCustomers[customerIndexRef.current % newCustomers.length]
      const newRow = {
        date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '/'),
        status: newCustomer.status,
        customer: newCustomer.customer,
        initials: newCustomer.initials,
        revenue: `$${Math.floor(Math.random() * 80 + 20)}.${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`
      }
      setRows(prev => [newRow, ...prev.slice(0, 5)]) // Keep max 6 rows
      customerIndexRef.current++
    }, 12000) // Add new row every 12 seconds

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <>
      {rows.map((row, i) => {
        const statusStyle =
          row.status === "Paid"      ? "bg-gray-100 text-gray-700 border-gray-200" :
          row.status === "Cancelled" ? "bg-gray-100 text-gray-400 border-gray-200 line-through" :
                                       "bg-gray-100 text-gray-500 border-gray-200"
        return (
          <div
            key={`${row.customer}-${row.date}`}
            className="grid grid-cols-[24px_80px_64px_1fr_56px] gap-x-2 px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors card-row-fade"
            style={{ animationDelay: i === 0 ? "0ms" : `${400 + i * 60}ms` }}
          >
            <span className="text-[11px] text-gray-400 self-center">{i + 1}</span>
            <span className="text-[11px] text-gray-500 self-center">{row.date}</span>
            <span className={`self-center text-[10px] font-medium border rounded px-1.5 py-0.5 w-fit ${statusStyle}`}>{row.status}</span>
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <span className="text-[8px] font-semibold text-gray-600">{row.initials}</span>
              </div>
              <span className="text-[11px] text-gray-800 font-medium truncate">{row.customer}</span>
            </div>
            <span className="text-[11px] text-gray-800 font-semibold text-right self-center"><FluctuatingPrice basePrice={row.revenue} /></span>
          </div>
        )
      })}
    </>
  )
}

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

/* ── MINI DASHBOARD COMPONENT ── */
function MiniDashboard() {
  const [clients, setClients] = useState(15)
  const [vendors, setVendors] = useState(15)
  const [custPayment, setCustPayment] = useState(21938.19)
  const [vendPayment, setVendPayment] = useState(14349.30)
  const [revenue, setRevenue] = useState(87412.50)
  const [expenses, setExpenses] = useState(34820.00)
  const [openInvoices, setOpenInvoices] = useState(24)
  const [overdueInvoices, setOverdueInvoices] = useState(6)

  // Many points for a rich wavy area chart (like the reference image)
  const mkPts = (seed: number[]) => seed.map((y, i) => ({ x: i * (800 / (seed.length - 1)), y }))

  const [layer1, setLayer1] = useState(mkPts([78,62,70,48,55,40,58,35,50,42,62,38,54,30,44,36,52,28,46,40,60,34,50,38,56,44,66,50,60,46,70]))

  const [recentInvoices, setRecentInvoices] = useState([
    { id: "INV-1042", client: "Atlas Corp",     amount: 4200.00, status: "Paid",    date: "Aug 21" },
    { id: "INV-1041", client: "Nova Media",     amount: 1850.50, status: "Pending", date: "Aug 19" },
    { id: "INV-1040", client: "Crest Ltd",      amount: 9300.00, status: "Paid",    date: "Aug 17" },
    { id: "INV-1039", client: "Opal Finance",   amount: 560.00,  status: "Overdue", date: "Aug 12" },
    { id: "INV-1038", client: "Blaze Ventures", amount: 3100.75, status: "Paid",    date: "Aug 10" },
  ])

  const [topClients, setTopClients] = useState([
    { name: "Atlas Corp",     revenue: 42000, pct: 82 },
    { name: "Nova Media",     revenue: 28500, pct: 56 },
    { name: "Crest Ltd",      revenue: 21000, pct: 41 },
    { name: "Opal Finance",   revenue: 14800, pct: 29 },
    { name: "Blaze Ventures", revenue: 9200,  pct: 18 },
  ])

  const [barCols, setBarCols] = useState([
    { label: "Mon", val: 64 }, { label: "Tue", val: 78 }, { label: "Wed", val: 52 },
    { label: "Thu", val: 88 }, { label: "Fri", val: 72 }, { label: "Sat", val: 44 },
    { label: "Sun", val: 36 },
  ])

  const [activity] = useState([
    { time: "2m ago",  msg: "Invoice INV-1042 marked as paid",        icon: "check" },
    { time: "11m ago", msg: "New vendor Iris Tech onboarded",          icon: "plus"  },
    { time: "34m ago", msg: "Stock alert: Item #A204 below threshold", icon: "alert" },
    { time: "1h ago",  msg: "Payroll run completed for 48 employees",  icon: "users" },
    { time: "2h ago",  msg: "Report Q3 exported by Admin",             icon: "file"  },
  ])

  const [stockItems, setStockItems] = useState([
    { name: "Product A204", stock: 12,  max: 200, status: "Low"    },
    { name: "Product B311", stock: 140, max: 200, status: "Good"   },
    { name: "Product C099", stock: 67,  max: 200, status: "Medium" },
    { name: "Product D450", stock: 188, max: 200, status: "Good"   },
    { name: "Product E712", stock: 5,   max: 200, status: "Low"    },
  ])

  const [employees] = useState([
    { name: "Sara Chen",    dept: "Engineering", status: "Active",   salary: 5800 },
    { name: "Kofi Mensah",  dept: "Marketing",   status: "Active",   salary: 4200 },
    { name: "Lena Müller",  dept: "HR",          status: "On Leave", salary: 3900 },
    { name: "James Okafor", dept: "Finance",     status: "Active",   salary: 5200 },
    { name: "Priya Nair",   dept: "Operations",  status: "Active",   salary: 4600 },
  ])

  useEffect(() => {
    const statsInterval = setInterval(() => {
      setClients(v => Math.max(10, v + Math.floor(Math.random() * 3) - 1))
      setVendors(v => Math.max(10, v + Math.floor(Math.random() * 3) - 1))
      setCustPayment(v => parseFloat((Math.max(18000, v + (Math.random() * 600 - 300))).toFixed(2)))
      setVendPayment(v => parseFloat((Math.max(10000, v + (Math.random() * 400 - 200))).toFixed(2)))
      setRevenue(v => parseFloat((Math.max(75000, v + (Math.random() * 1200 - 600))).toFixed(2)))
      setExpenses(v => parseFloat((Math.max(28000, v + (Math.random() * 800 - 400))).toFixed(2)))
      setOpenInvoices(v => Math.max(15, v + Math.floor(Math.random() * 3) - 1))
      setOverdueInvoices(v => Math.max(2, v + Math.floor(Math.random() * 3) - 1))
    }, 2800)

    const chartInterval = setInterval(() => {
      const jitter = (pts: {x:number;y:number}[], min: number, max: number) =>
        pts.map(p => ({ ...p, y: Math.min(max, Math.max(min, p.y + (Math.random() * 10 - 5))) }))
      setLayer1(pts => jitter(pts, 20, 82))
      setTopClients(prev => prev.map(c => ({
        ...c,
        revenue: Math.max(5000, c.revenue + Math.floor(Math.random() * 800 - 400)),
        pct: Math.min(95, Math.max(10, c.pct + (Math.random() * 6 - 3))),
      })))
      setBarCols(prev => prev.map(b => ({
        ...b, val: Math.min(98, Math.max(18, b.val + (Math.random() * 14 - 7)))
      })))
      setStockItems(prev => prev.map(s => ({
        ...s, stock: Math.min(s.max, Math.max(0, s.stock + Math.floor(Math.random() * 10 - 5)))
      })))
    }, 1800)

    const invoiceInterval = setInterval(() => {
      const names = ["Spark Inc", "Peak Co", "Vivo Labs", "Dune Group", "Iris Tech"]
      const statuses = ["Paid", "Pending", "Overdue"] as const
      const newInv = {
        id: `INV-${1043 + Math.floor(Math.random() * 100)}`,
        client: names[Math.floor(Math.random() * names.length)],
        amount: parseFloat((Math.random() * 8000 + 500).toFixed(2)),
        status: statuses[Math.floor(Math.random() * 3)],
        date: "Aug 28",
      }
      setRecentInvoices(prev => [newInv, ...prev.slice(0, 4)])
    }, 7000)

    return () => { clearInterval(statsInterval); clearInterval(chartInterval); clearInterval(invoiceInterval) }
  }, [])

  const toSmoothArea = (pts: { x: number; y: number }[], H: number) => {
    if (pts.length < 2) return ""
    // cubic bezier smooth path
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1]
      const curr = pts[i]
      const cp1x = prev.x + (curr.x - prev.x) * 0.5
      const cp1y = prev.y
      const cp2x = curr.x - (curr.x - prev.x) * 0.5
      const cp2y = curr.y
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
    }
    const last = pts[pts.length - 1]
    const first = pts[0]
    d += ` L ${last.x} ${H} L ${first.x} ${H} Z`
    return d
  }

  const toSmoothLine = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return ""
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1]
      const curr = pts[i]
      const cp1x = prev.x + (curr.x - prev.x) * 0.5
      const cp1y = prev.y
      const cp2x = curr.x - (curr.x - prev.x) * 0.5
      const cp2y = curr.y
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
    }
    return d
  }

  const xLabels = ["Apr 2","Apr 7","Apr 12","Apr 17","Apr 23","Apr 29","May 4","May 9","May 15","May 21","May 27","Jun 1","Jun 6","Jun 11","Jun 17","Jun 23","Jun 30"]

  return (
    <div className="w-full bg-white" style={{ minHeight: 980 }}>
      {/* Topbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          <span className="text-gray-300 select-none">|</span>
          <span>Dashboard</span>
          <svg className="w-2.5 h-2.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
          <span className="font-semibold text-gray-800">Account Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 text-[10px] text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span>Aug 2026</span>
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/><path d="M2 12h20"/></svg>
            <span>GB English</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">P</span>
          </div>
        </div>
      </div>

      {/* Title row */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div>
          <h3 className="text-[14px] font-semibold text-gray-800">Account Dashboard</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">Live overview · updates every few seconds</p>
        </div>
        <div className="flex gap-2">
          {["Overview","Finance","HR","Stock"].map((t, i) => (
            <button key={t} className={`text-[10px] px-2.5 py-1 border transition-colors ${i === 0 ? "border-gray-300 text-gray-700 bg-gray-50" : "border-gray-100 text-gray-400 hover:bg-gray-50"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── ROW 1: 6 stat cards — no color ── */}
      <div className="grid grid-cols-3 md:grid-cols-6 border-t border-gray-100">
        {[
          { label: "Total Clients",  value: String(clients),  sub: "active",           icon: "users"    },
          { label: "Total Vendors",  value: String(vendors),  sub: "active",           icon: "building" },
          { label: "Revenue",        value: `$${Math.round(revenue).toLocaleString()}`,  sub: "this month", icon: "trending" },
          { label: "Expenses",       value: `$${Math.round(expenses).toLocaleString()}`, sub: "this month", icon: "wallet"   },
          { label: "Open Invoices",  value: String(openInvoices),    sub: "awaiting payment", icon: "file"     },
          { label: "Overdue",        value: String(overdueInvoices), sub: "need attention",   icon: "alert"    },
        ].map((card, i) => (
          <div key={i} className="border-r border-b border-gray-100 last:border-r-0 px-4 py-3 flex flex-col gap-1.5 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] text-gray-400 font-medium uppercase tracking-wide">{card.label}</span>
              <div className="w-5 h-5 bg-gray-50 flex items-center justify-center">
                {card.icon === "users"    && <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>}
                {card.icon === "building" && <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                {card.icon === "trending" && <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>}
                {card.icon === "wallet"   && <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/></svg>}
                {card.icon === "file"     && <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                {card.icon === "alert"    && <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
              </div>
            </div>
            <span className="text-[18px] font-bold text-gray-800 transition-all duration-700">{card.value}</span>
            <span className="text-[9px] text-gray-400">{card.sub}</span>
          </div>
        ))}
      </div>

      {/* ── BIG LAYERED AREA CHART (full width) ── */}
      <div className="border-t border-gray-100 px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[11px] font-semibold text-gray-800">Revenue Overview</span>
            <span className="ml-2 text-[9px] text-gray-400">Apr – Jun 2026</span>
          </div>
          <div className="flex gap-3 text-[9px] text-gray-400">
            <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-1.5 border-t" style={{backgroundColor:"#0072FD",opacity:0.3,borderColor:"#0072FD"}}/>Sessions</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-1.5 border-t" style={{backgroundColor:"#0072FD",opacity:0.7,borderColor:"#0072FD"}}/>Revenue</span>
          </div>
        </div>

        {/* SVG area chart */}
        <div className="relative w-full" style={{ height: 160 }}>
          <svg
            viewBox="0 0 800 130"
            className="w-full"
            style={{ height: 140 }}
            preserveAspectRatio="none"
          >
            {/* grid lines — painted first so areas cover them */}
            {[0, 32, 65, 97, 130].map(y => (
              <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f1f5f9" strokeWidth="0.8"/>
            ))}

            <defs>
              <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0072FD" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#0072FD" stopOpacity="0.04"/>
              </linearGradient>
              <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0072FD" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#0072FD" stopOpacity="0.08"/>
              </linearGradient>
            </defs>

            {/* Outer (lighter) layer — layer1 shifted up by ~38px, follows same shape */}
            <path d={toSmoothArea(layer1.map(p => ({ ...p, y: Math.max(4, p.y - 38) })), 130)} fill="url(#lg2)" style={{ transition: "d 1.4s ease-in-out" }}/>
            <path d={toSmoothLine(layer1.map(p => ({ ...p, y: Math.max(4, p.y - 38) })))} fill="none" stroke="#0072FD" strokeWidth="1.2" strokeOpacity="0.45" style={{ transition: "d 1.4s ease-in-out" }}/>

            {/* Inner (darker) layer — base layer1 */}
            <path d={toSmoothArea(layer1, 130)} fill="url(#lg1)" style={{ transition: "d 1.4s ease-in-out" }}/>
            <path d={toSmoothLine(layer1)} fill="none" stroke="#0072FD" strokeWidth="1.7" style={{ transition: "d 1.4s ease-in-out" }}/>
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between px-0 mt-1">
            {xLabels.map(l => (
              <span key={l} className="text-[8px] text-gray-400">{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 3: Financial Snapshot + Top Clients ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-100">
        {/* Financial snapshot */}
        <div className="border-r border-gray-100 p-4 flex flex-col gap-0">
          <span className="text-[11px] font-semibold text-gray-800 mb-2">Financial Snapshot</span>
          {[
            { label: "Gross Profit",  value: `$${Math.round(revenue - expenses).toLocaleString()}`, change: "+8.2%",  up: true  },
            { label: "Net Margin",    value: `${((revenue - expenses) / revenue * 100).toFixed(1)}%`, change: "+1.4%", up: true  },
            { label: "Avg Invoice",   value: `$${Math.round(custPayment / openInvoices)}`,            change: "-2.1%", up: false },
            { label: "Cust. Payment", value: `$${Math.round(custPayment).toLocaleString()}`,          change: "+5.7%", up: true  },
            { label: "Vendor Cost",   value: `$${Math.round(vendPayment).toLocaleString()}`,          change: "+3.1%", up: false },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-[10px] text-gray-500">{row.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-gray-800">{row.value}</span>
                <span className={`text-[9px] font-medium px-1 py-0.5 ${row.up ? "bg-gray-50 text-gray-500" : "bg-gray-50 text-gray-400"}`}>
                  {row.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Top clients */}
        <div className="p-4 flex flex-col">
          <span className="text-[11px] font-semibold text-gray-800 mb-3">Top Clients by Revenue</span>
          <div className="flex flex-col gap-2.5">
            {topClients.map((c, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-gray-100 flex items-center justify-center">
                      <span className="text-[7px] font-bold text-gray-500">{c.name[0]}</span>
                    </div>
                    <span className="text-[10px] text-gray-700">{c.name}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-700">${c.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 h-1">
                  <div className="bg-blue-300 h-1 transition-all duration-1000" style={{ width: `${Math.floor(c.pct)}%` }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 5: Weekly bar chart + Activity feed ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-100">

        {/* Weekly spend bar chart */}
        <div className="border-r border-gray-100 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-gray-800">Weekly Spend</span>
            <span className="text-[9px] text-gray-400">Aug 22 – 28, 2026</span>
          </div>
          <div className="flex items-end gap-2 flex-1" style={{ minHeight: 90 }}>
            {barCols.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col justify-end" style={{ height: 80 }}>
                  <div
                    className="w-full"
                    style={{
                      height: `${b.val}%`,
                      background: `rgba(0,114,253,${0.25 + (b.val / 98) * 0.55})`,
                      transition: "height 1s ease-in-out",
                    }}
                  />
                </div>
                <span className="text-[8px] text-gray-400">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-gray-800">Activity Feed</span>
            <span className="text-[9px] text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0072FD] animate-pulse inline-block"/>Live
            </span>
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5 py-2">
                <div className="w-5 h-5 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  {a.icon === "check" && <svg className="w-2.5 h-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
                  {a.icon === "plus"  && <svg className="w-2.5 h-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}
                  {a.icon === "alert" && <svg className="w-2.5 h-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                  {a.icon === "users" && <svg className="w-2.5 h-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>}
                  {a.icon === "file"  && <svg className="w-2.5 h-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-700 leading-snug">{a.msg}</p>
                  <span className="text-[8.5px] text-gray-400">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 6: HR employees + Stock levels ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-100">

        {/* HR / Employees */}
        <div className="border-r border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-gray-800">HRM — Employees</span>
            <span className="text-[9px] text-gray-400">5 of 48 shown</span>
          </div>
          <div className="border border-gray-100">
            <div className="grid grid-cols-[1fr_80px_70px_56px] gap-x-2 px-3 py-1.5 bg-gray-50 border-b border-gray-100">
              {["Name","Department","Status","Salary"].map(h => (
                <span key={h} className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>
            {employees.map((e, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_70px_56px] gap-x-2 px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-[7px] font-bold text-gray-500">{e.name[0]}</span>
                  </div>
                  <span className="text-[10px] text-gray-700 truncate">{e.name}</span>
                </div>
                <span className="text-[9.5px] text-gray-500 self-center truncate">{e.dept}</span>
                <span className={`text-[9px] self-center font-medium px-1.5 py-0.5 w-fit border border-gray-200 ${e.status === "Active" ? "text-gray-600 bg-gray-50" : "text-gray-400 bg-gray-100"}`}>{e.status}</span>
                <span className="text-[10px] font-semibold text-gray-700 self-center">${e.salary.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock levels */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-gray-800">Stock Levels</span>
            <span className="text-[9px] text-gray-400">Live inventory</span>
          </div>
          <div className="flex flex-col gap-3">
            {stockItems.map((s, i) => {
              const pct = Math.round((s.stock / s.max) * 100)
              const barColor = s.status === "Low" ? "rgba(0,114,253,0.35)" : s.status === "Medium" ? "rgba(0,114,253,0.55)" : "rgba(0,114,253,0.8)"
              return (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-700">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-gray-400">{s.stock}/{s.max}</span>
                      <span className={`text-[8.5px] px-1.5 py-0.5 border border-gray-200 ${s.status === "Low" ? "text-gray-500 bg-gray-100" : "text-gray-500 bg-gray-50"}`}>{s.status}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5">
                    <div
                      className="h-1.5 transition-all duration-1000"
                      style={{ width: `${pct}%`, backgroundColor: barColor }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── ROW 4: Recent invoices ── */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-gray-800">Recent Invoices</span>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-gray-400">{openInvoices} open · {overdueInvoices} overdue</span>
            <button className="text-[9px] text-gray-500 border border-gray-200 px-2 py-0.5 hover:bg-gray-50 transition-colors">View all</button>
          </div>
        </div>
        <div className="border border-gray-100">
          <div className="grid grid-cols-[60px_1fr_1fr_80px_64px] gap-x-3 px-3 py-1.5 bg-gray-50 border-b border-gray-100">
            {["ID","Client","Date","Amount","Status"].map(h => (
              <span key={h} className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{h}</span>
            ))}
          </div>
          {recentInvoices.map((inv, i) => {
            const statusStyle =
              inv.status === "Paid"    ? "text-gray-600 bg-gray-50 border border-gray-200" :
              inv.status === "Overdue" ? "text-gray-500 bg-gray-100 border border-gray-200" :
                                         "text-gray-400 bg-gray-50 border border-gray-200"
            return (
              <div key={i} className="grid grid-cols-[60px_1fr_1fr_80px_64px] gap-x-3 px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                <span className="text-[10px] text-gray-600 font-medium">{inv.id}</span>
                <span className="text-[10px] text-gray-700 truncate">{inv.client}</span>
                <span className="text-[10px] text-gray-400">{inv.date}</span>
                <span className="text-[10px] font-semibold text-gray-800">${inv.amount.toLocaleString("en-US",{minimumFractionDigits:2})}</span>
                <span className={`text-[9px] font-medium px-1.5 py-0.5 self-center w-fit ${statusStyle}`}>{inv.status}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function PryroPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false)
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
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-black/10 backdrop-blur-md bg-white/80 rounded-[6px]">
        <div className="w-full mx-auto px-2">
          <div className="flex items-center gap-6 md:h-12 h-12">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300"
            >
              <img src="/pryro logo.png" alt="Pryro" className="h-8 w-auto" />
            </button>

            <nav className="hidden md:flex items-center gap-4">
              <div 
                className="relative"
                onMouseEnter={() => setShowProductsMenu(true)}
                onMouseLeave={() => setShowProductsMenu(false)}
              >
                <a href="/products" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">
                  Products
                </a>
                {showProductsMenu && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white border border-black/10 rounded-2xl shadow-xl p-6 w-[600px] backdrop-blur-md">
                      <div className="grid grid-cols-2 gap-4">
                        <a href="/features" className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm text-gray-900">Features</div>
                            <div className="text-xs text-gray-500 mt-0.5">Explore all capabilities</div>
                          </div>
                        </a>
                        <a href="/pricing" className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <DollarSign className="w-5 h-5 text-blue-500 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm text-gray-900">Pricing</div>
                            <div className="text-xs text-gray-500 mt-0.5">Simple, transparent plans</div>
                          </div>
                        </a>
                        <a href="/documentation" className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm text-gray-900">Documentation</div>
                            <div className="text-xs text-gray-500 mt-0.5">Complete guides</div>
                          </div>
                        </a>
                        <a href="/api" className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <Plug className="w-5 h-5 text-blue-500 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm text-gray-900">API</div>
                            <div className="text-xs text-gray-500 mt-0.5">Developer resources</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="relative"
                onMouseEnter={() => setShowSolutionsMenu(true)}
                onMouseLeave={() => setShowSolutionsMenu(false)}
              >
                <button className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">
                  Solutions
                </button>
                {showSolutionsMenu && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white border border-black/10 rounded-2xl shadow-xl p-6 w-[700px] backdrop-blur-md">
                      <div className="grid grid-cols-3 gap-3">
                      <a href="/small-business" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Building2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Small Business</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">For growing teams</div>
                        </div>
                      </a>
                      <a href="/accountants-bookkeepers" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Receipt className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Accountants</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Financial experts</div>
                        </div>
                      </a>
                      <a href="/project" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Briefcase className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Project</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Manage projects</div>
                        </div>
                      </a>
                      <a href="/human-resource" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <UserCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Human Resource</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">HR management</div>
                        </div>
                      </a>
                      <a href="/stock-management" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Boxes className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Stock Management</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Inventory control</div>
                        </div>
                      </a>
                      <a href="/customer-relation" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">CRM</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Customer relations</div>
                        </div>
                      </a>
                      <a href="/self-employed" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <UserCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Self-employed</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Freelancers</div>
                        </div>
                      </a>
                      <a href="/non-profit" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <HeartHandshake className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Non-profit</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">NGO solutions</div>
                        </div>
                      </a>
                      <a href="/hospitality" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Building2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Hospitality</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Hotels & restaurants</div>
                        </div>
                      </a>
                      <a href="/construction" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Hammer className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Construction</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Build projects</div>
                        </div>
                      </a>
                      <a href="/logistic" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Truck className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Logistic</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Supply chain</div>
                        </div>
                      </a>
                      <a href="/marketing-mail" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Mail className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Marketing (Mail)</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Email campaigns</div>
                        </div>
                      </a>
                      <a href="/marketing-call" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Phone className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">Marketing (Call)</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">Call center</div>
                        </div>
                      </a>
                      <a href="/ai-enterprise" className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Bot className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-xs text-gray-900">AI Enterprise</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">AI-powered tools</div>
                        </div>
                      </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <a href="/about" className="text-sm text-[#4a5568] hover:text-[#0f1117] transition-colors duration-300">About</a>

              {/* Nav CTA group */}
              <div className="flex items-center gap-1 bg-black/5 rounded-[9px] p-1 ml-2">
                <a
                  href="/contact"
                  className="text-sm text-[#0f1117] font-medium px-3 py-1.5 rounded-[6px] hover:bg-white/80 transition-all duration-200"
                >
                  Contact
                </a>
                <a
                  href="https://login.pryro.com"
                  className="text-sm font-medium px-3 py-1.5 rounded-[6px] bg-white text-[#0f1117] hover:bg-white/80 transition-all duration-200"
                >
                  Log in
                </a>
              </div>
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
            <a href="/products" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">Products</a>
            <a href="/about" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">About</a>
            <a href="/demo" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">Demo</a>
            <a href="/contact" className="font-serif text-5xl md:text-7xl font-light text-[#0f1117] hover:text-pink-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      )}

      <section
        ref={heroRef}
        className={`relative min-h-[120vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 md:pt-24 md:pb-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isLoaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
        style={{
          background: "linear-gradient(to bottom, #0072FD 0%, #0274FD 11%, #0376FC 22%, #097AFC 33%, #0E7EFC 44%, #1986FC 55%, #3393FC 66%, #4CA0FC 77%, #7FBAFC 88%, #E5EDFC 100%)",
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
            <div className="stagger-reveal flex justify-center" style={{ animationDelay: "270ms" }}>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-[6px] p-1">
                <a href="https://login.pryro.com">
                  <Button className="px-6 py-2.5 h-auto text-sm font-medium rounded-[4px] bg-white border-0 hover:bg-white/90 transition-all duration-300 text-gray-900">
                    Start Free Trial
                  </Button>
                </a>
                <a href="/demo">
                  <Button className="px-6 py-2.5 h-auto text-sm font-medium rounded-[4px] bg-white/25 border-0 hover:bg-white/35 transition-all duration-300 text-gray-900">
                    Book a Demo
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-20 stagger-reveal" style={{ animationDelay: "360ms" }} ref={dashboardRef}>
            <div style={{ perspective: "1200px" }}>
              <div
                className="relative aspect-[16/10] md:aspect-[16/9] rounded-[10px] overflow-hidden"
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

      <section className="relative py-12 bg-white overflow-hidden md:py-8 md:pt-8 md:pb-4">
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
                "/logos/Frame 12.png",
                "/logos/Frame 63.png",
                "/logos/frame-11.png",
                "/logos/frame-55.png",
                "/logos/frame-4.png",
                "/logos/frame-6.png",
                "/logos/frame-8.png",
                "/logos/frame-2.png",
                "/logos/frame-3.png",
                "/logos/frame-7.png",
                "/logos/Frame 12.png",
                "/logos/Frame 63.png",
              ].map((logo, i) => (
                <div key={i} className="px-4 md:px-6 flex items-center justify-center flex-shrink-0">
                  <img
                    src={logo || "/placeholder.svg"}
                    alt={`Partner logo ${i + 1}`}
                    className="h-12 md:h-16 w-auto object-contain opacity-60 hover:opacity-80 transition-all duration-300"
                    style={{ filter: 'brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)' }}
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
            Trusted by enterprises and NGO worldwide. Powered by intelligent automation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[800px] mx-auto">
            {[
              { label: "ACTIVE USERS", value: "64K+", desc: "worldwide", color: "blue" },
              { label: "FINANCIAL ENTRIES PROCESSED", value: "2.4M", desc: "monthly", color: "blue" },
              { label: "COST REDUCTION", value: "38%", desc: "average savings", color: "blue" },
              { label: "UPTIME", value: "99.9%", desc: "reliability", color: "blue" },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-6 md:p-10 text-center md:py-10 md:pb-20"
              >
                <div
                  className={`text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-4 flex items-center justify-center gap-2`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${metric.color === "blue" ? "bg-blue-400/60" : "bg-blue-400/60"}`}
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
            <div className="rounded-[5px] overflow-hidden relative min-h-[600px] md:min-h-[700px]">
              <div className="relative w-full h-full">
                <img
                  src="/image switch 1.png"
                  alt="Mobile App"
                  className={`w-full h-full object-cover rounded-[8px] transition-transform duration-500 ease-in-out ${
                    selectedDevice === 0 ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{ position: selectedDevice === 0 ? "relative" : "absolute", top: 0, left: 0 }}
                />
                <img
                  src="/image switch 2.png"
                  alt="Web App"
                  className={`w-full h-full object-cover rounded-[8px] transition-transform duration-500 ease-in-out ${
                    selectedDevice === 1 ? "translate-x-0" : "translate-x-full"
                  }`}
                  style={{ position: selectedDevice === 1 ? "relative" : "absolute", top: 0, left: 0 }}
                />
              </div>

              {/* Industry Icons Carousel - Two rows at top of image */}
              <div className="absolute top-8 left-0 right-0 z-20 space-y-0.5">
                {/* First Row - Scrolling Left to Right */}
                <div className="industry-carousel-full overflow-hidden">
                  <div className="industry-carousel-track flex gap-0.5">
                    {[
                      { name: "Accounting", icon: "/icon/accounting icon.png" },
                      { name: "AI Business Review", icon: "/icon/ai business review icon.png" },
                      { name: "AI Email", icon: "/icon/ai email icon.png" },
                      { name: "AI Enterprise", icon: "/icon/ai interprise icon.png" },
                      { name: "Budget", icon: "/icon/budget icon.png" },
                      { name: "Business Coach", icon: "/icon/business coach icon.png" },
                      { name: "Business Review", icon: "/icon/business review icon2.png" },
                      { name: "Cold Call", icon: "/icon/cold call icon.png" },
                      { name: "COO", icon: "/icon/COO icon.png" },
                      { name: "CRM", icon: "/icon/CRM icon.png" },
                      { name: "Dashboard", icon: "/icon/dashboard icon.png" },
                      { name: "Discussion", icon: "/icon/disccuss icon.png" },
                      { name: "Document", icon: "/icon/document icon.png" },
                      { name: "E-commerce", icon: "/icon/ecommerce icon.png" },
                      { name: "Help Desk", icon: "/icon/help desk icon.png" },
                      { name: "HR", icon: "/icon/HR icon.png" },
                      { name: "Inventory", icon: "/icon/Inventory icon.png" },
                    ].concat([
                      { name: "Accounting", icon: "/icon/accounting icon.png" },
                      { name: "AI Business Review", icon: "/icon/ai business review icon.png" },
                      { name: "AI Email", icon: "/icon/ai email icon.png" },
                      { name: "AI Enterprise", icon: "/icon/ai interprise icon.png" },
                      { name: "Budget", icon: "/icon/budget icon.png" },
                      { name: "Business Coach", icon: "/icon/business coach icon.png" },
                      { name: "Business Review", icon: "/icon/business review icon2.png" },
                      { name: "Cold Call", icon: "/icon/cold call icon.png" },
                      { name: "COO", icon: "/icon/COO icon.png" },
                      { name: "CRM", icon: "/icon/CRM icon.png" },
                      { name: "Dashboard", icon: "/icon/dashboard icon.png" },
                      { name: "Discussion", icon: "/icon/disccuss icon.png" },
                      { name: "Document", icon: "/icon/document icon.png" },
                      { name: "E-commerce", icon: "/icon/ecommerce icon.png" },
                      { name: "Help Desk", icon: "/icon/help desk icon.png" },
                      { name: "HR", icon: "/icon/HR icon.png" },
                      { name: "Inventory", icon: "/icon/Inventory icon.png" },
                    ]).map((industry, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center flex-shrink-0 w-20 md:w-24 rounded-[5px] bg-white border border-gray-200/50 p-2 pt-2.5 shadow-lg gap-1"
                      >
                        <img
                          src={industry.icon}
                          alt={industry.name}
                          className="w-12 h-12 md:w-14 md:h-14 object-contain"
                        />
                        <span className="text-[8px] text-gray-500 text-center leading-tight w-full truncate px-0.5">{industry.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Second Row - Scrolling Right to Left */}
                <div className="industry-carousel-full overflow-hidden">
                  <div className="industry-carousel-track-reverse flex gap-0.5" style={{ animationDirection: 'reverse' }}>
                    {[
                      { name: "Knowledge", icon: "/icon/knowledge icon.png" },
                      { name: "Lawyer", icon: "/icon/lawyer icon.png" },
                      { name: "Logistics", icon: "/icon/logistic icon.png" },
                      { name: "Manufacturers", icon: "/icon/manufacturers icon.png" },
                      { name: "Pharmacy", icon: "/icon/pharmacy icon.png" },
                      { name: "POS", icon: "/icon/pos icon.png" },
                      { name: "Project", icon: "/icon/project icon.png" },
                      { name: "Purchase", icon: "/icon/purchase icon.png" },
                      { name: "Research System", icon: "/icon/research system icon.png" },
                      { name: "Sales", icon: "/icon/sales icon.png" },
                      { name: "Signature", icon: "/icon/signuture icon.png" },
                      { name: "SOP", icon: "/icon/SOP icon.png" },
                      { name: "Subscription", icon: "/icon/subscription icon.png" },
                      { name: "Tender", icon: "/icon/Tender icon.png" },
                      { name: "Code", icon: "/icon/0code icon.png" },
                      { name: "Coder", icon: "/icon/0coder icon.png" },
                    ].concat([
                      { name: "Knowledge", icon: "/icon/knowledge icon.png" },
                      { name: "Lawyer", icon: "/icon/lawyer icon.png" },
                      { name: "Logistics", icon: "/icon/logistic icon.png" },
                      { name: "Manufacturers", icon: "/icon/manufacturers icon.png" },
                      { name: "Pharmacy", icon: "/icon/pharmacy icon.png" },
                      { name: "POS", icon: "/icon/pos icon.png" },
                      { name: "Project", icon: "/icon/project icon.png" },
                      { name: "Purchase", icon: "/icon/purchase icon.png" },
                      { name: "Research System", icon: "/icon/research system icon.png" },
                      { name: "Sales", icon: "/icon/sales icon.png" },
                      { name: "Signature", icon: "/icon/signuture icon.png" },
                      { name: "SOP", icon: "/icon/SOP icon.png" },
                      { name: "Subscription", icon: "/icon/subscription icon.png" },
                      { name: "Tender", icon: "/icon/Tender icon.png" },
                      { name: "Code", icon: "/icon/0code icon.png" },
                      { name: "Coder", icon: "/icon/0coder icon.png" },
                    ]).map((industry, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center flex-shrink-0 w-20 md:w-24 rounded-[5px] bg-white border border-gray-200/50 p-2 pt-2.5 shadow-lg gap-1"
                      >
                        <img
                          src={industry.icon}
                          alt={industry.name}
                          className="w-12 h-12 md:w-14 md:h-14 object-contain"
                        />
                        <span className="text-[8px] text-gray-500 text-center leading-tight w-full truncate px-0.5">{industry.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1 bg-white/20 backdrop-blur-sm rounded-[5px] p-1">
                <button
                  onClick={() => setSelectedDevice(0)}
                  className={`px-6 py-2.5 rounded-[5px] text-sm font-medium transition-all ${
                    selectedDevice === 0
                      ? "bg-white text-gray-900"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Mobile App
                </button>
                <button
                  onClick={() => setSelectedDevice(1)}
                  className={`px-6 py-2.5 rounded-[5px] text-sm font-medium transition-all ${
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
            <div className="rounded-[5px] p-8 md:p-12 flex items-center justify-center min-h-[450px]" style={{ background: "linear-gradient(to bottom, #0072FD 0%, #0274FD 11%, #0376FC 22%, #097AFC 33%, #0E7EFC 44%, #1986FC 55%, #3393FC 66%, #4CA0FC 77%, #7FBAFC 88%, #E5EDFC 100%)" }}>
              <div className="bg-white rounded-[5px] p-6 shadow-lg w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 card-fade-up" style={{ animationDelay: "0ms" }}>
                  <h3 className="text-lg font-semibold">Projects</h3>
                  <button className="text-[11px] text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200 rounded-[5px] px-3 py-1 font-medium">View All</button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 gap-2 mb-4 card-fade-up" style={{ animationDelay: "80ms" }}>
                  <div className="bg-gray-50 rounded p-2.5 relative overflow-hidden">
                    <div className="text-[10px] text-gray-500 mb-0.5 relative z-10">In Progress</div>
                    <div className="text-xl font-bold text-gray-900 relative z-10"><LiveCounter start={8} step={1} intervalMs={1000} /></div>
                    <Clock className="w-8 h-8 text-gray-200 absolute bottom-1 right-1" />
                  </div>
                  <div className="bg-gray-50 rounded p-2.5 relative overflow-hidden">
                    <div className="text-[10px] text-gray-500 mb-0.5 relative z-10">Completed</div>
                    <div className="text-xl font-bold text-gray-900 relative z-10"><CardCounter target={32} /></div>
                    <Check className="w-8 h-8 text-gray-200 absolute bottom-1 right-1" />
                  </div>
                  <div className="bg-gray-50 rounded p-2.5 relative overflow-hidden">
                    <div className="text-[10px] text-gray-500 mb-0.5 relative z-10">Members</div>
                    <div className="text-xl font-bold text-gray-900 relative z-10"><FluctuatingCounter start={18} range={5} intervalMs={3000} min={10} max={30} /></div>
                    <Users className="w-8 h-8 text-gray-200 absolute bottom-1 right-1" />
                  </div>
                  <div className="bg-gray-50 rounded p-2.5 relative overflow-hidden">
                    <div className="text-[10px] text-gray-500 mb-0.5 relative z-10">On Time</div>
                    <div className="text-xl font-bold text-gray-900 relative z-10"><FluctuatingCounter start={94} range={2} intervalMs={4000} min={88} max={100} suffix="%" /></div>
                    <Calendar className="w-8 h-8 text-gray-200 absolute bottom-1 right-1" />
                  </div>
                </div>

                {/* Overall progress */}
                <div className="mb-4 bg-gray-50 rounded p-3 card-fade-up" style={{ animationDelay: "160ms" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">Overall Progress</span>
                    <span className="text-[10px] font-bold text-gray-700"><FluctuatingCounter start={72} range={3} intervalMs={5000} min={65} max={85} suffix="%" /></span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full card-bar-fill" style={{ "--bar-target": "72%" } as React.CSSProperties} />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[9px] text-gray-400">32 of 40 tasks done</span>
                    <span className="text-[9px] text-blue-500 font-medium">↑ 12% this week</span>
                  </div>
                </div>

                {/* Footer summary */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between card-fade-up" style={{ animationDelay: "240ms" }}>
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1.5">
                      {["#93C5FD","#60A5FA","#3B82F6","#1D4ED8"].map((c, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500">+<FluctuatingCounter start={14} range={3} intervalMs={6000} min={10} max={25} /> members</span>
                  </div>
                  <span className="text-[10px] text-blue-600 font-medium cursor-pointer hover:underline">View Dashboard →</span>
                </div>

                {/* Customers table */}
                <div className="mt-4 pt-4 border-t border-gray-100 card-fade-up" style={{ animationDelay: "320ms" }}>
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Customers</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">New users by primary channel group</p>
                    </div>
                    <button className="text-[11px] text-gray-500 border border-gray-200 rounded px-2 py-0.5 hover:bg-gray-50 transition-colors">Export</button>
                  </div>

                  <div className="mt-3 overflow-hidden rounded border border-gray-100">
                    {/* Table head */}
                    <div className="grid grid-cols-[24px_80px_64px_1fr_56px] gap-x-2 px-3 py-1.5 bg-gray-50 border-b border-gray-100">
                      <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">#</span>
                      <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Date</span>
                      <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Status</span>
                      <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Customer</span>
                      <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide text-right">Revenue</span>
                    </div>

                    {/* Table rows */}
                    <LiveCustomerTable />
                  </div>
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
                <a href="https://login.pryro.com">
                  <Button className="bg-gray-900 text-white px-8 py-6 rounded-[5px] text-base hover:bg-gray-800 transition-all">
                    Get Started
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {[
                  { label: "Tasks", icon: ListTodo },
                  { label: "Time tracking", icon: Clock },
                  { label: "Timesheets", icon: FileText },
                  { label: "Reports", icon: BarChart3 },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-[5px] px-3 py-3">
                    <feature.icon className="w-4 h-4" />
                    {feature.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 items-stretch">
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
                <a href="https://login.pryro.com">
                  <Button className="bg-gray-900 text-white px-8 py-6 rounded-[5px] text-base hover:bg-gray-800 transition-all">
                    Get Started
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {[
                  { label: "Invoicing", icon: Receipt },
                  { label: "Budgets", icon: Wallet },
                  { label: "Forecasting", icon: TrendingUp },
                  { label: "Integrations", icon: Plug },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-[5px] px-3 py-3">
                    <feature.icon className="w-4 h-4" />
                    {feature.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Card */}
            <div className="rounded-[5px] p-8 md:p-12 flex items-center justify-center min-h-[600px]" style={{ background: "linear-gradient(to bottom, #0072FD 0%, #0274FD 11%, #0376FC 22%, #097AFC 33%, #0E7EFC 44%, #1986FC 55%, #3393FC 66%, #4CA0FC 77%, #7FBAFC 88%, #E5EDFC 100%)" }}>
              <div className="bg-white rounded-[4px] p-5 shadow-lg w-full max-w-md overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between mb-4 card-fade-up" style={{ animationDelay: "0ms" }}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900">Budget</h3>
                  </div>
                  <span className="text-[10px] text-gray-400 border border-gray-200 rounded px-2 py-0.5">FY 2024</span>
                </div>

                {/* Budget stat tiles */}
                <div className="grid grid-cols-2 gap-2 mb-3 card-fade-up" style={{ animationDelay: "80ms" }}>
                  <div className="bg-gray-50 rounded-[3px] p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <DollarSign className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] text-gray-500">Total Budget</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 leading-none"><span className="text-sm align-super mr-0.5">$</span><LiveCounter start={78000} step={100} intervalMs={3000} /></div>
                    <div className="text-[10px] text-blue-500 mt-1.5 font-medium">↑ <FluctuatingCounter start={12.5} range={1.5} intervalMs={8000} min={10} max={16} decimals={1} suffix="%" /> vs last year</div>
                  </div>
                  <div className="bg-gray-50 rounded-[3px] p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Receipt className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] text-gray-500">Spent</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 leading-none"><span className="text-sm align-super mr-0.5">$</span><LiveCounter start={22000} step={50} intervalMs={2000} /></div>
                    <div className="text-[10px] text-gray-400 mt-1.5">28.2% of total</div>
                  </div>
                  <div className="bg-gray-50 rounded-[3px] p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <TrendingUp className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] text-gray-500">Remaining</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 leading-none"><span className="text-sm align-super mr-0.5">$</span><FluctuatingCounter start={56000} range={500} intervalMs={4000} min={50000} max={65000} /></div>
                    <div className="text-[10px] text-gray-400 mt-1.5">71.8% available</div>
                  </div>
                  <div className="bg-gray-50 rounded-[3px] p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <BarChart3 className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] text-gray-500">Forecast</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 leading-none"><span className="text-sm align-super mr-0.5">$</span><FluctuatingCounter start={31400} range={300} intervalMs={5000} min={28000} max={35000} /></div>
                    <div className="text-[10px] text-blue-500 mt-1.5 font-medium">↓ 5.2% projected</div>
                  </div>
                </div>

                {/* Budget utilisation bar */}
                <div className="mb-3 bg-gray-50 rounded-[3px] p-3 card-fade-up" style={{ animationDelay: "160ms" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-medium text-gray-600">Budget Utilisation</span>
                    <span className="text-[10px] font-bold text-gray-700"><FluctuatingCounter start={28} range={2} intervalMs={6000} min={25} max={35} suffix="%" /></span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full card-bar-fill" style={{ "--bar-target": "28.2%" } as React.CSSProperties} />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[9px] text-gray-400">$22k spent of $78k</span>
                    <span className="text-[9px] text-gray-400">On track</span>
                  </div>
                </div>

                {/* Category breakdown */}
                <div className="mb-3 card-fade-up" style={{ animationDelay: "240ms" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium text-gray-600">Category Breakdown</span>
                    <span className="text-[9px] text-gray-400">Q3 2024</span>
                  </div>
                  <div className="space-y-1.5">
                    <LiveCategoryBreakdown />
                  </div>
                </div>

                {/* Analytics bar chart */}
                <div className="card-fade-up" style={{ animationDelay: "400ms" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] font-medium text-gray-600">Monthly Analytics</span>
                    </div>
                    <span className="text-[9px] text-gray-400">Jan – Dec 2024</span>
                  </div>
                  <div className="bg-gray-50 rounded-[3px] px-2 pt-2 pb-1">
                    {/* Bar area: more bars, thinner, shorter */}
                    <div className="flex items-end justify-around gap-[2px]" style={{ height: 100 }}>
                      {[18,30,24,40,28,48,34,55,22,44,36,58,26,50,32,54,42,64,30,56,44,68,36,62,20,46,38,60,28,52,40,66,24,50,34,58,30,56,46,70,22,48,40,64,32,60,44,72,26,54].map((h, i) => (
                        <div
                          key={i}
                          className="bg-blue-500 rounded-t-[1px]"
                          style={{ height: `${h}px`, width: 4, flexShrink: 0, opacity: 0.4 + i * 0.012 }}
                        />
                      ))}
                    </div>
                    {/* Month labels — show every other */}
                    <div className="flex justify-around mt-1 gap-[2px]">
                      {Array.from({ length: 50 }, (_, i) => {
                        const months = ["J","F","M","A","M","J","J","A","S","O","N","D"]
                        return i % 4 === 0 ? months[Math.floor(i / 4) % 12] : ""
                      }).map((m, i) => (
                        <span key={i} style={{ width: 4, flexShrink: 0 }} className="text-center text-[6px] text-gray-400">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agent showcase section */}
      <section className="relative py-20 md:py-28 px-4 animate-on-scroll overflow-hidden bg-gray-50">
        <div className="relative z-10 max-w-[1120px] w-full mx-auto">

          {/* ── OUTER BLUE CARD ── */}
          <div
            className="p-12 md:p-20 max-w-[1160px] mx-auto"
            style={{
              borderRadius: "5px",
              background: "linear-gradient(to bottom, #0072FD 0%, #0274FD 11%, #0376FC 22%, #097AFC 33%, #0E7EFC 44%, #1986FC 55%, #3393FC 66%, #4CA0FC 77%, #7FBAFC 88%, #E5EDFC 100%)",
            }}
          >
            {/* Headline inside blue card */}
            <div className="text-center mb-8 md:mb-10">
              <h2 className="font-serif text-[32px] md:text-[52px] leading-[1.1] font-medium text-white mb-3" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.15)" }}>
                Meet Pryro, business<br />management, finally simple.
              </h2>
            </div>

            {/* ── INNER WHITE CARD ── */}
            <div className="bg-white overflow-hidden shadow-xl" style={{ borderRadius: "8px" }}>

              {/* Animated Dashboard UI */}
              <div className="border-b border-black/6 overflow-hidden">
                <MiniDashboard />
              </div>
            </div>
          </div>
        </div>
      </section>



      <section id="narrative" className="relative py-20 md:py-32 px-4 animate-on-scroll bg-gray-50">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            <div className="max-w-[720px]">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                ENTERPRISE TECHNOLOGY
              </div>
              <h2 className="font-serif text-[36px] leading-[1.15] md:text-[56px] md:leading-[1.1] font-medium mb-8 text-balance">
                Every business process{" "}
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #0077ff 0%, #ffffff 100%)",
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
                <div className="rounded-[5px] p-1 w-full aspect-square overflow-hidden">
                  <img
                    src={
                      [
                        "/images/25164.jpg",
                        "/images/77570.jpg",
                        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
                        "moreimages/office2.jpg",
                      ][selectedFeature] || "/placeholder.svg"
                    }
                    alt="Feature preview"
                    className={`w-full h-full object-cover rounded-[5px] transition-opacity duration-300 ${
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
                    image: "/images/25164.jpg",
                  },
                  {
                    title: "Real-time Analytics",
                    desc: "24/7 business intelligence with instant insights",
                    icon: BarChart3,
                    image: "/images/77570.jpg",
                  },
                  {
                    title: "Inventory Management",
                    desc: "Track stock levels and supply chain across locations",
                    icon: ListTodo,
                    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
                  },
                  {
                    title: "HR & Payroll",
                    desc: "Manage employees, attendance, and payroll seamlessly",
                    icon: Clock,
                    image: "moreimages/office2.jpg",
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
                      selectedFeature === i ? "" : ""
                    }`}
                  >
                    <feature.icon
                      className="w-5 h-5 flex-shrink-0 mt-1 text-black"
                    />
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm md:text-base text-[#4a5568]">{feature.desc}</p>
                    </div>
                    {selectedFeature === i && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200">
                        <div className="h-full bg-gray-500 progress-bar" />
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
                    image: "/images/25164.jpg",
                  },
                  {
                    title: "Real-time Analytics",
                    image: "/images/77570.jpg",
                  },
                  {
                    title: "Inventory Management",
                    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
                  },
                  {
                    title: "HR & Payroll",
                    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
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
                        className="w-full h-full object-cover rounded-[5px]"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 px-4 animate-on-scroll bg-gray-50">
        <div className="max-w-[1200px] w-full mx-auto">

          <h2 className="text-[18px] md:text-[22px] font-normal text-gray-900 mb-6">
            Built for every part of your business
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 items-stretch">

            {/* Card 1 — Financial Management */}
            <div className="bg-gray-100 rounded-[2px] flex flex-col overflow-hidden" style={{ minHeight: 580 }}>
              <div className="p-5 pb-3">
                <p className="text-[13px] font-medium text-gray-900 mb-1">
                  Financial Management
                </p>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-3">
                  Complete accounting, invoicing, and financial reporting. Track revenue, expenses, and cash flow in real-time.
                </p>
                <a href="https://login.pryro.com" className="inline-block mt-4 text-[13px] font-medium text-gray-900 hover:underline">
                  Explore finance ↗
                </a>
              </div>
              <div className="flex-1 mx-3 mb-3 rounded-[2px] overflow-hidden bg-white border border-gray-200 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                  <span className="text-[11px] font-semibold text-gray-700">Revenue Overview</span>
                  <span className="text-[10px] text-gray-400">Q4 2026</span>
                </div>
                {/* KPI row */}
                <div className="grid grid-cols-3 gap-px bg-gray-100 border-b border-gray-100">
                  <div className="bg-white px-3 py-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">Revenue</div>
                    <div className="text-sm font-bold text-gray-900">$2.4M</div>
                    <div className="text-[9px] text-gray-700">↑ 18.3%</div>
                  </div>
                  <div className="bg-white px-3 py-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">Expenses</div>
                    <div className="text-sm font-bold text-gray-900">$1.8M</div>
                    <div className="text-[9px] text-gray-700">↑ 4.1%</div>
                  </div>
                  <div className="bg-white px-3 py-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">Net Profit</div>
                    <div className="text-sm font-bold text-gray-900">$600K</div>
                    <div className="text-[9px] text-gray-700">↑ 22.5%</div>
                  </div>
                </div>
                {/* Bar chart */}
                <div className="px-4 pt-3 pb-1">
                  <div className="text-[9px] text-gray-400 mb-2">Monthly Revenue</div>
                  <div className="flex items-end gap-1 h-16">
                    {[42, 58, 35, 72, 55, 88, 65, 78, 50, 92, 70, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-gray-200 rounded-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-300 mt-1">
                    <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
                  </div>
                </div>
                {/* Recent transactions */}
                <div className="px-4 pt-2 pb-1">
                  <div className="text-[9px] text-gray-400 mb-1.5">Recent Transactions</div>
                </div>
                <div className="flex-1 divide-y divide-gray-100 overflow-hidden">
                  {[
                    { label: "Invoice #4821", client: "Acme Corp", amount: "+$12,400", color: "text-gray-900" },
                    { label: "Invoice #4820", client: "TechWave Ltd", amount: "+$8,750", color: "text-gray-900" },
                    { label: "Office Rent", client: "Expense", amount: "-$3,200", color: "text-gray-900" },
                    { label: "Invoice #4819", client: "Delta Group", amount: "+$5,100", color: "text-gray-900" },
                    { label: "Payroll Run", client: "Expense", amount: "-$48,000", color: "text-gray-900" },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2">
                      <div>
                        <div className="text-[11px] font-medium text-gray-800">{tx.label}</div>
                        <div className="text-[9px] text-gray-400">{tx.client}</div>
                      </div>
                      <span className={`text-[11px] font-semibold ${tx.color}`}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 — Inventory Management */}
            <div className="bg-gray-100 rounded-[2px] flex flex-col overflow-hidden" style={{ minHeight: 580 }}>
              <div className="p-5 pb-3">
                <p className="text-[13px] font-medium text-gray-900 mb-1">
                  Inventory Management
                </p>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-3">
                  Track stock levels, manage suppliers, and optimize your supply chain across multiple locations.
                </p>
                <a href="https://login.pryro.com" className="inline-block mt-4 text-[13px] font-medium text-gray-900 hover:underline">
                  Explore inventory ↗
                </a>
              </div>
              <div className="flex-1 mx-3 mb-3 rounded-[2px] overflow-hidden bg-white border border-gray-200 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                  <span className="text-[11px] font-semibold text-gray-700">Stock Dashboard</span>
                  <span className="text-[10px] text-gray-400">11,290 items</span>
                </div>
                {/* KPI row */}
                <div className="grid grid-cols-3 gap-px bg-gray-100 border-b border-gray-100">
                  <div className="bg-white px-3 py-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">Total Value</div>
                    <div className="text-sm font-bold text-gray-900">$4.2M</div>
                    <div className="text-[9px] text-gray-700">↑ 8.2%</div>
                  </div>
                  <div className="bg-white px-3 py-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">Suppliers</div>
                    <div className="text-sm font-bold text-gray-900">48</div>
                    <div className="text-[9px] text-gray-400">Active</div>
                  </div>
                  <div className="bg-white px-3 py-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">Low Stock</div>
                    <div className="text-sm font-bold text-gray-900">24</div>
                    <div className="text-[9px] text-gray-700">Critical</div>
                  </div>
                </div>
                {/* Category bars */}
                <div className="px-4 pt-3 pb-2">
                  <div className="text-[9px] text-gray-400 mb-2">Stock by Category</div>
                  {[
                    { name: "Electronics", qty: "4,820", pct: 78 },
                    { name: "Components", qty: "2,340", pct: 55 },
                    { name: "Raw Material", qty: "2,110", pct: 64 },
                    { name: "Packaging", qty: "890", pct: 32 },
                    { name: "Finished Goods", qty: "1,130", pct: 47 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] text-gray-600 w-24 shrink-0">{item.name}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-700 rounded-full" style={{ width: `${item.pct}%` }} />
                      </div>
                      <span className="text-[9px] text-gray-400 w-10 text-right">{item.qty}</span>
                    </div>
                  ))}
                </div>
                {/* Recent movements */}
                <div className="px-4 pb-1">
                  <div className="text-[9px] text-gray-400 mb-1.5">Recent Movements</div>
                </div>
                <div className="flex-1 divide-y divide-gray-100 overflow-hidden">
                  {[
                    { item: "MacBook Pro 14\"", action: "Restocked", qty: "+120", color: "text-gray-900" },
                    { item: "USB-C Cables ×5", action: "Dispatched", qty: "-45", color: "text-gray-900" },
                    { item: "Office Chairs", action: "Restocked", qty: "+30", color: "text-gray-900" },
                    { item: "Laptop Stand", action: "Low Stock Alert", qty: "8 left", color: "text-gray-900" },
                  ].map((mv, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2">
                      <div>
                        <div className="text-[11px] font-medium text-gray-800">{mv.item}</div>
                        <div className="text-[9px] text-gray-400">{mv.action}</div>
                      </div>
                      <span className={`text-[11px] font-semibold ${mv.color}`}>{mv.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 — HR & Payroll */}
            <div className="bg-gray-100 rounded-[2px] flex flex-col overflow-hidden" style={{ minHeight: 580 }}>
              <div className="p-5 pb-3">
                <p className="text-[13px] font-medium text-gray-900 mb-1">
                  HR & Payroll
                </p>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-3">
                  Manage employees, attendance, payroll processing, and benefits administration in one unified platform.
                </p>
                <a href="https://login.pryro.com" className="inline-block mt-4 text-[13px] font-medium text-gray-900 hover:underline">
                  Explore HR →
                </a>
              </div>
              <div className="flex-1 mx-3 mb-3 rounded-[2px] overflow-hidden bg-white border border-gray-200 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                  <span className="text-[11px] font-semibold text-gray-700">Workforce Overview</span>
                  <span className="text-[10px] text-gray-400">Aug 2026</span>
                </div>
                {/* KPI row */}
                <div className="grid grid-cols-3 gap-px bg-gray-100 border-b border-gray-100">
                  <div className="bg-white px-3 py-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">Total Staff</div>
                    <div className="text-sm font-bold text-gray-900">342</div>
                    <div className="text-[9px] text-gray-700">↑ 12.4%</div>
                  </div>
                  <div className="bg-white px-3 py-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">On Leave</div>
                    <div className="text-sm font-bold text-gray-900">18</div>
                    <div className="text-[9px] text-gray-400">Today</div>
                  </div>
                  <div className="bg-white px-3 py-2.5">
                    <div className="text-[9px] text-gray-400 mb-0.5">Payroll</div>
                    <div className="text-sm font-bold text-gray-900">$685K</div>
                    <div className="text-[9px] text-gray-400">Monthly</div>
                  </div>
                </div>
                {/* Department breakdown */}
                {/* Area chart — Headcount trend */}
                <div className="px-4 pt-3 pb-2">
                  <div className="text-[9px] text-gray-400 mb-2">Headcount trend — last 8 months</div>
                  <div className="relative h-24">
                    <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="w-full h-full">
                      {/* grid lines */}
                      <line x1="0" y1="20" x2="300" y2="20" stroke="#f3f4f6" strokeWidth="1"/>
                      <line x1="0" y1="40" x2="300" y2="40" stroke="#f3f4f6" strokeWidth="1"/>
                      <line x1="0" y1="60" x2="300" y2="60" stroke="#f3f4f6" strokeWidth="1"/>
                      {/* area 1 — lighter */}
                      <path d="M0,60 C15,55 25,45 40,48 C55,51 65,35 80,30 C95,25 105,40 120,35 C135,30 145,20 160,18 C175,16 185,28 200,24 C215,20 225,14 240,12 C255,10 265,18 280,16 C290,14 295,12 300,10 L300,80 L0,80 Z"
                        fill="rgba(209,213,219,0.5)" stroke="none"/>
                      <path d="M0,60 C15,55 25,45 40,48 C55,51 65,35 80,30 C95,25 105,40 120,35 C135,30 145,20 160,18 C175,16 185,28 200,24 C215,20 225,14 240,12 C255,10 265,18 280,16 C290,14 295,12 300,10"
                        fill="none" stroke="rgba(156,163,175,0.9)" strokeWidth="1.5"/>
                      {/* area 2 — darker */}
                      <path d="M0,68 C15,64 25,56 40,60 C55,64 65,50 80,44 C95,38 105,52 120,47 C135,42 145,34 160,30 C175,26 185,40 200,36 C215,32 225,26 240,23 C255,20 265,30 280,27 C290,25 295,22 300,20 L300,80 L0,80 Z"
                        fill="rgba(156,163,175,0.3)" stroke="none"/>
                      <path d="M0,68 C15,64 25,56 40,60 C55,64 65,50 80,44 C95,38 105,52 120,47 C135,42 145,34 160,30 C175,26 185,40 200,36 C215,32 225,26 240,23 C255,20 265,30 280,27 C290,25 295,22 300,20"
                        fill="none" stroke="rgba(107,114,128,0.8)" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-300 mt-1">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1"><div className="w-3 h-px bg-gray-300"/><span className="text-[9px] text-gray-400">Headcount</span></div>
                    <div className="flex items-center gap-1"><div className="w-3 h-px bg-gray-500"/><span className="text-[9px] text-gray-400">Attendance</span></div>
                  </div>
                </div>
                {/* Recent activity */}
                <div className="px-4 pb-1">
                  <div className="text-[9px] text-gray-400 mb-1.5">Recent Activity</div>
                </div>
                <div className="flex-1 divide-y divide-gray-100 overflow-hidden">
                  {[
                    { name: "Sarah Okonkwo", action: "Payslip generated", time: "2h ago" },
                    { name: "James Mensah", action: "Leave approved", time: "4h ago" },
                    { name: "Amara Diallo", action: "Onboarding complete", time: "Yesterday" },
                    { name: "Tech Team ×12", action: "Payroll processed", time: "Yesterday" },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2">
                      <div>
                        <div className="text-[11px] font-medium text-gray-800">{act.name}</div>
                        <div className="text-[9px] text-gray-400">{act.action}</div>
                      </div>
                      <span className="text-[9px] text-gray-400 shrink-0">{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
     
      <section id="pricing" className="relative py-20 md:py-32 px-4 animate-on-scroll bg-gray-50">
        <div className="max-w-[1200px] w-full mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-[0.15em] text-[#4a5568] mb-4">PRICING</div>
            <h2 className="text-[32px] md:text-[48px] font-bold mb-6 leading-tight text-gray-900">
              Simple plans<br />for serious work
            </h2>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-1 bg-black/5 rounded-[9px] p-1">
              <button
                onClick={() => setPricingToggle("annually")}
                className={`text-sm font-medium px-3 py-1.5 rounded-[6px] transition-all duration-200 ${pricingToggle === "annually" ? "bg-white text-[#0f1117]" : "text-[#4a5568] hover:bg-white/60"}`}
              >
                Annually
              </button>
              <button
                onClick={() => setPricingToggle("monthly")}
                className={`text-sm font-medium px-3 py-1.5 rounded-[6px] transition-all duration-200 ${pricingToggle === "monthly" ? "bg-white text-[#0f1117]" : "text-[#4a5568] hover:bg-white/60"}`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Comparison table */}
          <div className="rounded-[5px] border border-gray-200 bg-white">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_140px_140px_140px_140px]">
              <div className="p-5 flex flex-col justify-end">
                <p className="text-sm font-semibold text-gray-900 mb-1">Compare plans</p>
                <p className="text-xs text-gray-400 leading-relaxed">Pick the right plan for your team.</p>
              </div>
              <div className="border-l border-gray-200 p-5 text-center">
                <p className="font-medium text-gray-900 text-sm">Basic</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">$0</p>
                <p className="text-xs text-gray-500 mt-0.5">Free forever</p>
              </div>
              <div className="border-l border-gray-200 p-5 text-center bg-gray-100/60 relative overflow-visible">
                {pricingToggle === "annually" && (
                  <span className="absolute -top-1 right-3 bg-green-400 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white">Save 20%</span>
                )}
                <p className="font-medium text-gray-900 text-sm">Premium</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 flex items-baseline justify-center gap-0.5">
                  <span className="flex items-center overflow-hidden h-8">
                    {"$".split("").concat((pricingToggle === "annually" ? "29" : "50").split("")).map((char, i) => (
                      <span
                        key={`${pricingToggle}-${i}`}
                        className="inline-block animate-[slideUp_0.3s_ease-out_both]"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="text-sm font-normal text-gray-500">/mo</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Per workspace</p>
              </div>
              <div className="border-l border-gray-200 p-5 text-center">
                <p className="font-medium text-gray-900 text-sm">Business</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 flex items-baseline justify-center gap-0.5">
                  <span className="flex items-center overflow-hidden h-8">
                    {"$".split("").concat((pricingToggle === "annually" ? "79" : "99").split("")).map((char, i) => (
                      <span
                        key={`${pricingToggle}-${i}`}
                        className="inline-block animate-[slideUp_0.3s_ease-out_both]"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="text-sm font-normal text-gray-500">/mo</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Up to 100 users</p>
              </div>
              <div className="border-l border-gray-200 p-5 text-center">
                <p className="font-medium text-gray-900 text-sm">Enterprise</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">Custom</p>
                <p className="text-xs text-gray-500 mt-0.5">Contact sales</p>
              </div>
            </div>

            {/* Feature rows */}
            {[
              { name: 'Users',             desc: 'Team members with full access',         basic: '2',         premium: '20',       business: '100',        enterprise: 'Unlimited' },
              { name: 'Projects',          desc: 'Active projects you can manage',        basic: 'Unlimited', premium: 'Unlimited', business: 'Unlimited',  enterprise: 'Unlimited' },
              { name: 'Invoices',          desc: 'Professional invoices per month',       basic: '100/mo',    premium: 'Unlimited', business: 'Unlimited',  enterprise: 'Unlimited' },
              { name: 'Time Tracking',     desc: 'Log hours and track billable time',     basic: true,        premium: true,        business: true,         enterprise: true },
              { name: 'CRM',               desc: 'Manage clients and deal pipelines',     basic: true,        premium: true,        business: true,         enterprise: true },
              { name: 'HR Management',     desc: 'Payroll, leaves, employee records',     basic: false,       premium: true,        business: true,         enterprise: true },
              { name: 'POS',               desc: 'Point-of-sale for retail & hospitality',basic: false,       premium: true,        business: true,         enterprise: true },
              { name: 'AI Reports',        desc: 'Smart insights generated automatically',basic: false,       premium: true,        business: true,         enterprise: true },
              { name: 'Invoice Link',      desc: 'Share payment links with clients',      basic: false,       premium: true,        business: false,        enterprise: true },
              { name: 'Custom Webhooks',   desc: 'Connect to external apps via webhooks', basic: false,       premium: false,       business: false,        enterprise: true },
              { name: 'Advanced Security', desc: 'SSO, audit logs and access controls',   basic: false,       premium: false,       business: true,         enterprise: true },
              { name: 'Support',           desc: 'How we help when you need us',          basic: 'Email',     premium: 'Priority',  business: 'Phone & Chat', enterprise: 'Dedicated' },
            ].map((row) => (
              <div key={row.name} className="grid grid-cols-[1fr_140px_140px_140px_140px] border-t border-gray-100">
                <div className="p-4 flex items-center gap-3">
                  <p className="text-sm font-medium text-gray-900">{row.name}</p>
                  <p className="text-xs text-gray-400">{row.desc}</p>
                </div>
                <div className="border-l border-gray-100 p-4 flex items-center justify-center text-sm">
                  {typeof row.basic === 'boolean'
                    ? row.basic ? <Check className="w-4 h-4 text-gray-400" /> : <Minus className="w-4 h-4 text-gray-300" />
                    : <span className="text-gray-900">{row.basic}</span>}
                </div>
                <div className="border-l border-gray-100 p-4 flex items-center justify-center text-sm bg-gray-100/60">
                  {typeof row.premium === 'boolean'
                    ? row.premium ? <Check className="w-4 h-4 text-gray-400" /> : <Minus className="w-4 h-4 text-gray-300" />
                    : <span className="font-medium text-gray-900">{row.premium}</span>}
                </div>
                <div className="border-l border-gray-100 p-4 flex items-center justify-center text-sm">
                  {typeof row.business === 'boolean'
                    ? row.business ? <Check className="w-4 h-4 text-gray-400" /> : <Minus className="w-4 h-4 text-gray-300" />
                    : <span className="text-gray-900">{row.business}</span>}
                </div>
                <div className="border-l border-gray-100 p-4 flex items-center justify-center text-sm">
                  {typeof row.enterprise === 'boolean'
                    ? row.enterprise ? <Check className="w-4 h-4 text-gray-400" /> : <Minus className="w-4 h-4 text-gray-300" />
                    : <span className="text-gray-900">{row.enterprise}</span>}
                </div>
              </div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-[1fr_140px_140px_140px_140px] border-t border-gray-100">
              <div className="p-4">
                <p className="text-sm font-medium text-gray-900">Ready to get started?</p>
                <p className="text-xs text-gray-400 mt-0.5">No credit card required for Basic.</p>
              </div>
              <div className="border-l border-gray-100 p-4">
                <a href="https://login.pryro.com">
                  <button className="w-full py-2 rounded-[5px] border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-all">Get started</button>
                </a>
              </div>
              <div className="border-l border-gray-100 p-4 bg-gray-100/60">
                <a href="https://login.pryro.com">
                  <button className="w-full py-2 rounded-[5px] bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all">Upgrade</button>
                </a>
              </div>
              <div className="border-l border-gray-100 p-4">
                <a href="https://login.pryro.com">
                  <button className="w-full py-2 rounded-[5px] border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-all">Get Business</button>
                </a>
              </div>
              <div className="border-l border-gray-100 p-4">
                <a href="/contact">
                  <button className="w-full py-2 rounded-[5px] border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-all">Contact sales</button>
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-gray-500">Trusted by 64,000+ businesses, startups, NGOs, and studios</div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 px-4 animate-on-scroll overflow-hidden bg-gray-50 rounded-none">
        <div className="max-w-[1120px] w-full mx-auto text-center">
          <h2 className="text-[32px] md:text-[48px] font-bold mb-12 leading-tight text-gray-900">
            Finally, one platform that actually<br />runs our whole operation
          </h2>

          <div className="text-base font-medium mb-1">Kofi</div>
          <div className="text-sm text-gray-600 mb-16">CEO, Accra Fresh Foods</div>

          <div className="relative max-w-6xl mx-auto">
            <div className="flex items-stretch justify-center gap-6">
              {[
                { text: 'We used to manage invoices in Excel and chase payments over WhatsApp. Pryro cleaned all that up in the first week. Our clients noticed the difference immediately.', name: 'Amara', role: 'Founder, Dakar Studio Co.', avatar: 'https://i.pravatar.cc/150?img=38' },
                { text: 'Our accountant recommended we try Pryro and it was the best decision we made this year. Payroll, expenses, and reports all in one place.', name: 'Ngozi', role: 'MD, Eze Logistics Ltd.', avatar: 'https://i.pravatar.cc/150?img=45' },
                { text: "I run a small construction firm and keeping track of projects, staff, and suppliers was a nightmare. Pryro made it manageable. I actually know what's going on now.", name: 'Kwame', role: 'Director, Asante Build Group', avatar: 'https://i.pravatar.cc/150?img=12' },
                { text: "The invoicing and CRM features alone justified the switch. We've reduced unpaid invoices by over 60% since going live three months ago.", name: 'Fatou', role: 'Finance Lead, Camara Trading', avatar: 'https://i.pravatar.cc/150?img=47' },
                { text: 'Setting it up took less than a day. The HR module handles leave requests and payroll automatically. My team stopped complaining about admin work.', name: 'James', role: 'COO, Okonkwo & Partners', avatar: 'https://i.pravatar.cc/150?img=33' },
                { text: 'We manage stock across three branches and Pryro keeps everything in sync. Low stock alerts have basically eliminated stockouts for us.', name: 'Aissatou', role: 'Operations Manager, Bah Retail', avatar: 'https://i.pravatar.cc/150?img=44' },
                { text: 'As a non-profit we needed something affordable that still did everything. Pryro fit perfectly - donor tracking, expense reports, and team management all covered.', name: 'Emmanuel', role: 'Executive Director, Hope Forward NGO', avatar: 'https://i.pravatar.cc/150?img=15' },
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
                    <div className="bg-white rounded-none p-6 text-left h-full flex flex-col">
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

      <div style={{ background: "linear-gradient(to bottom, #F9FAFB 0%, #F3F4F6 15%, #E5E7EB 28%, #DBEAFE 48%, #93C5FD 62%, #3B82F6 76%, #2563EB 88%, #1E40AF 100%)" }}>
      <section
        id="cta"
        className="relative py-20 md:py-40 px-4 animate-on-scroll pt-0 bg-transparent"
      >
        <div className="max-w-[800px] w-full mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 glass-pill px-3 py-1 rounded-[5px] mb-8 text-[10px] text-[#4a5568]">
            <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
            Transform your business
          </div>

          <h2 className="font-serif text-[40px] leading-[1.15] md:text-[64px] md:leading-[1.1] font-medium mb-6 text-balance">
            Join thousands of successful businesses
          </h2>
          <p className="text-[#4a5568] text-base md:text-lg mb-10 leading-relaxed max-w-[560px] mx-auto">
            Together, we're building smarter enterprises. Start optimizing your operations today.
          </p>

          <div className="flex justify-center">
            <a href="https://login.pryro.com">
              <Button className="text-base rounded-[5px] bg-blue-600 border border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition-all duration-300 text-white px-8 py-6 md:text-base flex items-center gap-2">
                Get Started Today <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <footer className="relative px-4 py-8 pt-16 bg-transparent">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-12">
            {/* Brand Column */}
            <div className="flex flex-col gap-4">
              <div className="w-fit">
                <img src="/pryro logo.png" alt="Pryro" className="h-8 w-auto" />
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Empowering businesses worldwide with intelligent ERP solutions and automation.
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://twitter.com/pryro.co"
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
                  href="https://youtube.com/pryroo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/pryro.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Solutions Menu */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Solutions</div>
              <div className="flex flex-col gap-3">
                <a href="/small-business" className="text-sm text-white/80 hover:text-white transition-colors">Small Business</a>
                <a href="/accountants-bookkeepers" className="text-sm text-white/80 hover:text-white transition-colors">Accountants & Bookkeepers</a>
                <a href="/project" className="text-sm text-white/80 hover:text-white transition-colors">Project</a>
                <a href="/human-resource" className="text-sm text-white/80 hover:text-white transition-colors">Human Resource</a>
                <a href="/stock-management" className="text-sm text-white/80 hover:text-white transition-colors">Stock Management</a>
                <a href="/customer-relation" className="text-sm text-white/80 hover:text-white transition-colors">Customer Relation</a>
                <a href="/self-employed" className="text-sm text-white/80 hover:text-white transition-colors">Self-employed</a>
                <a href="/non-profit" className="text-sm text-white/80 hover:text-white transition-colors">Non-profit</a>
                <a href="/hospitality" className="text-sm text-white/80 hover:text-white transition-colors">Hospitality</a>
                <a href="/construction" className="text-sm text-white/80 hover:text-white transition-colors">Construction</a>
                <a href="/logistic" className="text-sm text-white/80 hover:text-white transition-colors">Logistic</a>
                <a href="/marketing-mail" className="text-sm text-white/80 hover:text-white transition-colors">Marketing (Mail)</a>
                <a href="/marketing-call" className="text-sm text-white/80 hover:text-white transition-colors">Marketing (Call)</a>
                <a href="/ai-enterprise" className="text-sm text-white/80 hover:text-white transition-colors">AI for Enterprise</a>
              </div>
            </div>

            {/* Product Menu */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Product</div>
              <div className="flex flex-col gap-3">
                <a href="/features" className="text-sm text-white/80 hover:text-white transition-colors">
                  Features
                </a>
                <a href="/pricing" className="text-sm text-white/80 hover:text-white transition-colors">
                  Pricing
                </a>
                <a href="/documentation" className="text-sm text-white/80 hover:text-white transition-colors">
                  Documentation
                </a>
                <a href="/api" className="text-sm text-white/80 hover:text-white transition-colors">
                  API
                </a>
              </div>
            </div>

            {/* Company Menu */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Company</div>
              <div className="flex flex-col gap-3">
                <a href="/about" className="text-sm text-white/80 hover:text-white transition-colors">
                  About
                </a>
                <a href="/careers" className="text-sm text-white/80 hover:text-white transition-colors">
                  Careers
                </a>
                <a href="/contact" className="text-sm text-white/80 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* WhatsApp Contact */}
            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-white font-semibold mb-2">Contact Us</div>
              <p className="text-xs text-white/80 mb-3">Send us a direct message on WhatsApp.</p>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Type your message"
                  id="whatsapp-message"
                  className="px-4 py-1.5 bg-white/20 border border-white/30 rounded-[5px] text-xs text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30 transition-all"
                />
                <button 
                  onClick={() => {
                    const message = (document.getElementById('whatsapp-message') as HTMLInputElement)?.value || '';
                    window.open(`https://wa.me/250788715075?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="px-4 py-1.5 border rounded-[5px] text-xs font-medium hover:bg-white/90 transition-all bg-white border-white text-blue-600"
                >
                  Send WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/80">
            <div>© 2026 Pryro. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-white transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
const IntegrationCard = ({ children, className, borderClassName }: { children: React.ReactNode; className?: string; borderClassName?: string }) => {
  return (
    <div className={`relative flex size-20 rounded-xl bg-white ${className || ''}`}>
      <div
        role="presentation"
        className={`absolute inset-0 rounded-xl border border-black/20 ${borderClassName || ''}`}
      />
      <div className="relative z-20 m-auto size-fit text-gray-700">{children}</div>
    </div>
  )
}

