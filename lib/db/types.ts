/**
 * Database Types and Interfaces
 * TypeScript definitions for all database tables
 */

// =====================================================
// USERS & AUTHENTICATION
// =====================================================

export interface User {
  id: number
  email: string
  password_hash: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  avatar_url: string | null
  is_active: boolean
  last_login: Date | null
  created_at: Date
  updated_at: Date
}

export type UserRole = User['role']

export interface UserCreate {
  email: string
  password_hash: string
  name: string
  role?: UserRole
  avatar_url?: string | null
}

export interface UserUpdate {
  email?: string
  name?: string
  role?: UserRole
  avatar_url?: string | null
  is_active?: boolean
  last_login?: Date
}

// =====================================================
// NAVIGATION
// =====================================================

export interface NavigationMenu {
  id: number
  name: string
  position: 'header' | 'footer' | 'sidebar'
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface NavigationItem {
  id: number
  menu_id: number
  parent_id: number | null
  label: string
  url: string | null
  icon_url: string | null
  target: '_self' | '_blank'
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface Logo {
  id: number
  name: string
  image_url: string
  alt_text: string | null
  width: number | null
  height: number | null
  position: 'header' | 'footer' | 'mobile'
  link_url: string | null
  is_active: boolean
  created_at: Date
  updated_at: Date
}

// =====================================================
// CONTENT
// =====================================================

export interface Page {
  id: number
  slug: string
  title: string
  meta_description: string | null
  meta_keywords: string | null
  og_image: string | null
  is_published: boolean
  publish_date: Date | null
  created_by: number | null
  created_at: Date
  updated_at: Date
}

export type BlockType = 
  | 'hero'
  | 'text'
  | 'image'
  | 'gallery'
  | 'video'
  | 'cta'
  | 'features'
  | 'testimonials'
  | 'pricing'
  | 'faq'
  | 'custom'

export interface ContentBlock {
  id: number
  page_id: number
  block_type: BlockType
  title: string | null
  content: string | null
  settings: Record<string, any> | null
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface DynamicContent {
  id: number
  key_name: string
  value: string | null
  data_type: 'text' | 'html' | 'json' | 'number' | 'boolean'
  description: string | null
  created_at: Date
  updated_at: Date
}

// =====================================================
// MEDIA
// =====================================================

export interface MediaLibrary {
  id: number
  filename: string
  original_filename: string
  file_path: string
  file_url: string
  mime_type: string | null
  file_size: number | null
  width: number | null
  height: number | null
  alt_text: string | null
  title: string | null
  description: string | null
  uploaded_by: number | null
  folder: string
  created_at: Date
  updated_at: Date
}

// =====================================================
// FOOTER
// =====================================================

export interface FooterSection {
  id: number
  name: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface FooterLink {
  id: number
  section_id: number
  label: string
  url: string | null
  icon_url: string | null
  target: '_self' | '_blank'
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface FooterContent {
  id: number
  key_name: string
  content: string | null
  created_at: Date
  updated_at: Date
}

// =====================================================
// THEME & STYLING
// =====================================================

export interface ThemeSetting {
  id: number
  name: string
  is_active: boolean
  settings: Record<string, any> | null
  created_at: Date
  updated_at: Date
}

export interface StyleSetting {
  id: number
  category: string
  property: string
  value: string
  description: string | null
  created_at: Date
  updated_at: Date
}

// =====================================================
// ANALYTICS
// =====================================================

export interface PageView {
  id: number
  page_slug: string | null
  page_title: string | null
  referrer: string | null
  user_agent: string | null
  ip_address: string | null
  country: string | null
  city: string | null
  device_type: 'desktop' | 'mobile' | 'tablet' | 'unknown'
  browser: string | null
  os: string | null
  session_id: string | null
  viewed_at: Date
}

export interface UserSession {
  id: number
  session_id: string
  first_page: string | null
  last_page: string | null
  page_count: number
  duration_seconds: number
  referrer: string | null
  ip_address: string | null
  user_agent: string | null
  started_at: Date
  ended_at: Date | null
}

export interface Event {
  id: number
  session_id: string | null
  event_type: string
  event_name: string
  event_data: Record<string, any> | null
  page_slug: string | null
  created_at: Date
}

export interface Conversion {
  id: number
  session_id: string | null
  conversion_type: string
  conversion_value: number | null
  page_slug: string | null
  metadata: Record<string, any> | null
  created_at: Date
}

// =====================================================
// SEO
// =====================================================

export interface SEOSetting {
  id: number
  page_id: number | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  og_title: string | null
  og_description: string | null
  og_image: string | null
  og_type: string
  twitter_card: string
  twitter_title: string | null
  twitter_description: string | null
  twitter_image: string | null
  canonical_url: string | null
  robots: string
  structured_data: Record<string, any> | null
  created_at: Date
  updated_at: Date
}

export interface Redirect {
  id: number
  source_url: string
  destination_url: string
  redirect_type: '301' | '302' | '307'
  is_active: boolean
  hit_count: number
  created_at: Date
  updated_at: Date
}

export interface Sitemap {
  id: number
  url: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  last_modified: Date
  is_active: boolean
}

// =====================================================
// FORMS
// =====================================================

export interface Form {
  id: number
  name: string
  description: string | null
  settings: Record<string, any> | null
  success_message: string | null
  redirect_url: string | null
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface FormSubmission {
  id: number
  form_id: number
  data: Record<string, any>
  ip_address: string | null
  user_agent: string | null
  referrer: string | null
  created_at: Date
}

// =====================================================
// ACTIVITY LOGS
// =====================================================

export interface ActivityLog {
  id: number
  user_id: number | null
  action: string
  entity_type: string | null
  entity_id: number | null
  changes: Record<string, any> | null
  ip_address: string | null
  user_agent: string | null
  created_at: Date
}

// =====================================================
// SYSTEM
// =====================================================

export interface SystemSetting {
  id: number
  setting_key: string
  setting_value: string | null
  data_type: 'string' | 'number' | 'boolean' | 'json'
  description: string | null
  is_public: boolean
  created_at: Date
  updated_at: Date
}

// =====================================================
// ANALYTICS VIEWS
// =====================================================

export interface PageAnalytics {
  slug: string
  title: string
  total_views: number
  unique_visitors: number
  avg_session_duration: number | null
  active_days: number
}

export interface DailyAnalytics {
  date: string
  total_views: number
  unique_visitors: number
  pages_viewed: number
}

export interface DeviceStats {
  device_type: string
  total_views: number
  unique_visitors: number
  percentage: number
}

// =====================================================
// PAGINATION
// =====================================================

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
}

// =====================================================
// API RESPONSES
// =====================================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  success: false
  error: string
  code?: string
  details?: any
}
