import { describe, it, expect } from 'vitest'
import { calculateContentHash, estimateReadTime } from '@/lib/sources/rss-parser'
import type { ParsedArticle } from '@/lib/sources/rss-parser'

describe('calculateContentHash', () => {
  it('generates consistent hash for same article', () => {
    const article: ParsedArticle = {
      title: 'Test Article',
      url: 'https://example.com/article',
      publishedAt: new Date(),
    }

    const hash1 = calculateContentHash(article)
    const hash2 = calculateContentHash(article)

    expect(hash1).toBe(hash2)
  })

  it('generates different hashes for different articles', () => {
    const article1: ParsedArticle = {
      title: 'Test Article 1',
      url: 'https://example.com/article1',
      publishedAt: new Date(),
    }

    const article2: ParsedArticle = {
      title: 'Test Article 2',
      url: 'https://example.com/article2',
      publishedAt: new Date(),
    }

    const hash1 = calculateContentHash(article1)
    const hash2 = calculateContentHash(article2)

    expect(hash1).not.toBe(hash2)
  })

  it('normalizes title case for hashing', () => {
    const article1: ParsedArticle = {
      title: 'TEST ARTICLE',
      url: 'https://example.com/article',
      publishedAt: new Date(),
    }

    const article2: ParsedArticle = {
      title: 'test article',
      url: 'https://example.com/article',
      publishedAt: new Date(),
    }

    const hash1 = calculateContentHash(article1)
    const hash2 = calculateContentHash(article2)

    expect(hash1).toBe(hash2)
  })
})

describe('estimateReadTime', () => {
  it('returns default 3 minutes for empty content', () => {
    const result = estimateReadTime()
    expect(result).toBe(3)
  })

  it('returns 1 minute for short content', () => {
    const shortContent = 'This is a short article.'
    const result = estimateReadTime(shortContent)
    expect(result).toBe(1)
  })

  it('calculates read time based on word count', () => {
    // 400 words should take ~2 minutes at 200 WPM
    const longContent = Array(400).fill('word').join(' ')
    const result = estimateReadTime(longContent)
    expect(result).toBe(2)
  })
})
