'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { RefreshJob, Source } from '@/types/database'

export default function JobMonitoringPage() {
  const [jobs, setJobs] = useState<RefreshJob[]>([])
  const [sources, setSources] = useState<Map<string, Source>>(new Map())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // Fetch recent jobs
      const { data: jobsData } = await supabase
        .from('refresh_jobs')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(50)

      if (jobsData) {
        setJobs(jobsData)
      }

      // Fetch sources
      const { data: sourcesData } = await supabase.from('sources').select('*')

      if (sourcesData) {
        const sourceMap = new Map<string, Source>()
        sourcesData.forEach((s) => sourceMap.set(s.id, s))
        setSources(sourceMap)
      }

      setIsLoading(false)
    }

    fetchData()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('refresh_jobs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'refresh_jobs' },
        () => {
          fetchData()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const getStatusColor = (status: RefreshJob['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600'
      case 'failed':
        return 'text-red-600'
      case 'running':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  const triggerManualRefresh = async () => {
    try {
      await fetch('/api/refresh', { method: 'POST' })
      alert('Refresh triggered!')
    } catch (error) {
      console.error('Failed to trigger refresh:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-64 rounded bg-muted" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Monitoring</h1>
          <p className="text-muted-foreground">Monitor refresh jobs and source health</p>
        </div>
        <button
          onClick={triggerManualRefresh}
          className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
        >
          Trigger Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Jobs</p>
          <p className="text-2xl font-bold">{jobs.length}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {jobs.filter((j) => j.status === 'completed').length}
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Failed</p>
          <p className="text-2xl font-bold text-red-600">
            {jobs.filter((j) => j.status === 'failed').length}
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Running</p>
          <p className="text-2xl font-bold text-blue-600">
            {jobs.filter((j) => j.status === 'running').length}
          </p>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Source</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Started</th>
              <th className="px-4 py-3 text-right text-sm font-medium">Fetched</th>
              <th className="px-4 py-3 text-right text-sm font-medium">New</th>
              <th className="px-4 py-3 text-right text-sm font-medium">Errors</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-muted/50">
                <td className="px-4 py-3 text-sm">
                  {job.source_id
                    ? sources.get(job.source_id)?.name || 'Unknown'
                    : 'All Sources'}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`font-medium ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {new Date(job.started_at).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-sm">
                  {job.articles_fetched}
                </td>
                <td className="px-4 py-3 text-right text-sm text-green-600">
                  {job.articles_new}
                </td>
                <td className="px-4 py-3 text-right text-sm text-red-600">
                  {job.error_message || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {jobs.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          No jobs yet. Run a refresh to see results here.
        </div>
      )}
    </div>
  )
}
