"use client"

import { useEffect, useState } from 'react'
import { Plus, Trash2, GripVertical, Save, ChevronDown, ChevronUp, Eye, EyeOff, Upload, X, Check, Loader2 } from 'lucide-react'

type BlockType = 'hero' | 'text' | 'image' | 'cta' | 'features' | 'testimonials' | 'pricing' | 'custom'

interface Block {
  id?: number
  block_type: BlockType
  title: string
  content: string
  settings: Record<string, any>
  sort_order: number
  is_active: boolean
  _open?: boolean
}

// All icons from /public/icon — no emoji
const PUBLIC_ICONS: { name: string; path: string }[] = [
  { name: 'Accounting',         path: '/icon/accounting icon.png' },
  { name: 'AI Business Review', path: '/icon/ai business review icon.png' },
  { name: 'AI Email',           path: '/icon/ai email icon.png' },
  { name: 'AI Enterprise',      path: '/icon/ai interprise icon.png' },
  { name: 'Budget',             path: '/icon/budget icon.png' },
  { name: 'Business Coach',     path: '/icon/business coach icon.png' },
  { name: 'Business Review',    path: '/icon/business review icon2.png' },
  { name: 'Cold Call',          path: '/icon/cold call icon.png' },
  { name: 'COO',                path: '/icon/COO icon.png' },
  { name: 'CRM',                path: '/icon/CRM icon.png' },
  { name: 'Dashboard',          path: '/icon/dashboard icon.png' },
  { name: 'Discussion',         path: '/icon/disccuss icon.png' },
  { name: 'Document',           path: '/icon/document icon.png' },
  { name: 'E-commerce',         path: '/icon/ecommerce icon.png' },
  { name: 'Help Desk',          path: '/icon/help desk icon.png' },
  { name: 'HR',                 path: '/icon/HR icon.png' },
  { name: 'Inventory',          path: '/icon/Inventory icon.png' },
  { name: 'Inventory 2',        path: '/icon/inventory icon 2.png' },
  { name: 'Knowledge',          path: '/icon/knowledge icon.png' },
  { name: 'Knowledge 2',        path: '/icon/knowledge icon2.png' },
  { name: 'Lawyer',             path: '/icon/lawyer icon.png' },
  { name: 'Logistics',          path: '/icon/logistic icon.png' },
  { name: 'Logistics 2',        path: '/icon/logistic icon 2.png' },
  { name: 'Manufacturers',      path: '/icon/manufacturers icon.png' },
  { name: 'Pharmacy',           path: '/icon/pharmacy icon.png' },
  { name: 'POS',                path: '/icon/pos icon.png' },
  { name: 'Project',            path: '/icon/project icon.png' },
  { name: 'Purchase',           path: '/icon/purchase icon.png' },
  { name: 'Research System',    path: '/icon/research system icon.png' },
  { name: 'Sales',              path: '/icon/sales icon.png' },
  { name: 'Signature',          path: '/icon/signuture icon.png' },
  { name: 'SOP',                path: '/icon/SOP icon.png' },
  { name: 'Subscription',       path: '/icon/subscription icon.png' },
  { name: 'Tender',             path: '/icon/Tender icon.png' },
  { name: 'Code',               path: '/icon/0code icon.png' },
  { name: 'Coder',              path: '/icon/0coder icon.png' },
]

const BLOCK_LABELS: Record<BlockType, { label: string; icon: string }> = {
  hero:         { label: 'Hero Section',    icon: '/icon/dashboard icon.png' },
  text:         { label: 'Text Block',      icon: '/icon/document icon.png' },
  image:        { label: 'Image Block',     icon: '/icon/inventory icon 2.png' },
  cta:          { label: 'Call to Action',  icon: '/icon/sales icon.png' },
  features:     { label: 'Features',        icon: '/icon/budget icon.png' },
  testimonials: { label: 'Testimonials',    icon: '/icon/disccuss icon.png' },
  pricing:      { label: 'Pricing',         icon: '/icon/subscription icon.png' },
  custom:       { label: 'Custom HTML',     icon: '/icon/0code icon.png' },
}

