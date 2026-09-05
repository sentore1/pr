"use client"

import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ExternalLink, RefreshCw } from 'lucide-react'

interface SEOData {
  meta_title: string; meta_description: string; meta_keywords: string
  og_title: string; og_description: string; og_image: string; og_type: string
  twitter_card: string; twitter_title: string; twitter_description: string; twitter_image: string
  canonical_url: string; robots: string
}

interface Redirect { id?: number; source_url: string; destination_url: string; redirect_type: '301' | '302' | '307'; is_active: boolean }

const EMPTY_SEO: SEOData = {
  meta_title: '', meta_description: '', meta_keywords: '',
  og_title: '', og_description: '', og_image: '', og_type: 'website',
  twitter_card: 'summary_large_image', twitter_title: '', twitter_description: '', twitter_image: '',
  canonical_url: '', robots: 'index, follow',
}

function charCount(s: string, max: number) {
  const over = s.length > max
  return <span className={`text-xs ml-1 ${over ? 'text-red-500' : 'text-gray-400'}`}>{s.length}/{max}</span>
}

export default function SEOPage() {
  const [tab, setTab] = useState<'global' | 'redirects' | 'sitemap'>('global')
  const [seo, setSeo] = useState<SEOData>(EMPTY_SEO)
  const [redirects, setRedirects] = useState<Redirect[]>([])
  const [sitemapUrls, setSitemapUrls] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    const [seoRes, redRes, siteRes] = await Promise.all([
      fetch('/api/admin/seo/global'),
      fetch('/api/admin/seo/redirects'),
      fetch('/api/admin/seo/sitemap'),
    ])
    const seoD = await seoRes.json()
    const redD = await redRes.json()
    const siteD = await siteRes.json()
    if (seoD.success && seoD.data) setSeo({ ...EMPTY_SEO, ...seoD.data })
    if (redD.success) setRedirects(redD.data || [])
    if (siteD.success) setSitemapUrls((siteD.data || []).map((s: any) => s.url))
  }

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }
  function set(key: keyof SEOData, val: string) { setSeo(prev => ({ ...prev, [key]: val })) }

  async function saveSeo() {
    setSaving(true)
    const res = await fetch('/api/admin/seo/global', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(seo),
    })
    const d = await res.json()
    flash(d.success ? '✓ SEO settings saved' : '✗ ' + d.error)
    setSaving(false)
  }

  async function saveRedirects() {
    setSaving(true)
    const res = await fetch('/api/admin/seo/redirects', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ redirects }),
    })
    const d = await res.json()
    flash(d.success ? '✓ Redirects saved' : '✗ ' + d.error)
    setSaving(false)
  }

  async function generateSitemap() {
    setSaving(true)
    const res = await fetch('/api/admin/seo/sitemap/generate', { method: 'POST' })
    const d = await res.json()
    flash(d.success ? '✓ Sitemap generated' : '✗ ' + d.error)
    setSaving(false)
  }

  const previewTitle = seo.meta_title || 'Page Title'
  const previewDesc = seo.meta_description || 'Page description will appear here in search results.'

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">SEO Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Meta tags, redirects, and sitemap</p>
        </div>
        {msg && <span className={`text-sm px-3 py-1 rounded-full ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</span>}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(['global', 'redirects', 'sitemap'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${tab === t ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {t === 'global' ? 'Global SEO' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* ── GLOBAL SEO ── */}
      {tab === 'global' && (
        <div className="space-y-5">
          {/* SERP preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Search Result Preview</h2>
            <div className="border border-gray-200 rounded-lg p-4 bg-white max-w-xl">
              <p className="text-xs text-green-700 mb-1">{seo.canonical_url || 'https://pryro.com'}</p>
              <p className="text-blue-700 text-lg font-medium hover:underline cursor-pointer leading-tight mb-1 truncate">{previewTitle}</p>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{previewDesc}</p>
            </div>
          </div>

          {/* Meta tags */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-800">Meta Tags</h2>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">Meta Title</label>
                {charCount(seo.meta_title, 60)}
              </div>
              <input value={seo.meta_title} onChange={e => set('meta_title', e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-600">Meta Description</label>
                {charCount(seo.meta_description, 160)}
              </div>
              <textarea value={seo.meta_description} onChange={e => set('meta_description', e.target.value)} rows={3}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Keywords <span className="text-gray-400">(comma-separated)</span></label>
              <input value={seo.meta_keywords} onChange={e => set('meta_keywords', e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Canonical URL</label>
                <input value={seo.canonical_url} onChange={e => set('canonical_url', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Robots</label>
                <select value={seo.robots} onChange={e => set('robots', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none">
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </div>
          </div>

          {/* Open Graph */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-800">Open Graph (Social Sharing)</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 mb-1 block">OG Title</label>
                <input value={seo.og_title} onChange={e => set('og_title', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 mb-1 block">OG Description</label>
                <textarea value={seo.og_description} onChange={e => set('og_description', e.target.value)} rows={2}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">OG Image URL</label>
                <input value={seo.og_image} onChange={e => set('og_image', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">OG Type</label>
                <select value={seo.og_type} onChange={e => set('og_type', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none">
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                </select>
              </div>
            </div>
          </div>

          {/* Twitter */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-800">Twitter Card</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Card Type</label>
                <select value={seo.twitter_card} onChange={e => set('twitter_card', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none">
                  <option value="summary_large_image">summary_large_image</option>
                  <option value="summary">summary</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Twitter Title</label>
                <input value={seo.twitter_title} onChange={e => set('twitter_title', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 mb-1 block">Twitter Description</label>
                <textarea value={seo.twitter_description} onChange={e => set('twitter_description', e.target.value)} rows={2}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 mb-1 block">Twitter Image URL</label>
                <input value={seo.twitter_image} onChange={e => set('twitter_image', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
            </div>
          </div>

          <button onClick={saveSeo} disabled={saving}
            className="flex items-center gap-2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-md hover:bg-gray-800 disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save SEO Settings'}
          </button>
        </div>
      )}

      {/* ── REDIRECTS ── */}
      {tab === 'redirects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Manage 301/302/307 URL redirects</p>
            <div className="flex gap-2">
              <button onClick={() => setRedirects(prev => [...prev, { source_url: '/old-path', destination_url: '/new-path', redirect_type: '301', is_active: true }])}
                className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
                <Plus className="w-3.5 h-3.5" /> Add Redirect
              </button>
              <button onClick={saveRedirects} disabled={saving}
                className="flex items-center gap-1.5 text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 disabled:opacity-50">
                <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-50">
            {redirects.length === 0 && <p className="text-sm text-gray-400 px-5 py-8 text-center">No redirects configured.</p>}
            {redirects.map((r, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <input value={r.source_url} onChange={e => setRedirects(prev => prev.map((x, j) => j === i ? { ...x, source_url: e.target.value } : x))}
                  className="flex-1 text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="/source-path" />
                <span className="text-gray-400 flex-shrink-0">→</span>
                <input value={r.destination_url} onChange={e => setRedirects(prev => prev.map((x, j) => j === i ? { ...x, destination_url: e.target.value } : x))}
                  className="flex-1 text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="/destination-path" />
                <select value={r.redirect_type} onChange={e => setRedirects(prev => prev.map((x, j) => j === i ? { ...x, redirect_type: e.target.value as Redirect['redirect_type'] } : x))}
                  className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none">
                  <option value="301">301</option>
                  <option value="302">302</option>
                  <option value="307">307</option>
                </select>
                <button onClick={() => setRedirects(prev => prev.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SITEMAP ── */}
      {tab === 'sitemap' && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-800">XML Sitemap</h2>
              <div className="flex gap-2">
                <a href="/sitemap.xml" target="_blank" className="flex items-center gap-1.5 text-xs border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50">
                  <ExternalLink className="w-3.5 h-3.5" /> View sitemap.xml
                </a>
                <button onClick={generateSitemap} disabled={saving}
                  className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-50">
                  <RefreshCw className="w-3.5 h-3.5" /> {saving ? 'Generating…' : 'Regenerate'}
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">The sitemap is automatically served at <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">/sitemap.xml</code>.</p>
            {sitemapUrls.length > 0 && (
              <div className="border border-gray-100 rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 font-medium border-b border-gray-100">{sitemapUrls.length} URLs in sitemap</div>
                <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                  {sitemapUrls.map((url, i) => (
                    <div key={i} className="px-4 py-2 text-sm text-gray-700 font-mono">{url}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
