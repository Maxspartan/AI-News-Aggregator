'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { MainLayout } from '@/components/layout'
import { Article, Source } from '@/types/database'
import { formatDistanceToNow } from '@/lib/utils'

export default function ArticlePage() {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ArticleContent />
    </Suspense>
  )
}

function ArticleSkeleton() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl animate-pulse space-y-4">
        <div className="h-8 w-3/4 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
        <div className="h-64 rounded bg-muted" />
      </div>
    </MainLayout>
  )
}

function ArticleContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [article, setArticle] = useState<Article | null>(null)
  const [source, setSource] = useState<Source | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${id}`)
        const result = await response.json()

        if (result.success) {
          setArticle(result.data.article)
          setSource(result.data.source)
        }
      } catch (error) {
        console.error('Failed to fetch article:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  const handleShare = async () => {
    if (!article) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          url: article.url,
        })
      } catch (error) {
        console.log('Share canceled')
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(article.url)
      alert('Link copied to clipboard!')
    }
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-2xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
            <div className="h-64 rounded bg-muted" />
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!article) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-2xl text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return to feed
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <article className="mx-auto max-w-2xl">
        {/* Back button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to feed
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            {source && (
              <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {source.name}
              </span>
            )}
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(article.published_at)}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold leading-tight text-foreground">
            {article.title}
          </h1>

          {article.author && (
            <p className="mb-4 text-muted-foreground">By {article.author}</p>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Read Original
            </a>
          </div>
        </header>

        {/* Image */}
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="mb-8 w-full rounded-lg object-cover"
            loading="eager"
          />
        )}

        {/* Summary */}
        {article.summary && (
          <div className="mb-8 rounded-lg border-l-4 border-primary bg-muted/50 p-4">
            <p className="text-lg font-medium text-foreground">{article.summary}</p>
          </div>
        )}

        {/* Content */}
        {article.content ? (
          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap leading-relaxed text-foreground">
              {article.content}
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
            <p className="text-muted-foreground">
              Full content not available.{' '}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Read the original article
              </a>
            </p>
          </div>
        )}

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </MainLayout>
  )
}
