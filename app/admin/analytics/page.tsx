"use client"

import { useEffect, useState } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { Eye, Users, MousePointerClick, Clock, Monitor, Smartphone, Tablet } from 'lucide-react'

interface Summary {
  views_today: number; views_week: number; views_month: number
  unique_visitors: number; avg_duration: number; bounce_rate: number
  top_pages: { slug: string; title: string; views: number }[]
  daily: { date: string; views: number; visitors: number }[]
  device_split: { desktop: number; mobile: number; tablet: number; unknown: number }
  top_referrers: { referrer: string; count: number }[]
}

const DEVICE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6b7280']

export default function AnalyticsPage() {
  const [data, setData] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState<'7' | '30' | '90'>('30')

  useEffect(() => { load() }, [range])

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/admin/analytics/summary?days=${range}`)
    const d = await res.json()
    if (d.success) setData(d.data)
    setLoading(false)
  }

  const devicePie = data ? [
    { name: 'Desktop', value: data.device_split.desktop },
    { name: 'Mobile',  value: data.device_split.mobile },
    { name: 'Tablet',  value: data.device_split.tablet },
    { name: 'Other',   value: data.device_split.unknown },
  ].filter(d => d.value > 0) : []

  const statCards = [
    { label: 'Views Today',    value: data?.views_today,    icon: Eye,              suffix: '' },
    { label: 'Views (Period)', value: data?.views_month,    icon: MousePointerClick, suffix: '' },
    { label: 'Unique Visitors',value: data?.unique_visitors,icon: Users,            suffix: '' },
    { label: 'Avg. Duration',  value: data?.avg_duration,   icon: Clock,            suffix: 's' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Visitor traffic and engagement insights</p>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {(['7', '30', '90'] as const).map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`text-sm px-3 py-1.5 rounded-md transition-colors ${range === r ? 'bg-white shadow-sm text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>
              {r}d
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, suffix }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
              <Icon className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '…' : value !== undefined ? (value.toLocaleString() + suffix) : '—'}
            </div>
          </div>
        ))}
      </div>

      {/* Traffic chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Traffic Overview</h2>
        {loading ? (
          <div className="h-48 bg-gray-100 rounded animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data?.daily || []}>
              <defs>
                <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="views" stroke="#3b82f6" fill="url(#gViews)" strokeWidth={2} name="Page Views" />
              <Area type="monotone" dataKey="visitors" stroke="#10b981" fill="url(#gVisitors)" strokeWidth={2} name="Unique Visitors" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Top pages */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Top Pages</h2>
          {loading ? (
            <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />)}</div>
          ) : (
            <div className="space-y-2">
              {(data?.top_pages || []).map((p, i) => {
                const max = data?.top_pages?.[0]?.views || 1
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm text-gray-700 truncate">{p.title || p.slug}</span>
                        <span className="text-xs font-semibold text-gray-600 ml-2 flex-shrink-0">{p.views.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1">
                        <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${(p.views / max) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                )
              })}
              {!data?.top_pages?.length && <p className="text-sm text-gray-400">No page data yet.</p>}
            </div>
          )}
        </div>

        {/* Device split */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Device Split</h2>
          {loading ? (
            <div className="h-40 bg-gray-100 rounded animate-pulse" />
          ) : devicePie.length ? (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={devicePie} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                    {devicePie.map((_, i) => <Cell key={i} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => [`${v}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1 mt-2">
                {devicePie.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: DEVICE_COLORS[i] }} />
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="font-semibold text-gray-700">{d.value}%</span>
                  </div>
                ))}
              </div>
            </>
          ) : <p className="text-sm text-gray-400">No device data yet.</p>}
        </div>
      </div>

      {/* Referrers */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Top Referrers</h2>
        {loading ? (
          <div className="h-24 bg-gray-100 rounded animate-pulse" />
        ) : (data?.top_referrers?.length || 0) > 0 ? (
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={data!.top_referrers.slice(0, 8)} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="referrer" tick={{ fontSize: 10 }} width={120} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 3, 3, 0]} name="Visits" />
            </BarChart>
          </ResponsiveContainer>
        ) : <p className="text-sm text-gray-400">No referrer data yet.</p>}
      </div>
    </div>
  )
}
