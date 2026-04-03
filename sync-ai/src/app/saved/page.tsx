'use client'

import { useState, useCallback } from 'react'
import { MainLayout } from '@/components/layout'
import { ArticleFeed } from '@/components/feed'
import { useArticles } from '@/hooks/useArticles'

export default function SavedPage() {
  const { articles, sources, isLoading, hasMore, loadMore } = useArticles(10)
  const [savedArticleIds, setSavedArticleIds] = useState<Set<string>>(new Set())

  const handleFeedback = useCallback(
    (articleId: string, type: 'up' | 'down' | 'save') => {
      if (type === 'save') {
        setSavedArticleIds((prev) => {
          const newSet = new Set(prev)
          if (newSet.has(articleId)) {
            newSet.delete(articleId)
          } else {
            newSet.add(articleId)
          }
          return newSet
        })
      }
    },
    []
  )

  // For now, show a placeholder saved state
  const savedArticles = articles.slice(0, 2) // Just showing first 2 as "saved"

  return (
    <MainLayout>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Saved Articles</h2>
        <p className="text-sm text-muted-foreground">
          Articles you've bookmarked for later
        </p>
      </div>

      {savedArticles.length > 0 ? (
        <ArticleFeed
          articles={savedArticles}
          sources={sources}
          isLoading={isLoading}
          hasMore={false}
          onLoadMore={() => {}}
          onFeedback={handleFeedback}
          savedArticleIds={savedArticleIds}
        />
      ) : (
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
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 019.186 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">No saved articles</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Articles you save will appear here. Click the bookmark icon on any
            article to save it.
          </p>
        </div>
      )}
    </MainLayout>
  )
}
