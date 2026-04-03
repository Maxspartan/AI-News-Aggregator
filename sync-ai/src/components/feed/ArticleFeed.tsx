'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Article, Source } from '@/types/database'
import { ArticleCard } from './ArticleCard'
import { ArticleCardSkeleton } from './ArticleCardSkeleton'

interface ArticleFeedProps {
  articles: Article[]
  sources: Map<string, Source>
  isLoading: boolean
  hasMore: boolean
  onLoadMore: () => void
  onFeedback?: (articleId: string, type: 'up' | 'down' | 'save') => void
  savedArticleIds: Set<string>
}

export function ArticleFeed({
  articles,
  sources,
  isLoading,
  hasMore,
  onLoadMore,
  onFeedback,
  savedArticleIds,
}: ArticleFeedProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasMore && !isLoading) {
        onLoadMore()
      }
    },
    [hasMore, isLoading, onLoadMore]
  )

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    })

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleIntersect])

  // Empty state
  if (!isLoading && articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <svg
            className="h-8 w-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M9 9h.75M7.5 9h.75m8.25 6h.75M12 21a9 9 0 100-18 9 9 0 000 18z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">No articles yet</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Articles from your selected sources will appear here. Check back soon!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Article List */}
      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            source={sources.get(article.source_id)}
            onFeedback={onFeedback}
            isSaved={savedArticleIds.has(article.id)}
          />
        ))}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ArticleCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      )}

      {/* Load More Trigger */}
      {hasMore && <div ref={loadMoreRef} className="h-4" />}

      {/* End of Feed */}
      {!hasMore && articles.length > 0 && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          You've reached the end
        </div>
      )}
    </div>
  )
}
