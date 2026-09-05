import { NextRequest, NextResponse } from 'next/server'
import { pageViewModel, userSessionModel } from '@/lib/db/models'
import { config } from '@/lib/config'
import { nanoid } from 'nanoid'

function detectDevice(ua: string): 'desktop' | 'mobile' | 'tablet' | 'unknown' {
  if (!ua) return 'unknown'
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  if (/mobile|android|iphone/i.test(ua)) return 'mobile'
  if (/windows|macintosh|linux/i.test(ua)) return 'desktop'
  return 'unknown'
}

function detectBrowser(ua: string): string {
  if (!ua) return 'Unknown'
  if (/chrome/i.test(ua) && !/edge/i.test(ua)) return 'Chrome'
  if (/firefox/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari'
  if (/edge/i.test(ua)) return 'Edge'
  return 'Other'
}

export async function POST(req: NextRequest) {
  if (!config.analytics.enabled) return NextResponse.json({ success: true })

  try {
    const { page_slug, page_title, referrer } = await req.json()
    const ua = req.headers.get('user-agent') || ''
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || ''

    // Manage session cookie
    const cookieName = config.analytics.trackingCookie
    let sessionId = req.cookies.get(cookieName)?.value
    const isNew = !sessionId
    if (!sessionId) sessionId = nanoid(21)

    // Upsert session
    const existingSession = await userSessionModel.findBySessionId(sessionId)
    if (!existingSession) {
      await userSessionModel.create({
        session_id: sessionId,
        first_page: page_slug,
        last_page: page_slug,
        page_count: 1,
        referrer: referrer || null,
        ip_address: ip || null,
        user_agent: ua || null,
      } as any)
    } else {
      await userSessionModel.updateSession(sessionId, {
        last_page: page_slug,
        page_count: existingSession.page_count + 1,
      } as any)
    }

    // Record page view
    await pageViewModel.trackPageView({
      page_slug,
      page_title,
      referrer: referrer || null,
      user_agent: ua,
      ip_address: ip || null,
      device_type: detectDevice(ua),
      browser: detectBrowser(ua),
      session_id: sessionId,
    } as any)

    const response = NextResponse.json({ success: true })
    if (isNew) {
      response.cookies.set(cookieName, sessionId, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: config.analytics.cookieMaxAge / 1000,
        path: '/',
      })
    }
    return response
  } catch (err) {
    console.error('Tracking error:', err)
    return NextResponse.json({ success: true }) // Never break the site
  }
}
