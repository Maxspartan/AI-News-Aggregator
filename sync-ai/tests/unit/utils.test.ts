import { describe, it, expect } from 'vitest'
import { formatDistanceToNow, cn } from '@/lib/utils'

describe('formatDistanceToNow', () => {
  it('returns "just now" for dates less than 60 seconds ago', () => {
    const now = new Date()
    const result = formatDistanceToNow(now.toISOString())
    expect(result).toBe('just now')
  })

  it('returns minutes ago for dates less than an hour ago', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const result = formatDistanceToNow(fiveMinutesAgo.toISOString())
    expect(result).toBe('5m ago')
  })

  it('returns hours ago for dates less than a day ago', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000)
    const result = formatDistanceToNow(threeHoursAgo.toISOString())
    expect(result).toBe('3h ago')
  })

  it('returns days ago for dates less than a week ago', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    const result = formatDistanceToNow(twoDaysAgo.toISOString())
    expect(result).toBe('2d ago')
  })

  it('returns formatted date for dates more than a month ago', () => {
    const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    const result = formatDistanceToNow(twoMonthsAgo.toISOString())
    expect(result).toMatch(/\w{3} \d{1,2}/) // Format like "Jan 15"
  })
})

describe('cn', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })

  it('handles conditional classes', () => {
    const result = cn('base', false && 'hidden', true && 'visible')
    expect(result).toBe('base visible')
  })

  it('merges tailwind classes with conflicts', () => {
    const result = cn('text-red-500', 'text-blue-500')
    expect(result).toBe('text-blue-500')
  })
})