// Known page slugs that map to existing routes
const PAGE_SLUGS: { slug: string; label: string }[] = [
  { slug: 'home',                    label: 'Home' },
  { slug: 'about',                   label: 'About' },
  { slug: 'products',                label: 'Products' },
  { slug: 'pricing',                 label: 'Pricing' },
  { slug: 'contact',                 label: 'Contact' },
  { slug: 'features',                label: 'Features' },
  { slug: 'careers',                 label: 'Careers' },
  { slug: 'non-profit',              label: 'Non-Profit' },
  { slug: 'small-business',          label: 'Small Business' },
  { slug: 'human-resource',          label: 'Human Resource' },
  { slug: 'hospitality',             label: 'Hospitality' },
  { slug: 'construction',            label: 'Construction' },
  { slug: 'logistic',                label: 'Logistics' },
  { slug: 'customer-relation',       label: 'Customer Relation' },
  { slug: 'project',                 label: 'Project' },
  { slug: 'stock-management',        label: 'Stock Management' },
  { slug: 'self-employed',           label: 'Self Employed' },
  { slug: 'ai-enterprise',           label: 'AI Enterprise' },
  { slug: 'marketing-call',          label: 'Marketing Call' },
  { slug: 'marketing-mail',          label: 'Marketing Mail' },
  { slug: 'accountants-bookkeepers', label: 'Accountants & Bookkeepers' },
  { slug: 'ai-calculator',           label: 'AI Calculator' },
]

