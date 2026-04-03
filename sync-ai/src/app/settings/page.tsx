'use client'

import { useState, useEffect, useCallback } from 'react'
import { MainLayout } from '@/components/layout'
import { SourceList } from '@/components/sources'
import { Source } from '@/types/database'

export default function SettingsPage() {
  const [sources, setSources] = useState<Source[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchSources = useCallback(async () => {
    try {
      const response = await fetch('/api/sources')
      const data = await response.json()
      if (data.success) {
        setSources(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch sources:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSources()
  }, [fetchSources])

  const handleToggleStatus = useCallback(async (sourceId: string) => {
    const source = sources.find((s) => s.id === sourceId)
    if (!source) return

    const newStatus = source.status === 'active' ? 'paused' : 'active'

    try {
      const response = await fetch(`/api/sources/${sourceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setSources((prev) =>
          prev.map((s) => (s.id === sourceId ? { ...s, status: newStatus } : s))
        )
      }
    } catch (error) {
      console.error('Failed to update source:', error)
    }
  }, [sources])

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your news sources and preferences
          </p>
        </div>

        {/* Sources Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Sources</h2>
              <p className="text-sm text-muted-foreground">
                Toggle sources on/off to customize your feed
              </p>
            </div>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
              Add Source
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          ) : (
            <SourceList sources={sources} onToggleStatus={handleToggleStatus} />
          )}
        </section>

        {/* Preferences Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark themes
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors">
                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
