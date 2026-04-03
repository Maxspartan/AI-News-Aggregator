import { BaseRSSAdapter } from './base'

export class MetaAdapter extends BaseRSSAdapter {
  name = 'Meta AI'
  type = 'company' as const
  tier = 'A' as const
  topics = [
    'LLaMA',
    'PyTorch',
    'FAIR',
    'Computer Vision',
    'NLP',
    'Open Source',
    'Research',
  ]
  // Meta AI blog RSS
  rssUrl = 'https://ai.meta.com/blog/rss'
}
