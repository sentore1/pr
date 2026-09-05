/**
 * Application Configuration
 * Centralized configuration for the CMS system
 */

export const config = {
  // Database
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    name: process.env.DATABASE_NAME || 'pryro_cms',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT || '10'),
    queueLimit: parseInt(process.env.DATABASE_QUEUE_LIMIT || '0'),
  },

  // Authentication
  auth: {
    secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    jwtSecret: process.env.JWT_SECRET || 'jwt-secret-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },

  // Application
  app: {
    env: process.env.NODE_ENV || 'development',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },

  // File Uploads
  upload: {
    dir: process.env.UPLOAD_DIR || './public/uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,image/webp,image/svg+xml').split(','),
    maxFiles: 10,
  },

  // Analytics
  analytics: {
    enabled: process.env.ENABLE_ANALYTICS === 'true',
    geoipApiKey: process.env.GEOIP_API_KEY || '',
    trackingCookie: 'pryro_session',
    cookieMaxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
  },

  // Email
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.SMTP_FROM || 'noreply@pryro.com',
  },

  // SEO
  seo: {
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Pryro',
    siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Business management, finally simple',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://pryro.com',
    twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@pryro',
  },

  // Security
  security: {
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    rateLimitWindow: process.env.RATE_LIMIT_WINDOW || '15m',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    bcryptRounds: 10,
  },

  // Admin Dashboard
  admin: {
    path: '/admin',
    itemsPerPage: 20,
    maxRecentActivities: 50,
  },

  // CMS Settings
  cms: {
    defaultPageStatus: 'draft',
    autoSaveDraft: true,
    autoSaveInterval: 30000, // 30 seconds
    supportedBlockTypes: [
      'hero',
      'text',
      'image',
      'gallery',
      'video',
      'cta',
      'features',
      'testimonials',
      'pricing',
      'faq',
      'custom',
    ],
  },
} as const

export type Config = typeof config

// Validate required environment variables
export function validateConfig() {
  const requiredVars = [
    'DATABASE_HOST',
    'DATABASE_NAME',
    'DATABASE_USER',
    'NEXTAUTH_SECRET',
  ]

  const missing = requiredVars.filter(
    (varName) => !process.env[varName]
  )

  if (missing.length > 0 && config.app.isProduction) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    )
  }

  return true
}
