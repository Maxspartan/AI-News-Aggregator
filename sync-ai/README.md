# SyncAI - AI News Aggregator

> A personalized, mobile-first AI news aggregation platform that curates content from 100+ sources across research papers, company blogs, newsletters, and social media.

![SyncAI](https://img.shields.io/badge/SyncAI-AI%20News%20Aggregator-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)

---

## Overview

SyncAI automatically collects, filters, and presents the latest AI research and announcements from leading sources. The system uses a hybrid ingestion approach combining scheduled cron jobs, RSS/Atom feed parsing, and content extraction to ensure reliable content delivery.

### Key Features

- **Smart Aggregation**: Fetches from 9 premium sources (arXiv, OpenAI, Hugging Face, Google AI, Anthropic, DeepMind, Meta, Stability AI, Reddit)
- **Full-Text Search**: PostgreSQL-powered search with Command-K modal
- **Feedback System**: Thumbs up/down with preference learning
- **Mobile-First**: Optimized for mobile reading with bottom navigation
- **Offline Support**: Service worker for offline article access
- **Real-time Updates**: Supabase realtime for live job monitoring

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  Next.js 14 (App Router)  │  React 18  │  Tailwind CSS      │
├─────────────────────────────────────────────────────────────┤
│                      API LAYER                               │
├─────────────────────────────────────────────────────────────┤
│  /api/articles      │  /api/sources      │  /api/search      │
│  /api/refresh       │  /api/feedback     │  /api/jobs        │
├─────────────────────────────────────────────────────────────┤
│                   SERVICE LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  RSS Parser  │  Source Adapters  │  Content Pipeline      │
├─────────────────────────────────────────────────────────────┤
│                   DATA LAYER                                 │
├─────────────────────────────────────────────────────────────┤
│              Supabase (PostgreSQL + Realtime)               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Ingestion**: Cron job triggers `/api/jobs/daily-refresh` → RSS adapters fetch feeds → Content extracted → Articles stored
2. **API**: Next.js API routes query Supabase → Return JSON to client
3. **Client**: React hooks fetch data → Components render → User interactions send feedback
4. **Search**: PostgreSQL full-text search (GIN index) with fallback to ILIKE

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14 | SSR, App Router, API routes |
| **Styling** | Tailwind CSS | Utility-first CSS with design tokens |
| **Database** | Supabase (PostgreSQL) | Real-time database, auth ready |
| **State** | React Hooks | Client-side state management |
| **Testing** | Vitest + Playwright | Unit and E2E testing |
| **Hosting** | Vercel | Edge functions, cron jobs |

---

## Project Structure

```
sync-ai/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── layout.tsx          # Root layout with ServiceWorker
│   │   ├── page.tsx            # Home feed
│   │   ├── globals.css         # Tailwind + design tokens
│   │   ├── article/            # Article detail page
│   │   ├── saved/              # Saved articles
│   │   ├── settings/           # Source management
│   │   ├── admin/jobs/         # Job monitoring dashboard
│   │   └── api/                # API routes
│   │       ├── articles/       # GET/POST articles
│   │       ├── sources/        # CRUD sources
│   │       ├── refresh/        # Manual refresh trigger
│   │       ├── feedback/       # User feedback
│   │       ├── search/         # Full-text search
│   │       └── jobs/           # Cron handler
│   ├── components/
│   │   ├── feed/               # ArticleCard, ArticleFeed
│   │   ├── layout/             # Header, BottomNav, MainLayout
│   │   ├── sources/            # SourceList
│   │   ├── search/             # SearchModal
│   │   ├── filter/             # FilterBar
│   │   └── ServiceWorker.tsx   # Offline support
│   ├── hooks/
│   │   ├── useArticles.ts      # Article fetching + pagination
│   │   └── useFeedback.ts      # Optimistic feedback updates
│   ├── lib/
│   │   ├── sources/
│   │   │   ├── rss-parser.ts   # RSS/Atom parsing
│   │   │   ├── pipeline.ts     # Content ingestion pipeline
│   │   │   └── adapters/       # Source adapters
│   │   │       ├── arxiv.ts
│   │   │       ├── huggingface.ts
│   │   │       ├── google-ai.ts
│   │   │       └── ...
│   │   ├── supabase.ts         # Supabase client
│   │   └── utils.ts            # formatDistanceToNow, cn
│   ├── types/
│   │   └── database.ts         # TypeScript interfaces
│   └── tests/
│       ├── unit/               # Vitest unit tests
│       └── e2e/                # Playwright E2E tests
├── supabase/
│   └── migrations/               # Database migrations
│       ├── 001_sources.sql
│       ├── 002_articles.sql
│       ├── 003_refresh_jobs.sql
│       ├── 004_feedback.sql
│       └── 005_categories.sql
├── public/
│   └── sw.js                   # Service worker
├── .env.local.example          # Environment variables template
├── next.config.js              # Next.js config with PWA
├── tailwind.config.js          # Tailwind + design tokens
├── vitest.config.ts            # Vitest config
├── playwright.config.ts        # Playwright config
└── vercel.json                 # Vercel cron jobs
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account (for database)

### Installation

```bash
# Clone the repository
git clone https://github.com/Maxspartan/AI-News-Aggregator.git
cd AI-News-Aggregator/sync-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
CRON_SECRET=your_cron_secret
```

### Database Setup

1. Create a Supabase project
2. Run migrations in `/supabase/migrations/`:
   ```sql
   -- 001_sources.sql
   -- 002_articles.sql
   -- 003_refresh_jobs.sql
   -- 004_feedback.sql
   -- 005_categories.sql
   ```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Run Tests

```bash
# Unit tests
npm run test

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## API Documentation

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles?page=1&limit=10` | List articles with pagination |
| GET | `/api/articles/[id]` | Get single article with source |

### Sources

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sources` | List all sources |
| POST | `/api/sources` | Create new source |
| PATCH | `/api/sources/[id]` | Update source status |
| DELETE | `/api/sources/[id]` | Delete source |

### Refresh

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/refresh` | Trigger manual refresh |

### Feedback

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feedback` | Get user's feedback |
| POST | `/api/feedback` | Submit feedback (up/down/save) |

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search?q=query` | Full-text search |

---

## Database Schema

### sources
```sql
id: uuid (PK)
name: text
url: text
rss_url: text
api_endpoint: text
type: enum ('research', 'company', 'community', 'newsletter', 'social')
topics: text[]
quality_score: integer (0-100)
tier: enum ('S', 'A', 'B', 'C', 'D')
status: enum ('proposed', 'trial', 'active', 'paused', 'deprecated')
last_fetch_at: timestamptz
fetch_success_rate: integer (0-100)
total_articles_fetched: integer
avg_daily_articles: integer
duplicate_rate: integer (0-100)
```

### articles
```sql
id: uuid (PK)
source_id: uuid (FK)
title: text
url: text (unique)
author: text
published_at: timestamptz
fetched_at: timestamptz
summary: text
content: text
relevance_score: integer (0-100)
category: text
tags: text[]
read_time_minutes: integer
image_url: text
content_hash: text (for deduplication)
is_read: boolean
```

### user_feedback
```sql
id: uuid (PK)
article_id: uuid (FK)
feedback_type: enum ('up', 'down', 'skip', 'save')
created_at: timestamptz
```

### refresh_jobs
```sql
id: uuid (PK)
source_id: uuid (FK, nullable)
status: enum ('pending', 'running', 'completed', 'failed')
started_at: timestamptz
completed_at: timestamptz
articles_fetched: integer
articles_new: integer
articles_duplicate: integer
error_message: text
```

---

## Deployment

### Vercel (Recommended)

1. Connect GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

### Cron Configuration

`vercel.json`:
```json
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

## Development Phases

- ✅ **Phase 1**: MVP Core (Infrastructure, UI, Basic Ingestion)
- ✅ **Phase 2**: Content Pipeline (Expanded Sources, Feedback System, Article Detail)
- ✅ **Phase 3**: Search & Polish (Full-text Search, Filtering, Performance, Offline Support)
- ⏳ **Phase 4**: Multi-User (Auth, Profiles, Personalized Feeds) - Optional

---

## License

MIT

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ using Next.js, Tailwind CSS, and Supabase.
