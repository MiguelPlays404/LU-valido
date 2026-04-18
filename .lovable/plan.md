

# Fix Plan v2 — Disappearing Photos, Videos & Social Buttons

## Root cause (confirmed)
`[data-animate] { opacity: 0 }` + `useScrollAnimation` only observes elements existing at mount. Anything rendered after async Supabase fetch (photos, videos, social links) stays invisible forever.

## Changes (with user feedback applied)

### 1. `src/hooks/useScrollAnimation.ts`
- Add `MutationObserver` so dynamically-added `[data-animate]` elements get observed
- **threshold: 0** + `rootMargin: '0px 0px -20px 0px'` (per feedback #1 — safer on mobile/large cards)
- Keep `io.unobserve()` after reveal for performance (CSS will lock visibility — feedback #2)
- No debounce — let mutations fire freely (feedback #4)

### 2. `src/index.css`
- Add safety-net animation: any `[data-animate]` auto-reveals after 1.2s if observer fails
- Lock `is-visible` permanently with `!important` (per feedback #2):
```css
@keyframes safetyReveal { to { opacity: 1; } }
[data-animate] { opacity: 0; animation: safetyReveal 0.4s ease 1.2s forwards; }
[data-animate].is-visible { opacity: 1 !important; animation-delay: 0s !important; }
```

### 3. `src/pages/SigaNos.tsx`
- Remove `data-animate` from social `<a>` buttons entirely (per feedback #3 — static UI, no risk)
- Keep `data-animate` only on header/logo/slogan

## What this fixes site-wide
- Home: "Momentos Especiais" gallery + "Em Destaque" video
- Fotos page: full grid (22 photos)
- Videos page: full grid (6 videos)
- Hotelzinho: gallery + video sections
- Venha Nos Conhecer: gallery
- Siga-nos: Instagram, WhatsApp, Facebook, TikTok, YouTube buttons

## No DB changes needed
Data verified present: 22 active photos, 6 active videos, social config correct.

## Files
| File | Change |
|------|--------|
| `src/hooks/useScrollAnimation.ts` | MutationObserver + threshold:0 |
| `src/index.css` | safetyReveal + locked is-visible |
| `src/pages/SigaNos.tsx` | Remove data-animate from social buttons |

