'use client'

import { useCallback } from 'react'
import { MainLayout } from '@/components/layout'
import { ArticleFeed } from '@/components/feed'
import { useArticles } from '@/hooks/useArticles'
import { useFeedback } from '@/hooks/useFeedback'

export default function Home() {
  const { articles, sources, isLoading, hasMore, loadMore } = useArticles(10)
  const { savedArticleIds, submitFeedback } = useFeedback()

  const handleFeedback = useCallback(
    (articleId: string, type: 'up' | 'down' | 'save') => {
      submitFeedback(articleId, type)
    },
    [submitFeedback]
  )

  const handleSearchClick = () => {
    // TODO: Open search modal
    console.log('Search clicked')
  }

  const handleMenuClick = () => {
    // TODO: Open settings/menu
    console.log('Menu clicked')
  }

  return (
    <MainLayout onSearchClick={handleSearchClick} onMenuClick={handleMenuClick}>
      {/* Feed Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Latest</h2>
        <p className="text-sm text-muted-foreground">
          Curated AI news from {sources.size} sources
        </p>
      </div>

      {/* Article Feed */}
      <ArticleFeed
        articles={articles}
        sources={sources}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onFeedback={handleFeedback}
        savedArticleIds={savedArticleIds}
      />
    </MainLayout>
  )
}
