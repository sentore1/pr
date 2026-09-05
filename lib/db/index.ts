/**
 * Database Module Index
 * Central export point for all database functionality
 */

// Connection utilities
export {
  getPool,
  getConnection,
  query,
  queryOne,
  insert,
  update,
  deleteQuery,
  transaction,
  testConnection,
  closePool,
  getPoolStats,
} from './connection'

// Query builder
export { createQueryBuilder, QueryBuilder } from './query-builder'
export type { WhereOperator, OrderDirection, WhereClause, JoinClause } from './query-builder'

// Types
export type * from './types'

// Models
export {
  // Base
  BaseModel,
  
  // User
  UserModel,
  userModel,
  
  // Content
  PageModel,
  pageModel,
  ContentBlockModel,
  contentBlockModel,
  
  // Navigation
  NavigationMenuModel,
  navigationMenuModel,
  NavigationItemModel,
  navigationItemModel,
  LogoModel,
  logoModel,
  
  // Footer
  FooterSectionModel,
  footerSectionModel,
  FooterLinkModel,
  footerLinkModel,
  
  // Media
  MediaLibraryModel,
  mediaLibraryModel,
  
  // Theme
  ThemeSettingModel,
  themeSettingModel,
  StyleSettingModel,
  styleSettingModel,
  
  // Analytics
  PageViewModel,
  pageViewModel,
  UserSessionModel,
  userSessionModel,
  
  // SEO
  SEOSettingModel,
  seoSettingModel,
  
  // Activity
  ActivityLogModel,
  activityLogModel,
  
  // System
  SystemSettingModel,
  systemSettingModel,
} from './models'

// Re-export config for convenience
export { config } from '../config'
