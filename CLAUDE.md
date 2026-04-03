# CLAUDE.md - SyncAI (AI News Aggregator)

> **Project:** SyncAI - Personal AI News Aggregator
> **Reference:** [ideasv2.md](./ideasv2.md) for full specification and source details
> **Last Updated:** 2026-04-03

---

## 1. Project Overview

A personalized, mobile-first AI news aggregation platform that curates content from 100+ sources across research papers, company blogs, newsletters, social media, and video content.

### Core Principles
1. **Source Quality First** - Content quality determined by source curation
2. **Mobile-First** - Primary experience optimized for mobile reading
3. **Incremental Development** - Build in stages, validate at each checkpoint
4. **User Feedback Loop** - Thumbs up/down drives personalization
5. **Ethical Aggregation** - Respect sources, provide attribution, follow ToS

### Brand Identity
- **Name:** SyncAI
- **Domain:** Placeholder (user to purchase)
- **Logo:** Text-based initially

---

## 2. Tech Stack (Decided)

| Layer | Choice | Notes |
|-------|--------|-------|
| Frontend | Next.js 14 (App Router) | SSR, excellent DX, mobile-first |
| Styling | Tailwind CSS + CSS Variables | Design tokens, dark mode support |
| Database | Supabase (PostgreSQL) | Real-time + auth built-in |
| Hosting | Vercel | Native Next.js support, edge functions |

---

## 3. Design Direction: Bento/Modern

Linear-inspired, card-based aesthetic. Mobile-first with bottom navigation.

### Mobile Wireframes
```
┌─────────────────────────────┐
│  SyncAI    [Search] [☰]    │  ← Header
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐    │
│  │ [Source Icon]       │    │
│  │ Article Title       │    │  ← Article Card
│  │ Summary preview...  │    │
│  │ 3 min • Research    │    │
│  │              👍 👎  │    │
│  └─────────────────────┘    │
│                             │
│  [More cards...]            │
│                             │
├─────────────────────────────┤
│  [Home] [Saved] [⚙️]       │  ← Bottom Nav
└─────────────────────────────┘
```

### Core UI Components
- Header with logo, search, menu
- Article card with source, title, summary, meta, actions
- Bottom nav (mobile) / Sidebar (desktop)
- Loading skeletons, error states

---

## 4. Data Ingestion: Hybrid Strategy

```
┌─────────────────────────────────────────────┐
│  HYBRID FLOW                               │
├─────────────────────────────────────────────┤
│  Cron (4hr) ──→ Fetch all RSS sources     │
│                 ↓                           │
│  LLM Check (2hr) ──→ Embedding query       │
│                     Detect "new" content?   │
│                         ↓                   │
│  If new ──→ Fetch full content             │
│                 ↓                           │
│  Fallback ──→ Direct fetch (always runs)   │
└─────────────────────────────────────────────┘
```

| Trigger | Method | When |
|---------|--------|------|
| Scheduled poll | Cron job | Every 4-6 hours |
| LLM check | Light embedding query | Every 1-2 hours for Tier 1 |
| Manual | On-demand | User requests refresh |

---

## 5. Development Phases

> **IMPORTANT:** Do not proceed to next phase without user confirmation. Present options and ask for preferences.
> **Detailed task breakdown:** See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)

### Phase 0: Foundation (COMPLETE)
- [x] Tech stack selected
- [x] Design direction chosen
- [x] Brand identity finalized
- [x] Data ingestion strategy decided

---

### Phase 1: MVP Core (2-3 weeks)
**Goal:** Single user, 4-5 sources, basic feed display

**Tasks:**
1. Infrastructure: Next.js 14 + Supabase setup, migrations, API routes
2. UI: Layout shell, ArticleCard, ArticleFeed, Source Management
3. Ingestion: RSS parser, 4-5 source integrations, LLM relevance scoring, cron job
4. Testing: Unit tests (80%+), visual regression, accessibility audit

**Deliverables:** Working feed from 4-5 sources, daily auto-refresh

---

### Phase 2: Content Pipeline (2-3 weeks)
**Goal:** Daily auto-refresh reliable, 8-10 sources, feedback system

