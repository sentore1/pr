import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { getCMSData } from "@/lib/cms"
import { CMSProvider } from "@/components/cms-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const revalidate = 60  // ISR — re-fetch CMS every 60s

// Dynamic metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCMSData()
  const seo = cms.seo as Record<string, string> | null
  const siteName = cms.settings?.site_name || 'Pryro'

  return {
    title:       seo?.meta_title       || `${siteName} — Business Management Platform`,
    description: seo?.meta_description || 'Complete ERP solution with AI-powered insights.',
    keywords:    seo?.meta_keywords    || 'ERP, business management, accounting software',
    openGraph: {
      title:       seo?.og_title       || seo?.meta_title || siteName,
      description: seo?.og_description || seo?.meta_description || '',
      images:      seo?.og_image       ? [seo.og_image]          : ['/og-image.png'],
      type:        (seo?.og_type as any) || 'website',
    },
    twitter: {
      card:        (seo?.twitter_card as any) || 'summary_large_image',
      title:       seo?.twitter_title  || seo?.meta_title || siteName,
      description: seo?.twitter_description || seo?.meta_description || '',
      images:      seo?.twitter_image  ? [seo.twitter_image] : ['/og-image.png'],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cms = await getCMSData()

  return (
    <html lang="en" className="bg-white">
      <body className="font-sans antialiased bg-white">
        <CMSProvider data={cms}>
          {children}
        </CMSProvider>
        <Analytics />
      </body>
    </html>
  )
}
