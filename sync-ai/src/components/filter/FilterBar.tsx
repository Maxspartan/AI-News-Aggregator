'use client'

import { useState } from 'react'

interface FilterOptions {
  category?: string
  dateRange?: 'today' | 'week' | 'month' | 'all'
  source?: string
}

interface FilterBarProps {
  options: FilterOptions
  onChange: (options: FilterOptions) => void
  sources: { id: string; name: string }[]
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'research', label: 'Research' },
  { value: 'product', label: 'Product' },
  { value: 'safety', label: 'Safety' },
  { value: 'news', label: 'News' },
  { value: 'tutorial', label: 'Tutorial' },
  { value: 'opinion', label: 'Opinion' },
]

const dateRanges = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
]

export function FilterBar({ options, onChange, sources }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-3">
      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={options.category || ''}
          onChange={(e) => onChange({ ...options, category: e.target.value || undefined })}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={options.dateRange || 'all'}
          onChange={(e) =>
            onChange({
              ...options,
              dateRange: (e.target.value as FilterOptions['dateRange']) || undefined,
            })
          }
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        >
          {dateRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>

        {sources.length > 0 && (
          <select
            value={options.source || ''}
            onChange={(e) => onChange({ ...options, source: e.target.value || undefined })}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
          >
            <option value="">All Sources</option>
            {sources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => onChange({})}
          className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Clear
        </button>
      </div>

      {/* Active Filters */}
      {(options.category || options.dateRange || options.source) && (
        <div className="flex flex-wrap gap-2">
          {options.category && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {categories.find((c) => c.value === options.category)?.label}
              <button
                onClick={() => onChange({ ...options, category: undefined })}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </span>
          )}
          {options.dateRange && options.dateRange !== 'all' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {dateRanges.find((r) => r.value === options.dateRange)?.label}
              <button
                onClick={() => onChange({ ...options, dateRange: undefined })}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </span>
          )}
          {options.source && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {sources.find((s) => s.id === options.source)?.name}
              <button
                onClick={() => onChange({ ...options, source: undefined })}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
