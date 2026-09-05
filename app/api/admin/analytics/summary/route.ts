import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { query } from '@/lib/db/connection'
import { activityLogModel } from '@/lib/db/models'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const days = parseInt(req.nextUrl.searchParams.get('days') || '30')

  const [
    todayViews,
    weekViews,
    periodViews,
    uniqueVisitors,
    topPages,
    dailyData,
    deviceData,
    referrers,
    recentActivity,
  ] = await Promise.all([
    // Today views
    query(`SELECT COUNT(*) as count FROM page_views WHERE DATE(viewed_at) = CURDATE()`) as Promise<any[]>,
    // Week views
    query(`SELECT COUNT(*) as count FROM page_views WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`) as Promise<any[]>,
    // Period views
    query(`SELECT COUNT(*) as count FROM page_views WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)`, [days]) as Promise<any[]>,
    // Unique visitors (by session_id)
    query(`SELECT COUNT(DISTINCT session_id) as count FROM page_views WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)`, [days]) as Promise<any[]>,
    // Top pages
    query(
      `SELECT page_slug as slug, page_title as title, COUNT(*) as views
       FROM page_views
       WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY page_slug, page_title
       ORDER BY views DESC LIMIT 10`,
      [days]
    ) as Promise<any[]>,
    // Daily breakdown
    query(
      `SELECT DATE(viewed_at) as date,
              COUNT(*) as views,
              COUNT(DISTINCT session_id) as visitors
       FROM page_views
       WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY DATE(viewed_at)
       ORDER BY date ASC`,
      [days]
    ) as Promise<any[]>,
    // Device split
    query(
      `SELECT device_type, ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM page_views WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)), 1) as pct
       FROM page_views
       WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY device_type`,
      [days, days]
    ) as Promise<any[]>,
    // Top referrers
    query(
      `SELECT COALESCE(referrer, 'Direct') as referrer, COUNT(*) as count
       FROM page_views
       WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY referrer
       ORDER BY count DESC LIMIT 10`,
      [days]
    ) as Promise<any[]>,
    // Recent activity logs
    activityLogModel.getRecentActivity(10),
  ])

  const deviceMap: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0, unknown: 0 }
  for (const d of deviceData) {
    deviceMap[d.device_type] = parseFloat(d.pct) || 0
  }

  return NextResponse.json({
    success: true,
    data: {
      views_today:      todayViews[0]?.count || 0,
      views_week:       weekViews[0]?.count || 0,
      views_month:      periodViews[0]?.count || 0,
      unique_visitors:  uniqueVisitors[0]?.count || 0,
      avg_duration:     0,
      top_pages:        topPages,
      daily:            dailyData.map(d => ({ ...d, date: String(d.date).slice(0, 10) })),
      device_split:     deviceMap,
      top_referrers:    referrers,
      recent_activity:  recentActivity,
    },
  })
}
