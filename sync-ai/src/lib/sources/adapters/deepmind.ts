import { BaseRSSAdapter } from './base'

export class DeepMindAdapter extends BaseRSSAdapter {
  name = 'DeepMind'
  type = 'company' as const
  tier = 'S' as const
  topics = [
    'AlphaGo',
    'AlphaFold',
    'Gato',
    'Chinchilla',
    'Sparrow',
    'Research',
    'Reinforcement Learning',
  ]
  // DeepMind blog RSS
  rssUrl = 'https://deepmind.google/blog/rss.xml'
}
