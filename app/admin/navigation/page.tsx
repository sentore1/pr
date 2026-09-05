"use client"

import { useEffect, useState, useCallback } from 'react'
import {
  Plus, Trash2, GripVertical, ChevronDown, ChevronRight,
  Save, Upload, Eye, EyeOff, X, Search, Image as ImageIcon,
} from 'lucide-react'

// ── types ──────────────────────────────────────────────────────────────────
interface NavItem {
  id?: number
  label: string
  url: string
  icon_url: string
  target: '_self' | '_blank'
  sort_order: number
  is_active: boolean
  children?: NavItem[]
}

interface Logo {
  id?: number
  name: string
  image_url: string
  alt_text: string
  position: 'header' | 'footer' | 'mobile'
  link_url: string
  is_active: boolean
}

interface MediaItem {
  id: number
  file_url: string
  title: string
  alt_text: string
  original_filename: string
  folder: string
}

// ── Icon Picker ─────────────────────────────────────────────────────────────
function IconPicker({
  value,
  onChange,
  onClose,
}: {
  value: string
  onChange: (url: string) => void
  onClose: () => void
}) {
  const [search, setSearch] = useState('')
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [folder, setFolder] = useState('icons')
  const [uploading, setUploading] = useState(false)

  useEffect(() => { loadMedia() }, [folder])

  async function loadMedia() {
    setLoading(true)
    const params = new URLSearchParams({ per_page: '100', ...(folder !== 'all' ? { folder } : {}) })
    const res = await fetch(`/api/admin/media?${params}`)
    const d = await res.json()
    if (d.success) setMedia(d.data || [])
    setLoading(false)
  }

  async function uploadFile(file: File) {
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    form.append('folder', 'icons')
    const res = await fetch('/api/admin/media/upload', { method: 'POST', body: form })
    const d = await res.json()
    if (d.success) {
      await loadMedia()
      onChange(d.data.file_url)
      onClose()
    }
    setUploading(false)
  }

  const filtered = media.filter(m =>
    !search ||
    m.title?.toLowerCase().includes(search.toLowerCase()) ||
    m.original_filename?.toLowerCase().includes(search.toLowerCase())
  )

  const FOLDERS = ['icons', 'logos', 'general', 'all']

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[8px] shadow-2xl w-[560px] max-h-[520px] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Choose Icon</h3>
          <div className="flex items-center gap-3">
            {/* Upload new icon */}
            <label className={`flex items-center gap-1.5 text-xs cursor-pointer px-3 py-1.5 rounded-md border transition-colors ${uploading ? 'bg-gray-100 text-gray-400 border-gray-200' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}>
              <Upload className="w-3.5 h-3.5" />
              {uploading ? 'Uploading…' : 'Upload'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f) }}
              />
            </label>
            <button onClick={onClose}>
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>

        {/* Folder tabs + search */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50/60">
          <div className="flex gap-1">
            {FOLDERS.map(f => (
              <button
                key={f}
                onClick={() => setFolder(f)}
                className={`text-xs px-2.5 py-1 rounded-md capitalize transition-colors ${folder === f ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2.5 py-1 flex-1 bg-white">
            <Search className="w-3 h-3 text-gray-400 flex-shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search icons…"
              className="text-xs outline-none flex-1"
            />
          </div>
        </div>

        {/* Icon grid */}
        <div className="flex-1 overflow-y-auto p-3">
          {/* None / clear option */}
          <div className="grid grid-cols-6 gap-2">
            <button
              onClick={() => { onChange(''); onClose() }}
              className={`flex flex-col items-center gap-1 p-2 rounded-[5px] border transition-colors ${!value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <div className="w-9 h-9 flex items-center justify-center border border-dashed border-gray-300 rounded-[4px]">
                <X className="w-3.5 h-3.5 text-gray-300" />
              </div>
              <span className="text-[9px] text-gray-400 text-center leading-tight w-full truncate">None</span>
            </button>

            {loading
              ? [...Array(11)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-[5px] animate-pulse" />
                ))
              : filtered.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { onChange(item.file_url); onClose() }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-[5px] border transition-colors ${value === item.file_url ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                    title={item.title || item.original_filename}
                  >
                    <img
                      src={item.file_url}
                      alt={item.alt_text || item.title}
                      className="w-9 h-9 object-contain"
                    />
                    <span className="text-[9px] text-gray-500 text-center leading-tight w-full truncate">
                      {item.title || item.original_filename.replace(/\.[^.]+$/, '')}
                    </span>
                  </button>
                ))
            }
          </div>

          {!loading && filtered.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">
              No icons found.{' '}
              <label className="text-blue-600 cursor-pointer hover:underline">
                Upload one
                <input type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f) }} />
              </label>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Icon Button (inline trigger) ────────────────────────────────────────────
function IconButton({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Choose icon"
        className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors flex-shrink-0 bg-white"
      >
        {value
          ? <img src={value} alt="" className="w-5 h-5 object-contain" />
          : <ImageIcon className="w-3.5 h-3.5 text-gray-300" />
        }
      </button>
      {open && (
        <IconPicker
          value={value}
          onChange={onChange}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function NavigationPage() {
  const [tab, setTab]               = useState<'menu' | 'logos'>('menu')
  const [items, setItems]           = useState<NavItem[]>([])
  const [logos, setLogos]           = useState<Logo[]>([])
  const [saving, setSaving]         = useState(false)
  const [msg, setMsg]               = useState('')
  const [expanded, setExpanded]     = useState<Set<number>>(new Set())

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const [nr, lr] = await Promise.all([
      fetch('/api/admin/navigation'),
      fetch('/api/admin/logos'),
    ])
    const nd = await nr.json(); const ld = await lr.json()
    if (nd.success) setItems(nd.data || [])
    if (ld.success) setLogos(ld.data || [])
  }

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  async function saveNav() {
    setSaving(true)
    const res = await fetch('/api/admin/navigation', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
    flash((await res.json()).success ? '✓ Navigation saved' : '✗ Error saving')
    setSaving(false)
  }

  async function saveLogos() {
    setSaving(true)
    const res = await fetch('/api/admin/logos', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logos }),
    })
    flash((await res.json()).success ? '✓ Logos saved' : '✗ Error saving')
    setSaving(false)
  }

  function addItem(parentIdx?: number) {
    const blank: NavItem = { label: 'New Link', url: '/', icon_url: '', target: '_self', sort_order: 0, is_active: true }
    if (parentIdx === undefined) {
      setItems(p => [...p, { ...blank, sort_order: p.length }])
    } else {
      setItems(p => p.map((item, i) => i === parentIdx
        ? { ...item, children: [...(item.children || []), { ...blank, sort_order: (item.children || []).length }] }
        : item
      ))
      setExpanded(p => new Set([...p, parentIdx]))
    }
  }

  function updItem(idx: number, key: keyof NavItem, val: any, ci?: number) {
    setItems(p => p.map((item, i) => {
      if (i !== idx) return item
      if (ci !== undefined && item.children)
        return { ...item, children: item.children.map((c, j) => j === ci ? { ...c, [key]: val } : c) }
      return { ...item, [key]: val }
    }))
  }

  function delItem(idx: number, ci?: number) {
    setItems(p => {
      if (ci !== undefined)
        return p.map((item, i) => i === idx ? { ...item, children: (item.children || []).filter((_, j) => j !== ci) } : item)
      return p.filter((_, i) => i !== idx)
    })
  }

  function moveItem(idx: number, dir: -1 | 1) {
    setItems(p => {
      const n = [...p]; const t = idx + dir
      if (t < 0 || t >= n.length) return p;
      [n[idx], n[t]] = [n[t], n[idx]]; return n
    })
  }

  function updLogo(idx: number, key: keyof Logo, val: any) {
    setLogos(p => p.map((l, i) => i === idx ? { ...l, [key]: val } : l))
  }

  async function uploadLogo(idx: number, file: File) {
    const form = new FormData(); form.append('file', file); form.append('folder', 'logos')
    const d = await fetch('/api/admin/media/upload', { method: 'POST', body: form }).then(r => r.json())
    if (d.success) updLogo(idx, 'image_url', d.data.file_url)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Navigation</h1>
          <p className="text-sm text-gray-500 mt-1">Manage menus, links, and logos</p>
        </div>
        {msg && <span className={`text-sm px-3 py-1 rounded-full ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</span>}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(['menu', 'logos'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${tab === t ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* ── MENU TAB ── */}
      {tab === 'menu' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-medium text-gray-800">Header Navigation</h2>
            <div className="flex gap-2">
              <button onClick={() => addItem()}
                className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
              <button onClick={saveNav} disabled={saving}
                className="flex items-center gap-1.5 text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 disabled:opacity-50">
                <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {items.length === 0 && (
              <p className="text-sm text-gray-400 px-5 py-8 text-center">No navigation items yet. Click "Add Item" to start.</p>
            )}
            {items.map((item, idx) => (
              <div key={idx}>
                {/* ── Top-level row ── */}
                <div className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 group">
                  {/* Reorder */}
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => moveItem(idx, -1)} className="text-gray-300 hover:text-gray-600 leading-none text-[10px]">▲</button>
                    <button onClick={() => moveItem(idx, 1)} className="text-gray-300 hover:text-gray-600 leading-none text-[10px]">▼</button>
                  </div>
                  <GripVertical className="w-4 h-4 text-gray-200 flex-shrink-0" />

                  {/* Label */}
                  <input
                    value={item.label ?? ''}
                    onChange={e => updItem(idx, 'label', e.target.value)}
                    className="text-sm font-medium text-gray-800 border border-gray-200 rounded px-2 py-1 w-32 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />

                  {/* URL */}
                  <input
                    value={item.url ?? ''}
                    onChange={e => updItem(idx, 'url', e.target.value)}
                    placeholder="URL or path"
                    className="text-sm text-gray-500 border border-gray-200 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />

                  {/* Target */}
                  <select
                    value={item.target}
                    onChange={e => updItem(idx, 'target', e.target.value)}
                    className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none"
                  >
                    <option value="_self">Same tab</option>
                    <option value="_blank">New tab</option>
                  </select>

                  {/* Active */}
                  <button onClick={() => updItem(idx, 'is_active', !item.is_active)}
                    className={item.is_active ? 'text-green-500' : 'text-gray-300'}>
                    {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Expand */}
                  <button onClick={() => setExpanded(p => { const n = new Set(p); n.has(idx) ? n.delete(idx) : n.add(idx); return n })}>
                    {expanded.has(idx)
                      ? <ChevronDown className="w-4 h-4 text-gray-400" />
                      : <ChevronRight className="w-4 h-4 text-gray-400" />}
                  </button>

                  {/* Add child */}
                  <button onClick={() => addItem(idx)}
                    className="opacity-0 group-hover:opacity-100 text-xs text-blue-500 hover:text-blue-700 px-1 flex-shrink-0">
                    +Sub
                  </button>

                  {/* Delete */}
                  <button onClick={() => delItem(idx)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* ── Child rows ── */}
                {expanded.has(idx) && (item.children || []).map((child, ci) => (
                  <div key={ci} className="flex items-center gap-2 pl-14 pr-4 py-2 bg-gray-50 hover:bg-gray-100 group border-t border-gray-100">
                    <GripVertical className="w-3.5 h-3.5 text-gray-200 flex-shrink-0" />

                    {/* Icon picker button */}
                    <IconButton
                      value={child.icon_url ?? ''}
                      onChange={url => updItem(idx, 'icon_url', url, ci)}
                    />

                    {/* Label */}
                    <input
                      value={child.label ?? ''}
                      onChange={e => updItem(idx, 'label', e.target.value, ci)}
                      className="text-sm text-gray-700 border border-gray-200 rounded px-2 py-1 w-32 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />

                    {/* URL */}
                    <input
                      value={child.url ?? ''}
                      onChange={e => updItem(idx, 'url', e.target.value, ci)}
                      placeholder="URL"
                      className="text-sm text-gray-500 border border-gray-200 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />

                    {/* Target */}
                    <select
                      value={child.target}
                      onChange={e => updItem(idx, 'target', e.target.value, ci)}
                      className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none"
                    >
                      <option value="_self">Same</option>
                      <option value="_blank">New</option>
                    </select>

                    {/* Active */}
                    <button onClick={() => updItem(idx, 'is_active', !child.is_active, ci)}
                      className={child.is_active ? 'text-green-500' : 'text-gray-300'}>
                      {child.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    {/* Delete */}
                    <button onClick={() => delItem(idx, ci)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LOGOS TAB ── */}
      {tab === 'logos' && (
        <div className="space-y-4">
          {logos.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-sm text-gray-400">No logos configured yet.</p>
              <button
                onClick={() => setLogos(p => [...p, { name: 'Header Logo', image_url: '/pryro logo.png', alt_text: 'Logo', position: 'header', link_url: '/', is_active: true }])}
                className="mt-3 text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Add Logo
              </button>
            </div>
          )}
          {logos.map((logo, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 capitalize">{logo.position} Logo</span>
                <div className="flex gap-2">
                  <button onClick={() => updLogo(idx, 'is_active', !logo.is_active)}
                    className={`text-xs px-2 py-1 rounded-full border ${logo.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                    {logo.is_active ? 'Active' : 'Inactive'}
                  </button>
                  <button onClick={() => setLogos(p => p.filter((_, i) => i !== idx))}
                    className="text-red-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 min-h-[120px]">
                  {logo.image_url
                    ? <img src={logo.image_url} alt={logo.alt_text} className="h-12 object-contain" />
                    : <p className="text-xs text-gray-400">No image</p>}
                  <label className="mt-3 cursor-pointer text-xs text-blue-600 hover:underline flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" /> Upload
                    <input type="file" accept="image/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) uploadLogo(idx, f) }} />
                  </label>
                </div>
                <div className="space-y-3">
                  {(['name', 'image_url', 'alt_text', 'link_url'] as (keyof Logo)[]).map(key => (
                    <div key={key}>
                      <label className="block text-xs text-gray-500 mb-1 capitalize">{key.replace('_', ' ')}</label>
                      <input value={String(logo[key] || '')} onChange={e => updLogo(idx, key, e.target.value)}
                        className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Position</label>
                    <select value={logo.position} onChange={e => updLogo(idx, 'position', e.target.value as Logo['position'])}
                      className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none">
                      <option value="header">Header</option>
                      <option value="footer">Footer</option>
                      <option value="mobile">Mobile</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {logos.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={() => setLogos(p => [...p, { name: 'New Logo', image_url: '', alt_text: '', position: 'header', link_url: '/', is_active: true }])}
                className="flex items-center gap-1.5 text-sm border border-gray-200 px-3 py-2 rounded-md hover:bg-gray-50">
                <Plus className="w-3.5 h-3.5" /> Add Logo
              </button>
              <button onClick={saveLogos} disabled={saving}
                className="flex items-center gap-1.5 text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
                <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Logos'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