// ── Icon picker popup ──────────────────────────────────────────────────────
function IconPicker({ value, onChange, onClose }: {
  value: string
  onChange: (path: string) => void
  onClose: () => void
}) {
  const [search, setSearch] = useState('')
  const filtered = PUBLIC_ICONS.filter(i =>
    !search || i.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-[480px] max-h-[520px] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 text-sm">Choose Icon</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-gray-400 hover:text-gray-600" /></button>
        </div>
        <div className="px-4 pt-3 pb-2">
          <input
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search icons…"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-6 gap-2 mt-1">
            <button
              onClick={() => { onChange(''); onClose() }}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-colors hover:border-blue-300 ${!value ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-gray-300 text-xs border border-dashed border-gray-300 rounded">✕</div>
              <span className="text-[9px] text-gray-400 text-center leading-tight truncate w-full">None</span>
            </button>
            {filtered.map(icon => (
              <button
                key={icon.path}
                onClick={() => { onChange(icon.path); onClose() }}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-colors hover:border-blue-300 ${value === icon.path ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}
              >
                <img src={icon.path} alt={icon.name} className="w-8 h-8 object-contain" />
                <span className="text-[9px] text-gray-500 text-center leading-tight truncate w-full">{icon.name}</span>
                {value === icon.path && <Check className="w-2.5 h-2.5 text-blue-600 absolute" />}
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No icons found for "{search}"</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Icon selector inline widget ────────────────────────────────────────────
function IconSelector({ value, onChange, label = 'Icon' }: {
  value: string
  onChange: (v: string) => void
  label?: string
}) {
  const [open, setOpen] = useState(false)
  const selected = PUBLIC_ICONS.find(i => i.path === value)

  return (
    <>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">{label}</label>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 border border-gray-200 rounded-md px-3 py-2 hover:border-blue-300 bg-white transition-colors w-full text-left"
        >
          {value
            ? <img src={value} alt={selected?.name || ''} className="w-6 h-6 object-contain flex-shrink-0" />
            : <div className="w-6 h-6 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-300 text-xs flex-shrink-0">–</div>
          }
          <span className="text-sm text-gray-700 truncate flex-1">
            {selected?.name || (value ? 'Custom icon' : 'No icon selected')}
          </span>
          <span className="text-xs text-blue-600 flex-shrink-0">Change</span>
        </button>
      </div>
      {open && <IconPicker value={value} onChange={onChange} onClose={() => setOpen(false)} />}
    </>
  )
}

// ── Background color + gradient field ─────────────────────────────────────
function BgField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  // Derive a solid color preview: if value is a plain #hex or rgb(...) use it directly,
  // otherwise fall back to transparent so the swatch still shows.
  const isPlainColor = /^#[0-9a-f]{3,8}$/i.test((value || '').trim()) || (value || '').trim().startsWith('rgb')
  const swatchColor = isPlainColor ? value.trim() : '#ffffff'

  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">Section Background Color / Gradient</label>
      <div className="flex gap-2 items-center">
        {/* Color swatch — only useful for solid colors */}
        <input
          type="color"
          value={isPlainColor ? swatchColor : '#ffffff'}
          onChange={e => onChange(e.target.value)}
          title="Pick a solid color (for gradients type in the field)"
          className="w-10 h-9 border border-gray-200 rounded cursor-pointer p-0.5 flex-shrink-0"
        />
        <input
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder="e.g. #f0f4ff or linear-gradient(to bottom, #0072FD, #E5EDFC)"
          className="flex-1 border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
      {value && (
        <div
          className="mt-1.5 h-5 rounded border border-gray-200 w-full"
          style={{ background: value }}
          title="Background preview"
        />
      )}
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ContentPage() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [activeType, setActiveType] = useState<BlockType>('text')
  const [currentSlug, setCurrentSlug] = useState('home')
  const [uploading, setUploading] = useState<number | null>(null)

  useEffect(() => { load(currentSlug) }, [currentSlug])

  async function load(slug: string) {
    const res = await fetch(`/api/admin/content?slug=${encodeURIComponent(slug)}`)
    const d = await res.json()
    if (d.success) setBlocks((d.data || []).map((b: Block) => ({ ...b, _open: false })))
    else setBlocks([])
  }

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 4000) }

  function addBlock() {
    setBlocks(prev => [...prev, {
      block_type: activeType,
      title: `New ${BLOCK_LABELS[activeType].label}`,
      content: '',
      settings: getDefaultSettings(activeType),
      sort_order: prev.length,
      is_active: true,
      _open: true,
    }])
  }

  function getDefaultSettings(type: BlockType): Record<string, any> {
    switch (type) {
      case 'hero':     return { sectionBg: 'linear-gradient(to bottom, #0072FD, #E5EDFC)', textColor: '#ffffff', buttonText: 'Get Started', buttonUrl: '#', icon: '' }
      case 'cta':      return { sectionBg: '#0072FD', textColor: '#ffffff', buttonText: 'Start Free Trial', buttonUrl: 'https://login.pryro.com', icon: '' }
      case 'features': return { sectionBg: '', columns: 3, items: [], icon: '' }
      case 'image':    return { sectionBg: '', src: '', alt: '', width: '100%', rounded: true }
      case 'text':     return { sectionBg: '', alignment: 'left', fontSize: 'base' }
      case 'testimonials': return { sectionBg: '' }
      case 'pricing':  return { sectionBg: '' }
      default:         return { sectionBg: '' }
    }
  }

  function update(idx: number, key: keyof Block, val: any) {
    setBlocks(prev => prev.map((b, i) => i === idx ? { ...b, [key]: val } : b))
  }

  function updateSetting(idx: number, key: string, val: any) {
    setBlocks(prev => prev.map((b, i) => i === idx ? { ...b, settings: { ...b.settings, [key]: val } } : b))
  }

  function move(idx: number, dir: -1 | 1) {
    setBlocks(prev => {
      const next = [...prev]; const t = idx + dir
      if (t < 0 || t >= next.length) return prev
      ;[next[idx], next[t]] = [next[t], next[idx]]
      return next
    })
  }

  async function save() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: currentSlug, blocks: blocks.map(({ _open, ...b }) => b) }),
      })
      const d = await res.json()
      flash(d.success ? '✓ Content saved' : '✗ ' + (d.error || 'Save failed'))
    } catch (err) {
      flash('✗ Network error — could not save')
    }
    setSaving(false)
  }

  async function uploadImage(idx: number, file: File) {
    setUploading(idx)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('folder', 'content')
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        credentials: 'include',
        body: form,
      })
      const d = await res.json()
      if (d.success && d.data?.file_url) {
        updateSetting(idx, 'src', d.data.file_url)
        flash('✓ Image uploaded')
      } else {
        flash('✗ Upload failed: ' + (d.error || `HTTP ${res.status}`))
      }
    } catch (err) {
      flash('✗ Upload error — check your connection')
    }
    setUploading(null)
  }

  const currentPageLabel = PAGE_SLUGS.find(p => p.slug === currentSlug)?.label || currentSlug

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Content Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Manage extra sections for each page</p>
        </div>
        <div className="flex items-center gap-3">
          {msg && (
            <span className={`text-sm px-3 py-1 rounded-full ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {msg}
            </span>
          )}
          <button onClick={save} disabled={saving}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
      </div>

      {/* Page selector */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-500 font-medium mb-2">Editing sections for page:</p>
        <div className="flex flex-wrap gap-2">
          {PAGE_SLUGS.map(({ slug, label }) => (
            <button
              key={slug}
              onClick={() => { setCurrentSlug(slug); setBlocks([]) }}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                currentSlug === slug
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Add block toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-500 font-medium mb-3">Add block to <span className="text-gray-800 font-semibold">{currentPageLabel}</span>:</p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(BLOCK_LABELS) as [BlockType, { label: string; icon: string }][]).map(([type, { label, icon }]) => (
            <button key={type} onClick={() => setActiveType(type)}
              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                activeType === type
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-200 text-gray-600 hover:border-blue-300 bg-white'
              }`}
            >
              <img src={icon} alt={label} className="w-4 h-4 object-contain" />
              {label}
            </button>
          ))}
          <button onClick={addBlock}
            className="ml-auto flex items-center gap-1.5 text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>

      {/* Blocks list */}
      <div className="space-y-3">
        {blocks.length === 0 && (
          <div className="bg-white border border-dashed border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-sm">No content blocks yet for <strong>{currentPageLabel}</strong>. Select a type above and click Add.</p>
          </div>
        )}

        {blocks.map((block, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Block header */}
            <div
              className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 select-none"
              onClick={() => update(idx, '_open', !block._open)}
            >
              <div className="flex flex-col gap-0.5" onClick={e => e.stopPropagation()}>
                <button onClick={() => move(idx, -1)} className="text-gray-300 hover:text-gray-600 text-xs leading-none">▲</button>
                <button onClick={() => move(idx, 1)} className="text-gray-300 hover:text-gray-600 text-xs leading-none">▼</button>
              </div>
              <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
              <img
                src={block.settings?.icon || BLOCK_LABELS[block.block_type]?.icon}
                alt={block.block_type}
                className="w-5 h-5 object-contain flex-shrink-0"
              />
              <span className="text-sm font-medium text-gray-800 flex-1 truncate">
                {BLOCK_LABELS[block.block_type]?.label} — {block.title}
              </span>
              {/* Background preview chip */}
              {block.settings?.sectionBg && (
                <div
                  className="w-5 h-5 rounded border border-gray-300 flex-shrink-0"
                  style={{ background: block.settings.sectionBg }}
                  title={`Background: ${block.settings.sectionBg}`}
                />
              )}
              <span className="text-xs text-gray-400 mr-2">#{idx + 1}</span>
              <button onClick={e => { e.stopPropagation(); update(idx, 'is_active', !block.is_active) }}
                className={block.is_active ? 'text-green-500' : 'text-gray-300'}>
                {block.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={e => { e.stopPropagation(); setBlocks(prev => prev.filter((_, i) => i !== idx)) }}
                className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
              {block._open
                ? <ChevronUp className="w-4 h-4 text-gray-400" />
                : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>

            {/* Block editor panel */}
            {block._open && (
              <div className="border-t border-gray-100 p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                    <input value={block.title ?? ''} onChange={e => update(idx, 'title', e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Block Type</label>
                    <select value={block.block_type} onChange={e => update(idx, 'block_type', e.target.value as BlockType)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none">
                      {Object.entries(BLOCK_LABELS).map(([v, { label }]) => (
                        <option key={v} value={v}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {block.block_type === 'custom' ? 'Custom HTML' : 'Content / Description'}
                  </label>
                  <textarea value={block.content ?? ''} onChange={e => update(idx, 'content', e.target.value)} rows={4}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono" />
                </div>

                {/* Settings panel */}
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50 space-y-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</p>

                  {/* ── Section background — available for ALL block types ── */}
                  <BgField
                    value={block.settings?.sectionBg ?? ''}
                    onChange={v => updateSetting(idx, 'sectionBg', v)}
                  />

                  {/* ── Text color — available for ALL block types ── */}
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Text Color</label>
                    <div className="flex gap-2">
                      <input type="color" value={block.settings?.textColor || '#111111'}
                        onChange={e => updateSetting(idx, 'textColor', e.target.value)}
                        className="w-10 h-9 border border-gray-200 rounded cursor-pointer p-0.5 flex-shrink-0" />
                      <input value={block.settings?.textColor ?? ''} onChange={e => updateSetting(idx, 'textColor', e.target.value)}
                        placeholder="e.g. #111111 or inherit"
                        className="flex-1 border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                    </div>
                  </div>

                  {/* Icon picker — available for all block types */}
                  <IconSelector
                    value={block.settings?.icon || ''}
                    onChange={v => updateSetting(idx, 'icon', v)}
                    label="Block Icon (from /icon folder)"
                  />

                  {/* Hero & CTA extra settings */}
                  {(block.block_type === 'hero' || block.block_type === 'cta') && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Button Text</label>
                        <input value={block.settings.buttonText ?? ''} onChange={e => updateSetting(idx, 'buttonText', e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Button URL</label>
                        <input value={block.settings.buttonUrl ?? ''} onChange={e => updateSetting(idx, 'buttonUrl', e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
                      </div>
                    </div>
                  )}

                  {/* Image block settings */}
                  {block.block_type === 'image' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="text-xs text-gray-500 mb-1 block">Image</label>
                        <div className="flex gap-3 items-center mb-2">
                          {block.settings.src && (
                            <img src={block.settings.src} alt="" className="h-16 rounded border border-gray-200 object-cover" />
                          )}
                          <label className={`flex items-center gap-2 cursor-pointer text-sm border rounded px-3 py-2 transition-colors ${
                            uploading === idx
                              ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                              : 'text-blue-600 hover:underline border-blue-200'
                          }`}>
                            {uploading === idx
                              ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</>
                              : <><Upload className="w-4 h-4" /> Upload Image</>
                            }
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploading === idx}
                              className="hidden"
                              onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(idx, f) }}
                            />
                          </label>
                        </div>
                        <input value={block.settings.src ?? ''} onChange={e => updateSetting(idx, 'src', e.target.value)}
                          placeholder="Or paste image URL directly"
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Alt Text</label>
                        <input value={block.settings.alt ?? ''} onChange={e => updateSetting(idx, 'alt', e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Width</label>
                        <input value={block.settings.width ?? '100%'} onChange={e => updateSetting(idx, 'width', e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none" />
                      </div>
                    </div>
                  )}

                  {/* Text block settings */}
                  {block.block_type === 'text' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Alignment</label>
                        <select value={block.settings.alignment ?? 'left'} onChange={e => updateSetting(idx, 'alignment', e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none">
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Font Size</label>
                        <select value={block.settings.fontSize ?? 'base'} onChange={e => updateSetting(idx, 'fontSize', e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none">
                          <option value="sm">Small</option>
                          <option value="base">Base</option>
                          <option value="lg">Large</option>
                          <option value="xl">XL</option>
                          <option value="2xl">2XL</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Features block settings */}
                  {block.block_type === 'features' && (
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Columns</label>
                      <select value={block.settings.columns ?? 3} onChange={e => updateSetting(idx, 'columns', Number(e.target.value))}
                        className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none mb-3">
                        <option value={2}>2 columns</option>
                        <option value={3}>3 columns</option>
                        <option value={4}>4 columns</option>
                      </select>
                    </div>
                  )}

                  {/* Raw JSON fallback */}
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Raw Settings (JSON)</label>
                    <textarea
                      value={JSON.stringify(block.settings, null, 2)}
                      onChange={e => { try { update(idx, 'settings', JSON.parse(e.target.value)) } catch {} }}
                      rows={3}
                      className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
