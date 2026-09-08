/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/:path*',
        headers: [
          // Prevent browsers from MIME-sniffing the content type
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          // Block clickjacking / iframe embedding from other origins
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },

          // Legacy XSS filter for older IE/Edge
          { key: 'X-XSS-Protection', value: '1; mode=block' },

          // Control how much referrer info is sent
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

          // HTTPS enforcement (2 years, include subdomains)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },

          // Restrict browser feature access
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'interest-cohort=()',
              'payment=(self)',
            ].join(', '),
          },

          // Content Security Policy
          // - default-src 'self'           → block everything not explicitly allowed
          // - script-src adds 'unsafe-inline' + nonce-less trusted CDNs needed by
          //   Next.js inline scripts, Vercel Analytics, and Google Fonts
          // - style-src 'unsafe-inline' is required by Tailwind's inline styles
          // - img-src 'self' data: blob: + Vercel image service
          // - connect-src 'self' + Vercel analytics + vitals
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https://*.vercel.app https://*.pryro.com",
              "media-src 'self'",
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },

      // Relax CSP for admin routes — editors need to embed iframes, load external
      // media previews, and the custom HTML block needs broader script permissions.
      // The admin is protected by auth so this is an acceptable trade-off.
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https: *",
              "media-src 'self' blob: https:",
              "connect-src 'self' https:",
              "frame-src 'self' https:",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join('; '),
          },
        ],
      },

      // Cache-control for uploaded media served from /uploads
      {
        source: '/uploads/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          // Prevent SVGs from running scripts when opened directly
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Content-Security-Policy', value: "default-src 'none'; style-src 'unsafe-inline'; sandbox" },
        ],
      },
    ]
  },
}

export default nextConfig
