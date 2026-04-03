import { BaseRSSAdapter } from './base'

export class StabilityAdapter extends BaseRSSAdapter {
  name = 'Stability AI'
  type = 'company' as const
  tier = 'A' as const
  topics = [
    'Stable Diffusion',
    'Image Generation',
    'Open Source',
    'Multimodal',
    'Audio',
    'Video',
  ]
  // Stability AI blog RSS
  rssUrl = 'https://stability.ai/news?format=rss'
}
