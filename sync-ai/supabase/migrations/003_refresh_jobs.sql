-- Migration: 003_refresh_jobs.sql
-- Create refresh_jobs table for tracking ingestion jobs

CREATE TABLE IF NOT EXISTS refresh_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  articles_fetched INTEGER DEFAULT 0,
  articles_new INTEGER DEFAULT 0,
  articles_duplicate INTEGER DEFAULT 0,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_refresh_jobs_status ON refresh_jobs(status);
CREATE INDEX idx_refresh_jobs_source_id ON refresh_jobs(source_id);
CREATE INDEX idx_refresh_jobs_started_at ON refresh_jobs(started_at DESC);

-- RLS
ALTER TABLE refresh_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON refresh_jobs FOR ALL USING (true);

COMMENT ON TABLE refresh_jobs IS 'Job tracking for content refresh operations';
