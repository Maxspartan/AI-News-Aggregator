import { NextRequest, NextResponse } from 'next/server'
import { runPipeline } from '@/lib/sources/pipeline'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sourceId = searchParams.get('sourceId') || undefined
    const incremental = searchParams.get('incremental') !== 'false'

    // Check authorization
    const authHeader = request.headers.get('authorization')
    const isCron = authHeader === `Bearer ${process.env.CRON_SECRET}`

    // Run pipeline
    const results = await runPipeline({
      sourceId,
      incremental,
      retryFailed: true,
    })

    return NextResponse.json({
      success: true,
      data: {
        timestamp: new Date().toISOString(),
        results,
        triggered: isCron ? 'cron' : 'manual',
      },
    })
  } catch (error) {
    console.error('Refresh failed:', error)
    return NextResponse.json(
      { success: false, error: 'Refresh failed' },
      { status: 500 }
    )
  }
}
