-- Migration: 002_articles.sql
-- Create articles table for aggregated content

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  author TEXT,
  published_at TIMESTAMPTZ NOT NULL,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  summary TEXT,
  content TEXT,
  relevance_score INTEGER CHECK (relevance_score >= 0 AND relevance_score <= 100),
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  read_time_minutes INTEGER,
  image_url TEXT,
  content_hash TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_articles_source_id ON articles(source_id);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_fetched_at ON articles(fetched_at DESC);
CREATE INDEX idx_articles_relevance_score ON articles(relevance_score DESC) WHERE relevance_score IS NOT NULL;
CREATE INDEX idx_articles_category ON articles(category) WHERE category IS NOT NULL;
CREATE INDEX idx_articles_url_hash ON articles(content_hash) WHERE content_hash IS NOT NULL;

-- Full-text search index (for Phase 3)
CREATE INDEX idx_articles_fts ON articles USING GIN (to_tsvector('english', title || ' ' || COALESCE(summary, '') || ' ' || COALESCE(content, '')));

-- RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON articles FOR ALL USING (true);

COMMENT ON TABLE articles IS 'Aggregated article content from all sources';
