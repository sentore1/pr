"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import { usePageContent } from "@/lib/use-page-content"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Star, Lightbulb, Heart, ShieldCheck, Rocket } from "lucide-react"

interface Props { slug: string; title: string }

const VALUE_ICONS = [Lightbulb, Heart, ShieldCheck, Rocket, Star]

export function AboutStyleLayout({ slug, title }: Props) {
  const p = usePageContent(slug)

  const values = [1, 2, 3, 4].map((n) => ({
    title: p(`${slug}_value${n}_title`, ''),
    desc:  p(`${slug}_value${n}_desc`,  ''),
  })).filter((v) => v.title)

  const hasHeroImage  = !!p(`${slug}_hero_image`, '')
  const hasStoryImage = !!p(`${slug}_story_image`, '')

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className={`${hasHeroImage ? 'grid md:grid-cols-[1fr_auto] gap-12 items-end' : ''}`}>
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-bold text-black mb-6 leading-[1.1] tracking-tight">
                {p(`${slug}_hero_title`, title)}
              </h1>
              {p(`${slug}_hero_subtitle`, '') && (
                <p className="text-xl text-gray-500 leading-relaxed max-w-xl">
                  {p(`${slug}_hero_subtitle`, '')}
                </p>
              )}
            </div>
            {hasHeroImage && (
              <img src={p(`${slug}_hero_image`, '')} alt={title}
                className="w-80 h-72 object-cover rounded-2xl shadow-xl border border-gray-200 flex-shrink-0" />
            )}
          </div>
        </div>
      </section>

      {/* ── Story / Introduction ────────────────────────────────────────────── */}
      {p(`${slug}_story_title`, '') && (
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className={`${hasStoryImage ? 'grid md:grid-cols-[1fr_380px] gap-16 items-start' : 'max-w-3xl'}`}>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 mb-3 block">
                  {p(`${slug}_story_title`, '')}
                </span>
                <div className="w-10 h-1 bg-blue-600 rounded-full mb-7" />
                <div className="space-y-5 text-gray-600 leading-relaxed text-[15px]">
                  {[1, 2, 3].map((n) =>
                    p(`${slug}_story_p${n}`, '') ? (
                      <p key={n}>{p(`${slug}_story_p${n}`, '')}</p>
                    ) : null
                  )}
                </div>
              </div>
              {hasStoryImage && (
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-3 bg-blue-50 rounded-2xl -z-10" />
                  <img src={p(`${slug}_story_image`, '')} alt="Our Story"
                    className="w-full rounded-xl shadow-lg border border-gray-100 relative z-10" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Values / Highlights ─────────────────────────────────────────────── */}
      {values.length > 0 && (
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            {p(`${slug}_values_title`, '') && (
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {p(`${slug}_values_title`, '')}
                </h2>
                <div className="w-10 h-1 bg-blue-600 rounded-full mx-auto" />
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v, i) => {
                const Icon = VALUE_ICONS[i % VALUE_ICONS.length]
                return (
                  <div key={i}
                    className="bg-white rounded-2xl p-7 border border-gray-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">{v.title}</h3>
                    {v.desc && (
                      <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      {p(`${slug}_cta_title`, '') && (
        <section className="relative py-28 px-4 overflow-hidden bg-black text-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            {p(`${slug}_cta_badge`, '') && (
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] bg-white/10 border border-white/20 text-white/80 px-4 py-1.5 rounded-full mb-6">
                {p(`${slug}_cta_badge`, '')}
              </span>
            )}
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
                  {p(`${slug}_cta_btn`, 'Learn More')}
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
