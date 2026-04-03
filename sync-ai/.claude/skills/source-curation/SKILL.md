---
name: source-curation
description: Evaluating and managing news sources for quality
---

# Source Curation

## Quality Evaluation Checklist

### Initial Evaluation (7 days)
- [ ] Fetch last 10 articles
- [ ] Check content relevance to AI (>70% AI topics)
- [ ] Verify update frequency (at least weekly)
- [ ] Test RSS/API endpoints
- [ ] Review for paywalls

### Ongoing Monitoring
- [ ] Weekly: fetch success rate >90%
- [ ] Monthly: user engagement vs other sources
- [ ] Quarterly: content drift analysis

## Scoring Rubric

| Criterion | Weight | How to Measure |
|-----------|--------|----------------|
| Relevance | 30% | Manual review of 10 articles |
| Frequency | 20% | Average time between posts |
| Authority | 20% | Citation count, author expertise |
| Uniqueness | 15% | Duplicate rate across sources |
| Engagement | 15% | Click-through rate |

## Tier Assignment
- **S (90-100)**: Essential, feature prominently
- **A (75-89)**: Reliable, standard display
- **B (60-74)**: Moderate, lower priority
- **C (40-59)**: Review quarterly
- **D (<40)**: Remove

## Deprecation Triggers
1. >20% fetch failure rate for 7 days
2. AI content drops below 30%
3. Source adds paywall to >50% content
4. Duplicate rate exceeds 40%
