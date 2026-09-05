"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, Navigation, Type, PanelBottom, Palette,
  Image, BarChart2, Search, Settings, LogOut, Menu, X,
  ChevronRight, Globe, Users, FileText
} from 'lucide-react'

const NAV = [
  { label: 'Dashboard',   href: '/admin',             icon: LayoutDashboard },
  { label: 'Navigation',  href: '/admin/navigation',  icon: Navigation },
  { label: 'Content',     href: '/admin/content',     icon: Type },
  { label: 'Footer',      href: '/admin/footer',      icon: PanelBottom },
  { label: 'Theme',       href: '/admin/theme',       icon: Palette },
  { label: 'Media',       href: '/admin/media',       icon: Image },
  { label: 'Analytics',   href: '/admin/analytics',   icon: BarChart2 },
  { label: 'SEO',         href: '/admin/seo',         icon: Search },
  { label: 'Pages',       href: '/admin/pages',       icon: FileText },
  { label: 'Users',       href: '/admin/users',       icon: Users },
  { label: 'Settings',    href: '/admin/settings',    icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then(r => r.json())
      .then(d => { if (d.success) setUser(d.user) })
      .catch(() => {})
  }, [])

  async function logout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-60 bg-white border-r border-gray-200 flex flex-col admin-shell
          transform transition-transform duration-200 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <img src="/pryro logo.png" alt="Pryro" className="h-7 w-auto" />
          <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">CMS</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors
                  ${active
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
              </Link>
            )
          })}
        </nav>

        {/* User + logout */}
        <div className="border-t border-gray-100 p-4">
          {user && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-white">{user.name[0]}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user.role}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded hover:bg-gray-100"
            >
              <Globe className="w-3.5 h-3.5" /> View Site
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-xs text-red-500 hover:text-red-700 px-2 py-1.5 rounded hover:bg-red-50"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:pl-60 flex flex-col min-h-screen admin-shell">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 h-14 flex items-center px-4 gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <span className="font-medium text-gray-900">
              {NAV.find(n => pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href)))?.label || 'Dashboard'}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 border border-gray-200 px-3 py-1.5 rounded-md hover:border-blue-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
