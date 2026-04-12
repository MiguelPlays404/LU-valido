

# Fix Plan — Le Ville Pet: Broken Pages & Missing Admin Controls

## Issues Found

1. **Photos/Videos appear empty on all pages** — Data exists in DB (22 photos, 6 videos) with valid Unsplash URLs and YouTube links. The images render as invisible boxes. Root cause: the image URLs are valid but the grid items may have CSS/rendering issues OR images fail silently. Need to add `bg-gray-200` fallback backgrounds and `onError` handlers to all `<img>` tags so broken images are visible. Also ensure the `aspect-*` containers have min-height.

2. **Home "Momentos Especiais" + "Em Destaque"** — Photos load but appear invisible. Videos section depends on `is_featured=true` (one video qualifies). Need to add "Ver Mais" buttons linking to `/fotos` and `/videos`.

3. **Navbar on Home appears all-white** — The hero has dark bg but `PublicLayout` adds `pt-16` pushing content below the navbar. The transparent navbar shows the page's white `body` background behind it, not the hero. Fix: add a dark pseudo-element or set the `body`/`html` bg to black when on Home, or make the navbar always have a dark bg fallback.

4. **Map broken on Localização** — The `google_maps_embed` DB field contains the short link (`https://maps.app.goo.gl/...`) instead of a proper embed URL. Fix: update the DB value to a working embed URL: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8!2d-49.0706!3d-22.3155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bf67b5b0e1c1a1%3A0x1234567890abcdef!2sVillaggio%20Mall%20Center!5e0!3m2!1sen!2sbr!4v1` and also use a proper query-based fallback in code.

5. **Siga-nos social buttons missing** — Config shows instagram_active=true, whatsapp_active=true. The code logic looks correct. Issue may be that the `socialLinks` array is built with `filter(Boolean)` but the falsy check on `c.instagram_active && {...}` returns `false` for inactive items correctly. Debugging needed — likely the config fetch returns null initially causing empty render. Fix: add loading state and ensure socialLinks builds after config loads.

6. **Admin panel transparency** — AdminLayout uses inline `background: '#09090B'` which should work. The issue may be that the `min-h-screen` flex layout doesn't cover the full viewport. Fix: ensure `html, body` and the admin container have proper opaque backgrounds.

7. **Missing admin configurability** — Many text fields on pages are still hardcoded and not editable. Need full audit and connection.

---

## Implementation Steps

### Step 1: Fix image rendering across all pages
- Add `bg-[#E5E5E5]` (light) or `bg-[#333]` (dark sections) placeholder backgrounds to all image containers
- Add `onError` fallback to show a paw icon placeholder when images fail
- Ensure `object-cover` and proper aspect ratios are set

### Step 2: Fix Navbar transparency bug on Home
- Change approach: instead of `bg-transparent` on Home, use `bg-black/90 backdrop-blur` always, or add a gradient overlay at the top of the hero that ensures the navbar area is never white
- Simplest fix: remove the transparent logic, always use dark navbar

### Step 3: Fix Google Maps embed
- Update the DB `google_maps_embed` value via migration to a proper embed URL using the query format: `https://www.google.com/maps/embed/v1/place?key=...` or the free format `https://maps.google.com/maps?q=Villaggio+Mall+Center+Bauru+SP&t=&z=15&ie=UTF8&iwloc=&output=embed`
- Update fallback in `Localizacao.tsx` code to use this working URL

### Step 4: Fix Siga-nos social buttons
- Add a loading state check — don't render the empty list while config is loading
- Ensure the socialLinks array builds correctly with proper null checks

### Step 5: Fix Admin panel opacity
- Add explicit background to `html` and root elements for admin routes
- Ensure AdminLayout sidebar and main area have fully opaque backgrounds with no transparency inheritance

### Step 6: Add "Ver Mais" buttons to Home sections
- Gallery section: already has "Ver Todas as Fotos" button — verify it's visible
- Video section: already has "Ver Todos os Vídeos" — verify visibility
- Add videos section to Hotelzinho page (showing hotelzinho-category videos)

### Step 7: Complete admin configurability audit
Add admin editors for ALL remaining hardcoded text:
- **AdminHome**: Add editors for Sobre section CTA text, image URL with upload
- **AdminConfig**: Add footer_description, copyright_text editors; logo upload with preview; google_maps_embed field
- **Fotos/Videos page titles**: Add hero title/subtitle fields to AdminConfig or dedicated editors
- **Hotelzinho**: Ensure all 17 fields are editable (already done)
- **Conhecer**: Ensure page_title, page_subtitle, intro_text, about_text are editable (already done)
- **FaleConosco**: Add admin fields for faleconosco_title, subtitle, card_title, card_text, btn_text
- **Localização**: Add admin fields for localizacao_title, subtitle, maps_btn_text, route_btn_text, howto_text

### Step 8: Ensure all public pages use DB values
- Review each page and replace any remaining hardcoded strings with `config?.field || 'fallback'`
- Ensure VenhaNosConhecer fetches site_config for WhatsApp number
- Ensure FaleConosco uses all configurable fields

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Fix image placeholders, navbar area fix |
| `src/pages/Fotos.tsx` | Add image fallbacks, loading placeholders |
| `src/pages/Videos.tsx` | Add thumbnail fallbacks |
| `src/pages/Hotelzinho.tsx` | Add image fallbacks, add videos section |
| `src/pages/VenhaNosConhecer.tsx` | Add image fallbacks, fetch site_config |
| `src/pages/Localizacao.tsx` | Fix map embed URL fallback |
| `src/pages/SigaNos.tsx` | Fix loading state for social links |
| `src/components/Navbar.tsx` | Always use dark background |
| `src/components/AdminLayout.tsx` | Fix opacity |
| `src/pages/admin/AdminConfig.tsx` | Add missing fields |
| `src/pages/admin/AdminHome.tsx` | Verify all fields present |
| `src/pages/admin/AdminSocial.tsx` | Verify handles/btn text fields |
| Migration SQL | Fix google_maps_embed value |

