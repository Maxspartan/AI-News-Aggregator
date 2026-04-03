'use client'

import { useState } from 'react'
import { Source } from '@/types/database'

interface SourceListProps {
  sources: Source[]
  onToggleStatus: (sourceId: string) => void
}

const sourceTypeIcons: Record<string, string> = {
  research: '🔬',
  company: '🏢',
  community: '👥',
  newsletter: '📧',
  social: '💬',
}

const tierColors: Record<string, string> = {
  S: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  A: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  B: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  C: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  D: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
}

export function SourceList({ sources, onToggleStatus }: SourceListProps) {
  const [expandedSource, setExpandedSource] = useState<string | null>(null)

  const activeSources = sources.filter((s) => s.status === 'active')
  const pausedSources = sources.filter((s) => s.status === 'paused')

  return (
    <div className="space-y-6">
      {/* Active Sources */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Active Sources ({activeSources.length})
        </h3>
        <div className="space-y-2">
          {activeSources.map((source) => (
            <SourceCard
              key={source.id}
              source={source}
              isExpanded={expandedSource === source.id}
              onToggle={() => onToggleStatus(source.id)}
              onExpand={() =>
                setExpandedSource(expandedSource === source.id ? null : source.id)
              }
            />
          ))}
        </div>
      </div>

      {/* Paused Sources */}
      {pausedSources.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Paused Sources ({pausedSources.length})
          </h3>
          <div className="space-y-2">
            {pausedSources.map((source) => (
              <SourceCard
                key={source.id}
                source={source}
                isExpanded={expandedSource === source.id}
                onToggle={() => onToggleStatus(source.id)}
                onExpand={() =>
                  setExpandedSource(expandedSource === source.id ? null : source.id)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface SourceCardProps {
  source: Source
  isExpanded: boolean
  onToggle: () => void
  onExpand: () => void
}

function SourceCard({ source, isExpanded, onToggle, onExpand }: SourceCardProps) {
  const isActive = source.status === 'active'

  return (
    <div
      className={`rounded-lg border p-4 transition-all ${
        isActive
          ? 'border-border bg-card'
          : 'border-border/50 bg-muted/50'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-2xl" role="img" aria-label={source.type}>
            {sourceTypeIcons[source.type] || '📄'}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h4
                className={`font-medium ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {source.name}
              </h4>
              <span
                className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                  tierColors[source.tier]
                }`}
              >
                {source.tier}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{source.url}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExpand}
            className="rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <svg
              className={`h-4 w-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isActive ? 'bg-primary' : 'bg-muted'
            }`}
            aria-label={isActive ? 'Pause source' : 'Activate source'}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 border-t border-border pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Quality Score</p>
              <p className="font-medium">{source.quality_score}/100</p>
            </div>
            <div>
              <p className="text-muted-foreground">Success Rate</p>
              <p className="font-medium">{source.fetch_success_rate}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Articles</p>
              <p className="font-medium">{source.total_articles_fetched.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Daily Average</p>
              <p className="font-medium">{source.avg_daily_articles}</p>
            </div>
          </div>
          {source.topics.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-muted-foreground">Topics</p>
              <div className="flex flex-wrap gap-2">
                {source.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
