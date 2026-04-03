import { BaseRSSAdapter } from './base'

export class AnthropicAdapter extends BaseRSSAdapter {
  name = 'Anthropic'
  type = 'company' as const
  tier = 'S' as const
  topics = [
    'Claude',
    'Constitutional AI',
    'AI Safety',
    'Research',
    'Alignment',
    'Interpretability',
  ]
  // Anthropic doesn't have RSS, needs web scraping or API
  rssUrl = ''

  async fetchArticles() {
    // TODO: Implement web scraper for Anthropic blog
    return []
  }
}
