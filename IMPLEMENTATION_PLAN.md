# SyncAI Implementation Plan

## Overview

SyncAI is an AI-focused news aggregator that automatically collects, filters, and presents the latest research and announcements from leading AI sources. The system uses a hybrid ingestion approach combining scheduled cron jobs, LLM-based relevance checking, and fallback mechanisms to ensure reliable content delivery.

---

## Phase 1: MVP Core (2-3 weeks)

**Goal:** Single user, 4-5 sources, basic functional feed

### 1.1 Infrastructure Setup

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 1 | Initialize Next.js 14 project with App Router | Working scaffold | None |
| 2 | Configure Tailwind with CSS Variables design system | Theme toggleable | Step 1 |
| 3 | Set up Supabase client and database types | Type-safe DB queries | Step 1 |
| 4 | Create Supabase migrations (sources, articles, jobs tables) | Tables created | Step 3 |

### 1.2 Core UI Components

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 5 | Build layout shell (Header, Sidebar, MainLayout) | Responsive layout | Step 2 |
| 6 | Build ArticleCard component | Animated card | Step 5 |
| 7 | Build ArticleFeed with infinite scroll | Paginated feed | Step 6 |
| 8 | Build Source Management UI | Add/edit/disable sources | Steps 1-3 |

### 1.3 Data Ingestion

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 9 | Implement RSS feed parser service | Parses RSS/Atom | Step 4 |
| 10 | Create source integrations (arXiv, OpenAI, HF, Google AI) | Sources operational | Step 9 |
| 11 | Implement LLM relevance scoring (fallback: rule-based) | Relevance scores | Steps 4, 10 |
| 12 | Create Vercel Cron job for daily refresh | Cron configured | Steps 9-11 |

### 1.4 API Routes

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 13 | Build `/api/articles` route with pagination | Paginated articles | Step 7 |
| 14 | Build `/api/sources` CRUD routes | Source management | Step 8 |
| 15 | Build `/api/refresh` manual trigger | Manual refresh | Steps 12-14 |

### 1.5 Testing & Polish

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 16 | Write unit tests for core utilities (80%+ coverage) | Tests pass | Steps 9-11, 13 |
| 17 | Visual regression tests for key components | Baseline screenshots | Steps 5-7 |
| 18 | Accessibility audit and fixes | WCAG AA compliant | Steps 5-7 |

### Phase 1 Deliverables

- [ ] Next.js 14 project with App Router, TypeScript, Tailwind
- [ ] CSS variable design system implemented
- [ ] Supabase tables created with migrations
- [ ] 4-5 AI news sources integrated (arXiv, OpenAI, HF, Google AI)
- [ ] ArticleCard, ArticleFeed components built
- [ ] Source management UI functional
- [ ] RSS parsing with deduplication
- [ ] LLM relevance scoring (with fallback)
- [ ] Daily cron job configured
- [ ] API routes for articles, sources, refresh
- [ ] Unit tests at 80%+ coverage
- [ ] Visual regression baselines
- [ ] Accessibility audit passed

---

## Phase 2: Content Pipeline (2-3 weeks)

**Goal:** Daily auto-refresh reliable, 8-10 sources, feedback system

### 2.1 Expanded Source Network

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 19 | Add 4-5 additional sources (Anthropic, DeepMind, Meta, Stability, Reddit) | 8-10 sources | Phase 1 |
| 20 | Implement source health monitoring | Source status tracking | Step 19 |

### 2.2 Enhanced Ingestion Pipeline

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 21 | Implement incremental refresh logic | Faster refreshes | Phase 1 Step 12 |
| 22 | Add retry logic with exponential backoff | Transient failures handled | Step 21 |
| 23 | Implement content extraction for article bodies | Full article content | Step 21 |

### 2.3 Feedback System

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 24 | Add feedback database tables | Feedback storage | Phase 1 |
| 25 | Build feedback API routes | Feedback persists | Step 24 |
| 26 | Create useFeedback hook with optimistic updates | Instant feedback UI | Step 25 |
| 27 | Implement preference learning | Personalized ranking | Steps 24-26 |

### 2.4 Article Detail View

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 28 | Build ArticleDetail page | Full article view | Step 23 |
| 29 | Add share and bookmark functionality | Share/bookmark | Step 28 |

### 2.5 Testing & Monitoring

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 30 | Integration tests for full refresh flow | E2E pipeline test | Steps 21-23 |
| 31 | Add job monitoring dashboard | Admin view | Step 20 |

### Phase 2 Deliverables

