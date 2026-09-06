"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Props { slug: string; title: string }

export function CustomLayout({ slug, title }: Props) {
  const p = usePageContent(slug)

  const bodyBlocks = [1, 2, 3]
    .map((n) => p(`${slug}_body_text${n}`, ''))
    .filter(Boolean)

  const bodyImages = [1, 2]
    .map((n) => p(`${slug}_body_image${n}`, ''))
    .filter(Boolean)

  const hasHeroImage = !!p(`${slug}_hero_image`, '')

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-0 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #f0f6ff 0%, #e8f0fe 50%, #f8faff 100%)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0072FD 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {p(`${slug}_hero_badge`, '') && (
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full mb-7 border border-blue-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {p(`${slug}_hero_badge`, '')}
            </span>
          )}
          <h1 className="text-5xl md:text-[3.75rem] lg:text-[4.25rem] font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
            {p(`${slug}_hero_title`, title)}
          </h1>
          {p(`${slug}_hero_subtitle`, '') && (
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              {p(`${slug}_hero_subtitle`, '')}
            </p>
          )}
          {p(`${slug}_hero_cta_text`, '') && (
            <div className="mb-16">
              <Button asChild size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 text-[15px] shadow-lg shadow-blue-200">
                <Link href={p(`${slug}_hero_cta_url`, '/contact')}>
                  {p(`${slug}_hero_cta_text`, 'Get Started')}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {hasHeroImage ? (
          <div className="relative max-w-5xl mx-auto px-4">
            <img src={p(`${slug}_hero_image`, '')} alt={title}
              className="w-full rounded-t-2xl shadow-2xl border border-gray-200/80 translate-y-12" />
          </div>
        ) : (
          <div className="h-12 w-full" />
        )}
      </section>

      {hasHeroImage && <div className="h-12 bg-white" />}

      {/* ── Body content ────────────────────────────────────────────────────── */}
      {(bodyBlocks.length > 0 || bodyImages.length > 0 || p(`${slug}_body_title`, '')) && (
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            {p(`${slug}_body_title`, '') && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center leading-tight">
                {p(`${slug}_body_title`, '')}
              </h2>
            )}

            {bodyBlocks.length > 0 && (
              <div className="space-y-6 mb-12">
                {bodyBlocks.map((block, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-lg">
                    {block}
                  </p>
                ))}
              </div>
            )}

            {bodyImages.length > 0 && (
              <div className={`grid gap-6 ${bodyImages.length > 1 ? 'md:grid-cols-2' : ''}`}>
                {bodyImages.map((src, i) => (
                  <img key={i} src={src} alt={`${title} image ${i + 1}`}
                    className="w-full rounded-2xl shadow-xl border border-gray-200" />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      {p(`${slug}_cta_title`, '') && (
        <section className="relative py-28 px-4 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #0a0f1e 100%)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              {p(`${slug}_cta_title`, '')}
            </h2>
            {p(`${slug}_cta_body`, '') && (
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
                {p(`${slug}_cta_body`, '')}
              </p>
            )}
            {p(`${slug}_cta_btn`, '') && (
              <Button asChild size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 h-12 text-[15px] shadow-lg shadow-blue-900/40">
                <Link href={p(`${slug}_cta_url`, '/contact')}>
                  {p(`${slug}_cta_btn`, 'Get Started')}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            )}
          </div>
        </section>
      )}

      <SimpleFooter />
    </div>
  )
}
