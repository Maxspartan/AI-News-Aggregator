export function ArticleCardSkeleton() {
  return (
    <div className="bento-card">
      {/* Image skeleton */}
      <div className="mb-3 h-40 w-full animate-pulse rounded-lg bg-muted" />

      {/* Header skeleton */}
      <div className="mb-2 flex items-center gap-2">
        <div className="h-5 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
      </div>

      {/* Title skeleton */}
      <div className="mb-2 space-y-1">
        <div className="h-6 w-full animate-pulse rounded bg-muted" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
      </div>

      {/* Summary skeleton */}
      <div className="mb-4 space-y-1">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>

      {/* Footer skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="flex gap-1">
          <div className="h-8 w-8 animate-pulse rounded bg-muted" />
          <div className="h-8 w-8 animate-pulse rounded bg-muted" />
          <div className="h-8 w-8 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