- [ ] 8-10 AI news sources operational
- [ ] Source health monitoring implemented
- [ ] Incremental refresh logic
- [ ] Retry with exponential backoff
- [ ] Content extraction for article bodies
- [ ] Feedback table and API
- [ ] useFeedback hook with optimistic updates
- [ ] Preference learning
- [ ] Article detail page with full content
- [ ] Share and bookmark functionality
- [ ] Integration tests for refresh flow
- [ ] Admin monitoring dashboard

---

## Phase 3: Search & Polish (1-2 weeks)

**Goal:** Full-text search, filters, performance optimization

### 3.1 Search Infrastructure

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 32 | Implement PostgreSQL full-text search | FTS with GIN index | Phase 2 |
| 33 | Build search API route | Search with highlights | Step 32 |
| 34 | Create search UI components (Command-K modal) | Search experience | Steps 32-33 |

### 3.2 Filtering & Organization

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 35 | Implement category system (6 categories) | Articles tagged | Phase 2 |
| 36 | Add date range filtering | Date filters | Phase 2 |
| 37 | Build saved filters / smart lists | Saved filters | Steps 35-36 |

### 3.3 Performance Optimization

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 38 | Optimize images with next/image | LCP < 2.5s | Phase 2 |
| 39 | Implement service worker for offline support | Offline reading | Phase 2 |
| 40 | Bundle analysis and code splitting | < 150KB JS | Phase 2 |

### 3.4 UI Polish

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 41 | Add skeleton loading states | No layout shift | Phase 2 |
| 42 | Implement reduced motion support | A11y compliant | Step 41 |
| 43 | Cross-browser testing and fixes | All browsers | Phase 2 |

### Phase 3 Deliverables

- [ ] PostgreSQL full-text search with GIN index
- [ ] Search API with pagination and highlights
- [ ] Command-K search modal
- [ ] Category system with 6 categories
- [ ] Date range filtering
- [ ] Saved filters and smart lists
- [ ] Image optimization with next/image
- [ ] Service worker for offline support
- [ ] Bundle analysis passed, under budget
- [ ] Skeleton loading states
- [ ] Reduced motion support
- [ ] Cross-browser testing complete

---

## Phase 4: Multi-User Platform (3-4 weeks) — Optional

**Goal:** Auth, profiles, personalized feeds, sharing

### 4.1 Authentication

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 44 | Implement Supabase Auth | Signup, login, logout | Phase 3 |
| 45 | Create user profiles | User preferences | Step 44 |

### 4.2 Personalized Features

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 46 | Implement per-user article feed | Personalized ranking | Steps 27, 44-45 |
| 47 | Add reading history and progress | Reading tracking | Step 46 |
| 48 | Implement following and sharing | Social features | Step 47 |

### 4.3 Collaboration

| # | Task | Deliverable | Dependencies |
|---|------|-------------|--------------|
| 49 | Build shared collections | Collaborative lists | Step 48 |
| 50 | Add email digest | Weekly digest emails | Step 46 |

### Phase 4 Deliverables

- [ ] Supabase Auth with multiple providers
- [ ] User profiles and preferences
- [ ] Per-user personalized feed
- [ ] Reading history and progress tracking
- [ ] Following and sharing
- [ ] Shared collections
- [ ] Email digest

---

## Database Schema

```
sources           # RSS/feed source definitions
articles          # Aggregated article metadata  
article_content   # Cached full content per article
user_feedback     # Upvotes, dismissals, preferences
categories        # Article categorization
refresh_jobs      # Job tracking and status
profiles          # User profiles (Phase 4)
```

## API Routes

```
/api/articles             # Paginated article feed
/api/articles/[id]       # Single article with content
/api/sources             # CRUD for feed sources
/api/sources/[id]        # Source by ID
/api/refresh             # Trigger manual refresh
/api/feedback            # Submit user feedback
/api/search              # Full-text search
/api/categories          # Category management
/api/jobs/daily-refresh  # Cron handler
/api/admin/jobs          # Job monitoring
```

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# LLM (choose one)
OPENAI_API_KEY=        # GPT-4 relevance scoring
# or
ANTHROPIC_API_KEY=     # Claude relevance scoring
```

## Vercel Cron Configuration

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/jobs/daily-refresh",
      "schedule": "0 6 * * *"
    }
  ]
}
```

---

## Success Criteria

| Phase | Target |
|-------|--------|
| Phase 1 | User can view paginated feed from 4-5 sources, manual refresh works, daily cron configured |
| Phase 2 | 8-10 sources with health monitoring, feedback persists, article detail works |
| Phase 3 | Search <100ms, filters work, LCP <2.5s, CLS <0.1 |
| Phase 4 | Auth works, personalized feeds, social features |

---

*Plan Version: 1.0*
