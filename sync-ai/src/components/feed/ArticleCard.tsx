'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Article, Source } from '@/types/database'
import { formatDistanceToNow } from '@/lib/utils'

interface ArticleCardProps {
  article: Article
  source?: Source
  onFeedback?: (articleId: string, type: 'up' | 'down' | 'save') => void
  isSaved?: boolean
}

export function ArticleCard({ article, source, onFeedback, isSaved = false }: ArticleCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleFeedback = (type: 'up' | 'down' | 'save') => {
    onFeedback?.(article.id, type)
  }

  const sourceColors: Record<string, string> = {
    arxiv: 'bg-emerald-500/10 text-emerald-600',
    openai: 'bg-amber-500/10 text-amber-600',
    huggingface: 'bg-yellow-500/10 text-yellow-600',
    google: 'bg-blue-500/10 text-blue-600',
    deepmind: 'bg-purple-500/10 text-purple-600',
    anthropic: 'bg-rose-500/10 text-rose-600',
    meta: 'bg-indigo-500/10 text-indigo-600',
    stability: 'bg-cyan-500/10 text-cyan-600',
    default: 'bg-primary/10 text-primary',
  }

  const sourceKey = source?.name?.toLowerCase().replace(/\s+/g, '') || 'default'
  const badgeClass = sourceColors[sourceKey] || sourceColors.default

  return (
    <Link href={`/article?id=${article.id}`}>
    <article
      className="bento-card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      {article.image_url && !imageError && (
        <div className="mb-3 overflow-hidden rounded-lg">
          <img
            src={article.image_url}
            alt={article.title}
            className="h-40 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${badgeClass}`}>
          {source?.name || article.source_id}
        </span>
        {article.read_time_minutes && (
          <span className="text-xs text-muted-foreground">
            {article.read_time_minutes} min read
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-2 transition-colors group-hover:text-primary">
        {article.title}
      </h3>

      {/* Summary */}
      {article.summary && (
        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
          {article.summary}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <time className="text-xs text-muted-foreground">
          {formatDistanceToNow(article.published_at)}
        </time>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleFeedback('up')
            }}
            className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Thumbs up"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18L3.75 15.75M5.904 6L3.75 3.75" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleFeedback('down')
            }}
            className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Thumbs down"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 15h2.25m8.25-8.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 00-.75-.75A2.25 2.25 0 0016.5 1.5c-1.162 0-2.35.26-3.218.723-.558.266-1.282-.107-1.282-.725V3.126c0-1.026-.694-1.945-1.715-2.054a11.95 11.95 0 00-7.521 2.649c-.482.388-.729.987-.729 1.605v6.401c0 .483.078.964.23 1.423l1.04 3.114a4.501 4.501 0 00.23 1.423M5.25 15h2.25M5.904 18l2.154 2.25M5.904 6l2.154-2.25" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleFeedback('save')
            }}
            className={`rounded p-1.5 transition-colors hover:bg-accent ${
              isSaved ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save article'}
          >
            <svg className="h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 019.186 0z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
    </Link>
  )
}
