"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BarChart2, Eye, Users, MousePointerClick, Navigation, Type, Image, Palette, Search, PanelBottom, ArrowUpRight, Activity } from 'lucide-react'

interface Stats {
  views_today: number
  views_week: number
  unique_visitors: number
  top_pages: { slug: string; title: string; views: number }[]
  device_split: { desktop: number; mobile: number; tablet: number }
  recent_activity: { action: string; entity_type: string; created_at: string }[]
}

const QUICK_LINKS = [
  { label: 'Navigation',  href: '/admin/navigation', icon: Navigation,  desc: 'Edit menus & logos' },
  { label: 'Content',     href: '/admin/content',    icon: Type,        desc: 'Edit page content' },
  { label: 'Footer',      href: '/admin/footer',     icon: PanelBottom, desc: 'Edit footer links' },
  { label: 'Theme',       href: '/admin/theme',      icon: Palette,     desc: 'Colors, fonts, borders' },
  { label: 'Media',       href: '/admin/media',      icon: Image,       desc: 'Upload & manage images' },
  { label: 'SEO',         href: '/admin/seo',        icon: Search,      desc: 'Meta tags & sitemap' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/analytics/summary')
      .then(r => r.json())
      .then(d => { if (d.success) setStats(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const statCards = [
    { label: 'Views Today',       value: stats?.views_today ?? '—',      icon: Eye,              color: 'text-blue-600',  bg: 'bg-blue-50' },
    { label: 'Views This Week',   value: stats?.views_week ?? '—',       icon: BarChart2,        color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Unique Visitors',   value: stats?.unique_visitors ?? '—',  icon: Users,            color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Desktop / Mobile',  value: stats ? `${stats.device_split.desktop}% / ${stats.device_split.mobile}%` : '—', icon: MousePointerClick, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your site and CMS activity</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-4.5 h-4.5 ${color}`} size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{loading ? '…' : value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_LINKS.map(({ label, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 mb-2 transition-colors" />
              <div className="text-sm font-medium text-gray-800">{label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Top Pages</h2>
            <Link href="/admin/analytics" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-2">{[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
            ))}</div>
          ) : stats?.top_pages?.length ? (
            <div className="space-y-1">
              {stats.top_pages.map((p, i) => (
                <div key={`${p.slug}-${i}`} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700 truncate">{p.title || p.slug}</span>
                  <span className="text-xs font-semibold text-gray-500 ml-4 flex-shrink-0">{p.views.toLocaleString()} views</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No data yet. Views will appear here once tracking is active.</p>
          )}
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Recent Activity
            </h2>
          </div>
          {loading ? (
            <div className="space-y-2">{[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
            ))}</div>
          ) : stats?.recent_activity?.length ? (
            <div className="space-y-1">
              {stats.recent_activity.slice(0, 8).map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-gray-700">{a.action}</span>
                    {a.entity_type && <span className="text-xs text-gray-400 ml-1">· {a.entity_type}</span>}
                    <div className="text-xs text-gray-400">{new Date(a.created_at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No activity recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
