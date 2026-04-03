import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// This route is called by Vercel Cron
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Trigger refresh
    const refreshUrl = new URL('/api/refresh', request.url)
    const response = await fetch(refreshUrl.toString(), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${process.env.CRON_SECRET}`,
      },
    })

    const result = await response.json()

    return NextResponse.json({
      success: true,
      data: {
        timestamp: new Date().toISOString(),
        result,
      },
    })
  } catch (error) {
    console.error('Daily refresh failed:', error)
    return NextResponse.json(
      { success: false, error: 'Daily refresh failed' },
      { status: 500 }
    )
  }
}
