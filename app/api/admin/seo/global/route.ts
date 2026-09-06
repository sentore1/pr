import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/auth'
import { seoSettingModel, systemSettingModel } from '@/lib/db/models'
import { clearCMSCache } from '@/lib/cms'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const data = await seoSettingModel.getGlobalSEO()
  // Also fetch twitter_handle from system_settings so the UI can pre-populate it
  const handleSetting = await systemSettingModel.getSetting('twitter_handle')
  return NextResponse.json({
    success: true,
    data: data ? { ...data, twitter_handle: handleSetting?.setting_value || '' } : null,
  })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  // Separate twitter_handle — it lives in system_settings, not seo_settings
  const { twitter_handle, ...seoFields } = body

  const existing = await seoSettingModel.getGlobalSEO()
  if (existing) {
    await seoSettingModel.updateById(existing.id, seoFields)
  } else {
    await seoSettingModel.create({ ...seoFields, page_id: null } as any)
  }

  // Persist twitter_handle to system_settings
  if (twitter_handle !== undefined) {
    await systemSettingModel.updateSetting('twitter_handle', twitter_handle)
  }

  // Bust the in-process CMS cache so metadata refreshes immediately
  clearCMSCache()
  // Revalidate the root layout and homepage so Next.js ISR cache is cleared too
  revalidatePath('/', 'layout')

  return NextResponse.json({ success: true })
}
