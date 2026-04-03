---
name: feed-personalization
description: Implementing user preference learning and ranking
---

# Feed Personalization

## User Feedback Signals

### Explicit Signals
- Thumbs up: +1 weight for similar content
- Thumbs down: -2 weight (stronger signal)
- Skip: -0.5 weight (mild negative)
- Save: +2 weight for author/source/topic

### Implicit Signals
- Click-through: +0.5
- Time on page >60s: +1
- Time on page >3min: +2
- Share: +3

## Ranking Algorithm (Simple)

```typescript
function scoreArticle(article, user) {
  const baseScore = article.qualityScore * 0.3;
  const freshnessScore = calculateFreshness(article.publishedAt);
  const preferenceScore = calculateUserPreference(article, user.history);

  return (
    baseScore * 0.3 +
    freshnessScore * 0.3 +
    preferenceScore * 0.4
  );
}
```

## Content Similarity

Use embeddings for semantic similarity:
```typescript
// Generate embedding for article
const embedding = await generateEmbedding(
  article.title + ' ' + article.summary
);

// Find similar articles
const similar = await db.articles
  .orderBy('embedding <-> $1', embedding)
  .limit(5);
```

## Exploration vs Exploitation

80% personalized content (exploitation)
20% diverse content (exploration)
- Include one random trending article
- Include one from new source
- Include one outside usual topics
