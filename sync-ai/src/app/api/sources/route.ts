import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/sources - List all sources
export async function GET() {
  try {
    const { data: sources, error } = await supabase
      .from('sources')
      .select('*')
      .order('tier', { ascending: true })
      .order('name')

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: sources || [],
    })
  } catch (error) {
    console.error('Failed to fetch sources:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sources' },
      { status: 500 }
    )
  }
}

// POST /api/sources - Create new source
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('sources')
      .insert(body)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Failed to create source:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create source' },
      { status: 500 }
    )
  }
}
