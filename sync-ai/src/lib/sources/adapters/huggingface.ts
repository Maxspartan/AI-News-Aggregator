import { BaseRSSAdapter } from './base'

export class HuggingFaceAdapter extends BaseRSSAdapter {
  name = 'Hugging Face'
  type = 'community' as const
  tier = 'A' as const
  topics = [
    'Transformers',
    'Models',
    'Datasets',
    'Spaces',
    'Inference API',
    'Research',
  ]
  // Hugging Face blog RSS
  rssUrl = 'https://huggingface.co/blog/feed.xml'
}
