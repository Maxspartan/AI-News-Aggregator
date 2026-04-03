import { supabase } from '@/lib/supabase'
import { sourceAdapters } from './adapters'
import { calculateContentHash, estimateReadTime, ParsedArticle } from './rss-parser'

interface PipelineOptions {
  sourceId?: string
  incremental?: boolean
  retryFailed?: boolean
}

interface PipelineResult {
  source: string
  status: 'success' | 'error' | 'skipped'
  fetched: number
  new: number
  duplicates: number
  error?: string
}

export async function runPipeline(options: PipelineOptions = {}): Promise<PipelineResult[]> {
  try {
    // Get active sources
    let query = supabase.from('sources').select('*').eq('status', 'active')

    if (options.sourceId) {
      query = query.eq('id', options.sourceId)
    }

    const { data: sources, error } = await query

    if (error) {
      throw error
    }

    const results: PipelineResult[] = []

    for (const source of sources || []) {
      const result = await processSource(source, options)
      results.push(result)
    }

    return results
  } catch (error) {
    console.error('Pipeline failed:', error)
    throw error
  }
}

async function processSource(
  source: any,
  options: PipelineOptions
): Promise<PipelineResult> {
  try {
    // Find adapter for this source
    const adapter = sourceAdapters.find((a) => a.name === source.name)
    if (!adapter) {
      return {
        source: source.name,
        status: 'skipped',
        fetched: 0,
        new: 0,
        duplicates: 0,
        error: 'No adapter found',
      }
    }

    // Check if incremental refresh is needed
    if (options.incremental && source.last_fetch_at) {
      const lastFetch = new Date(source.last_fetch_at)
      const hoursSinceLastFetch = (Date.now() - lastFetch.getTime()) / (1000 * 60 * 60)

      // Skip if fetched within last hour
      if (hoursSinceLastFetch < 1) {
        return {
          source: source.name,
          status: 'skipped',
          fetched: 0,
          new: 0,
          duplicates: 0,
          error: 'Fetched recently (within 1 hour)',
        }
      }
    }

    // Fetch articles with retry logic
    const articles = await fetchWithRetry(() => adapter.fetchArticles(), 3)

    let newCount = 0
    let duplicateCount = 0

    for (const article of articles) {
      // Calculate content hash for deduplication
      const contentHash = calculateContentHash(article)

      // Check if article already exists
      const { data: existing } = await supabase
        .from('articles')
        .select('id')
        .eq('content_hash', contentHash)
        .maybeSingle()

      if (existing) {
        duplicateCount++
        continue
      }

      // Extract full content if available
      let extractedContent = article.content
      if (!extractedContent && article.url) {
        extractedContent = await extractArticleContent(article.url)
      }

      // Insert new article
      const { error: insertError } = await supabase.from('articles').insert({
        source_id: source.id,
        title: article.title,
        url: article.url,
        author: article.author,
        published_at: article.publishedAt.toISOString(),
        summary: article.summary,
        content: extractedContent,
        content_hash: contentHash,
        image_url: article.imageUrl,
        tags: article.categories || [],
        read_time_minutes: estimateReadTime(extractedContent || article.summary),
      })

      if (insertError) {
        console.error(`Failed to insert article: ${insertError.message}`)
      } else {
        newCount++
      }
    }

    // Update source stats
    await supabase
      .from('sources')
      .update({
        last_fetch_at: new Date().toISOString(),
        total_articles_fetched: source.total_articles_fetched + articles.length,
      })
      .eq('id', source.id)

    return {
      source: source.name,
      status: 'success',
      fetched: articles.length,
      new: newCount,
      duplicates: duplicateCount,
    }
  } catch (error) {
    console.error(`Failed to process ${source.name}:`, error)
    return {
      source: source.name,
      status: 'error',
      fetched: 0,
      new: 0,
      duplicates: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number
): Promise<T> {
  let lastError: Error | undefined

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt) * 1000
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

async function extractArticleContent(url: string): Promise<string | undefined> {
  try {
    // Simple content extraction - fetch and strip HTML
    // In production, use a service like Mercury, Readability, or Diffbot
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'SyncAI/1.0 (AI News Aggregator)',
      },
    })

    if (!response.ok) {
      return undefined
    }

    const html = await response.text()

    // Basic HTML to text extraction
    // Remove script and style elements
    let text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^br/][^b][^r][^>]*>/g, ' ')
      .replace(/<\/[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    // Limit to reasonable length
    return text.slice(0, 10000)
  } catch (error) {
    console.error(`Failed to extract content from ${url}:`, error)
    return undefined
  }
}

// Source health monitoring
export async function checkSourceHealth(): Promise<void> {
  const { data: sources } = await supabase.from('sources').select('*')

  for (const source of sources || []) {
    // Calculate success rate
    const { data: recentJobs } = await supabase
      .from('refresh_jobs')
      .select('status')
      .eq('source_id', source.id)
      .order('started_at', { ascending: false })
      .limit(10)

    if (recentJobs && recentJobs.length > 0) {
      const successCount = recentJobs.filter((j) => j.status === 'completed').length
      const successRate = Math.round((successCount / recentJobs.length) * 100)

      // Update source with health metrics
      await supabase
        .from('sources')
        .update({ fetch_success_rate: successRate })
        .eq('id', source.id)

      // Pause source if success rate is too low
      if (successRate < 50 && source.status === 'active') {
        await supabase
          .from('sources')
          .update({ status: 'paused' })
          .eq('id', source.id)

        console.warn(`Source ${source.name} paused due to low success rate (${successRate}%)`)
      }
    }
  }
}
