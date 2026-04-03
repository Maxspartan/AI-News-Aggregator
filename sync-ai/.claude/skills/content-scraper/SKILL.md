---
name: content-scraper
description: Patterns for ethically scraping AI news sources
---

# Content Scraping Patterns

## When to Use
- RSS feed unavailable or incomplete
- API access denied or rate-limited
- Need to extract full content from summary feeds

## Ethical Guidelines
1. Always check robots.txt first
2. Rate limit: max 1 request per 5 seconds per domain
3. Identify with clear User-Agent
4. Cache aggressively (respect Cache-Control headers)
5. Never hotlink images

## Source Type Patterns

### Static Blog (e.g., WordPress)
```typescript
// Cheerio approach
const $ = cheerio.load(html);
const article = {
  title: $('h1.post-title').text().trim(),
  content: $('.post-content').html(),
  author: $('.author-name').text(),
  date: $('time[datetime]').attr('datetime')
};
```

### JavaScript-Rendered (SPA)
```typescript
// Playwright approach
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
const content = await page.evaluate(() => {
  return document.querySelector('.article-content').innerHTML;
});
```

## Error Handling
- 403 Forbidden: Check if API/RSS is available
- 429 Rate Limited: Implement exponential backoff
- 404 Not Found: Mark source for review
- Timeout: Retry with longer timeout

## Testing
Always test scrapers on 3-5 sample articles before production.
