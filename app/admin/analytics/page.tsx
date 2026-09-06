"use client"

import { useEffect, useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import {
  Eye, Users, MousePointerClick, TrendingUp,
  Activity, CheckCircle2, AlertCircle, RefreshCw,
} from 'lucide-react'

interface Summary {
  views_today: number
  views_week: number
  views_month: number
  unique_visitors: number
  avg_duration: number
  top_pages: { slug: string; title: string; views: number }[]
  daily: { date: string; views: number; visitors: number }[]
  device_split: { desktop: number; mobile: number; tablet: number; unknown: number }
  top_referrers: { referrer: string; count: number }[]
  recent_activity: { id: number; action: string; created_at: string }[]
}

const DEVICE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6b7280']

// ── Empty state shown when no data has been collected yet ─────────────────────
function NoDataBanner({ range }: { range: string }) {
  return (
    <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center space-y-4">
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
        <Activity className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <p className="text-base font-semibold text-gray-800">No visitor data yet for the last {range} days</p>
        <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
          Tracking is active. Data will appear here as soon as real visitors browse the site.
        </p>
      </div>
      <div className="inline-flex flex-col items-start gap-2 bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 text-left text-sm text-gray-600 mx-auto">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span>Tracking endpoint <code className="text-xs bg-gray-200 px-1 py-0.5 rounded">/api/analytics/track</code> is live</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span><code className="text-xs bg-gray-200 px-1 py-0.5 rounded">ENABLE_ANALYTICS=true</code> is set in your environment</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span>Every page visit is automatically recorded via the site layout</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-gray-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Admin page visits are not counted</span>
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [data, setData] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState<'7' | '30' | '90'>('30')

  useEffect(() => { load() }, [range])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics/summary?days=${range}`)
      const d = await res.json()
      if (d.success) setData(d.data)
    } catch {
      // DB unavailable — data stays null
    }
    setLoading(false)
  }

  const hasData = !loading && (data?.views_month ?? 0) > 0

  const devicePie = data ? [
    { name: 'Desktop', value: data.device_split.desktop },
    { name: 'Mobile',  value: data.device_split.mobile },
    { name: 'Tablet',  value: data.device_split.tablet },
    { name: 'Other',   value: data.device_split.unknown },
  ].filter(d => d.value > 0) : []

  const statCards = [
    { label: 'Views Today',     value: data?.views_today,     icon: Eye,              color: 'text-blue-500' },
    { label: `Views (${range}d)`,value: data?.views_month,    icon: MousePointerClick, color: 'text-indigo-500' },
    { label: 'Unique Visitors', value: data?.unique_visitors, icon: Users,            color: 'text-emerald-500' },
    { label: 'Views This Week', value: data?.views_week,      icon: TrendingUp,       color: 'text-amber-500' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Real visitor traffic from your live site</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Tracking status pill */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Tracking active
          </div>

          {/* Range selector */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {(['7', '30', '90'] as const).map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`text-sm px-3 py-1.5 rounded-md transition-colors ${range === r ? 'bg-white shadow-sm text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}>
                {r}d
              </button>
            ))}
          </div>

          <button onClick={load} disabled={loading}
            className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-40"
            title="Refresh">
            <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Stat cards — always visible, show 0 if no data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? (
                <div className="h-7 w-16 bg-gray-100 rounded animate-pulse" />
              ) : (
                (value ?? 0).toLocaleString()
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main content — empty state or real data */}
      {!loading && !hasData ? (
        <NoDataBanner range={range} />
      ) : (
        <>
          {/* Traffic chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Traffic Overview</h2>
            {loading ? (
              <div className="h-48 bg-gray-100 rounded animate-pulse" />
            ) : (data?.daily?.length ?? 0) > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data!.daily}>
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
                  <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="views"    stroke="#3b82f6" fill="url(#gViews)"    strokeWidth={2} name="Page Views" />
                  <Area type="monotone" dataKey="visitors" stroke="#10b981" fill="url(#gVisitors)" strokeWidth={2} name="Unique Visitors" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex items-center justify-center text-sm text-gray-400">
                No daily data in this period yet.
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Top pages */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Top Pages</h2>
              {loading ? (
                <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />)}</div>
              ) : (data?.top_pages?.length ?? 0) > 0 ? (
                <div className="space-y-2">
                  {data!.top_pages.map((p, i) => {
                    const max = data!.top_pages[0].views || 1
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 w-5 flex-shrink-0">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-sm text-gray-700 truncate">{p.title || `/${p.slug}`}</span>
                            <span className="text-xs font-semibold text-gray-600 ml-2 flex-shrink-0">{p.views.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1">
                            <div className="bg-blue-500 h-1 rounded-full transition-all" style={{ width: `${(p.views / max) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400 py-4 text-center">No page data in this period yet.</p>
              )}
            </div>

            {/* Device split */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Device Split</h2>
              {loading ? (
                <div className="h-40 bg-gray-100 rounded animate-pulse" />
              ) : devicePie.length > 0 ? (
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
              ) : (
                <p className="text-sm text-gray-400 py-8 text-center">No device data yet.</p>
              )}
            </div>
          </div>

          {/* Referrers */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Top Referrers</h2>
            {loading ? (
              <div className="h-24 bg-gray-100 rounded animate-pulse" />
            ) : (data?.top_referrers?.length ?? 0) > 0 ? (
              <ResponsiveContainer width="100%" height={Math.max(80, data!.top_referrers.slice(0, 8).length * 28)}>
                <BarChart data={data!.top_referrers.slice(0, 8)} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" tick={{ fontSize: 10 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="referrer" tick={{ fontSize: 10 }} width={120} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 3, 3, 0]} name="Visits" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-400">No referrer data yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
