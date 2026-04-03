-- Migration: 004_feedback.sql
-- Create user_feedback table for tracking user interactions

CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('up', 'down', 'skip', 'save')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_feedback_article_id ON user_feedback(article_id);
CREATE INDEX idx_user_feedback_type ON user_feedback(feedback_type);

-- RLS - allow all for MVP, restrict in Phase 4
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON user_feedback FOR ALL USING (true);

COMMENT ON TABLE user_feedback IS 'User feedback on articles (thumbs up/down, skip, save)';
