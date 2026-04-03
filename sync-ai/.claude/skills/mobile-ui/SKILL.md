---
name: mobile-ui
description: Mobile-first UI patterns and responsive design
---

# Mobile-First UI Patterns

## Breakpoint Strategy

```css
/* Mobile first approach */
.article-card {
  padding: 1rem; /* Mobile */
}

@media (min-width: 768px) {
  .article-card {
    padding: 1.5rem; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .article-card {
    padding: 2rem; /* Desktop */
  }
}
```

## Touch Interactions

```typescript
// Swipeable cards
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedLeft: () => onDismiss(article),
  onSwipedRight: () => onSave(article),
  trackMouse: true // For testing on desktop
});
```

## Bottom Navigation

```tsx
<nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
  <div className="flex justify-around p-3">
    <NavItem icon={Home} label="Feed" href="/" />
    <NavItem icon={Bookmark} label="Saved" href="/saved" />
    <NavItem icon={Settings} label="Settings" href="/settings" />
  </div>
  {/* Safe area padding for iOS */}
  <div className="h-safe-area-inset-bottom" />
</nav>
```

## Performance
- Touch targets minimum 44x44px
- Use CSS transforms for animations (GPU accelerated)
- Avoid layout shifts (set image dimensions)
- Test on actual devices, not just emulator

## Mobile-Specific Features
- Pull-to-refresh
- Bottom sheets for article details
- Haptic feedback on actions
- Share native integration
