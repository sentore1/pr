"use client"

import { useEffect, useState, useCallback } from 'react'
import { Upload, Trash2, Search, Grid, List, Copy, Check, X, FolderOpen } from 'lucide-react'

interface MediaItem {
  id: number
  filename: string
  original_filename: string
  file_url: string
  mime_type: string
  file_size: number
  width: number | null
  height: number | null
  alt_text: string
  title: string
  folder: string
  created_at: string
}

function formatBytes(b: number) {
  if (b < 1024) return b + ' B'
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB'
  return (b / 1024 / 1024).toFixed(1) + ' MB'
}

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [folder, setFolder] = useState('all')
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selected, setSelected] = useState<MediaItem | null>(null)
  const [copied, setCopied] = useState(false)
  const [msg, setMsg] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => { load() }, [folder, page])

  async function load() {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), per_page: '24', ...(folder !== 'all' ? { folder } : {}) })
    const res = await fetch(`/api/admin/media?${params}`)
    const d = await res.json()
    if (d.success) { setItems(d.data || []); setTotal(d.total || 0) }
    setLoading(false)
  }

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true)
    const arr = Array.from(files)
    for (const file of arr) {
      const form = new FormData()
      form.append('file', file)
      form.append('folder', folder === 'all' ? 'general' : folder)
      await fetch('/api/admin/media/upload', { method: 'POST', body: form })
    }
    flash(`✓ ${arr.length} file${arr.length > 1 ? 's' : ''} uploaded`)
    setUploading(false)
    load()
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files)
  }, [folder])

  async function deleteItem(id: number) {
    if (!confirm('Delete this file?')) return
    await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
    if (selected?.id === id) setSelected(null)
    flash('✓ File deleted')
    load()
  }

  async function updateMeta(id: number, alt_text: string, title: string) {
    await fetch(`/api/admin/media/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alt_text, title }),
    })
    flash('✓ Updated')
    load()
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const filtered = items.filter(item =>
    !search || item.original_filename.toLowerCase().includes(search.toLowerCase()) || item.alt_text?.toLowerCase().includes(search.toLowerCase())
  )

  const FOLDERS = ['all', 'general', 'logos', 'content', 'hero', 'icons']

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">{total} file{total !== 1 ? 's' : ''} total</p>
        </div>
        <div className="flex gap-3 items-center">
          {msg && <span className={`text-sm px-3 py-1 rounded-full ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</span>}
          <label className={`flex items-center gap-2 cursor-pointer text-sm px-4 py-2 rounded-md transition-colors ${uploading ? 'bg-gray-100 text-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            <Upload className="w-3.5 h-3.5" />
            {uploading ? 'Uploading…' : 'Upload'}
            <input type="file" multiple accept="image/*" className="hidden"
              onChange={e => { if (e.target.files) uploadFiles(e.target.files) }} disabled={uploading} />
          </label>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Folder tabs */}
        <div className="flex gap-1">
          {FOLDERS.map(f => (
            <button key={f} onClick={() => { setFolder(f); setPage(1) }}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-md capitalize transition-colors ${folder === f ? 'bg-gray-900 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {f === 'all' ? <Grid className="w-3 h-3" /> : <FolderOpen className="w-3 h-3" />} {f}
            </button>
          ))}
        </div>
        {/* Search */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-1.5 ml-auto">
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files…"
            className="text-sm outline-none w-48" />
        </div>
        {/* View toggle */}
        <div className="flex gap-1 border border-gray-200 rounded-md p-0.5">
          <button onClick={() => setView('grid')} className={`p-1.5 rounded ${view === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}><Grid className="w-4 h-4 text-gray-600" /></button>
          <button onClick={() => setView('list')} className={`p-1.5 rounded ${view === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}><List className="w-4 h-4 text-gray-600" /></button>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Main area */}
        <div className="flex-1">
          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-lg mb-4 transition-colors ${dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50/50'} flex items-center justify-center py-6`}
          >
            <p className="text-sm text-gray-400">{dragging ? 'Drop files here…' : 'Drag & drop images here, or use Upload button'}</p>
          </div>

          {loading ? (
            <div className={`grid gap-3 ${view === 'grid' ? 'grid-cols-4 sm:grid-cols-6' : 'grid-cols-1'}`}>
              {[...Array(12)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p>No media found. Upload some images to get started.</p>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {filtered.map(item => (
                <div key={item.id}
                  onClick={() => setSelected(item)}
                  className={`group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${selected?.id === item.id ? 'border-blue-500' : 'border-transparent hover:border-gray-300'}`}>
                  <img src={item.file_url} alt={item.alt_text || item.original_filename} className="w-full h-full object-cover" />
                  <button onClick={e => { e.stopPropagation(); deleteItem(item.id) }}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded p-0.5 transition-opacity">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-50">
              {filtered.map(item => (
                <div key={item.id} onClick={() => setSelected(item)}
                  className={`flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer ${selected?.id === item.id ? 'bg-blue-50' : ''}`}>
                  <img src={item.file_url} alt="" className="w-10 h-10 object-cover rounded border border-gray-200 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.original_filename}</p>
                    <p className="text-xs text-gray-400">{item.mime_type} · {formatBytes(item.file_size)}</p>
                  </div>
                  <span className="text-xs text-gray-400">{item.folder}</span>
                  <button onClick={e => { e.stopPropagation(); deleteItem(item.id) }}
                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {total > 24 && (
            <div className="flex justify-center gap-2 mt-4">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 text-sm border border-gray-200 rounded-md disabled:opacity-40 hover:bg-gray-50">Prev</button>
              <span className="px-3 py-1 text-sm text-gray-500">Page {page} of {Math.ceil(total / 24)}</span>
              <button disabled={page >= Math.ceil(total / 24)} onClick={() => setPage(p => p + 1)} className="px-3 py-1 text-sm border border-gray-200 rounded-md disabled:opacity-40 hover:bg-gray-50">Next</button>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-64 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-4 space-y-4 self-start sticky top-20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">Details</span>
              <button onClick={() => setSelected(null)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <img src={selected.file_url} alt={selected.alt_text || ''} className="w-full rounded-md border border-gray-100 object-contain max-h-40" />
            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex justify-between"><span>Size</span><span>{formatBytes(selected.file_size)}</span></div>
              {selected.width && <div className="flex justify-between"><span>Dimensions</span><span>{selected.width}×{selected.height}</span></div>}
              <div className="flex justify-between"><span>Type</span><span>{selected.mime_type}</span></div>
              <div className="flex justify-between"><span>Folder</span><span>{selected.folder}</span></div>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Alt Text</label>
                <input defaultValue={selected.alt_text || ''} id="alt-input" className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Title</label>
                <input defaultValue={selected.title || ''} id="title-input" className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
              <button onClick={() => {
                const alt = (document.getElementById('alt-input') as HTMLInputElement)?.value || ''
                const title = (document.getElementById('title-input') as HTMLInputElement)?.value || ''
                updateMeta(selected.id, alt, title)
              }} className="w-full text-xs bg-gray-800 text-white py-1.5 rounded-md hover:bg-gray-900">Save Metadata</button>
            </div>
            <button onClick={() => copyUrl(selected.file_url)}
              className="w-full flex items-center justify-center gap-2 text-xs border border-gray-200 rounded-md py-1.5 hover:bg-gray-50">
              {copied ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy URL</>}
            </button>
            <button onClick={() => deleteItem(selected.id)}
              className="w-full flex items-center justify-center gap-2 text-xs text-red-500 border border-red-100 rounded-md py-1.5 hover:bg-red-50">
              <Trash2 className="w-3.5 h-3.5" /> Delete File
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
