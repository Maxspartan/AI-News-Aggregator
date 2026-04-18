import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ArticleCard } from '@/components/feed/ArticleCard'
import type { Article, Source } from '@/types/database'

describe('ArticleCard', () => {
  const mockArticle: Article = {
    id: '1',
    source_id: 'source-1',
    title: 'Test Article Title',
    url: 'https://example.com/article',
    author: 'Test Author',
    published_at: new Date().toISOString(),
    fetched_at: new Date().toISOString(),
    summary: 'This is a test article summary',
    content: 'Full article content',
    relevance_score: 85,
    category: 'Research',
    tags: ['AI', 'ML'],
    read_time_minutes: 5,
    image_url: 'https://example.com/image.jpg',
  }

  const mockSource: Source = {
    id: 'source-1',
    name: 'Test Source',
    url: 'https://example.com',
    rss_url: 'https://example.com/rss',
    api_endpoint: null,
    type: 'research',
    topics: ['AI'],
    quality_score: 90,
    tier: 'S',
    status: 'active',
    added_at: new Date().toISOString(),
    last_fetch_at: null,
    fetch_success_rate: 100,
    total_articles_fetched: 100,
    avg_daily_articles: 5,
    duplicate_rate: 0,
  }

  it('renders article title', () => {
    render(<ArticleCard article={mockArticle} source={mockSource} />)
    expect(screen.getByText('Test Article Title')).toBeInTheDocument()
  })

  it('renders source name', () => {
    render(<ArticleCard article={mockArticle} source={mockSource} />)
    expect(screen.getByText('Test Source')).toBeInTheDocument()
  })

  it('renders read time', () => {
    render(<ArticleCard article={mockArticle} source={mockSource} />)
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('renders summary', () => {
    render(<ArticleCard article={mockArticle} source={mockSource} />)
    expect(screen.getByText('This is a test article summary')).toBeInTheDocument()
  })

  it('calls onFeedback when thumbs up clicked', () => {
    const mockFeedback = vi.fn()
    render(<ArticleCard article={mockArticle} source={mockSource} onFeedback={mockFeedback} />)

    const thumbsUpButton = screen.getAllByRole('button')[0]
    fireEvent.click(thumbsUpButton)

    expect(mockFeedback).toHaveBeenCalledWith('1', 'up')
  })

  it('calls onFeedback when save clicked', () => {
    const mockFeedback = vi.fn()
    render(<ArticleCard article={mockArticle} source={mockSource} onFeedback={mockFeedback} />)

    const buttons = screen.getAllByRole('button')
    const saveButton = buttons[buttons.length - 1]
    fireEvent.click(saveButton)

    expect(mockFeedback).toHaveBeenCalledWith('1', 'save')
  })

  it('shows saved state when isSaved is true', () => {
    render(<ArticleCard article={mockArticle} source={mockSource} isSaved={true} />)
    const buttons = screen.getAllByRole('button')
    const saveButton = buttons[buttons.length - 1]
    expect(saveButton).toHaveClass('text-primary')
  })
})
