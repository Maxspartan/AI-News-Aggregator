import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')

    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category) {
      query = query.eq('category', category)
    }

    const { data: articles, error, count } = await query

    if (error) {
      throw error
    }

    // Get sources for these articles
    const sourceIds = Array.from(new Set(articles?.map(a => a.source_id) || []))
    const { data: sources } = await supabase
      .from('sources')
      .select('*')
      .in('id', sourceIds)

    return NextResponse.json({
      success: true,
      data: {
        articles: articles || [],
        sources: sources || [],
        hasMore: count ? offset + limit < count : false,
      },
    })
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}