**Tasks:**
1. Expand sources to 8-10 (Anthropic, DeepMind, Meta, Reddit, etc.)
2. Source health monitoring, incremental refresh, retry logic
3. Content extraction for full article bodies
4. Feedback system: thumbs up/down, useFeedback hook, preference learning
5. Article detail page with share/bookmark

**Deliverables:** Robust pipeline, 8-10 sources, user feedback working

---

### Phase 3: Search & Polish (1-2 weeks)
**Goal:** Full-text search, filters, performance optimization

**Tasks:**
1. PostgreSQL full-text search with Command-K modal
2. Category system (Research, Product, Safety, News, Tutorial, Opinion)
3. Date range filtering, saved filters
4. Performance: image optimization, service worker, bundle <150KB
5. UI polish: skeletons, reduced motion, cross-browser testing

**Deliverables:** Fast search, rich filters, Lighthouse >90

---

### Phase 4: Multi-User (3-4 weeks) — Optional
**Decision Required:** Full multi-user, single-user only, or auth without social features?

**Tasks:** Supabase Auth, user profiles, per-user feeds, reading history, collections, email digest

---

## 6. Initial Sources (Phase 1)

**Tier 1 (choose 3-4):** arXiv, OpenAI Blog, Hugging Face Papers, Google AI Blog, Papers With Code
**Tier 2 (choose 1):** GitHub Trending AI, Import AI Newsletter

Full source list in [ideasv2.md](./ideasv2.md) Section 4.

---

## 7. Project Structure

```
sync-ai/
├── src/
│   ├── app/                    # Next.js 14 app router
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home/Feed
│   │   ├── feed/
│   │   ├── saved/
│   │   └── api/
│   ├── components/
│   │   ├── ui/                 # Button, Card, Input, Skeleton
│   │   ├── feed/               # ArticleCard, FeedList, SwipeableCard
│   │   └── layout/             # Header, BottomNav, Sidebar
│   ├── lib/
│   │   ├── sources/            # Source adapters (RSS, API, scrapers)
│   │   ├── jobs/               # Background job processing
│   │   ├── db.ts               # Supabase client
│   │   └── utils.ts
│   └── hooks/
│       ├── useArticles.ts
│       └── useFeedback.ts
├── supabase/migrations/         # Database migrations
├── tests/
│   ├── unit/
│   └── e2e/
├── .claude/
│   ├── agents/                 # frontend-reviewer, source-integrator
│   └── skills/                 # content-scraper, feed-personalization
├── CLAUDE.md
└── ideasv2.md                  # Full specification
```

---

## 8. Skills & Subagents

### Built-in Skills (Activate via /skill-name)
| Skill | When to Use |
|-------|-------------|
| `frontend-patterns` | React/Next.js component development |
| `e2e-testing` | Writing Playwright tests |
| `tdd-workflow` | Test-driven development |
| `api-design` | Backend API design |

### Custom Skills (in `.claude/skills/`)
- `content-scraper` - RSS/API/scraping patterns
- `source-curation` - Source quality evaluation
- `feed-personalization` - Ranking algorithm
- `mobile-ui` - Mobile-first patterns

### Subagents
| Agent | Purpose |
|-------|---------|
| `frontend-reviewer` | UI/UX code review |
| `source-integrator` | Content source integration |
| `performance-optimizer` | Core Web Vitals |

---

## 9. Commands

| Command | Purpose |
|---------|---------|
| `/plan [feature]` | Create implementation plan |
| `/tdd [feature]` | Test-driven development |
| `/review` | Code review |
| `/e2e` | Run E2E tests |

---

## 10. Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-03 | Tech stack: Next.js 14, Tailwind, Supabase, Vercel | Best fit for mobile-first SSR |
| 2026-04-03 | Design: Bento/Modern | Linear-inspired card-based UI |
| 2026-04-03 | Brand: SyncAI | User selected |
| 2026-04-03 | Data ingestion: Hybrid (Cron + LLM + Fallback) | Cost efficient + reliable |

---

## 11. Quick Start

For new sessions:
1. Review current phase in Section 5
2. Check Decision Log for pending decisions
3. Run `pnpm dev` to start local server
4. Run `pnpm test` to verify tests pass

**Before each phase:** Present options, get explicit approval.

---

*Document Version: 2.0 - Concise*
*Next Phase: Phase 1.1 - Infrastructure*
