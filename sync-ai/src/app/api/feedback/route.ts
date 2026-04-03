import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/feedback - Get user's feedback (or all for now)
export async function GET() {
  try {
    const { data: feedback, error } = await supabase
      .from('user_feedback')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: feedback || [],
    })
  } catch (error) {
    console.error('Failed to fetch feedback:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}

// POST /api/feedback - Submit feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { article_id, feedback_type } = body

    if (!article_id || !feedback_type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if feedback already exists for this article
    const { data: existing } = await supabase
      .from('user_feedback')
      .select('id')
      .eq('article_id', article_id)
      .eq('feedback_type', feedback_type)
      .maybeSingle()

    if (existing) {
      // Toggle off (delete) if same type
      await supabase.from('user_feedback').delete().eq('id', existing.id)

      return NextResponse.json({
        success: true,
        data: { action: 'removed' },
      })
    }

    // Remove opposite feedback type
    const oppositeTypes: Record<string, string | null> = {
      up: 'down',
      down: 'up',
      save: null,
      skip: null,
    }

    if (oppositeTypes[feedback_type]) {
      await supabase
        .from('user_feedback')
        .delete()
        .eq('article_id', article_id)
        .eq('feedback_type', oppositeTypes[feedback_type])
    }

    // Insert new feedback
    const { data, error } = await supabase
      .from('user_feedback')
      .insert({
        article_id,
        feedback_type,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: { action: 'added', feedback: data },
    })
  } catch (error) {
    console.error('Failed to submit feedback:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}
