export interface Source {
  id: string
  name: string
  url: string
  rss_url: string | null
  api_endpoint: string | null
  type: 'research' | 'company' | 'community' | 'newsletter' | 'social'
  topics: string[]
  quality_score: number
  tier: 'S' | 'A' | 'B' | 'C' | 'D'
  status: 'proposed' | 'trial' | 'active' | 'paused' | 'deprecated'
  added_at: string
  last_fetch_at: string | null
  fetch_success_rate: number
  total_articles_fetched: number
  avg_daily_articles: number
  duplicate_rate: number
}

export interface Article {
  id: string
  source_id: string
  title: string
  url: string
  author: string | null
  published_at: string
  fetched_at: string
  summary: string | null
  content: string | null
  relevance_score: number | null
  category: string | null
  tags: string[]
  read_time_minutes: number | null
  image_url: string | null
}

export interface RefreshJob {
  id: string
  source_id: string | null
  status: 'pending' | 'running' | 'completed' | 'failed'
  started_at: string
  completed_at: string | null
  articles_fetched: number
  articles_new: number
  articles_duplicate: number
  error_message: string | null
}

export interface UserFeedback {
  id: string
  article_id: string
  feedback_type: 'up' | 'down' | 'skip' | 'save'
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string
}
