import Parser from 'rss-parser'
import { Article } from '@/types/database'

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'SyncAI/1.0 (AI News Aggregator)',
  },
})

export interface ParsedArticle {
  title: string
  url: string
  author?: string
  publishedAt: Date
  summary?: string
  content?: string
  imageUrl?: string
  categories?: string[]
}

export interface ParseResult {
  articles: ParsedArticle[]
  lastBuildDate?: Date
}

export async function parseRSSFeed(feedUrl: string): Promise<ParseResult> {
  try {
    const feed = await parser.parseURL(feedUrl)

    const articles: ParsedArticle[] = feed.items.map((item) => {
      // Extract image from various sources
      let imageUrl: string | undefined

      // Try media:content
      const mediaContent = (item as any)['media:content']
      if (mediaContent?.$?.url) {
        imageUrl = mediaContent.$.url
      }

      // Try enclosure
      if (!imageUrl && item.enclosure?.url) {
        imageUrl = item.enclosure.url
      }

      // Try content:encoded for image
      if (!imageUrl && item['content:encoded']) {
        const imgMatch = item['content:encoded'].match(/<img[^>]+src="([^"]+)"/)
        if (imgMatch) {
          imageUrl = imgMatch[1]
        }
      }

      // Parse categories
      const categories: string[] = []
      if (item.categories) {
        categories.push(...item.categories.filter(Boolean))
      }
      if ((item as any).category) {
        const cat = (item as any).category
        if (Array.isArray(cat)) {
          categories.push(...cat)
        } else {
          categories.push(cat)
        }
      }

      return {
        title: item.title?.trim() || 'Untitled',
        url: item.link?.trim() || '',
        author: item.creator || item.author,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        summary: item.contentSnippet?.trim() || item.summary?.trim(),
        content: item['content:encoded'] || item.content,
        imageUrl,
        categories: Array.from(new Set(categories)),
      }
    })

    // Filter out articles without URLs
    const validArticles = articles.filter((a) => a.url)

    return {
      articles: validArticles,
      lastBuildDate: feed.lastBuildDate ? new Date(feed.lastBuildDate) : undefined,
    }
  } catch (error) {
    console.error(`Failed to parse RSS feed ${feedUrl}:`, error)
    throw error
  }
}

// Calculate content hash for deduplication
// Uses a combination of normalized title and URL to create a unique identifier
export function calculateContentHash(article: ParsedArticle): string {
  // Normalize title: lowercase, trim, remove extra spaces
  const normalizedTitle = article.title.toLowerCase().trim().replace(/\s+/g, ' ')
  // Create unique identifier from title + URL
  const normalized = `${normalizedTitle}|${article.url}`
  // Use simple hash: first 32 chars of base64 to avoid collisions
  return Buffer.from(normalized).toString('base64').slice(0, 32)
}

// Estimate read time based on content length
export function estimateReadTime(content?: string): number {
  if (!content) return 3 // Default 3 min
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200)) // 200 WPM average
}
