"use client"

import { useEffect, useState } from 'react'
import { Save, RotateCcw } from 'lucide-react'

interface StyleMap { [category: string]: { [property: string]: string } }

type SchemaField =
  | { key: string; label: string; type: 'color' | 'text'; hint?: string }
  | { key: string; label: string; type: 'select'; options: string[]; hint?: string }

const STYLE_SCHEMA: { category: string; label: string; fields: SchemaField[] }[] = [
  {
    category: 'colors',
    label: 'Colors',
    fields: [
      { key: 'primary',    label: 'Primary',    type: 'color', hint: 'Main brand color' },
      { key: 'secondary',  label: 'Secondary',  type: 'color', hint: 'Secondary text / accents' },
      { key: 'background', label: 'Background', type: 'color', hint: 'Page background' },
      { key: 'text',       label: 'Text',        type: 'color', hint: 'Body text color' },
    ],
  },
  {
    category: 'gradient',
    label: 'Hero Gradient',
    fields: [
      { key: 'hero_from',  label: 'From Color', type: 'color', hint: 'Top gradient color' },
      { key: 'hero_to',    label: 'To Color',   type: 'color', hint: 'Bottom gradient color' },
      { key: 'hero_full',  label: 'Custom CSS Gradient', type: 'text', hint: 'e.g. linear-gradient(...)' },
    ],
  },
  {
    category: 'fonts',
    label: 'Typography',
    fields: [
      { key: 'heading',   label: 'Heading Font',  type: 'select', options: ['serif', 'sans-serif', 'monospace', 'Georgia, serif', 'Inter, sans-serif'], hint: 'Used for h1–h3' },
      { key: 'body',      label: 'Body Font',     type: 'select', options: ['sans-serif', 'serif', 'monospace', 'Inter, sans-serif', 'Georgia, serif'], hint: 'Used for paragraphs' },
      { key: 'size_base', label: 'Base Font Size', type: 'select', options: ['14px', '15px', '16px', '17px', '18px'], hint: 'Root font size' },
      { key: 'size_heading', label: 'Heading Scale', type: 'select', options: ['1.125', '1.25', '1.5', '1.75', '2'], hint: 'h1 size multiplier' },
    ],
  },
  {
    category: 'borders',
    label: 'Borders & Radius',
    fields: [
      { key: 'radius',     label: 'Border Radius', type: 'select', options: ['0px', '2px', '4px', '5px', '6px', '8px', '12px', '16px', '9999px'], hint: 'Global corner rounding' },
      { key: 'radius_btn', label: 'Button Radius',  type: 'select', options: ['0px', '2px', '4px', '5px', '6px', '8px', '9999px'], hint: 'Button corner rounding' },
      { key: 'width',      label: 'Border Width',   type: 'select', options: ['0px', '1px', '2px', '3px'], hint: 'Default border thickness' },
    ],
  },
  {
    category: 'spacing',
    label: 'Spacing',
    fields: [
      { key: 'base',        label: 'Base Unit',    type: 'select', options: ['0.75rem', '1rem', '1.25rem', '1.5rem'], hint: 'Core spacing multiplier' },
      { key: 'section_py',  label: 'Section Padding Y', type: 'select', options: ['2rem', '3rem', '4rem', '5rem', '6rem', '8rem'], hint: 'Top/bottom section padding' },
    ],
  },
]

const DEFAULTS: StyleMap = {
  colors:   { primary: '#0072FD', secondary: '#4a5568', background: '#ffffff', text: '#0f1117' },
  gradient: { hero_from: '#0072FD', hero_to: '#E5EDFC', hero_full: '' },
  fonts:    { heading: 'serif', body: 'sans-serif', size_base: '16px', size_heading: '1.5' },
  borders:  { radius: '5px', radius_btn: '5px', width: '1px' },
  spacing:  { base: '1rem', section_py: '5rem' },
}

