"use client"

import { Header } from "@/components/header"
import { SimpleFooter } from "@/components/simple-footer"
import { usePageContent } from "@/lib/use-page-content"
import { useCMS } from "@/components/cms-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

interface Props { slug: string; title: string }

// Fallback icons if media library is empty
const FALLBACK_ICONS = [
  { url: '/icon/accounting icon.png',      name: 'Accounting' },
  { url: '/icon/dashboard icon.png',       name: 'Dashboard' },
  { url: '/icon/HR icon.png',             name: 'HR' },
  { url: '/icon/Inventory icon.png',      name: 'Inventory' },
  { url: '/icon/CRM icon.png',            name: 'CRM' },
  { url: '/icon/project icon.png',        name: 'Project' },
  { url: '/icon/budget icon.png',         name: 'Budget' },
  { url: '/icon/logistic icon.png',       name: 'Logistics' },
]

export function SolutionLayout({ slug, title }: Props) {
  const p   = usePageContent(slug)
  const cms = useCMS()

  // Use media library icons, same source as the landing page carousel
  const mediaIcons = cms?.carouselIcons?.length ? cms.carouselIcons : FALLBACK_ICONS

  const features = [1, 2, 3, 4].map((n) => ({
    title: p(`${slug}_feat${n}_title`, ''),
    desc:  p(`${slug}_feat${n}_desc`,  ''),
  })).filter((f) => f.title)

  const cards = [1, 2].map((n) => ({
    title: p(`${slug}_card${n}_title`, ''),
    body:  p(`${slug}_card${n}_body`,  ''),
  })).filter((c) => c.title)

  const hasContentImage = !!p(`${slug}_content_image`, '')
  const hasHeroImage    = !!p(`${slug}_hero_image`, '')

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-0 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0052cc 0%, #0072FD 45%, #338bff 75%, #c7dbff 100%)' }}
      >
        {/* subtle dot grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center text-white">
          {p(`${slug}_hero_badge`, '') && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] bg-white/90 text-gray-700 px-3 py-1 mb-7">
              <span className="w-1 h-1 bg-gray-400" />
              {p(`${slug}_hero_badge`, '')}
            </span>
          )}

          <h1 className="text-5xl md:text-[3.75rem] lg:text-[4.25rem] font-bold mb-6 leading-[1.1] tracking-tight">
            {p(`${slug}_hero_title`, title)}
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            {p(`${slug}_hero_subtitle`, '')}
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {p(`${slug}_hero_cta1`, '') && (
              <Button asChild size="lg"
                className="bg-white text-blue-700 hover:bg-white/90 font-semibold shadow-lg shadow-blue-900/20 px-7 h-12 text-[15px]">
                <Link href={p(`${slug}_hero_cta1_url`, '/contact')}>
                  {p(`${slug}_hero_cta1`, 'Get Started')}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            )}
            {p(`${slug}_hero_cta2`, '') && (
              <Button asChild size="lg" variant="outline"
                className="border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-medium px-7 h-12 text-[15px]">
                <Link href={p(`${slug}_hero_cta2_url`, '/contact')}>
                  {p(`${slug}_hero_cta2`, 'Learn More')}
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Hero screenshot — full bleed bottom, overflows into next section */}
        {hasHeroImage ? (
          <div className="relative max-w-5xl mx-auto px-4">
            <img
              src={p(`${slug}_hero_image`, '')} alt={title}
              className="w-full shadow-2xl border border-white/20 translate-y-12"
              style={{ borderRadius: 'var(--radius, 12px) var(--radius, 12px) 0 0' }}
            />
          </div>
        ) : (
          /* Decorative wave divider when no image */
          <div className="h-16 w-full" />
        )}
      </section>

      {/* Spacer to absorb the overlapping screenshot */}
      {hasHeroImage && <div className="h-12 bg-white" />}

      {/* ── Social proof strip ──────────────────────────────────────────────── */}
      <section className="py-10 px-4 border-y border-gray-100 bg-gray-50/60">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-4 text-center">
          {[
            { value: '64K+',   label: 'Active businesses' },
            { value: '2.4M',   label: 'Invoices processed monthly' },
            { value: '99.9%',  label: 'Uptime SLA' },
            { value: '< 1 day', label: 'Average onboarding time' },
          ].map((stat) => (
            <div key={stat.label} className="min-w-[120px]">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      {(p(`${slug}_features_title`, '') || features.length > 0) && (
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14 max-w-2xl mx-auto">
              {p(`${slug}_features_title`, '') && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {p(`${slug}_features_title`, '')}
                </h2>
              )}
              {p(`${slug}_features_subtitle`, '') && (
                <p className="text-lg text-gray-500">
                  {p(`${slug}_features_subtitle`, '')}
                </p>
              )}
            </div>

              {p(`${slug}_features_image`, '') && (
              <img src={p(`${slug}_features_image`, '')} alt="Features"
                className="w-full shadow-xl mb-14 border border-gray-200"
                style={{ borderRadius: 'var(--radius, 12px)' }} />
            )}

            {features.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-5">
                {features.map((f, i) => {
                  const icon = mediaIcons[i % mediaIcons.length]
                  return (
                    <div key={i}
                      className="group bg-white border border-gray-200 transition-all duration-200 p-7"
                      style={{ borderRadius: 'var(--radius, 8px)' }}>
                      <div className="w-10 h-10 flex items-center justify-center mb-5">
                        <img src={icon.url} alt={icon.name} className="w-7 h-7 object-contain" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">{f.title}</h3>
                      {f.desc && (
                        <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Content section ─────────────────────────────────────────────────── */}
      {p(`${slug}_content_title`, '') && (
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className={`${hasContentImage ? 'grid md:grid-cols-2 gap-16 items-center' : 'max-w-3xl mx-auto'}`}>

              {/* Text column */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {p(`${slug}_content_title`, '')}
                </h2>
                {p(`${slug}_content_highlight`, '') && (
                  <p className="text-lg font-semibold text-blue-600 mb-5 leading-snug">
                    {p(`${slug}_content_highlight`, '')}
                  </p>
                )}
                {p(`${slug}_content_body`, '') && (
                  <p className="text-gray-600 leading-relaxed text-[15px] mb-8">
                    {p(`${slug}_content_body`, '')}
                  </p>
                )}

                {cards.length > 0 && (
                  <div className={`${hasContentImage ? 'space-y-4' : 'grid sm:grid-cols-2 gap-4'}`}>
                    {cards.map((c, i) => (
                      <div key={i}
                        className="bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
                        style={{ borderRadius: 'var(--radius, 8px)' }}>
                        <div className="flex items-center gap-2.5 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <h4 className="font-semibold text-gray-900 text-sm">{c.title}</h4>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed pl-6.5">{c.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {hasContentImage && (
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-50 -z-10" style={{ borderRadius: 'calc(var(--radius, 8px) + 8px)' }} />
                  <img src={p(`${slug}_content_image`, '')} alt="Content"
                    className="w-full shadow-2xl border border-gray-100 relative z-10"
                    style={{ borderRadius: 'var(--radius, 8px)' }} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      {p(`${slug}_cta_title`, '') && (
        <section className="py-28 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            {p(`${slug}_cta_badge`, '') && (
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.12em] bg-white text-gray-700 px-3 py-1 mb-6">
                {p(`${slug}_cta_badge`, '')}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              {p(`${slug}_cta_title`, '')}
            </h2>
            {p(`${slug}_cta_body`, '') && (
              <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
                {p(`${slug}_cta_body`, '')}
              </p>
            )}
            {p(`${slug}_cta_btn`, '') && (
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 text-[15px]">
                  <Link href={p(`${slug}_cta_url`, '/contact')}>
                    {p(`${slug}_cta_btn`, 'Get Started')}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline"
                  className="border-gray-200 bg-white text-gray-900 hover:bg-gray-50 font-medium px-8 h-12 text-[15px]">
                  <Link href="/contact">Talk to Sales</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      <SimpleFooter />
    </div>
  )
}
