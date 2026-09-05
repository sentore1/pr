"use client"

import { useEffect, useState } from 'react'
import { Save, RefreshCw, Database, Globe, Mail, Shield } from 'lucide-react'

interface Setting { setting_key: string; setting_value: string; description: string | null; data_type: string }

const SECTIONS = [
  {
    id: 'site',
    label: 'Site',
    icon: Globe,
    keys: ['site_name', 'site_tagline', 'analytics_enabled', 'maintenance_mode'],
  },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [dbStatus, setDbStatus] = useState<'checking' | 'ok' | 'error'>('checking')

  useEffect(() => { load(); checkDb() }, [])

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/settings')
    const d = await res.json()
    if (d.success) {
      const map: Record<string, string> = {}
      for (const s of (d.data || []) as Setting[]) map[s.setting_key] = s.setting_value ?? ''
      setSettings(map)
    }
    setLoading(false)
  }

  async function checkDb() {
    try {
      const res = await fetch('/api/admin/settings/db-check')
      const d = await res.json()
      setDbStatus(d.success ? 'ok' : 'error')
    } catch { setDbStatus('error') }
  }

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  function set(key: string, val: string) { setSettings(prev => ({ ...prev, [key]: val })) }

  async function save() {
    setSaving(true)
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings }),
    })
    const d = await res.json()
    flash(d.success ? '✓ Settings saved' : '✗ ' + d.error)
    setSaving(false)
  }

  const FIELDS = [
    { key: 'site_name',           label: 'Site Name',          type: 'text',     placeholder: 'Pryro' },
    { key: 'site_tagline',        label: 'Site Tagline',        type: 'text',     placeholder: 'Business management, finally simple' },
    { key: 'analytics_enabled',   label: 'Analytics Tracking',  type: 'toggle',   placeholder: '' },
    { key: 'maintenance_mode',    label: 'Maintenance Mode',    type: 'toggle',   placeholder: '' },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">System configuration and diagnostics</p>
        </div>
        <div className="flex gap-3 items-center">
          {msg && <span className={`text-sm px-3 py-1 rounded-full ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</span>}
          <button onClick={save} disabled={saving || loading}
            className="flex items-center gap-1.5 text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* System status */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <h2 className="font-medium text-gray-800 flex items-center gap-2">
          <Database className="w-4 h-4" /> System Status
        </h2>
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <div>
            <p className="text-sm text-gray-700">MySQL Database</p>
            <p className="text-xs text-gray-400">Connection to pryro_cms</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${dbStatus === 'ok' ? 'bg-green-500' : dbStatus === 'error' ? 'bg-red-500' : 'bg-amber-400 animate-pulse'}`} />
            <span className={`text-xs font-medium ${dbStatus === 'ok' ? 'text-green-600' : dbStatus === 'error' ? 'text-red-600' : 'text-amber-600'}`}>
              {dbStatus === 'ok' ? 'Connected' : dbStatus === 'error' ? 'Error' : 'Checking…'}
            </span>
            <button onClick={checkDb} className="text-gray-400 hover:text-gray-600 ml-1">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm text-gray-700">Node Environment</p>
            <p className="text-xs text-gray-400">Runtime mode</p>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${process.env.NODE_ENV === 'production' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
            {typeof window === 'undefined' ? '…' : process.env.NODE_ENV || 'development'}
          </span>
        </div>
      </div>

      {/* Site settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-5">
        <h2 className="font-medium text-gray-800 flex items-center gap-2">
          <Globe className="w-4 h-4" /> Site Settings
        </h2>
        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />)}</div>
        ) : (
          FIELDS.map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              {type === 'toggle' ? (
                <button
                  onClick={() => set(key, settings[key] === 'true' ? 'false' : 'true')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings[key] === 'true' ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings[key] === 'true' ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              ) : (
                <input value={settings[key] ?? ''} onChange={e => set(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Security info */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <h2 className="font-medium text-gray-800 flex items-center gap-2">
          <Shield className="w-4 h-4" /> Security
        </h2>
        <p className="text-sm text-gray-500">
          JWT secret and NextAuth secret are configured via environment variables in <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">.env.local</code>.
          Never commit that file to version control.
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            { label: 'JWT Secret',      key: 'JWT_SECRET' },
            { label: 'NextAuth Secret', key: 'NEXTAUTH_SECRET' },
          ].map(({ label, key }) => (
            <div key={key} className="border border-gray-100 rounded-lg p-3">
              <p className="text-gray-500 mb-1">{label}</p>
              <p className="font-mono text-gray-800">
                {process.env[key] ? '••••••••••••••••' : <span className="text-red-500">Not set</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
