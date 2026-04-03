import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// PATCH /api/sources/[id] - Update source
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('sources')
      .update(body)
      .eq('id', params.id)
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
    console.error('Failed to update source:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update source' },
      { status: 500 }
    )
  }
}

// DELETE /api/sources/[id] - Delete source
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase.from('sources').delete().eq('id', params.id)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Failed to delete source:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete source' },
      { status: 500 }
    )
  }
}
