-- Migration: 001_sources.sql
-- Create sources table for RSS/API feed definitions

CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  rss_url TEXT,
  api_endpoint TEXT,
  type TEXT NOT NULL CHECK (type IN ('research', 'company', 'community', 'newsletter', 'social')),
  topics TEXT[] DEFAULT '{}',
  quality_score INTEGER DEFAULT 50 CHECK (quality_score >= 0 AND quality_score <= 100),
  tier TEXT DEFAULT 'B' CHECK (tier IN ('S', 'A', 'B', 'C', 'D')),
  status TEXT DEFAULT 'proposed' CHECK (status IN ('proposed', 'trial', 'active', 'paused', 'deprecated')),
  added_at TIMESTAMPTZ DEFAULT NOW(),
  last_fetch_at TIMESTAMPTZ,
  last_successful_fetch_at TIMESTAMPTZ,
  fetch_success_rate INTEGER DEFAULT 100 CHECK (fetch_success_rate >= 0 AND fetch_success_rate <= 100),
  total_articles_fetched INTEGER DEFAULT 0,
  avg_daily_articles INTEGER DEFAULT 0,
  duplicate_rate INTEGER DEFAULT 0 CHECK (duplicate_rate >= 0 AND duplicate_rate <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_sources_status ON sources(status);
CREATE INDEX idx_sources_tier ON sources(tier);
CREATE INDEX idx_sources_type ON sources(type);

-- RLS (Row Level Security) - enable for multi-user later
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;

-- Only allow authenticated users to modify (Phase 4)
-- For now, allow all since we're single-user
CREATE POLICY "Allow all" ON sources FOR ALL USING (true);

COMMENT ON TABLE sources IS 'RSS and API feed source definitions';
