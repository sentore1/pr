"use client"

/**
 * CmsBlocks — renders extra content blocks saved via Admin → Pages → Extra Sections.
 *
 * Usage:
 *   <CmsBlocks slug="about" />
 *   <CmsBlocks slug="home" />
 *
 * Each page's blocks are fetched client-side via /api/admin/content?slug=<slug>
 * so this component works on every page without any global CMS context change.
 */

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface Block {
  id: number
  block_type: string
  title: string
  content: string
  settings: Record<string, any>
  sort_order: number
  is_active: boolean
}

// Public read endpoint — no auth required, safe for frontend use.
async function fetchBlocks(slug: string): Promise<Block[]> {
  try {
    const res = await fetch(`/api/cms/blocks?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const d = await res.json()
    return d.success ? (d.data ?? []) : []
  } catch {
    return []
  }
}

export function CmsBlocks({ slug }: { slug: string }) {
  const [blocks, setBlocks] = useState<Block[]>([])

  useEffect(() => {
    fetchBlocks(slug).then(data =>
      setBlocks(
        data
          .filter(b => b.is_active)
          .sort((a, b) => a.sort_order - b.sort_order)
      )
    )
  }, [slug])

  if (blocks.length === 0) return null

  return (
    <>
      {blocks.map(block => (
        <section
          key={block.id}
          className="relative px-4 py-12 md:py-16"
          style={{
            background: block.settings?.sectionBg || block.settings?.background || undefined,
            color: block.settings?.textColor || undefined,
          }}
        >
          <div className="max-w-[1120px] w-full mx-auto">

            {/* HERO block */}
            {block.block_type === 'hero' && (
              <div className="text-center py-12">
                {block.settings?.icon && (
                  <img src={block.settings.icon} alt="" className="w-16 h-16 object-contain mx-auto mb-6" />
                )}
                <h2 className="font-serif text-4xl md:text-6xl font-medium mb-6">{block.title}</h2>
                {block.content && (
                  <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-80">{block.content}</p>
                )}
                {block.settings?.buttonText && (
                  <a href={block.settings.buttonUrl || '#'}>
                    <Button className="px-8 py-6 text-base rounded-[5px]">
                      {block.settings.buttonText}
                    </Button>
                  </a>
                )}
              </div>
            )}

            {/* TEXT block */}
            {block.block_type === 'text' && (
              <div className={`max-w-3xl mx-auto text-${block.settings?.alignment || 'left'}`}>
                {block.settings?.icon && (
                  <img src={block.settings.icon} alt="" className="w-10 h-10 object-contain mb-4" />
                )}
                {block.title && (
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{block.title}</h2>
                )}
                <p className={`text-${block.settings?.fontSize || 'base'} text-gray-600 leading-relaxed`}>
                  {block.content}
                </p>
              </div>
            )}

            {/* IMAGE block — src can come from settings.src (upload/paste) or block.content */}
            {block.block_type === 'image' && (block.settings?.src || block.content) && (
              <div className="text-center">
                {block.title && (
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">{block.title}</h2>
                )}
                <img
                  src={block.settings?.src || block.content}
                  alt={block.settings?.alt || block.title}
                  className={`mx-auto ${block.settings?.rounded !== false ? 'rounded-[5px]' : ''}`}
                  style={{ width: block.settings?.width || '100%', maxWidth: '100%' }}
                />
                {block.settings?.src && block.content && (
                  <p className="text-sm text-gray-500 mt-3">{block.content}</p>
                )}
              </div>
            )}

            {/* CTA block */}
            {block.block_type === 'cta' && (
              <div
                className="text-center py-8 rounded-[5px] px-8"
                style={{
                  background: block.settings?.sectionBg || block.settings?.ctaBg || block.settings?.background || '#0072FD',
                  color: block.settings?.textColor || '#ffffff',
                }}
              >
                {block.settings?.icon && (
                  <img src={block.settings.icon} alt="" className="w-12 h-12 object-contain mx-auto mb-4" />
                )}
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{block.title}</h2>
                {block.content && (
                  <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">{block.content}</p>
                )}
                {block.settings?.buttonText && (
                  <a href={block.settings.buttonUrl || '#'}>
                    <Button className="bg-white text-blue-600 hover:bg-white/90 px-8 py-6 text-base rounded-[5px]">
                      {block.settings.buttonText}
                    </Button>
                  </a>
                )}
              </div>
            )}

            {/* FEATURES block */}
            {block.block_type === 'features' && (
              <div>
                {block.settings?.icon && (
                  <img src={block.settings.icon} alt="" className="w-10 h-10 object-contain mb-4" />
                )}
                {block.title && (
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{block.title}</h2>
                )}
                {block.content && <p className="text-gray-600 mb-8">{block.content}</p>}
                {Array.isArray(block.settings?.items) && block.settings.items.length > 0 && (
                  <div className={`grid grid-cols-1 md:grid-cols-${block.settings?.columns || 3} gap-6`}>
                    {block.settings.items.map((item: any, i: number) => (
                      <div key={i} className="border border-gray-200 rounded-[5px] p-5">
                        {item.icon && (
                          <img src={item.icon} alt="" className="w-8 h-8 object-contain mb-3" />
                        )}
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TESTIMONIALS block */}
            {block.block_type === 'testimonials' && (
              <div className="text-center">
                {block.settings?.icon && (
                  <img src={block.settings.icon} alt="" className="w-10 h-10 object-contain mx-auto mb-4" />
                )}
                {block.title && (
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">{block.title}</h2>
                )}
                {block.content && (
                  <p className="text-gray-600 italic text-lg max-w-2xl mx-auto">&ldquo;{block.content}&rdquo;</p>
                )}
              </div>
            )}

            {/* PRICING block */}
            {block.block_type === 'pricing' && (
              <div>
                {block.settings?.icon && (
                  <img src={block.settings.icon} alt="" className="w-10 h-10 object-contain mb-4" />
                )}
                {block.title && (
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{block.title}</h2>
                )}
                {block.content && <p className="text-gray-600 mb-8">{block.content}</p>}
              </div>
            )}

            {/* CUSTOM HTML block */}
            {block.block_type === 'custom' && block.content && (
              <div dangerouslySetInnerHTML={{ __html: block.content }} />
            )}

          </div>
        </section>
      ))}
    </>
  )
}
