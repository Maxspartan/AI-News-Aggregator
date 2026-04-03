import { BaseRSSAdapter } from './base'

export class ArXivAdapter extends BaseRSSAdapter {
  name = 'arXiv'
  type = 'research' as const
  tier = 'S' as const
  topics = [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Neural Networks',
    'Natural Language Processing',
    'Computer Vision',
    'Reinforcement Learning',
  ]
  rssUrl = 'http://export.arxiv.org/rss/cs.AI'
}
