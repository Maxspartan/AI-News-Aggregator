import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select('*')
      .eq('id', params.id)
      .single()

    if (articleError) {
      if (articleError.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Article not found' },
          { status: 404 }
        )
      }
      throw articleError
    }

    // Fetch source
    const { data: source } = await supabase
      .from('sources')
      .select('*')
      .eq('id', article.source_id)
      .single()

    // Fetch feedback
    const { data: feedback } = await supabase
      .from('user_feedback')
      .select('*')
      .eq('article_id', params.id)

    return NextResponse.json({
      success: true,
      data: {
        article,
        source,
        feedback: feedback || [],
      },
    })
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}
