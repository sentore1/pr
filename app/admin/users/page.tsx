"use client"

import { useEffect, useState } from 'react'
import { Plus, Trash2, Save, X, Check, Shield } from 'lucide-react'

interface User {
  id: number
  email: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  is_active: boolean
  last_login: string | null
  created_at: string
}

const ROLE_COLORS = {
  admin:  'bg-purple-50 text-purple-700 border-purple-200',
  editor: 'bg-blue-50 text-blue-700 border-blue-200',
  viewer: 'bg-gray-50 text-gray-600 border-gray-200',
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'editor' as User['role'] })
  const [changingPw, setChangingPw] = useState<number | null>(null)
  const [newPw, setNewPw] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/users')
    const d = await res.json()
    if (d.success) setUsers(d.data || [])
    setLoading(false)
  }

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  async function createUser() {
    if (!form.name || !form.email || !form.password) return
    setSaving(true)
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const d = await res.json()
    if (d.success) { flash('✓ User created'); setShowAdd(false); setForm({ name: '', email: '', password: '', role: 'editor' }); load() }
    else flash('✗ ' + d.error)
    setSaving(false)
  }

  async function updateRole(id: number, role: User['role']) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    })
    const d = await res.json()
    if (d.success) { flash('✓ Role updated'); load() }
    else flash('✗ ' + d.error)
  }

  async function toggleActive(user: User) {
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !user.is_active }),
    })
    const d = await res.json()
    if (d.success) { flash(`✓ User ${user.is_active ? 'deactivated' : 'activated'}`); load() }
  }

  async function resetPassword(id: number) {
    if (!newPw || newPw.length < 6) { flash('✗ Password must be at least 6 characters'); return }
    setSaving(true)
    const res = await fetch(`/api/admin/users/${id}/password`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPw }),
    })
    const d = await res.json()
    if (d.success) { flash('✓ Password updated'); setChangingPw(null); setNewPw('') }
    else flash('✗ ' + d.error)
    setSaving(false)
  }

  async function deleteUser(id: number, name: string) {
    if (!confirm(`Delete user "${name}"?`)) return
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    const d = await res.json()
    if (d.success) { flash('✓ User deleted'); load() }
    else flash('✗ ' + d.error)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500 mt-1">Manage admin access and roles</p>
        </div>
        <div className="flex gap-3 items-center">
          {msg && <span className={`text-sm px-3 py-1 rounded-full ${msg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</span>}
          <button onClick={() => setShowAdd(v => !v)}
            className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <Plus className="w-3.5 h-3.5" /> Add User
          </button>
        </div>
      </div>

      {/* Add user form */}
      {showAdd && (
        <div className="bg-white border border-blue-200 rounded-lg p-5 space-y-4">
          <h2 className="font-medium text-gray-800 text-sm">New User</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Jane Smith" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="jane@example.com" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Password</label>
              <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Min 6 characters" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Role</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as User['role'] }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none">
                <option value="admin">Admin — full access</option>
                <option value="editor">Editor — can edit content</option>
                <option value="viewer">Viewer — read only</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={createUser} disabled={saving || !form.name || !form.email || !form.password}
              className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
              {saving ? 'Creating…' : 'Create User'}
            </button>
            <button onClick={() => setShowAdd(false)}
              className="text-sm border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      {/* Users table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr_100px_80px_120px_100px] gap-x-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
          {['User', 'Role', 'Status', 'Last Login', 'Actions'].map(h => (
            <span key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</span>
          ))}
        </div>

        {loading ? (
          <div className="divide-y divide-gray-50">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-[1fr_100px_80px_120px_100px] gap-x-4 px-5 py-4">
                {[...Array(5)].map((_, j) => <div key={j} className="h-4 bg-gray-100 rounded animate-pulse" />)}
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {users.map(user => (
              <div key={user.id}>
                <div className="grid grid-cols-[1fr_100px_80px_120px_100px] gap-x-4 px-5 py-4 hover:bg-gray-50 items-center">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-white">{user.name[0]}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Role selector */}
                  <select value={user.role} onChange={e => updateRole(user.id, e.target.value as User['role'])}
                    className={`text-xs border rounded-full px-2 py-1 font-medium focus:outline-none cursor-pointer ${ROLE_COLORS[user.role]}`}>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>

                  {/* Active toggle */}
                  <button onClick={() => toggleActive(user)}
                    className={`text-xs px-2 py-1 rounded-full border font-medium transition-colors ${user.is_active ? 'bg-green-50 text-green-700 border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200' : 'bg-red-50 text-red-600 border-red-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </button>

                  <p className="text-xs text-gray-400">
                    {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                  </p>

                  <div className="flex items-center gap-1">
                    {/* Change password */}
                    <button onClick={() => { setChangingPw(user.id); setNewPw('') }} title="Reset password"
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Shield className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => deleteUser(user.id, user.name)} title="Delete user"
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Password change inline */}
                {changingPw === user.id && (
                  <div className="px-5 pb-4 flex items-center gap-2 bg-blue-50/40">
                    <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)}
                      placeholder="New password (min 6 chars)"
                      className="border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 w-64" />
                    <button onClick={() => resetPassword(user.id)} disabled={saving}
                      className="flex items-center gap-1 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 disabled:opacity-50">
                      <Check className="w-3 h-3" /> {saving ? '…' : 'Save'}
                    </button>
                    <button onClick={() => setChangingPw(null)}
                      className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50">
                      <X className="w-3 h-3" /> Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
