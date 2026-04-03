'use client'

import { useState, useEffect, useCallback } from 'react'
import { Article, Source } from '@/types/database'

interface UseArticlesReturn {
  articles: Article[]
  sources: Map<string, Source>
  isLoading: boolean
  hasMore: boolean
  error: Error | null
  loadMore: () => void
  refresh: () => void
}

export function useArticles(initialLimit = 10): UseArticlesReturn {
  const [articles, setArticles] = useState<Article[]>([])
  const [sources, setSources] = useState<Map<string, Source>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState(1)

  const fetchArticles = useCallback(
    async (pageNum: number, append = false) => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(
          `/api/articles?page=${pageNum}&limit=${initialLimit}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch articles')
        }

        const data = await response.json()

        if (data.success) {
          if (append) {
            setArticles((prev) => [...prev, ...data.data.articles])
          } else {
            setArticles(data.data.articles)
          }

          // Update sources map
          setSources((prev) => {
            const newSources = new Map(prev)
            data.data.sources?.forEach((source: Source) => {
              newSources.set(source.id, source)
            })
            return newSources
          })

          setHasMore(data.data.hasMore)
        } else {
          throw new Error(data.error || 'Failed to fetch articles')
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setIsLoading(false)
      }
    },
    [initialLimit]
  )

  // Initial fetch
  useEffect(() => {
    fetchArticles(1, false)
  }, [fetchArticles])

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchArticles(nextPage, true)
    }
  }, [isLoading, hasMore, page, fetchArticles])

  const refresh = useCallback(() => {
    setPage(1)
    fetchArticles(1, false)
  }, [fetchArticles])

  return {
    articles,
    sources,
    isLoading,
    hasMore,
    error,
    loadMore,
    refresh,
  }
}
