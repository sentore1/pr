import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { styleSettingModel, activityLogModel } from '@/lib/db/models'
import { revalidatePath } from 'next/cache'
import { clearCMSCache } from '@/lib/cms'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const styles = await styleSettingModel.findAll()
  return NextResponse.json({ success: true, data: styles })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { styles } = await req.json()
  for (const { category, property, value } of styles) {
    await styleSettingModel.updateStyle(category, property, value)
  }

  await activityLogModel.logActivity({ user_id: session.id, action: 'Updated theme styles', entity_type: 'theme' })
  // Bust in-process CMS cache so the next page load gets fresh styles immediately
  clearCMSCache()
  revalidatePath('/', 'layout')
  return NextResponse.json({ success: true })
}