export default function ThemePage() {
  const [styles, setStyles] = useState<StyleMap>(DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [activeTab, setActiveTab] = useState('colors')

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/admin/theme/styles')
    const d = await res.json()
    if (d.success && d.data) {
      const map: StyleMap = { ...DEFAULTS }
      for (const s of d.data) {
        if (!map[s.category]) map[s.category] = {}
        map[s.category][s.property] = s.value
      }
      setStyles(map)
    }
  }

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  function set(category: string, key: string, val: string) {
    setStyles(prev => ({ ...prev, [category]: { ...prev[category], [key]: val } }))
  }

  async function save() {
    setSaving(true)
    const flat: { category: string; property: string; value: string }[] = []
    for (const [cat, props] of Object.entries(styles)) {
      for (const [prop, val] of Object.entries(props)) {
        flat.push({ category: cat, property: prop, value: val })
      }
    }
    const res = await fetch('/api/admin/theme/styles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ styles: flat }),
    })
    const d = await res.json()
    flash(d.success ? '✓ Theme saved' : '✗ ' + d.error)
    setSaving(false)
  }

  function reset() {
    setStyles(DEFAULTS)
    flash('Theme reset to defaults (not saved yet)')
  }

  const currentSection = STYLE_SCHEMA.find(s => s.category === activeTab)
  const catStyles = styles[activeTab] || {}

  // Build CSS variable string for the scoped preview style tag
  const previewVars = [
    `--cms-primary: ${styles.colors?.primary || '#0072FD'}`,
    `--cms-bg: ${styles.colors?.background || '#fff'}`,
    `--cms-text: ${styles.colors?.text || '#0f1117'}`,
    `--cms-font-heading: ${styles.fonts?.heading || 'serif'}`,
    `--cms-font-body: ${styles.fonts?.body || 'sans-serif'}`,
    `--radius: ${styles.borders?.radius || '5px'}`,
    `--radius-btn: ${styles.borders?.['radius_btn'] || '5px'}`,
  ].join('; ')

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Theme & Styling</h1>
          <p className="text-sm text-gray-500 mt-1">Customize colors, fonts, borders, and spacing</p>
        </div>
        <div className="flex gap-3 items-center">
          {msg && <span className={`text-sm px-3 py-1 rounded-full ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{msg}</span>}
          <button onClick={reset} className="flex items-center gap-1.5 text-sm border border-gray-200 px-3 py-2 rounded-md hover:bg-gray-50">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Theme'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[200px_1fr] gap-6">
        {/* Sidebar tabs */}
        <div className="space-y-1">
          {STYLE_SCHEMA.map(s => (
            <button key={s.category} onClick={() => setActiveTab(s.category)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${activeTab === s.category ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div className="space-y-4">
          {currentSection && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
              <h2 className="font-medium text-gray-800">{currentSection.label}</h2>
              {currentSection.fields.map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  {field.hint && <p className="text-xs text-gray-400 mb-2">{field.hint}</p>}

                  {field.type === 'color' && (
                    <div className="flex gap-3 items-center">
                      <input type="color" value={catStyles[field.key] || '#000000'}
                        onChange={e => set(activeTab, field.key, e.target.value)}
                        className="w-12 h-10 rounded border border-gray-200 cursor-pointer p-0.5" />
                      <input type="text" value={catStyles[field.key] || ''}
                        onChange={e => set(activeTab, field.key, e.target.value)}
                        className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="#rrggbb or rgba(...)" />
                    </div>
                  )}

                  {field.type === 'select' && field.options && (
                    <div className="flex gap-2 flex-wrap">
                      {field.options.map(opt => (
                        <button key={opt} onClick={() => set(activeTab, field.key, opt)}
                          className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${catStyles[field.key] === opt ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                          {opt}
                        </button>
                      ))}
                      <input type="text" value={catStyles[field.key] || ''}
                        onChange={e => set(activeTab, field.key, e.target.value)}
                        className="border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 w-28"
                        placeholder="Custom…" />
                    </div>
                  )}

                  {field.type === 'text' && (
                    <input type="text" value={catStyles[field.key] || ''}
                      onChange={e => set(activeTab, field.key, e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-400" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Live preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-medium text-gray-800 mb-4">Live Preview</h2>
            {/* Inject CSS vars via a scoped style tag — React doesn't support semicolons in style prop */}
            <style>{`#cms-theme-preview { ${previewVars} }`}</style>
            <div id="cms-theme-preview" className="space-y-3 p-5 border border-gray-100 rounded-lg">
              <div style={{ fontFamily: 'var(--cms-font-heading)', color: 'var(--cms-text)', background: 'var(--cms-bg)', fontSize: '1.5rem', fontWeight: 600 }}>
                Heading Preview
              </div>
              <p style={{ fontFamily: 'var(--cms-font-body)', color: 'var(--cms-text)', fontSize: '1rem' }}>
                Body text preview. This is how your paragraph content will look with the current font and color settings.
              </p>
              <button style={{ background: 'var(--cms-primary)', color: '#fff', borderRadius: 'var(--radius-btn)', padding: '0.5rem 1.25rem', border: 'none', fontFamily: 'var(--cms-font-body)', cursor: 'default', fontSize: '0.875rem', fontWeight: 500 }}>
                Button Preview
              </button>
              <div style={{ border: `1px solid var(--cms-primary)`, borderRadius: 'var(--radius)', padding: '0.75rem 1rem', color: 'var(--cms-text)', fontFamily: 'var(--cms-font-body)', fontSize: '0.875rem' }}>
                Card / container preview with border radius
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
