/**
 * Public CMS data endpoint
 * Returns all data needed to render the landing page dynamically
 */
import { NextResponse } from 'next/server'
import { 
  navigationItemModel, logoModel,
  footerSectionModel, footerLinkModel,
  contentBlockModel, styleSettingModel,
  seoSettingModel, systemSettingModel,
} from '@/lib/db/models'
import { query } from '@/lib/db/connection'

export const revalidate = 60 // ISR: revalidate every 60s

export async function GET() {
  try {
    const [
      navItems, logos, footerSections,
      contentBlocks, styles, seoData, systemSettings, footerContent, dynamicContent, carouselIcons
    ] = await Promise.all([
      // Header nav with children
      (async () => {
        const top = await navigationItemModel.getTopLevelItems(1)
        return Promise.all(top.map(async item => ({
          ...item,
          children: await navigationItemModel.getChildItems(item.id),
        })))
      })(),
      logoModel.getActiveLogos(),
      (async () => {
        const secs = await footerSectionModel.getActiveSections()
        return Promise.all(secs.map(async s => ({
          ...s,
          links: await footerLinkModel.getLinksBySection(s.id),
        })))
      })(),
      contentBlockModel.getBlocksByPage(1),
      styleSettingModel.findAll(),
      seoSettingModel.getGlobalSEO(),
      systemSettingModel.getPublicSettings(),
      query('SELECT key_name, content FROM footer_content') as Promise<any[]>,
      query('SELECT key_name, value FROM dynamic_content') as Promise<any[]>,
      query(`SELECT file_url, title, alt_text FROM media_library WHERE folder = 'icons' ORDER BY title ASC`) as Promise<any[]>,
    ])

    // Convert styles array → nested object { colors: { primary: '...' }, ... }
    const styleMap: Record<string, Record<string, string>> = {}
    for (const s of styles as any[]) {
      if (!styleMap[s.category]) styleMap[s.category] = {}
      styleMap[s.category][s.property] = s.value
    }

    // Convert system settings array → flat object
    const settings: Record<string, string> = {}
    for (const s of systemSettings as any[]) {
      settings[s.setting_key] = s.setting_value
    }

    // Convert footer content array → flat object
    const footerContentMap: Record<string, string> = {}
    for (const r of footerContent) {
      footerContentMap[r.key_name] = r.content || ''
    }

    // Convert dynamic_content → flat object for page rendering
    const pageContent: Record<string, string> = {}
    for (const r of (dynamicContent as any[])) {
      pageContent[r.key_name] = r.value || ''
    }

    return NextResponse.json({
      success: true,
      data: {
        nav: navItems,
        logos,
        footerSections,
        footerContent: footerContentMap,
        contentBlocks,
        styles: styleMap,
        seo: seoData,
        settings,
        pageContent,
        carouselIcons: (carouselIcons as any[]).map(r => ({ url: r.file_url, name: r.title || r.alt_text || '' })),
      },
    })
  } catch (err) {
    console.error('CMS data error:', err)
    return NextResponse.json({ success: false, error: 'Failed to load CMS data' }, { status: 500 })
  }
}
