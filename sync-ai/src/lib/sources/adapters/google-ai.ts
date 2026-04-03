import { BaseRSSAdapter } from './base'

export class GoogleAIAdapter extends BaseRSSAdapter {
  name = 'Google AI'
  type = 'company' as const
  tier = 'S' as const
  topics = [
    'Gemini',
    'Bard',
    'DeepMind',
    'Research',
    'PaLM',
    'BERT',
    'TPU',
  ]
  // Google AI blog RSS
  rssUrl = 'https://ai.googleblog.com/feeds/posts/default'
}
