# AI News Aggregator - Project Specification

> **Status:** Planning Phase  
> **Last Updated:** 2026-04-03

---

## 1. Vision & Overview

A personalized AI news aggregation platform that curates and tracks developments in artificial intelligence from multiple sources. Initially single-user, evolving into a multi-user service with personalization based on user feedback.

### Core Value Proposition
- One-stop destination for AI news across multiple platforms
- Self-improving curation through user feedback (thumbs up/down)
- Daily refreshed content with comprehensive coverage
- Modern, mobile-first reading experience

---

## 2. Feature Requirements

### Phase 1: MVP (Single User)
| Feature | Priority | Description |
|---------|----------|-------------|
| Content Aggregation | P0 | Fetch AI-related content from configured sources |
| Daily Refresh | P0 | Automated daily content update cycle |
| Modern UI | P0 | Clean, responsive, mobile-first design |
| Content Storage | P0 | Persist articles for historical access |
| Feedback System | P1 | Thumbs up/down on individual articles |
| Simple Categorization | P1 | Auto-tag content by topic (LLMs, Research, Tools, etc.) |

### Phase 2: Enhancement (Still Single User)
| Feature | Priority | Description |
|---------|----------|-------------|
| Search | P1 | Full-text search across all content |
| Filtering | P1 | Filter by source, date, category, sentiment |
| Reading List | P2 | Save articles for later |
| Export | P2 | Export articles (PDF, markdown, etc.) |
| Analytics Dashboard | P2 | Visualize reading patterns, top sources |

### Phase 3: Multi-User Platform
| Feature | Priority | Description |
|---------|----------|-------------|
| User Authentication | P0 | Sign up, login, password reset |
| User Profiles | P0 | Individual preferences and history |
| Personalized Feeds | P0 | Algorithmic ranking based on user feedback history |
| Sharing | P1 | Share articles with other users |
| Notifications | P1 | Email/push for breaking news or daily digest |
| Social Features | P2 | Comments, upvoting, following other users |

---

## 3. UI/UX Design Specification

### Design Philosophy
- **Mobile-first**: Primary experience optimized for mobile, enhanced for desktop
- **Content-first**: UI elements should never compete with content
- **Accessibility-first**: WCAG 2.1 AA compliance minimum
- **Performance-first**: Core Web Vitals targets must be met

### Visual Design Direction

#### Option A: Editorial/Minimalist (Recommended)
- Clean typography with strong hierarchy
- Ample whitespace
- Monochromatic palette with single accent color
- Inspired by: The New Yorker, Medium, Substack

#### Option B: Modern Tech/Bento
- Card-based layout (Bento box style)
- Subtle gradients and glassmorphism
- Dynamic layouts based on content importance
- Inspired by: Linear, Vercel, Raycast

