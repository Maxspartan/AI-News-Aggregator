import { SourceAdapter } from './base'
import { ParsedArticle } from '../rss-parser'

export class RedditAdapter implements SourceAdapter {
  name = 'Reddit AI'
  type = 'community' as const
  tier = 'B' as const
  topics = [
    'MachineLearning',
    'ArtificialIntelligence',
    'LocalLLaMA',
    'StableDiffusion',
  ]

  async fetchArticles(): Promise<ParsedArticle[]> {
    // Reddit API requires authentication
    // For now, return empty - will implement with Reddit API
    return []
  }
}
