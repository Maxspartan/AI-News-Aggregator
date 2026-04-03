import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter required' },
        { status: 400 }
      )
    }

    const offset = (page - 1) * limit

    // PostgreSQL full-text search using to_tsvector
    const { data: articles, error, count } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .textSearch('title', query, { type: 'websearch', config: 'english' })
      .order('relevance_score', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      // Fallback to ilike search if text search fails
      const { data: fallbackArticles, error: fallbackError, count: fallbackCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact' })
        .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
        .order('published_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (fallbackError) {
        throw fallbackError
      }

      // Get sources for results
      const sourceIds = Array.from(new Set(fallbackArticles?.map(a => a.source_id) || []))
      const { data: sources } = await supabase
        .from('sources')
        .select('*')
        .in('id', sourceIds)

      return NextResponse.json({
        success: true,
        data: {
          articles: fallbackArticles || [],
          sources: sources || [],
          hasMore: fallbackCount ? offset + limit < fallbackCount : false,
          total: fallbackCount || 0,
        },
      })
    }

    // Get sources for results
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
        total: count || 0,
      },
    })
  } catch (error) {
    console.error('Search failed:', error)
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    )
  }
}
