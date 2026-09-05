"use client"

import { useEffect, useState } from 'react'
import { Plus, Trash2, Save, GripVertical, Eye, EyeOff } from 'lucide-react'

interface FooterLink { id?: number; label: string; url: string; target: '_self' | '_blank'; sort_order: number; is_active: boolean }
interface FooterSection { id?: number; name: string; sort_order: number; is_active: boolean; links: FooterLink[] }
interface FooterContent { copyright_text: string; tagline: string; whatsapp_number: string }

export default function FooterPage() {
  const [sections, setSections] = useState<FooterSection[]>([])
  const [content, setContent] = useState<FooterContent>({ copyright_text: '', tagline: '', whatsapp_number: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const [secRes, contRes] = await Promise.all([
      fetch('/api/admin/footer/sections'),
      fetch('/api/admin/footer/content'),
    ])
    const secData = await secRes.json()
    const contData = await contRes.json()
    if (secData.success) setSections(secData.data || [])
    if (contData.success) setContent(contData.data || { copyright_text: '', tagline: '', whatsapp_number: '' })
  }

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  async function save() {
    setSaving(true)
    const [r1, r2] = await Promise.all([
      fetch('/api/admin/footer/sections', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sections }) }),
      fetch('/api/admin/footer/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) }),
    ])
    const d1 = await r1.json(); const d2 = await r2.json()
    flash(d1.success && d2.success ? '✓ Footer saved' : '✗ Error saving footer')
    setSaving(false)
  }

  function addSection() {
    setSections(prev => [...prev, { name: 'New Section', sort_order: prev.length, is_active: true, links: [] }])
  }

  function updateSection(si: number, key: keyof FooterSection, val: any) {
    setSections(prev => prev.map((s, i) => i === si ? { ...s, [key]: val } : s))
  }

  function removeSection(si: number) { setSections(prev => prev.filter((_, i) => i !== si)) }

  function addLink(si: number) {
    setSections(prev => prev.map((s, i) => i === si
      ? { ...s, links: [...s.links, { label: 'New Link', url: '/', target: '_self', sort_order: s.links.length, is_active: true }] }
      : s
    ))
  }

  function updateLink(si: number, li: number, key: keyof FooterLink, val: any) {
    setSections(prev => prev.map((s, i) => i === si
      ? { ...s, links: s.links.map((l, j) => j === li ? { ...l, [key]: val } : l) }
      : s
    ))
  }

  function removeLink(si: number, li: number) {
    setSections(prev => prev.map((s, i) => i === si
      ? { ...s, links: s.links.filter((_, j) => j !== li) }
      : s
    ))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Footer Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Manage footer sections, links, and content</p>
        </div>
        <div className="flex gap-3">
          {msg && <span className={`text-sm px-3 py-1 rounded-full ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</span>}
          <button onClick={save} disabled={saving}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Footer'}
          </button>
        </div>
      </div>

      {/* General content */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <h2 className="font-medium text-gray-800">Footer Content</h2>
        <div className="grid grid-cols-1 gap-4">
          {([
            { key: 'tagline', label: 'Tagline' },
            { key: 'copyright_text', label: 'Copyright Text' },
            { key: 'whatsapp_number', label: 'WhatsApp Number' },
          ] as { key: keyof FooterContent; label: string }[]).map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
              <input value={content[key]} onChange={e => setContent(prev => ({ ...prev, [key]: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-800">Link Sections</h2>
          <button onClick={addSection}
            className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
            <Plus className="w-3.5 h-3.5" /> Add Section
          </button>
        </div>

        {sections.map((section, si) => (
          <div key={si} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Section header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 bg-gray-50">
              <GripVertical className="w-4 h-4 text-gray-300" />
              <input value={section.name} onChange={e => updateSection(si, 'name', e.target.value)}
                className="text-sm font-medium text-gray-800 bg-transparent border-0 focus:bg-white focus:border focus:border-blue-300 focus:rounded px-1 py-0.5 outline-none flex-1" />
              <button onClick={() => updateSection(si, 'is_active', !section.is_active)}
                className={section.is_active ? 'text-green-500' : 'text-gray-300'}>
                {section.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => addLink(si)}
                className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 border border-blue-200 rounded">+ Link</button>
              <button onClick={() => removeSection(si)} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Links */}
            <div className="divide-y divide-gray-50">
              {section.links.length === 0 && (
                <p className="text-xs text-gray-400 px-5 py-4 text-center">No links in this section. Click "+ Link" to add one.</p>
              )}
              {section.links.map((link, li) => (
                <div key={li} className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 group">
                  <GripVertical className="w-3.5 h-3.5 text-gray-200" />
                  <input value={link.label} onChange={e => updateLink(si, li, 'label', e.target.value)}
                    className="text-sm text-gray-700 w-36 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                  <input value={link.url} onChange={e => updateLink(si, li, 'url', e.target.value)}
                    placeholder="/path or https://..."
                    className="text-sm text-gray-500 flex-1 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                  <select value={link.target} onChange={e => updateLink(si, li, 'target', e.target.value as '_self' | '_blank')}
                    className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none">
                    <option value="_self">Same tab</option>
                    <option value="_blank">New tab</option>
                  </select>
                  <button onClick={() => updateLink(si, li, 'is_active', !link.is_active)}
                    className={link.is_active ? 'text-green-500' : 'text-gray-300'}>
                    {link.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => removeLink(si, li)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
