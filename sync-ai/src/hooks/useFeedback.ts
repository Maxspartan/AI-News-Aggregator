'use client'

import { useState, useEffect, useCallback } from 'react'
import { UserFeedback } from '@/types/database'

interface UseFeedbackReturn {
  feedback: Map<string, UserFeedback[]>
  savedArticleIds: Set<string>
  isLoading: boolean
  submitFeedback: (articleId: string, type: 'up' | 'down' | 'save' | 'skip') => Promise<void>
}

export function useFeedback(): UseFeedbackReturn {
  const [feedback, setFeedback] = useState<Map<string, UserFeedback[]>>(new Map())
  const [savedArticleIds, setSavedArticleIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  // Fetch existing feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('/api/feedback')
        const result = await response.json()

        if (result.success) {
          // Group feedback by article_id
          const feedbackMap = new Map<string, UserFeedback[]>()
          const saved = new Set<string>()

          for (const item of result.data) {
            if (!feedbackMap.has(item.article_id)) {
              feedbackMap.set(item.article_id, [])
            }
            feedbackMap.get(item.article_id)!.push(item)

            if (item.feedback_type === 'save') {
              saved.add(item.article_id)
            }
          }

          setFeedback(feedbackMap)
          setSavedArticleIds(saved)
        }
      } catch (error) {
        console.error('Failed to fetch feedback:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  // Submit feedback with optimistic update
  const submitFeedback = useCallback(
    async (articleId: string, type: 'up' | 'down' | 'save' | 'skip') => {
      // Optimistic update
      const newFeedbackMap = new Map(feedback)
      const articleFeedback = newFeedbackMap.get(articleId) || []
      const existingIndex = articleFeedback.findIndex((f) => f.feedback_type === type)

      if (existingIndex >= 0) {
        // Remove if exists (toggle off)
        articleFeedback.splice(existingIndex, 1)
        if (type === 'save') {
          const newSaved = new Set(savedArticleIds)
          newSaved.delete(articleId)
          setSavedArticleIds(newSaved)
        }
      } else {
        // Add new feedback
        const newFeedback: UserFeedback = {
          id: 'temp-' + Date.now(),
          article_id: articleId,
          feedback_type: type,
          created_at: new Date().toISOString(),
        }
        articleFeedback.push(newFeedback)
        if (type === 'save') {
          const newSaved = new Set(savedArticleIds)
          newSaved.add(articleId)
          setSavedArticleIds(newSaved)
        }
      }

      newFeedbackMap.set(articleId, articleFeedback)
      setFeedback(newFeedbackMap)

      // API call
      try {
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ article_id: articleId, feedback_type: type }),
        })

        if (!response.ok) {
          throw new Error('Failed to submit feedback')
        }

        // Refresh feedback after successful submission
        const result = await response.json()

        // Revert optimistic update if action was removed
        if (result.data?.action === 'removed' && type === 'save') {
          const newSaved = new Set(savedArticleIds)
          newSaved.delete(articleId)
          setSavedArticleIds(newSaved)
        }
      } catch (error) {
        console.error('Failed to submit feedback:', error)
        // Could revert optimistic update here if needed
      }
    },
    [feedback, savedArticleIds]
  )

  return {
    feedback,
    savedArticleIds,
    isLoading,
    submitFeedback,
  }
}

// Calculate user preferences based on feedback
export function calculatePreferences(feedback: Map<string, UserFeedback[]>) {
  const topicScores = new Map<string, number>()
  const sourceScores = new Map<string, number>()

  for (const articleFeedback of feedback.values()) {
    for (const item of articleFeedback) {
      const weight = item.feedback_type === 'up' ? 1 : item.feedback_type === 'down' ? -1 : 0

      // Update topic scores
      if (item.feedback_type === 'up' || item.feedback_type === 'down') {
        // In a real implementation, we'd fetch article topics from DB
        // For now, use placeholder logic
        const topics = ['AI', 'ML', 'Deep Learning'] // Would be fetched from article
        for (const topic of topics) {
          const currentScore = topicScores.get(topic) || 0
          topicScores.set(topic, currentScore + weight)
        }
      }
    }
  }

  return {
    topicScores,
    sourceScores,
    preferences: Array.from(topicScores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10),
  }
}
