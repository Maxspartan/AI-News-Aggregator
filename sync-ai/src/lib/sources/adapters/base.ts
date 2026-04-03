import { Source } from '@/types/database'
import { ParsedArticle } from '../rss-parser'

export interface SourceAdapter {
  name: string
  type: Source['type']
  tier: Source['tier']
  topics: string[]
  fetchArticles(): Promise<ParsedArticle[]>
}

export abstract class BaseRSSAdapter implements SourceAdapter {
  abstract name: string
  abstract type: Source['type']
  abstract tier: Source['tier']
  abstract topics: string[]
  abstract rssUrl: string

  async fetchArticles(): Promise<ParsedArticle[]> {
    const { parseRSSFeed } = await import('../rss-parser')
    const result = await parseRSSFeed(this.rssUrl)
    return result.articles
  }
}
