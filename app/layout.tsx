import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { getCMSData, buildCSSVars } from "@/lib/cms"
import { CMSProvider } from "@/components/cms-provider"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { config } from "@/lib/config"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const revalidate = 60  // ISR — re-fetch CMS every 60s

// Dynamic metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCMSData()
  const seo = cms.seo as Record<string, string> | null
  const siteName = cms.settings?.site_name || config.seo.siteName

  return {
    metadataBase: new URL(config.seo.siteUrl),
    title:       seo?.meta_title       || `${siteName} — Business Management Platform`,
    description: seo?.meta_description || 'Complete ERP solution with AI-powered insights.',
    keywords:    seo?.meta_keywords    || 'ERP, business management, accounting software',
    openGraph: {
      title:       seo?.og_title       || seo?.meta_title || siteName,
      description: seo?.og_description || seo?.meta_description || '',
      images:      seo?.og_image       ? [seo.og_image]          : ['/og-image.png'],
      type:        (seo?.og_type as any) || 'website',
      siteName,
    },
    twitter: {
      card:        (seo?.twitter_card as any) || 'summary_large_image',
      title:       seo?.twitter_title        || seo?.meta_title || siteName,
      description: seo?.twitter_description  || seo?.meta_description || '',
      images:      seo?.twitter_image        ? [seo.twitter_image] : ['/og-image.png'],
      // twitter:creator from CMS system_settings or env fallback
      creator:     cms.settings?.twitter_handle || config.seo.twitterHandle || undefined,
    },
    alternates: {
      canonical: seo?.canonical_url || config.seo.siteUrl,
    },
    robots:    seo?.robots || 'index, follow',
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png',  media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFFFFF",
}

// Build JSON-LD structured data from CMS settings
async function getStructuredData() {
  const cms = await getCMSData()
  const seo = cms.seo as Record<string, any> | null
  const siteName = cms.settings?.site_name || config.seo.siteName
  const siteUrl  = config.seo.siteUrl

  // If admin has saved custom structured data, use it directly
  if (seo?.structured_data) {
    try {
      return typeof seo.structured_data === 'string'
        ? JSON.parse(seo.structured_data)
        : seo.structured_data
    } catch { /* fall through to default */ }
  }

  // Default: Organization + WebSite schema
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/pryro logo.png`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ]
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [cms, structuredData] = await Promise.all([getCMSData(), getStructuredData()])

  // Build CSS vars server-side and inject inline before any stylesheet loads.
  // This prevents the globals.css :root defaults from overriding the CMS values,
  // regardless of stylesheet load order.
  const cssVars = buildCSSVars(cms.styles)

  return (
    <html lang="en" className="bg-white">
      <head>
        {/* Inject CMS theme variables before stylesheets so they win the cascade */}
        {cssVars && (
          <style
            id="cms-vars-ssr"
            dangerouslySetInnerHTML={{ __html: `:root { ${cssVars} }` }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-white">
        <CMSProvider data={cms}>
          <AnalyticsTracker />
          {children}
        </CMSProvider>
        <Analytics />
      </body>
    </html>
  )
}
