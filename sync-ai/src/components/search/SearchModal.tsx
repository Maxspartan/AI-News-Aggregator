'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { Article, Source } from '@/types/database'
import { formatDistanceToNow } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Article[]>([])
  const [sources, setSources] = useState<Map<string, Source>>(new Map())
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Search when query changes
  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=10`)
      const data = await response.json()

      if (data.success) {
        setResults(data.data.articles)
        const sourceMap = new Map<string, Source>()
        data.data.sources?.forEach((s: Source) => sourceMap.set(s.id, s))
        setSources(sourceMap)
        setSelectedIndex(0)
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => search(query), 150)
    return () => clearTimeout(timeoutId)
  }, [query, search])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % Math.max(results.length, 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            router.push(`/article?id=${results[selectedIndex].id}`)
            onClose()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, router, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh]" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-lg bg-background shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Search Input */}
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            />
            <kbd className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">ESC</kbd>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded bg-muted" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((article, index) => (
                <button
                  key={article.id}
                  onClick={() => {
                    router.push(`/article?id=${article.id}`)
                    onClose()
                  }}
                  className={`w-full rounded-lg p-3 text-left transition-colors ${
                    index === selectedIndex ? 'bg-accent' : 'hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{sources.get(article.source_id)?.name || article.source_id}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(article.published_at)}</span>
                  </div>
                  <h3 className="mt-1 line-clamp-2 text-sm font-medium text-foreground">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {article.summary}
                    </p>
                  )}
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-8 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              Start typing to search...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
            </div>
            <span>{results.length} results</span>
          </div>
        </div>
      </div>
    </div>
  )
}
