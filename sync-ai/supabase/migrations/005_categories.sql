-- Migration: 005_categories.sql
-- Create categories table for article categorization

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#6366f1',
  icon TEXT DEFAULT '📁',
  article_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default categories
INSERT INTO categories (name, slug, color, icon) VALUES
  ('Research', 'research', '#8b5cf6', '🔬'),
  ('Product', 'product', '#3b82f6', '🚀'),
  ('Safety', 'safety', '#ef4444', '🛡️'),
  ('News', 'news', '#f59e0b', '📰'),
  ('Tutorial', 'tutorial', '#10b981', '📚'),
  ('Opinion', 'opinion', '#ec4899', '💭');

CREATE INDEX idx_categories_slug ON categories(slug);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON categories FOR ALL USING (true);

COMMENT ON TABLE categories IS 'Article categorization taxonomy';
