"use client"

import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ExternalLink, RefreshCw, Eye, EyeOff, CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SEOData {
  meta_title: string; meta_description: string; meta_keywords: string
  og_title: string; og_description: string; og_image: string; og_type: string
  twitter_card: string; twitter_title: string; twitter_description: string
  twitter_image: string; twitter_handle: string
  canonical_url: string; robots: string
  structured_data: string  // JSON string edited in textarea
}

interface Redirect {
  id?: number
  source_url: string; destination_url: string
  redirect_type: '301' | '302' | '307'; is_active: boolean
}

interface SitemapEntry {
  id?: number
  url: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  last_modified?: string
  is_active: boolean
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EMPTY_SEO: SEOData = {
  meta_title: '', meta_description: '', meta_keywords: '',
  og_title: '', og_description: '', og_image: '', og_type: 'website',
  twitter_card: 'summary_large_image', twitter_title: '', twitter_description: '',
  twitter_image: '', twitter_handle: '',
  canonical_url: '', robots: 'index, follow',
  structured_data: '',
}

const CHANGEFREQ_OPTIONS = ['always','hourly','daily','weekly','monthly','yearly','never'] as const

const DEFAULT_JSON_LD = `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://example.com"
}`

// ─── Helpers ──────────────────────────────────────────────────────────────────

function charBar(len: number, max: number) {
  const pct = Math.min(len / max, 1)
  const color = pct > 1 ? 'bg-red-500' : pct > 0.85 ? 'bg-amber-400' : 'bg-emerald-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct * 100}%` }} />
      </div>
      <span className={`text-xs tabular-nums ${len > max ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
        {len}/{max}
      </span>
    </div>
  )
}

// SEO score check item
function Check({ ok, warn, label }: { ok: boolean; warn?: boolean; label: string }) {
  const Icon = ok ? CheckCircle2 : warn ? AlertCircle : XCircle
  const color = ok ? 'text-emerald-500' : warn ? 'text-amber-400' : 'text-red-400'
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${color}`} />
      <span className={`text-xs ${ok ? 'text-gray-600' : warn ? 'text-amber-700' : 'text-red-600'}`}>{label}</span>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SEOPage() {
  const [tab, setTab] = useState<'global' | 'redirects' | 'sitemap'>('global')
  const [seo, setSeo] = useState<SEOData>(EMPTY_SEO)
  const [redirects, setRedirects] = useState<Redirect[]>([])
  const [sitemapEntries, setSitemapEntries] = useState<SitemapEntry[]>([])
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [showOgPreview, setShowOgPreview] = useState(false)
  const [jsonLdError, setJsonLdError] = useState('')
  const [newEntry, setNewEntry] = useState<SitemapEntry>({
    url: '', changefreq: 'weekly', priority: 0.8, is_active: true,
  })
  const [addingEntry, setAddingEntry] = useState(false)

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    const [seoRes, redRes, siteRes] = await Promise.all([
      fetch('/api/admin/seo/global'),
      fetch('/api/admin/seo/redirects'),
      fetch('/api/admin/seo/sitemap'),
    ])
    const [seoD, redD, siteD] = await Promise.all([seoRes.json(), redRes.json(), siteRes.json()])

    if (seoD.success && seoD.data) {
      const raw = seoD.data
      setSeo({
        ...EMPTY_SEO, ...raw,
        structured_data: raw.structured_data
          ? (typeof raw.structured_data === 'string'
              ? raw.structured_data
              : JSON.stringify(raw.structured_data, null, 2))
          : '',
        twitter_handle: raw.twitter_handle || '',
      })
    }
    if (redD.success) setRedirects(redD.data || [])
    if (siteD.success) setSitemapEntries(siteD.data || [])
  }

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 4000) }
  function set(key: keyof SEOData, val: string) { setSeo(prev => ({ ...prev, [key]: val })) }

  // ── Global SEO save ──────────────────────────────────────────────────────────
  async function saveSeo() {
    // Validate JSON-LD if filled in
    if (seo.structured_data.trim()) {
      try { JSON.parse(seo.structured_data) }
      catch { flash('✗ Structured data contains invalid JSON'); return }
    }
    setSaving(true)
    const payload = {
      ...seo,
      structured_data: seo.structured_data.trim()
        ? JSON.parse(seo.structured_data)
        : null,
    }
    const res = await fetch('/api/admin/seo/global', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    })
    const d = await res.json()
    flash(d.success ? '✓ SEO settings saved — cache cleared' : '✗ ' + d.error)
    setSaving(false)
  }

  // ── Redirects save ───────────────────────────────────────────────────────────
  async function saveRedirects() {
    setSaving(true)
    const res = await fetch('/api/admin/seo/redirects', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ redirects }),
    })
    const d = await res.json()
    flash(d.success ? '✓ Redirects saved' : '✗ ' + d.error)
    setSaving(false)
  }

  // ── Sitemap entry operations ─────────────────────────────────────────────────
  async function addSitemapEntry() {
    if (!newEntry.url.startsWith('/')) {
      flash('✗ URL must start with /'); return
    }
    setSaving(true)
    const res = await fetch('/api/admin/seo/sitemap/entries', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newEntry),
    })
    const d = await res.json()
    if (d.success) {
      setSitemapEntries(d.data)
      setNewEntry({ url: '', changefreq: 'weekly', priority: 0.8, is_active: true })
      setAddingEntry(false)
      flash('✓ URL added to sitemap')
    } else {
      flash('✗ ' + d.error)
    }
    setSaving(false)
  }

  async function toggleSitemapEntry(entry: SitemapEntry) {
    if (!entry.id) return
    const res = await fetch(`/api/admin/seo/sitemap/entries/${entry.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !entry.is_active }),
    })
    const d = await res.json()
    if (d.success) {
      setSitemapEntries(prev => prev.map(e => e.id === entry.id ? { ...e, is_active: !e.is_active } : e))
    } else flash('✗ ' + d.error)
  }

  async function updateSitemapEntry(entry: SitemapEntry, field: keyof SitemapEntry, value: any) {
    if (!entry.id) return
    const res = await fetch(`/api/admin/seo/sitemap/entries/${entry.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    })
    const d = await res.json()
    if (d.success) {
      setSitemapEntries(prev => prev.map(e => e.id === entry.id ? { ...e, [field]: value } : e))
    } else flash('✗ ' + d.error)
  }

  async function deleteSitemapEntry(id: number) {
    const res = await fetch(`/api/admin/seo/sitemap/entries/${id}`, { method: 'DELETE' })
    const d = await res.json()
    if (d.success) {
      setSitemapEntries(prev => prev.filter(e => e.id !== id))
      flash('✓ URL removed')
    } else flash('✗ ' + d.error)
  }

  async function generateSitemap() {
    setSaving(true)
    const res = await fetch('/api/admin/seo/sitemap/generate', { method: 'POST' })
    const d = await res.json()
    flash(d.success ? '✓ sitemap.xml regenerated' : '✗ ' + d.error)
    setSaving(false)
  }

  // ── SEO score ────────────────────────────────────────────────────────────────
  const score = {
    hasTitle:      (seo.meta_title       ?? '').length >= 10,
    titleOk:       (seo.meta_title       ?? '').length >= 10 && (seo.meta_title ?? '').length <= 60,
    hasDesc:       (seo.meta_description ?? '').length >= 50,
    descOk:        (seo.meta_description ?? '').length >= 50 && (seo.meta_description ?? '').length <= 160,
    hasKeywords:   (seo.meta_keywords   ?? '').trim().length > 0,
    hasCanonical:  (seo.canonical_url   ?? '').trim().length > 0,
    hasOgImage:    (seo.og_image        ?? '').trim().length > 0,
    hasOgTitle:    (seo.og_title        ?? '').trim().length > 0,
    hasTwitter:    (seo.twitter_title   ?? '').trim().length > 0,
    isIndexed:     seo.robots === 'index, follow',
    hasStructured: (seo.structured_data ?? '').trim().length > 0,
  }
  const scorePoints = Object.values(score).filter(Boolean).length
  const scoreTotal  = Object.keys(score).length
  const scorePct    = Math.round((scorePoints / scoreTotal) * 100)
  const scoreColor  = scorePct >= 80 ? 'text-emerald-600' : scorePct >= 50 ? 'text-amber-600' : 'text-red-500'
  const scoreRing   = scorePct >= 80 ? 'stroke-emerald-500' : scorePct >= 50 ? 'stroke-amber-400' : 'stroke-red-400'

  // ── OG preview values ────────────────────────────────────────────────────────
  const ogTitle = seo.og_title || seo.meta_title || 'Page Title'
  const ogDesc  = seo.og_description || seo.meta_description || 'Page description'
  const ogDomain = (seo.canonical_url || 'https://pryro.com').replace(/^https?:\/\//, '').split('/')[0]

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">SEO Manager</h1>
          <p className="text-sm text-gray-500 mt-0.5">Meta tags · Open Graph · Redirects · Sitemap · Structured data</p>
        </div>
        {msg && (
          <span className={`text-sm px-3 py-1.5 rounded-full font-medium ${msg.startsWith('✓') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {msg}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(['global', 'redirects', 'sitemap'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${tab === t ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {t === 'global' ? 'Global SEO' : t === 'sitemap' ? `Sitemap (${sitemapEntries.length})` : 'Redirects'}
          </button>
        ))}
      </div>

      {/* ══════════════ GLOBAL SEO TAB ══════════════ */}
      {tab === 'global' && (
        <div className="space-y-5">

          {/* SEO Score + SERP preview side by side */}
          <div className="grid grid-cols-3 gap-4">

            {/* Score widget */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center gap-3">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3"
                    className={scoreRing}
                    strokeDasharray={`${scorePct} ${100 - scorePct}`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xl font-bold ${scoreColor}`}>{scorePct}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-700">SEO Score</p>
                <p className="text-xs text-gray-400">{scorePoints}/{scoreTotal} checks</p>
              </div>
            </div>

            {/* SERP preview */}
            <div className="col-span-2 bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Google Preview</h2>
              <div className="border border-gray-100 rounded-lg p-4 bg-gray-50 max-w-xl">
                <p className="text-xs text-emerald-700 mb-1 truncate">{seo.canonical_url || 'https://pryro.com'}</p>
                <p className="text-blue-700 text-base font-medium hover:underline cursor-pointer leading-tight mb-1 truncate">
                  {seo.meta_title || <span className="text-gray-400 italic">Add a meta title…</span>}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {seo.meta_description || <span className="text-gray-400 italic">Add a meta description…</span>}
                </p>
              </div>
            </div>
          </div>

          {/* SEO checklist */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">SEO Checklist</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
              <Check ok={score.titleOk}      warn={score.hasTitle && !score.titleOk} label={score.titleOk ? 'Title length is optimal (10–60 chars)' : 'Title should be 10–60 characters'} />
              <Check ok={score.hasOgImage}   label="OG image set for social sharing" />
              <Check ok={score.descOk}       warn={score.hasDesc && !score.descOk}   label={score.descOk ? 'Description length is optimal (50–160 chars)' : 'Description should be 50–160 characters'} />
              <Check ok={score.hasOgTitle}   label="OG title set" />
              <Check ok={score.hasKeywords}  label="Keywords defined" />
              <Check ok={score.hasTwitter}   label="Twitter card title set" />
              <Check ok={score.hasCanonical} label="Canonical URL set" />
              <Check ok={score.hasStructured} label="Structured data (JSON-LD) set" />
              <Check ok={score.isIndexed}    warn={!score.isIndexed} label={score.isIndexed ? 'Page is indexable (index, follow)' : 'Robots directive is restricting indexing'} />
            </div>
          </div>

          {/* Meta Tags */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-800">Meta Tags</h2>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Meta Title</label>
              <input value={seo.meta_title} onChange={e => set('meta_title', e.target.value)}
                placeholder="Your page title — shown in browser tab and Google results"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              {charBar(seo.meta_title.length, 60)}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Meta Description</label>
              <textarea value={seo.meta_description} onChange={e => set('meta_description', e.target.value)} rows={3}
                placeholder="A compelling description of your page — shown under the title in Google results"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none" />
              {charBar(seo.meta_description.length, 160)}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Keywords <span className="text-gray-400 font-normal">(comma-separated)</span>
              </label>
              <input value={seo.meta_keywords} onChange={e => set('meta_keywords', e.target.value)}
                placeholder="erp, business management, accounting software"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Canonical URL</label>
                <input value={seo.canonical_url} onChange={e => set('canonical_url', e.target.value)}
                  placeholder="https://pryro.com"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Robots Directive</label>
                <select value={seo.robots} onChange={e => set('robots', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none bg-white">
                  <option value="index, follow">index, follow (recommended)</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </div>
          </div>

          {/* Open Graph */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800">Open Graph <span className="text-xs font-normal text-gray-400 ml-1">— controls how links appear on Facebook, LinkedIn, WhatsApp</span></h2>
              <button onClick={() => setShowOgPreview(v => !v)}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-2.5 py-1">
                {showOgPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showOgPreview ? 'Hide' : 'Preview'}
              </button>
            </div>

            {/* OG social card preview */}
            {showOgPreview && (
              <div className="border border-gray-200 rounded-lg overflow-hidden max-w-sm bg-gray-50">
                {seo.og_image ? (
                  <img src={seo.og_image} alt="OG preview" className="w-full h-36 object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <div className="w-full h-36 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-400">No OG image set</span>
                  </div>
                )}
                <div className="px-3 py-2 border-t border-gray-200 bg-white">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{ogDomain}</p>
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1 mt-0.5">{ogTitle}</p>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{ogDesc}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 mb-1 block">OG Title</label>
                <input value={seo.og_title} onChange={e => set('og_title', e.target.value)}
                  placeholder="Defaults to meta title if empty"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 mb-1 block">OG Description</label>
                <textarea value={seo.og_description} onChange={e => set('og_description', e.target.value)} rows={2}
                  placeholder="Defaults to meta description if empty"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">OG Image URL</label>
                <input value={seo.og_image} onChange={e => set('og_image', e.target.value)}
                  placeholder="https://pryro.com/og-image.png  (1200×630px recommended)"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">OG Type</label>
                <select value={seo.og_type} onChange={e => set('og_type', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none bg-white">
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                </select>
              </div>
            </div>
          </div>

          {/* Twitter Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-800">Twitter / X Card <span className="text-xs font-normal text-gray-400 ml-1">— controls link previews on Twitter/X</span></h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Card Type</label>
                <select value={seo.twitter_card} onChange={e => set('twitter_card', e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none bg-white">
                  <option value="summary_large_image">summary_large_image (recommended)</option>
                  <option value="summary">summary</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Twitter / X Handle <span className="text-gray-400 font-normal">(e.g. @pryro)</span>
                </label>
                <input value={seo.twitter_handle} onChange={e => set('twitter_handle', e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Twitter Title</label>
                <input value={seo.twitter_title} onChange={e => set('twitter_title', e.target.value)}
                  placeholder="Defaults to meta title if empty"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Twitter Image URL</label>
                <input value={seo.twitter_image} onChange={e => set('twitter_image', e.target.value)}
                  placeholder="Defaults to OG image if empty"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 mb-1 block">Twitter Description</label>
                <textarea value={seo.twitter_description} onChange={e => set('twitter_description', e.target.value)} rows={2}
                  placeholder="Defaults to meta description if empty"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none" />
              </div>
            </div>
          </div>

          {/* Structured Data */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">Structured Data (JSON-LD)</h2>
                <p className="text-xs text-gray-400 mt-0.5">Helps Google show rich results (knowledge panel, breadcrumbs, ratings, etc.)</p>
              </div>
              {!seo.structured_data.trim() && (
                <button onClick={() => set('structured_data', DEFAULT_JSON_LD)}
                  className="text-xs text-blue-600 hover:text-blue-700 border border-blue-200 rounded px-2.5 py-1 whitespace-nowrap flex-shrink-0">
                  Insert template
                </button>
              )}
            </div>
            <textarea
              value={seo.structured_data}
              onChange={e => {
                set('structured_data', e.target.value)
                if (e.target.value.trim()) {
                  try { JSON.parse(e.target.value); setJsonLdError('') }
                  catch { setJsonLdError('Invalid JSON') }
                } else {
                  setJsonLdError('')
                }
              }}
              rows={8}
              spellCheck={false}
              placeholder={DEFAULT_JSON_LD}
              className={`w-full border rounded-md px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-y bg-gray-50 ${jsonLdError ? 'border-red-300' : 'border-gray-200'}`}
            />
            {jsonLdError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> {jsonLdError}
              </p>
            )}
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-md">
              <Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                Test your structured data with{' '}
                <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer"
                  className="underline font-medium">Google's Rich Results Test</a>{' '}
                after saving. Common types: Organization, WebSite, SoftwareApplication, Product, FAQPage.
              </p>
            </div>
          </div>

          <button onClick={saveSeo} disabled={saving || !!jsonLdError}
            className="flex items-center gap-2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save SEO Settings'}
          </button>
        </div>
      )}

      {/* ══════════════ REDIRECTS TAB ══════════════ */}
      {tab === 'redirects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 font-medium">URL Redirects</p>
              <p className="text-xs text-gray-400 mt-0.5">Redirects are applied at the edge in real time — no redeploy needed.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRedirects(prev => [...prev, { source_url: '/old-path', destination_url: '/new-path', redirect_type: '301', is_active: true }])}
                className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
              <button onClick={saveRedirects} disabled={saving}
                className="flex items-center gap-1.5 text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 disabled:opacity-50">
                <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save All'}
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {redirects.length === 0 ? (
              <div className="text-sm text-gray-400 px-5 py-10 text-center">
                <p className="font-medium text-gray-500">No redirects configured</p>
                <p className="mt-1 text-xs">Add redirects to handle moved pages or old URLs without breaking SEO.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-[1fr_auto_1fr_auto_auto_auto] gap-x-3 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-400">
                  <span>Source path</span><span></span><span>Destination</span><span>Type</span><span>Active</span><span></span>
                </div>
                {redirects.map((r, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_1fr_auto_auto_auto] gap-x-3 items-center px-4 py-2.5 border-b border-gray-50 last:border-0">
                    <input value={r.source_url}
                      onChange={e => setRedirects(prev => prev.map((x, j) => j === i ? { ...x, source_url: e.target.value } : x))}
                      className="text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono" />
                    <span className="text-gray-300 text-lg leading-none">→</span>
                    <input value={r.destination_url}
                      onChange={e => setRedirects(prev => prev.map((x, j) => j === i ? { ...x, destination_url: e.target.value } : x))}
                      className="text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono" />
                    <select value={r.redirect_type}
                      onChange={e => setRedirects(prev => prev.map((x, j) => j === i ? { ...x, redirect_type: e.target.value as Redirect['redirect_type'] } : x))}
                      className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none bg-white">
                      <option value="301">301 Permanent</option>
                      <option value="302">302 Temporary</option>
                      <option value="307">307 Temp (method-safe)</option>
                    </select>
                    <button onClick={() => setRedirects(prev => prev.map((x, j) => j === i ? { ...x, is_active: !x.is_active } : x))}
                      title={r.is_active ? 'Active — click to disable' : 'Inactive — click to enable'}
                      className={`w-8 h-5 rounded-full transition-colors relative flex-shrink-0 ${r.is_active ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${r.is_active ? 'left-3.5' : 'left-0.5'}`} />
                    </button>
                    <button onClick={() => setRedirects(prev => prev.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 p-0.5">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <Info className="w-3 h-3" />
            Use 301 for permanently moved pages (passes SEO value). Use 302/307 for temporary redirects.
          </p>
        </div>
      )}

      {/* ══════════════ SITEMAP TAB ══════════════ */}
      {tab === 'sitemap' && (
        <div className="space-y-4">

          {/* Header actions */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 font-medium">XML Sitemap</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Automatically served at{' '}
                <code className="bg-gray-100 px-1 py-0.5 rounded">/sitemap.xml</code>{' '}
                — updates hourly. Use Regenerate to also refresh the static fallback file.
              </p>
            </div>
            <div className="flex gap-2">
              <a href="/sitemap.xml" target="_blank"
                className="flex items-center gap-1.5 text-xs border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50 text-gray-600">
                <ExternalLink className="w-3.5 h-3.5" /> View
              </a>
              <button onClick={generateSitemap} disabled={saving}
                className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-50">
                <RefreshCw className={`w-3.5 h-3.5 ${saving ? 'animate-spin' : ''}`} />
                {saving ? 'Regenerating…' : 'Regenerate file'}
              </button>
              <button onClick={() => setAddingEntry(true)}
                className="flex items-center gap-1.5 text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800">
                <Plus className="w-3.5 h-3.5" /> Add URL
              </button>
            </div>
          </div>

          {/* Add URL form */}
          {addingEntry && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <p className="text-xs font-semibold text-blue-800">New sitemap entry</p>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-blue-700 mb-1 block">URL path <span className="text-blue-400">(must start with /)</span></label>
                  <input value={newEntry.url} onChange={e => setNewEntry(p => ({ ...p, url: e.target.value }))}
                    placeholder="/your-page"
                    className="w-full border border-blue-200 rounded px-2.5 py-1.5 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white" />
                </div>
                <div>
                  <label className="text-xs text-blue-700 mb-1 block">Change freq</label>
                  <select value={newEntry.changefreq} onChange={e => setNewEntry(p => ({ ...p, changefreq: e.target.value as SitemapEntry['changefreq'] }))}
                    className="w-full border border-blue-200 rounded px-2.5 py-1.5 text-sm focus:outline-none bg-white">
                    {CHANGEFREQ_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-blue-700 mb-1 block">Priority (0.0–1.0)</label>
                  <input type="number" min="0" max="1" step="0.1"
                    value={newEntry.priority} onChange={e => setNewEntry(p => ({ ...p, priority: parseFloat(e.target.value) }))}
                    className="w-full border border-blue-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white" />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={addSitemapEntry} disabled={saving || !newEntry.url}
                  className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-50">
                  <Plus className="w-3.5 h-3.5" /> Add to sitemap
                </button>
                <button onClick={() => setAddingEntry(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5">Cancel</button>
              </div>
            </div>
          )}

          {/* Entries table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {sitemapEntries.length === 0 ? (
              <p className="text-sm text-gray-400 px-5 py-10 text-center">No sitemap URLs. Add one above.</p>
            ) : (
              <>
                <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-3 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-400">
                  <span>URL</span><span>Freq</span><span>Priority</span><span>Active</span><span></span>
                </div>
                {sitemapEntries.map((entry) => (
                  <div key={entry.id} className={`grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-3 items-center px-4 py-2.5 border-b border-gray-50 last:border-0 ${!entry.is_active ? 'opacity-50' : ''}`}>
                    <span className="text-sm font-mono text-gray-700 truncate">{entry.url}</span>
                    <select value={entry.changefreq}
                      onChange={e => updateSitemapEntry(entry, 'changefreq', e.target.value)}
                      className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none bg-white">
                      {CHANGEFREQ_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <select value={entry.priority}
                      onChange={e => updateSitemapEntry(entry, 'priority', parseFloat(e.target.value))}
                      className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none bg-white w-16">
                      {[1.0,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1].map(p => (
                        <option key={p} value={p}>{p.toFixed(1)}</option>
                      ))}
                    </select>
                    <button onClick={() => toggleSitemapEntry(entry)}
                      title={entry.is_active ? 'Active — click to exclude from sitemap' : 'Inactive — click to include'}
                      className={`w-8 h-5 rounded-full transition-colors relative flex-shrink-0 ${entry.is_active ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${entry.is_active ? 'left-3.5' : 'left-0.5'}`} />
                    </button>
                    <button onClick={() => entry.id && deleteSitemapEntry(entry.id)} className="text-red-400 hover:text-red-600 p-0.5">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <Info className="w-3 h-3" />
            Set priority 1.0 for your homepage, 0.8 for key landing pages, 0.6–0.5 for content pages.
            Submit your sitemap to{' '}
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="underline">Google Search Console</a>{' '}
            and{' '}
            <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener noreferrer" className="underline">Bing Webmaster Tools</a>.
          </p>
        </div>
      )}
    </div>
  )
}