#### Option C: Dark Luxury
- Deep backgrounds (#0a0a0f or similar)
- High contrast text
- Subtle glow effects
- Inspired by: Bloomberg Terminal, Spotify

### Core UI Components Required

```
┌─────────────────────────────────────────────────────────────┐
│  Header                                                     │
│  ├── Logo/Brand Name                                        │
│  ├── Search (expandable on mobile)                          │
│  ├── Filter/Category Pills                                  │
│  └── Settings/User Menu                                     │
├─────────────────────────────────────────────────────────────┤
│  News Feed                                                  │
│  ├── Article Card                                           │
│  │   ├── Source Icon + Name                                 │
│  │   ├── Title (truncated or wrapped)                       │
│  │   ├── Summary/Preview (2-3 lines)                        │
│  │   ├── Meta: Date • Reading Time • Category               │
│  │   └── Actions: 👍 👎 💾 (Save)                           │
│  └── Skeleton Loaders                                       │
├─────────────────────────────────────────────────────────────┤
│  Bottom Navigation (Mobile) / Sidebar (Desktop)             │
│  ├── Daily Feed (Home)                                      │
│  ├── Saved Articles                                         │
│  ├── Analytics (Phase 2)                                    │
│  └── Settings                                               │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
| Breakpoint | Width | Layout Notes |
|------------|-------|--------------|
| Mobile | 320-480px | Single column, bottom nav, condensed cards |
| Tablet | 481-768px | 2-column grid, hybrid navigation |
| Desktop | 769-1440px | 3-column grid (Bento), sidebar nav |
| Large | 1441px+ | Max-width container centered |

### Mobile-First Features
- **Swipe gestures**: Swipe right to save, left to dismiss
- **Pull-to-refresh**: Update feed with pull gesture
- **Bottom sheet**: Article details open in expandable sheet
- **Thumb-friendly**: All actions reachable in one-handed use
- **Reduced motion**: Respect `prefers-reduced-motion`

### Accessibility Requirements
- [ ] Semantic HTML (`<article>`, `<nav>`, `<header>`, `<main>`)
- [ ] ARIA labels for interactive elements
- [ ] Focus management for modals/sheets
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader announcements for dynamic content
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Touch targets ≥ 44x44px

### Animation & Motion
| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| Card entrance | Scroll into view | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Thumbs up/down | Click | 200ms | `ease-out` |
| Page transition | Navigation | 300ms | `ease-in-out` |
| Skeleton shimmer | Loading | 1.5s | `linear infinite` |
| Pull-to-refresh | Pull | Follow gesture | Spring physics |

### Core Web Vitals Targets
| Metric | Target | Notes |
|--------|--------|-------|
| LCP | < 2.5s | Hero image or first article |
| INP | < 200ms | Quick response to interactions |
| CLS | < 0.1 | No layout shifts during load |
| FCP | < 1.5s | First content paint |
| TBT | < 200ms | Minimal main thread blocking |

---

## 4. Content Sources (Exhaustive List)

### Category 1: Research & Academia (High Signal)
| Source | Type | Access Method | Update Freq |
|--------|------|---------------|-------------|
| **arXiv** (cs.AI, cs.CL, cs.LG, cs.CV, cs.RO) | Research Papers | RSS/API (arXiv API) | Daily |
| **Papers With Code** | Research + Code | RSS/API | Daily |
| **Semantic Scholar** | Research | API | Weekly |
| **Google Scholar Alerts** | Research | Email/RSS | As published |
| **ACL Anthology** | NLP Research | RSS/API | Weekly |
| **OpenReview** (ICLR, NeurIPS, etc.) | Conference Reviews | API | During conferences |
| **Distill.pub** | Interactive ML Articles | RSS | Monthly |
| **MIT News - AI** | University Research | RSS | Weekly |
| **Stanford HAI** | Research + Policy | RSS | Weekly |
| **Berkeley AI Research (BAIR)** | Research | RSS | Weekly |
| **CMU ML Blog** | Research | RSS | Monthly |
| **DeepMind Blog** | Research | RSS | Weekly |

### Category 2: AI Company Blogs (Official Sources)
| Source | Type | Access Method | Update Freq |
|--------|------|---------------|-------------|
| **OpenAI Blog/Newsroom** | Product + Research | RSS/API | Weekly |
| **Anthropic Blog/Research** | Research + Safety | RSS | Weekly |
| **Google AI Blog** | Research | RSS | Weekly |
| **Google DeepMind** | Research | RSS | Weekly |
| **Microsoft Research - AI** | Research | RSS | Weekly |
| **Meta AI Research (FAIR)** | Research | RSS | Weekly |
| **Amazon Science Blog** | Research | RSS | Weekly |
| **AI2 (Allen Institute)** | Research | RSS | Weekly |
| **Cohere Blog** | Product + Research | RSS | Monthly |
| **Mistral AI Blog** | Product + Research | RSS | Monthly |
| **Hugging Face Blog** | Community + Research | RSS/API | Weekly |
| **Stability AI Blog** | Product + Research | RSS | Monthly |
| **NVIDIA AI Blog** | Hardware + Research | RSS | Weekly |
| **Apple Machine Learning** | Research | RSS | Monthly |
| **Salesforce AI Research** | Research | RSS | Monthly |
| **Adobe Research** | Creative AI | RSS | Monthly |
| **Intel AI Blog** | Hardware + Research | RSS | Monthly |
| **IBM Research - AI** | Enterprise AI | RSS | Weekly |
| **Uber Engineering - AI** | Applied AI | RSS | Monthly |
| **Netflix Tech Blog - ML** | Applied ML | RSS | Monthly |

### Category 3: Community & Discussion (Medium Signal)
| Source | Type | Access Method | Update Freq |
|--------|------|---------------|-------------|
| **Reddit - r/MachineLearning** | Discussion | Reddit API (PRAW) | Continuous |
| **Reddit - r/LocalLLaMA** | Local LLMs | Reddit API | Continuous |
| **Reddit - r/artificial** | General AI | Reddit API | Continuous |
| **Reddit - r/OpenAI** | OpenAI | Reddit API | Continuous |
| **Reddit - r/ClaudeAI** | Anthropic | Reddit API | Continuous |
| **Reddit - r/StableDiffusion** | Image Gen | Reddit API | Continuous |
| **Reddit - r/computervision** | CV | Reddit API | Continuous |
| **Hacker News - AI tagged** | Tech Discussion | HN API (Algolia) | Continuous |
| **Lobsters - AI** | Tech Discussion | RSS/API | Daily |
| **Stack Overflow - AI/ML** | Q&A | Stack API | Daily |
| **Dev.to - AI tag** | Articles | RSS/API | Daily |

### Category 4: X/Twitter Accounts (Social - Manual Curation)
| Account Category | Examples | Notes |
|------------------|----------|-------|
| **Big Labs** | @OpenAI, @AnthropicAI, @DeepMind, @GoogleAI | Official announcements |
| **Researchers** | @ylecun, @karpathy, @AndrewYNg, @goodfellow_ian | Research insights |
| **Practitioners** | @bindureddy, @hardmaru, @ch402 | Applied AI |
| **News Curators** | @DrJimFan, @svpino, @emollick | Summaries and threads |
| **Tool Builders** | @bindureddy, @sharonzheng, @mreflow | Product launches |

### Category 5: Newsletters & Publications
| Source | Type | Access Method | Update Freq |
|--------|------|---------------|-------------|
| **Import AI (Jack Clark)** | Weekly Digest | Substack RSS | Weekly |
| **The Batch (DeepLearning.AI)** | Weekly News | Substack RSS | Weekly |
| **TLDR AI** | Daily Brief | Email/RSS | Daily |
| **The Neuron** | Daily Brief | Substack RSS | Daily |
| **AI Tidbits** | Weekly Roundup | Substack RSS | Weekly |
| **Last Week in AI** | Weekly Summary | Substack RSS | Weekly |
| **Synthetic Minds** | Analysis | Substack RSS | Weekly |
| **The Algorithm (MIT Tech Review)** | Analysis | RSS | Weekly |
| **Sebastian Raschka** | Technical | Substack RSS | Weekly |
| **Lilian Weng** | Technical | RSS | Monthly |
| **Chip Huyen** | MLOps | RSS | Monthly |
| **Eugene Yan** | Applied ML | RSS | Monthly |
| **Pete Warden** | Edge AI | RSS | Monthly |
| **Colah's Blog** | Technical Deep Dives | RSS | Quarterly |

### Category 6: Platforms & Aggregators
| Source | Type | Access Method | Update Freq |
|--------|------|---------------|-------------|
| **Hugging Face Papers** | Paper Aggregation | RSS/API | Daily |
| **Hugging Face Models (Trending)** | Model Releases | API | Continuous |
| **Hugging Face Spaces** | Demos | API | Daily |
| **GitHub Trending (Python + ML)** | Code | GitHub API | Daily |
| **GitHub Topics (transformers, pytorch)** | Code | GitHub API | Daily |
| **Pinecone Blog** | Vector DB | RSS | Weekly |
| **Weights & Biases Blog** | MLOps | RSS | Weekly |
| **Neptune.ai Blog** | MLOps | RSS | Weekly |
| **ClearML Blog** | MLOps | RSS | Weekly |
| **Gradio Blog** | Demos | RSS | Monthly |
| **LangChain Blog** | Framework | RSS | Weekly |
| **LlamaIndex Blog** | RAG/Agents | RSS | Weekly |
| **CrewAI Blog** | Agents | RSS | Monthly |
| **AutoGPT Blog** | Agents | RSS | Monthly |

### Category 7: Medium Publications
| Source | Type | Access Method | Update Freq |
|--------|------|---------------|-------------|
| **Towards Data Science** | General ML | RSS | Daily |
| **Better Programming - AI** | Applied | RSS | Daily |
| **The Gradient** | Research + Ethics | RSS | Weekly |
| **OneZero (AI stories)** | Culture/Impact | RSS | Weekly |
| **FreeCodeCamp - AI** | Tutorials | RSS | Daily |
| **ML in Practice** | Case Studies | RSS | Weekly |

### Category 8: YouTube Channels

#### Research & Paper Reviews
| Channel | Focus | Subscribers | Why Include |
|---------|-------|-------------|-------------|
| **Two Minute Papers** | Research summaries | 1.5M+ | Excellent for quick research updates |
| **Yannic Kilcher** | Paper deep-dives | 800K+ | Thorough technical analysis |
| **AI Explained** | Concepts explained | 300K+ | Accessible technical content |
| **Bycloud** | AI tools & news | 200K+ | Tool reviews and tutorials |
| **MattVidPro** | AI art/tools | 500K+ | Creative AI applications |
| **Sentdex** | Python + AI | 1M+ | Practical tutorials |
| **CodeEmporium** | ML concepts | 200K+ | Visual explanations |
| **Robert Miles** | AI Safety | 300K+ | Alignment and safety focus |
| **Computerphile** | CS/AI concepts | 2M+ | Academic perspective |
| **3Blue1Brown** | Math for ML | 5M+ | Mathematical foundations |

#### Industry & News
| Channel | Focus | Subscribers | Why Include |
|---------|-------|-------------|-------------|
| **Machine Learning Street Talk** | Discussions | 200K+ | Expert interviews |
| **AI Coffee Break** | Research news | 50K+ | Research community insights |
| **The AI Advantage** | Business AI | 100K+ | Enterprise applications |
| **Prompt Engineering** | LLM techniques | 200K+ | Practical prompting |
| **All About AI** | General AI news | 300K+ | Broad coverage |
| **Theoretically** | AI theory | 100K+ | Theoretical concepts |
| **AI Uncovered** | Weekly news | 150K+ | News aggregation |
| **Future of Life Institute** | AI Safety | 200K+ | Policy and safety |

#### Tutorials & Education
| Channel | Focus | Subscribers | Why Include |
|---------|-------|-------------|-------------|
| **DeepLearningAI** | Official courses | 300K+ | Andrew Ng's content |
| **Sentdex** | Python ML | 1M+ | Hands-on tutorials |
| **Krish Naik** | Data Science | 800K+ | Practical projects |
| **StatQuest with Josh Starmer** | Stats for ML | 1M+ | Statistical foundations |
| **Serrano.Academy** | LLMs explained | 200K+ | Visual LLM explanations |
| **Jeremy Howard (fast.ai)** | Practical DL | 100K+ | Fast.ai lectures |
| **Andrej Karpathy** | Technical deep-dives | 500K+ | Ex-Tesla/OpenAI engineer |
| **James Briggs (Pinecone)** | Vector DB/LLM | 50K+ | RAG and embeddings |

### Category 9: Podcasts

#### Technical Deep-Dives
| Podcast | Host(s) | Focus | Episode Freq |
|---------|---------|-------|--------------|
| **Latent Space** | Swyx, Alessio | AI Engineering | Weekly |
| **The TWIML AI Podcast** | Sam Charrington | Industry/Research | Weekly |
| **Practical AI** | Chris Benson, Daniel Whitenack | Applied AI | Weekly |
| **Machine Learning Street Talk** | Tim Scarfe et al. | Research discussions | Bi-weekly |
| **Gradient Dissent** | Lukas Biewald (W&B) | ML practitioners | Monthly |
| **The AI Podcast** | NVIDIA | Industry applications | Weekly |
| **TalkRL** | Robin Ranjit | Reinforcement Learning | Monthly |
| **Let's Talk AI** | Lex Fridman guests | Interviews | Irregular |

#### Research & Academia
| Podcast | Host(s) | Focus | Episode Freq |
|---------|---------|-------|--------------|
| **AI Alignment Podcast** | Lucas Perry | AI Safety/Alignment | Monthly |
| **The Inside View** | Arden Koehler | AI Research | Bi-weekly |
| **80,000 Hours Podcast** | Rob Wiblin | AI Safety careers | Monthly |
| **The Future of Life Institute Podcast** | FLI Team | Existential risk | Monthly |
| **AXRP** | Daniel Filan | Technical AI safety | Monthly |
| **The Cognitive Revolution** | Nathan Labenz | AI capabilities | Weekly |

#### Business & Industry
| Podcast | Host(s) | Focus | Episode Freq |
|---------|---------|-------|--------------|
| **No Priors** | Sarah Guo, Elad Gil | AI Startups | Weekly |
| **The AI Breakdown** | NLW | Daily AI news | Daily |
| **Eye on AI** | Craig Smith | Industry news | Weekly |
| **AI in Business** | Emerj | Enterprise AI | Weekly |
| **Voices in AI** | Byron Reese | Industry leaders | Weekly |
| **The AI Art Podcast** | Various | Creative AI | Monthly |

#### News & Commentary
| Podcast | Host(s) | Focus | Episode Freq |
|---------|---------|-------|--------------|
| **Hard Fork** | NYT | Tech/AI commentary | Weekly |
| **The Vergecast** | The Verge | Tech news (AI heavy) | Weekly |
| **Waveform** | David Imel | Tech culture | Weekly |
| **Command Line Heroes** | RedHat | Open source (AI tools) | Seasonal |

### YouTube/Podcast Content Strategy

#### Content Extraction Methods

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **YouTube RSS** | Free, official | Limited metadata | Channel subscriptions |
| **YouTube Data API** | Rich metadata, search | Rate limits (10k units/day) | Discovery, metadata |
| **YouTube Transcript API** | Full text content | Unofficial, may break | Content indexing |
| **Podcast RSS Feeds** | Standard format | Variable quality | Most podcasts |
| **Transcript Services** (Whisper) | Full text | Processing cost | High-value content |

#### Recommended Channels by User Interest

| User Interest | YouTube Channels | Podcasts |
|---------------|------------------|----------|
| **Research Focus** | Two Minute Papers, Yannic Kilcher, Robert Miles | Latent Space, TWIML |
| **Applied/Engineering** | Sentdex, Andrej Karpathy, James Briggs | Practical AI, Latent Space |
| **Business/Startup** | The AI Advantage, All About AI | No Priors, AI Breakdown |
| **Safety/Policy** | Future of Life, Robert Miles | AI Alignment, 80k Hours |
| **Creative AI** | MattVidPro, Bycloud | AI Art Podcast |

#### Integration Priority

| Tier | Channels/Podcasts | Priority |
|------|---------------------|----------|
| **Tier 1** | Two Minute Papers, Yannic Kilcher, Latent Space, TWIML | Phase 2 |
| **Tier 2** | AI Explained, Machine Learning Street Talk, Practical AI | Phase 3 |
| **Tier 3** | All others | Phase 4+ |

### Category 10: Academic Conferences (Proceedings & News)
| Conference | Type | Tracking Method |
|------------|------|-----------------|
| **NeurIPS** | General ML | Website RSS, accepted papers |
| **ICML** | General ML | Website RSS, accepted papers |
| **ICLR** | Representation Learning | Website RSS, accepted papers |
| **ACL** | NLP | Website RSS, accepted papers |
| **EMNLP** | NLP | Website RSS, accepted papers |
| **CVPR** | Computer Vision | Website RSS, accepted papers |
| **ICCV** | Computer Vision | Website RSS, accepted papers |
| **ECCV** | Computer Vision | Website RSS, accepted papers |
| **AAAI** | General AI | Website RSS, accepted papers |
| **IJCAI** | General AI | Website RSS, accepted papers |
| **CoRL** | Robotics | Website RSS, accepted papers |
| **RSS** | Robotics | Website RSS, accepted papers |
| **SIGIR** | Information Retrieval | Website RSS, accepted papers |
| **KDD** | Data Mining | Website RSS, accepted papers |
| **WSDM** | Web Search | Website RSS, accepted papers |

### Category 11: Industry & Business
| Source | Type | Access Method | Update Freq |
|--------|------|---------------|-------------|
| **TechCrunch - AI** | News | RSS | Daily |
| **VentureBeat - AI** | News | RSS | Daily |
| **Wired - AI** | Analysis | RSS | Weekly |
| **The Verge - AI** | News | RSS | Daily |
| **Ars Technica - AI** | Technical | RSS | Daily |
| **IEEE Spectrum - AI** | Technical | RSS | Weekly |
| **Nature - AI** | Research | RSS | Weekly |
| **Science - AI** | Research | RSS | Weekly |
| **AI Journal (Nature)** | Research | RSS | Weekly |
| **CB Insights - AI** | Market Intel | RSS | Weekly |
| **PitchBook - AI** | Funding | RSS | Weekly |
| **Gartner AI Research** | Enterprise | RSS | Monthly |
| **McKinsey - AI** | Strategy | RSS | Monthly |
| **Forrester - AI** | Enterprise | RSS | Monthly |

### Category 12: Government & Policy
| Source | Type | Access Method | Update Freq |
|--------|------|---------------|-------------|
| **AI.gov (US)** | Policy | RSS | Monthly |
| **NIST AI** | Standards | RSS | Monthly |
| **European AI Act News** | Regulation | RSS | Monthly |
| **Partnership on AI** | Ethics | RSS | Monthly |
| **Future of Humanity Institute** | Safety | RSS | Monthly |
| **MIRI** | Safety | RSS | Monthly |
| **Anthropic - Responsible Scaling** | Safety | RSS | Monthly |
| **Center for AI Safety** | Safety | RSS | Monthly |
| **OpenAI - Preparedness** | Safety | RSS | Monthly |

### Category 13: Education & Courses
| Source | Type | Access Method | Update Freq |
|--------|------|---------------|-------------|
| **DeepLearning.AI** | Courses | RSS | Monthly |
| **Fast.ai** | Courses + Research | RSS | Monthly |
| **CS231n (Stanford)** | Course Updates | RSS | Quarterly |
| **CS224n (Stanford)** | Course Updates | RSS | Quarterly |
| **Full Stack Deep Learning** | Course | RSS | Quarterly |
| **Made With ML** | Tutorials | RSS | Monthly |

### Priority Implementation Order

#### Phase 1: Must Have (Immediate)
1. arXiv (cs.AI, cs.CL, cs.LG) - API available
2. OpenAI Blog - RSS
3. Anthropic Blog - RSS
4. Google AI Blog - RSS
5. Hugging Face Papers - API
6. Papers With Code - RSS
7. GitHub Trending AI repos - API
8. Import AI Newsletter - Substack RSS

#### Phase 2: High Value (Month 2-3)
9. Reddit r/MachineLearning - PRAW API
10. DeepMind Blog - RSS
11. Meta AI Research - RSS
12. Distill.pub - RSS
13. Towards Data Science - Medium RSS
14. The Neuron Newsletter - RSS
15. AI Tidbits - RSS

#### Phase 3: Expansion (Month 4+)
16. X/Twitter lists (curated) - API v2
17. Video channels (Two Minute Papers, etc.) - YouTube RSS
18. Conference proceedings - RSS
19. Company blogs (Cohere, Mistral, etc.) - RSS
20. Podcast transcripts - RSS
21. Academic institutions (Stanford, MIT, etc.) - RSS

#### Phase 4: Specialized (Future)
22. Policy/Safety sources - RSS
23. Industry news (TechCrunch, VentureBeat) - RSS
24. MLOps platforms (W&B, etc.) - RSS
25. Framework blogs (LangChain, LlamaIndex) - RSS

### Content Quality Tiers

| Tier | Sources | Strategy |
|------|---------|----------|
| **S-Tier** | arXiv, Papers With Code, Official Research Blogs | Full indexing, high priority |
| **A-Tier** | Curated newsletters, Top company blogs | Daily fetch, featured |
| **B-Tier** | Community discussions, Tutorials | Fetch regularly, lower priority |
| **C-Tier** | News sites, General tech | Optional, lower frequency |

### Rate Limiting Considerations

| Source | Rate Limit | Strategy |
|--------|------------|----------|
| arXiv API | ~3000 requests/day | Batch overnight |
| Reddit API | 60 requests/min | Queue + backoff |
| GitHub API | 5000 requests/hour (authenticated) | Token rotation |
| X API v2 | 100 requests/15 min (Basic) | Minimal, manual curation |
| Hugging Face | Generous | Standard polling |

---

## 5. Source Management System

> **Core Principle:** The quality of the aggregator is determined by the quality of its sources. Every source must be evaluated, monitored, and continuously assessed.

### 5.1 Source Evaluation Framework

#### Scoring Criteria (100-point scale)

| Criterion | Weight | Description | Measurement |
|-----------|--------|-------------|-------------|
| **Signal-to-Noise Ratio** | 30% | Relevant content vs fluff | Manual review + user feedback |
| **Update Frequency** | 15% | How often new content appears | Automated tracking |
| **Authority** | 20% | Source credibility in AI community | Citation count, author expertise |
| **Timeliness** | 15% | Speed of coverage | Time from event to publication |
| **Content Depth** | 10% | Analysis vs surface-level | Reading time, user engagement |
| **Uniqueness** | 10% | Novel information vs rehashed | Duplicate detection across sources |

#### Source Quality Tiers

| Tier | Score | Description | Action |
|------|-------|-------------|--------|
| **Tier S** | 90-100 | Essential, high-signal sources | Feature prominently, daily fetch |
| **Tier A** | 75-89 | Reliable, good quality | Regular fetch, standard display |
| **Tier B** | 60-74 | Moderate value | Lower priority, weekly digest |
| **Tier C** | 40-59 | Occasional gems | Monthly review, conditional |
| **Tier D** | <40 | Low signal, high noise | Remove or archive |

### 5.2 Source Lifecycle Management

```
New Source → Evaluation → Trial Period → Integration → Monitoring → Review
                ↓              ↓              ↓             ↓
            7-day test    30 days        Production   Quarterly
            Manual review  Auto-fetch      Full fetch   Re-scoring
```

#### Phase 1: Source Proposal
- **Who can propose:** System admin (Phase 1), Curated users (Phase 3+)
- **Proposal data:** Name, URL, RSS/API endpoint, category, proposer rationale
- **Required fields:** Source type, expected update frequency, sample content

#### Phase 2: Evaluation Period (7 days)
- Fetch last 10 articles automatically
- Manual review of sample content
- Check for technical feasibility (RSS/API working)
- Check for content overlap with existing sources
- Assign initial quality score (estimated)

#### Phase 3: Trial Period (30 days)
- Daily automated fetching
- Track metrics: fetch success rate, content volume, duplicate rate
- User feedback collection on articles from this source
- Weekly quality score calculation

#### Phase 4: Full Integration
- Promote to production feed if score > 60
- Add to appropriate categories
- Set fetch frequency based on tier
- Document in source registry

#### Phase 5: Continuous Monitoring
- **Weekly metrics:** Fetch success rate, content volume, user engagement
- **Monthly metrics:** Quality score recalculation, duplicate analysis
- **Quarterly review:** Full re-evaluation, potential demotion/removal

### 5.3 Duplicate Detection System

#### Levels of Deduplication

| Level | Method | Example |
|-------|--------|---------|
| **Exact Match** | URL hash, content hash | Same article shared on multiple platforms |
| **Semantic Match** | TF-IDF, embeddings similarity | Same research paper, different summaries |
| **Story Cluster** | Entity extraction, topic modeling | Multiple articles on same news event |

#### Implementation

```python
# Deduplication Pipeline
Article → URL Normalization → Content Hash → Semantic Embeddings
                                     ↓              ↓
                              Exact Match    Similarity Score
                                     ↓              ↓
                              Cluster Group → Deduplication Decision
```

| Match Type | Action | Display |
|------------|--------|---------|
| **Exact** (URL) | Skip, log duplicate | Not shown |
| **High Similarity** (>0.95) | Mark as duplicate | Show best version only |
| **Medium Similarity** (0.8-0.95) | Cluster together | "Also covered by..." |
| **Low Similarity** (<0.8) | Treat as unique | Normal display |

### 5.4 Source Health Monitoring

#### Metrics Dashboard

| Metric | Warning Threshold | Critical Threshold | Action |
|--------|-------------------|---------------------|--------|
| **Fetch Success Rate** | <90% | <70% | Investigate, alert |
| **Content Volume Change** | -30% vs avg | -50% vs avg | Review source health |
| **User Engagement** | <50% of avg | <25% of avg | Consider demotion |
| **Duplicate Rate** | >20% | >40% | Review content quality |
| **Avg Quality Score** | <65 | <50 | Flag for review |

#### Alert System

```
┌─────────────────────────────────────────────────────────────┐
│  Source Health Alerts                                       │
├─────────────────────────────────────────────────────────────┤
│  🔴 CRITICAL: OpenAI Blog unreachable for 3 days           │
│  🟡 WARNING: arXiv fetch success rate dropped to 85%        │
│  🟡 WARNING: Reddit r/ML content volume down 40%              │
│  ℹ️ INFO: Hugging Face added 2 new models today            │
└─────────────────────────────────────────────────────────────┘
```

### 5.5 Content Quality Assessment

#### Automated Quality Signals

| Signal | Weight | Detection Method |
|--------|--------|------------------|
| **Reading Time** | 15% | Content length / avg reading speed |
| **Language Quality** | 20% | Grammar check, profanity filter |
| **Technical Depth** | 20% | Keyword density, code snippets |
| **Source Reputation** | 25% | Pre-calculated source score |
| **User Engagement** | 20% | Click-through, time on page |

#### Content Quality Score (per article)

| Score | Quality | Action |
|-------|---------|--------|
| 90-100 | Excellent | Feature prominently |
| 75-89 | Good | Standard display |
| 60-74 | Average | Lower in feed |
| 40-59 | Below average | Filter to "All" tab only |
| <40 | Poor | Archive, don't display |

### 5.6 Source Registry Schema

```typescript
interface Source {
  id: string                    // Unique identifier
  name: string                  // Display name
  url: string                   // Homepage
  rssUrl?: string               // RSS feed
  apiEndpoint?: string          // API endpoint
  apiKeyEnv?: string            // Environment variable for key
  
  // Categorization
  type: 'research' | 'company' | 'community' | 'newsletter' | 'social'
  topics: string[]              // ['llm', 'vision', 'robotics']
  
  // Quality tracking
  qualityScore: number          // 0-100
  tier: 'S' | 'A' | 'B' | 'C' | 'D'
  
  // Lifecycle
  status: 'proposed' | 'trial' | 'active' | 'paused' | 'deprecated'
  addedAt: Date
  lastEvaluatedAt: Date
  
  // Fetch configuration
  fetchFrequency: 'hourly' | '6hourly' | 'daily' | 'weekly'
  lastFetchAt?: Date
  lastSuccessfulFetchAt?: Date
  fetchSuccessRate: number      // 0-100
  
  // Content metrics
  totalArticlesFetched: number
  avgDailyArticles: number
  duplicateRate: number         // 0-100
  
  // User feedback
  userThumbsUp: number
  userThumbsDown: number
  userSkip: number
}
```

### 5.7 Curator Dashboard Features

#### For Phase 1 (Admin Only)
- [ ] Source proposal form
- [ ] Source list with quality scores
- [ ] Individual source detail page (metrics history)
- [ ] Manual source tier adjustment
- [ ] Duplicate article review queue
- [ ] Source health alerts

#### For Phase 3 (User Community)
- [ ] Suggest new source form
- [ ] Report low-quality source
- [ ] Vote on proposed sources
- [ ] Source contribution leaderboard

### 5.8 Source Curation Workflow

#### Weekly Tasks (Automated + Manual)
1. **Review fetch logs** - Check failed fetches
2. **Analyze new duplicates** - Review clustering decisions
3. **Update quality scores** - Recalculate based on 7-day window
4. **Check source health** - Identify declining sources

#### Monthly Tasks
1. **Re-evaluate Tier B/C sources** - Promote or demote
2. **Review user feedback** - Check thumbs down patterns by source
3. **Analyze content overlap** - Merge or remove redundant sources
4. **Update fetch frequencies** - Adjust based on source activity

#### Quarterly Tasks
1. **Full source audit** - Review all sources end-to-end
2. **Add new high-value sources** - Based on community trends
3. **Remove deprecated sources** - Clean up inactive/unreliable
4. **Update scoring weights** - Refine based on data

### 5.9 Source Blacklist Rules

Auto-exclude content matching:
- [ ] Paywall content (detect paywall indicators)
- [ ] Non-English content (unless explicitly allowed)
- [ ] Spam/scam content (detect patterns)
- [ ] Off-topic content (ML classifier)
- [ ] Duplicate content (>95% similarity)
- [ ] Very short content (<100 words)
- [ ] All-caps headlines (spam indicator)

### 5.10 Source Recommendation Engine

Suggest new sources based on:
1. **User reading patterns** - "Users who read X also follow Y"
2. **Citation analysis** - Sources cited by current Tier S sources
3. **Trending in community** - New blogs gaining traction
4. **Researcher migrations** - Authors moving to new platforms
5. **Conference appearances** - New publications at top conferences

### 5.11 Source Editing & Management System

> **Purpose:** Sources become stale, change focus, or shut down. The system needs comprehensive CRUD operations for source lifecycle management.

#### Source Edit Operations

| Operation | Who Can | Impact | Requires Review |
|-----------|---------|--------|-----------------|
| **Create/Propose** | Admin (P1), Curators (P3) | New source added | Yes (trial period) |
| **Edit Metadata** | Admin | Name, URL, category changes | No |
| **Update Tier** | Admin (auto), System | Quality reclassification | Auto or Manual |
| **Pause** | Admin | Temporary stop fetching | No |
| **Resume** | Admin | Reactivate paused source | No |
| **Deprecate** | Admin | Mark as obsolete | Yes (archive review) |
| **Delete** | Admin | Permanent removal | Yes (7-day grace) |

#### Source Edit Interface (Admin Dashboard)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Source: "OpenAI Blog"                                 [Edit] [⚙️] │
├─────────────────────────────────────────────────────────────────────┤
│  BASIC INFO                                          STATUS: Active  │
│  ├─ Name:           [OpenAI Blog                          ]       │
│  ├─ Homepage URL:   [https://openai.com/blog               ]       │
│  ├─ RSS Feed URL:   [https://openai.com/blog/rss.xml       ]       │
│  ├─ Category:       [Company Blog ▼]                              │
│  └─ Topics:         [LLM, GPT, Research, Safety]                    │
│                                                                    │
│  FETCH CONFIGURATION                                               │
│  ├─ Frequency:      [Daily ▼] (Hourly/6-hourly/Daily/Weekly)       │
│  ├─ Priority:       [High ▼] (Critical/High/Medium/Low)            │
│  ├─ Max Articles:   [10 ▼] per fetch                               │
│  └─ Fetch Timeout:  [30 ▼] seconds                                 │
│                                                                    │
│  QUALITY SETTINGS                                                  │
│  ├─ Current Tier:   S (90/100)                                     │
│  ├─ Override Tier:  [Auto ▼] (Auto/S/A/B/C/D)                      │
│  ├─ Min Quality:    [75 ▼] (articles below this filtered)          │
│  └─ Require Images: [Yes ▼] (filter articles without images)        │
│                                                                    │
│  ADVANCED                                                          │
│  ├─ Custom Parser:  [None ▼] (use custom parsing rules)             │
│  ├─ Headers:        [{"User-Agent": "..."}]                        │
│  ├─ Rate Limit:     [1 ▼] request per [10 ▼] seconds                │
│  └─ Retry Policy:   [3 ▼] retries with [Exponential ▼] backoff      │
│                                                                    │
│                        [💾 Save] [⏸️ Pause] [🗑️ Deprecate]        │
└─────────────────────────────────────────────────────────────────────┘
```

#### Source Deprecation Workflow

When a source becomes irrelevant or shuts down:

```
Detected Issue → Review Queue → Decision → Action → Monitoring
      ↓              ↓            ↓         ↓          ↓
   Auto-flag    7-day review   Deprecate  Redirect   30-day
   or Manual    by admin        or Pause   articles   check
```

| Deprecation Reason | Detection Method | Action |
|-------------------|------------------|---------|
| **Source shut down** | 404 errors for 7 days | Auto-pause, notify admin |
| **Content drift** | Quality score <40 for 30 days | Flag for review |
| **Duplicate coverage** | >80% overlap with other source | Suggest merge |
| **Paywall added** | Paywall detection increased | Lower tier |
| **Topic shift** | AI content <20% of articles | Re-categorize or deprecate |
| **Request by source owner** | Email/DMCA | Immediate removal |

#### Bulk Source Operations

| Operation | Use Case | Safety Checks |
|-----------|----------|---------------|
| **Bulk tier update** | Seasonal source re-evaluation | Preview changes before apply |
| **Bulk pause** | System maintenance | Warning if >20% sources affected |
| **Bulk category change** | Taxonomy updates | Preserve article history |
| **Export source list** | Backup/migration | JSON/CSV format |
| **Import sources** | New system setup | Validate before import |

#### Source Change History

Track all modifications for accountability:

```typescript
interface SourceChangeLog {
  id: string
  sourceId: string
  changedBy: string          // User ID
  changedAt: Date
  changeType: 'create' | 'edit' | 'pause' | 'resume' | 'deprecate' | 'delete'
  fieldChanged?: string      // e.g., "tier", "rssUrl"
  oldValue?: any
  newValue?: any
  reason?: string            // Why the change was made
  requiresRollback: boolean  // Can this be undone?
}
```

#### Source Relevance Monitoring

Automatic signals that a source may need editing:

| Signal | Threshold | Action |
|--------|-----------|--------|
| **Fetch failure rate** | >20% over 7 days | Auto-pause, notify admin |
| **Content volume drop** | -50% vs historical avg | Flag for review |
| **Topic drift** | AI content <30% | Suggest re-categorization |
| **User engagement drop** | -40% click-through | Suggest tier downgrade |
| **Duplicate increase** | >30% duplicates | Check parser configuration |
| **SSL cert expired** | Certificate invalid | Pause, notify admin |

#### Source Admin Workflows

**Weekly Source Review (15 min)**
1. Review auto-paused sources
2. Check fetch failure alerts
3. Approve/reject proposed sources
4. Quick scan of quality score changes

**Monthly Source Audit (1 hour)**
1. Review all Tier C/D sources
2. Check for deprecated source cleanup
3. Analyze topic drift across sources
4. Update fetch frequencies based on activity

**Quarterly Source Strategy (2 hours)**
1. Full quality re-evaluation
2. Source gap analysis (what topics are missing?)
3. New source research and proposals
4. Competitive analysis (what do other aggregators cover?)

### 5.12 Content Acquisition Strategy

> **Philosophy:** Respect source owners while maximizing content coverage. Prefer official APIs and RSS feeds over scraping. Always provide attribution and links back to original content.

#### Acquisition Methods Hierarchy

| Priority | Method | Reliability | Effort | When to Use |
|----------|--------|-------------|--------|-------------|
| **1** | Official API | High | Low | Available and documented |
| **2** | RSS/Atom Feed | High | Low | Standard feed provided |
| **3** | JSON Feed | High | Low | Modern alternative to RSS |
| **4** | Structured Scraping | Medium | Medium | No API/feed available |
| **5** | Manual Curation | Low | High | Essential but unscrapable |
| **6** | Community Submission | Variable | Low | User-contributed content |

#### Method 1: Official APIs (Preferred)

**Configuration Pattern:**
```typescript
interface ApiSourceConfig {
  name: string
  apiEndpoint: string
  authType: 'apiKey' | 'oauth2' | 'bearer' | 'none'
  apiKeyEnv: string              // Environment variable name
  rateLimit: {
    requests: number
    window: 'second' | 'minute' | 'hour' | 'day'
  }
  pagination: 'offset' | 'cursor' | 'token'
  dateField: string              // Field for published date
  contentField: string           // Field for article content
  mapping: {                     // Map API response to Article schema
    title: string
    url: string
    author: string
    publishedAt: string
    summary: string
    tags: string
  }
}

// Example: arXiv API
const arxivConfig: ApiSourceConfig = {
  name: 'arXiv',
  apiEndpoint: 'http://export.arxiv.org/api/query',
  authType: 'none',
  rateLimit: { requests: 1, window: '3second' },  // Actually 1 per 3 sec
  pagination: 'offset',
  dateField: 'published',
  mapping: {
    title: 'title',
    url: 'id',
    author: 'authors.author.name',
    publishedAt: 'published',
    summary: 'summary',
    tags: 'categories.category.term'
  }
}
```

**API Source Registry:**
| Source | API Type | Auth | Rate Limit | Documentation |
|--------|----------|------|------------|-----------------|
| arXiv | REST | None | 1/3 sec | export.arxiv.org |
| Reddit | REST | OAuth | 60/min | reddit.com/dev |
| GitHub | GraphQL+REST | Token | 5000/hr | docs.github.com |
| Hugging Face | REST | Token | Generous | huggingface.co/docs |
| YouTube | REST | API Key | 10k units/day | developers.google.com |
| X/Twitter | REST v2 | OAuth2 | 100/15 min | developer.twitter.com |
| NewsAPI | REST | Key | 100/day (free) | newsapi.org |

#### Method 2: RSS/Atom Feeds

**Feed Discovery:**
```
Website → Check <link rel="alternate" type="application/rss+xml"> 
        → Try common paths: /feed, /rss.xml, /atom.xml, /feed.xml
        → Check /robots.txt for sitemap/rss hints
        → Validate feed format with feed parser
```

**Feed Quality Assessment:**
| Quality | Criteria | Action |
|---------|----------|--------|
| **High** | Full content, images, categories, author | Direct ingestion |
| **Medium** | Summary only, good metadata | Fetch full page for content |
| **Low** | Title-only, minimal metadata | Low priority, may deprecate |

**Feed Auto-Discovery Tools:**
- `rss-discovery` - Find RSS feeds from URLs
- `feedparser` - Validate and parse feeds
- `feed-merge` - Combine multiple feeds

#### Method 3: Structured Scraping (When API/RSS Unavailable)

**Ethical Scraping Guidelines:**
1. **Respect robots.txt** - Check and obey crawl rules
2. **Rate limiting** - Max 1 request per 5 seconds per domain
3. **User agent** - Identify your bot clearly
4. **No hotlinking** - Cache images, don't direct-link
5. **Attribution** - Always link back to original source
6. **Cache aggressively** - Don't fetch same content repeatedly

**Scraping Strategy by Source Type:**

| Source Type | Approach | Tools |
|-------------|----------|-------|
| **Static blogs** | Cheerio + axios | Server-side HTML parsing |
| **SPA/React sites** | Playwright | Headless browser rendering |
| **Medium/Substack** | RSS first, scrape fallback | feedparser + playwright |
| **LinkedIn** | Manual curation | Scraping violates ToS |
| **News sites** | RSS/API preferred | Scrape as last resort |

**Scraping Configuration:**
```typescript
interface ScrapingConfig {
  name: string
  url: string
  selectors: {
    articleContainer: string      // e.g., "article.post"
    title: string                 // e.g., "h1.post-title"
    content: string               // e.g., ".post-content"
    author: string                // e.g., ".author-name"
    date: string                 // e.g., "time[datetime]"
    tags: string                 // e.g., ".post-tags a"
    image: string                // e.g., ".featured-image img"
  }
  dateFormat: string              // e.g., "YYYY-MM-DD"
  infiniteScroll: boolean        // Need to scroll for more content?
  antiBot: boolean               // Requires stealth mode?
  respectRobotsTxt: boolean      // Always true
  crawlDelay: number             // Seconds between requests
}
```

#### Method 4: Manual Curation (Fallback)

When automated fetching isn't possible or appropriate:

| Scenario | Manual Process | Frequency |
|----------|----------------|-----------|
| **LinkedIn posts** | Curator reviews, manually adds link | Daily |
| **X/Twitter threads** | Curator flags valuable threads | Real-time |
| **Email newsletters** | Forward to parser email address | As received |
| **Conference proceedings** | Bulk import after conference | Quarterly |
| **Book releases** | Curator adds new AI books | Monthly |

**Manual Curation Interface:**
```
┌────────────────────────────────────────────────────────────────┐
│  Manual Article Entry                                          │
├────────────────────────────────────────────────────────────────┤
│  URL:     [https://...                             ] [Fetch]  │
│  Title:   [Auto-populated from meta tags...        ]           │
│  Source:  [Select Source ▼] or [+ Add New Source]              │
│  Author:  [Auto-populated or manual...             ]           │
│  Date:    [Auto-populated or manual...             ]           │
│  Summary: [Auto-generated or manual...               ]        │
│  Tags:    [LLM, Research, Safety] + [Add tag]                    │
│  Quality: [Auto-score: 85 ▼]                                   │
│                                                                │
│  [💾 Save to Review Queue]  [✓ Approve & Publish]             │
└────────────────────────────────────────────────────────────────┘
```

#### Method 5: Community Submission (Phase 3)

**User-Generated Content Workflow:**
```
User Submits Link → Spam Check → Duplicate Check → Review Queue 
                                                         ↓
      Published ← Admin Approval ← Quality Score ← NLP Analysis
```

**Submission Form Fields:**
- URL (required)
- Why this is relevant (optional, helps curation)
- Suggested tags (optional)
- User's own rating (thumbs up/down)

**Anti-Spam Measures:**
- Rate limit: 5 submissions per user per day
- Domain blacklist check
- URL reputation check (Google Safe Browsing)
- Duplicate detection before submission
- Reputation system for submitters

#### Content Attribution Requirements

**Every article must include:**
1. **Source name** - e.g., "OpenAI Blog"
2. **Original URL** - Link to full article
3. **Author name** - When available
4. **Publication date** - Original publish date
5. **Fetch date** - When we indexed it

**Attribution Display:**
```
┌────────────────────────────────────────────────────────────────┐
│  [OpenAI Logo] OpenAI Blog                                     │
│  GPT-4 Turbo: What's New in the Latest Release                 │
│  By [Author Name] • Published Oct 15, 2024 • Indexed just now │
│                                                                │
│  [Summary content...]                                          │
│                                                                │
│  [Read full article →] [Share] [👍] [👎] [💾]                  │
└────────────────────────────────────────────────────────────────┘
```

#### Content Licensing & Fair Use

| Content Type | Approach | Notes |
|--------------|----------|-------|
| **Public research** | Full indexing | arXiv, open access journals |
| **Blog posts** | Summary + link | Fair use, attribution |
| **News articles** | Summary + link | Don't reproduce full content |
| **Paywalled content** | Title only + link | Respect paywalls |
| **Video content** | Transcript + link | YouTube terms compliance |
| **Podcasts** | Show notes + link | Don't auto-transcribe |

#### Fallback Strategy by Source

| Source | Primary | Fallback | Last Resort |
|--------|---------|----------|-------------|
| **arXiv** | API | RSS | N/A |
| **OpenAI Blog** | RSS | Scrape | Manual |
| **Reddit** | API | RSS | N/A |
| **GitHub** | API | N/A | N/A |
| **YouTube** | RSS | API | N/A |
| **X/Twitter** | API | N/A | Manual curation |
| **LinkedIn** | Manual | N/A | N/A |
| **Newsletters** | Email parser | Manual | N/A |

---

## 6. Personalization & Feedback System

### Feedback Mechanism
```
Article Card
├── Thumbs Up   → Increase weight for similar content
├── Thumbs Down → Decrease weight for similar content
└── Skip        → Neutral signal, reduce frequency slightly
```

### Signals for Personalization
1. **Explicit:** Thumbs up/down clicks
2. **Implicit:** Click-through rate, time spent reading, scroll depth
3. **Content Features:** Source, keywords, author, publication date
4. **Temporal:** Recency bias, trending topics

### Algorithm Approach (Phase 3)
- Content-based filtering (TF-IDF, embeddings similarity)
- Collaborative filtering (when multi-user)
- Hybrid approach combining both

---

## 7. Technical Architecture

### Data Flow
```
Sources → Fetcher → Parser → Classifier → Database → API → Frontend
            ↓           ↓           ↓
        Scheduler   NLP/ML    Thumbs Feedback
```

### Tech Stack Options
| Layer | Options | Notes |
|-------|---------|-------|
| Frontend | Next.js 14+ (App Router) / React 18+ | Server components for SEO |
| Styling | Tailwind CSS + CSS Variables | Design tokens, dark mode |
| Animation | Framer Motion | Gesture support, AnimatePresence |
| State | Zustand / React Query | Client state + server cache |
| Backend | Next.js API Routes / Python FastAPI | Start with Next.js, migrate if needed |
| Database | PostgreSQL (Supabase) | Relational data, JSONB for flexibility |
| Queue | BullMQ (Redis) / Inngest | Background job processing |
| Scraping | Playwright + Cheerio | Hybrid approach |
| ML/NLP | Hugging Face Transformers | Classification, embeddings |
| Hosting | Vercel + Supabase | Start here, scale as needed |

### Data Model (Simplified)
```
Article
├── id, title, url, source, author
├── content (full text or summary)
├── published_at, fetched_at
├── category (ML tag or manual)
└── sentiment_score

Feedback (Phase 1: local file / Phase 3: DB table)
├── article_id
├── feedback_type (up/down/skip)
├── timestamp
└── user_id (Phase 3)
```

---

## 8. Skills & Subagents Configuration

Based on **everything-claude-code** best practices, the following skills and subagents should be configured:

### Recommended Skills (Built-in)

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| `frontend-patterns` | React/Next.js patterns, hooks, state management | Component development |
| `e2e-testing` | Playwright E2E test patterns | Critical user flows |
| `tdd-workflow` | Test-driven development methodology | Feature implementation |
| `api-design` | REST/GraphQL API best practices | Backend endpoints |
| `nextjs-turbopack` | Next.js 14+ app router patterns | Project setup |

### Custom Skills to Create

#### Skill: `content-scraper`
**Purpose:** Patterns for scraping AI news sources ethically and reliably

**Sections:**
- Source-specific selectors and rate limits
- Retry and backoff strategies
- Content deduplication
- Robots.txt compliance

#### Skill: `ml-classification`
**Purpose:** Article categorization and tagging patterns

**Sections:**
- Hugging Face model selection
- Text classification pipelines
- Embedding storage and similarity search
- Model caching strategies

#### Skill: `feed-personalization`
**Purpose:** User preference learning and ranking algorithms

**Sections:**
- Content-based filtering
- User feedback weighting
- Ranking algorithm implementations
- A/B testing patterns

### Subagents to Configure

| Subagent | Role | Trigger |
|------------|------|---------|
| `planner` | Feature implementation planning | Any complex feature request |
| `tdd-guide` | Enforce test-first development | All new features, bug fixes |
| `code-reviewer` | Quality and security review | After code changes |
| `e2e-runner` | End-to-end test specialist | Critical user flows |
| `frontend-reviewer` | UI/UX code review | After frontend changes |
| `performance-optimizer` | Core Web Vitals optimization | Performance issues |
| `security-reviewer` | Security vulnerability scanning | Auth, API, data handling |

### Development Hooks Configuration

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "glob": "*.{ts,tsx}",
        "command": "pnpm prettier --write \"$FILE_PATH\" && pnpm eslint --fix \"$FILE_PATH\"",
        "description": "Format and lint TypeScript files"
      },
      {
        "matcher": "Write|Edit",
        "glob": "*.css",
        "command": "pnpm stylelint --fix \"$FILE_PATH\"",
        "description": "Lint CSS files"
      },
      {
        "matcher": "Write|Edit",
        "glob": "*.test.{ts,tsx}",
        "command": "pnpm test \"$FILE_PATH\"",
        "description": "Run modified tests"
      }
    ],
    "Stop": [
      {
        "command": "pnpm build && pnpm test:coverage",
        "description": "Verify build and test coverage"
      }
    ]
  }
}
```

---

## 9. Development Roadmap

### Product Development Phases

> **Guiding Principle:** Build incrementally. Plan first, then simple features, then complex. Each phase delivers usable value.

---

## PHASE 1: Foundation (Weeks 1-3)

### Sub-Phase 1.1: Planning & Setup (Week 1)
| Task | Output | Owner |
|------|--------|-------|
| Finalize tech stack decision | Decision doc | Team |
| Choose visual design direction | Style guide | Design |
| Finalize brand name | Domain purchased | Product |
| Set up repository + CI/CD | Repo ready | Dev |
| Configure subagents and skills | `.claude/agents/` populated | Dev |
| Create wireframes (mobile + desktop) | Figma/XD files | Design |
| Database schema design | ERD diagram | Dev |

### Sub-Phase 1.2: Core Infrastructure (Week 2)
| Task | Output | Dependencies |
|------|--------|--------------|
| Initialize Next.js project with TypeScript | Working dev server | 1.1 |
| Set up Tailwind + design tokens | `globals.css` with tokens | 1.1 |
| Set up Supabase/PostgreSQL | DB connection working | 1.1 |
| Create base layout components | Header, Nav, Layout | 1.1 |
| Set up testing framework (Vitest + Playwright) | `npm test` passes | 1.1 |
| Implement design system (buttons, cards, inputs) | Storybook or demo page | 1.1 |

### Sub-Phase 1.3: Basic Feed (Week 3)
| Task | Output | Dependencies |
|------|--------|--------------|
| Implement 2-3 content fetchers (arXiv, HF, Blogs) | CLI fetching works | 1.2 |
| Create article card component | Component tests pass | 1.2 |
| Build feed page (static data first) | `/feed` renders | 1.2 |
| Add loading states + error boundaries | Skeletons, error UI | 1.2 |
| Implement responsive layout | Mobile + desktop tested | 1.2 |
| **Milestone: Static feed renders** | Demo ready | - |

---

## PHASE 2: Core Features (Weeks 4-7)

### Sub-Phase 2.1: Content Pipeline (Week 4)
| Task | Output | Dependencies |
|------|--------|--------------|
| Build background job system (BullMQ) | Jobs enqueue/dequeue | 1.3 |
| Implement article deduplication | Duplicate detection working | 2.1 |
| Add content summarization | Summaries stored in DB | 2.1 |
| Daily refresh automation | Cron job working | 2.1 |
| Add 2 more sources | 4-5 total sources | 2.1 |
| **Milestone: Daily auto-refresh works** | Production data flowing | - |

### Sub-Phase 2.2: Feedback System (Week 5)
| Task | Output | Dependencies |
|------|--------|--------------|
| Implement thumbs up/down UI | Buttons animate correctly | 2.1 |
| Create feedback storage layer | Local storage or DB table | 2.1 |
| Add swipe gestures (mobile) | Touch handling working | 2.1 |
| Implement save/bookmark feature | Saved articles persist | 2.1 |
| Add reading time tracking | Analytics data collected | 2.1 |
| **Milestone: User can rate articles** | Feedback loop complete | - |

### Sub-Phase 2.3: Search & Filter (Week 6)
| Task | Output | Dependencies |
|------|--------|--------------|
| Implement full-text search (PostgreSQL) | Search API endpoint | 2.2 |
| Add search UI (mobile-first) | Search works on mobile | 2.2 |
| Build category filter pills | Filter by topic | 2.2 |
| Add source filter | Filter by source | 2.2 |
| Implement date range filter | Date filtering works | 2.2 |
| **Milestone: Users can find specific content** | Search + filter complete | - |

### Sub-Phase 2.4: Polish & Performance (Week 7)
| Task | Output | Dependencies |
|------|--------|--------------|
| Optimize images (next/image) | Lighthouse score 90+ | 2.3 |
| Implement virtualization (react-window) | 1000+ articles scroll smoothly | 2.3 |
| Add PWA support (service worker) | Offline reading works | 2.3 |
| Implement dark mode | Theme toggle works | 2.3 |
| Write E2E tests for critical flows | Playwright tests passing | 2.3 |
| **Milestone: Production-ready single-user app** | Deploy to Vercel | - |

---

## PHASE 3: Enhancement (Weeks 8-11)

### Sub-Phase 3.1: Analytics (Week 8)
| Task | Output | Dependencies |
|------|--------|--------------|
| Build reading analytics dashboard | Charts showing reading patterns | 2.4 |
| Add source statistics | Most-read sources ranked | 2.4 |
| Implement topic trends | Trending topics visualization | 2.4 |
| Add reading streak tracking | Gamification feature | 2.4 |
| **Milestone: Users understand their reading habits** | Analytics complete | - |

### Sub-Phase 3.2: Advanced Features (Weeks 9-10)
| Task | Output | Dependencies |
|------|--------|--------------|
| Implement reading list management | Collections feature | 3.1 |
| Add export functionality (Markdown, PDF) | Export works | 3.1 |
| Build recommendation engine (simple) | "Because you liked..." feature | 3.1 |
| Add share functionality | Share to social/copy link | 3.1 |
| **Milestone: Power user features complete** | Power users satisfied | - |

### Sub-Phase 3.3: Content Expansion (Week 11)
| Task | Output | Dependencies |
|------|--------|--------------|
| Add remaining Tier 1 sources | 8-10 sources total | 3.2 |
| Implement NLP-based auto-categorization | Articles auto-tagged | 3.2 |
| Add sentiment analysis | Sentiment scores shown | 3.2 |
| Build content quality scoring | Low-quality filtered out | 3.2 |
| **Milestone: High-quality, diverse content** | Content quality high | - |

---

## PHASE 4: Multi-User Platform (Weeks 12-16)

### Sub-Phase 4.1: Authentication (Week 12)
| Task | Output | Dependencies |
|------|--------|--------------|
| Implement auth (NextAuth.js/Clerk) | Login/signup working | 3.3 |
| Add password reset flow | Password reset works | 3.3 |
| Migrate feedback to user-scoped | User-specific feedback | 3.3 |
| Create user profile pages | Profile UI complete | 3.3 |
| **Milestone: Multi-user auth working** | Users can create accounts | - |

### Sub-Phase 4.2: Personalization (Weeks 13-14)
| Task | Output | Dependencies |
|------|--------|--------------|
| Implement user preference learning | Personalized feed ranking | 4.1 |
| Build collaborative filtering (if scale) | "Users like you..." feature | 4.1 |
| Add preference onboarding | New user onboarding flow | 4.1 |
| Implement email digest | Daily email summary | 4.1 |
| **Milestone: Personalized feeds for each user** | Algorithm working | - |

### Sub-Phase 4.3: Social Features (Weeks 15-16)
| Task | Output | Dependencies |
|------|--------|--------------|
| Add article sharing between users | Social feed feature | 4.2 |
| Implement user following | Follow researchers/peers | 4.2 |
| Add comments on articles | Comment system | 4.2 |
| Build public profiles | Profile customization | 4.2 |
| **Milestone: Social features launched** | Platform network effects | - |

---

## 10. Branding Ideas

### Naming Directions
| Theme | Ideas |
|-------|-------|
| AI/Intelligence | Neural Digest, Cognition Stream, AI Pulse, Synaptic |
| Curation/Filtering | The Curator, Signal Stack, Filtered AI, Lens AI |
| Learning/Research | Research Radar, Paper Trail, The LLM Post, ArXiv Daily |
| Metaphorical | Synapse, Neuron, Cortex, Mindstream, Cognition |
| Simple/Direct | AI Daily, ML Weekly, AI Watch, Paper Feed |

### Domain Considerations
- Prefer `.com` or `.ai` TLDs
- Easy to spell and remember
- Available across social platforms

---

## 11. Success Metrics

### Phase 1: Foundation
- [ ] Project setup complete with CI/CD
- [ ] Static feed renders on mobile and desktop
- [ ] Core components tested (80%+ coverage)
- [ ] Design system implemented

### Phase 2: Core Features
- [ ] Content aggregates from 4-5 sources daily
- [ ] Users can rate articles (thumbs up/down)
- [ ] Search and filter working
- [ ] Lighthouse score 90+ on mobile
- [ ] E2E tests for critical user flows

### Phase 3: Enhancement
- [ ] 8-10 sources actively aggregated
- [ ] NLP auto-categorization 80%+ accurate
- [ ] Analytics dashboard shows insights
- [ ] Export features working

### Phase 4: Multi-User
- [ ] User retention > 50% after 7 days
- [ ] Average 3+ feedback actions per session
- [ ] Personalized feed improves CTR by 20%+
- [ ] Platform serves 100+ concurrent users

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Rate limiting from sources | High | Exponential backoff, caching, multiple keys |
| Content quality variance | Medium | ML-based filtering, manual curation initially |
| Mobile performance issues | High | Virtualization, lazy loading, image optimization |
| Scraping legal issues | Medium | Respect robots.txt, use official APIs first |
| Feedback loop takes time | Low | Start with rule-based ranking, evolve to ML |
| Scope creep | High | Strict phase boundaries, MVP-first approach |

---

## 13. Next Steps

### Immediate (This Week)
1. [ ] **Decision:** Choose tech stack (Next.js + Supabase recommended)
2. [ ] **Decision:** Select final name and purchase domain
3. [ ] **Design:** Create wireframes for mobile feed
4. [ ] **Setup:** Initialize repository with Next.js template
5. [ ] **Setup:** Configure subagents (planner, tdd-guide, code-reviewer)

### Week 2
1. [ ] Design system implementation
2. [ ] Database setup and schema creation
3. [ ] First content fetcher (arXiv)

### Ongoing
- [ ] Weekly planning sessions using `planner` subagent
- [ ] TDD workflow for all features
- [ ] Code review for all PRs
- [ ] Weekly E2E test runs

---

*Document Version: 2.0*  
*Next Review: After Phase 1.1 completion*
