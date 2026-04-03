import { BaseRSSAdapter } from './base'

export class OpenAIAdapter extends BaseRSSAdapter {
  name = 'OpenAI'
  type = 'company' as const
  tier = 'S' as const
  topics = [
    'GPT',
    'ChatGPT',
    'DALL-E',
    'Research',
    'API',
    'Safety',
    'Alignment',
  ]
  // OpenAI blog doesn't have RSS, so we'll need to scrape or use their API
  // For now using a placeholder that will be implemented with direct fetch
  rssUrl = ''

  async fetchArticles() {
    // OpenAI blog requires web scraping or API
    // For now, return empty - will implement with fetch/scraper
    return []
  }
}
