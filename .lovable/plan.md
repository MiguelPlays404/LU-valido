

# Le Ville Pet — Phase 3 Completion Plan

## Overview
Complete the site with full admin configurability, logo integration, lighter design, and data-driven pages. The admin must control every piece of text, image, and setting visible on the site.

---

## 1. Database Migration — Add Missing Configurable Fields

Add columns to `site_config` for all the new configurable content the admin map requires:

**Hero section extras:**
- `hero_highlight_word` (text, default 'melhor.') — the yellow word in the hero title
- `hero_btn_primary_text` (text, default '💬 Fale no WhatsApp')
- `hero_btn_secondary_text` (text, default 'Conheça o Hotelzinho →')
- `hero_stat_1_num`, `hero_stat_1_label`, `hero_stat_2_num`, `hero_stat_2_label`, `hero_stat_3_num`, `hero_stat_3_label` (6 text fields for decorative stats)
- `sobre_image_url` (text) — image for the "About" section
- `sobre_cta_text` (text, default 'Venha nos conhecer →')

**CTA Hotel section:**
- `cta_hotel_title`, `cta_hotel_text`, `cta_hotel_btn1_text`, `cta_hotel_btn2_text`, `cta_hotel_image_url`

**Contact section:**
- `contact_whatsapp_btn_text` (text, default 'Chamar no WhatsApp')
- `contact_maps_btn_text` (text, default 'Ver no Mapa')
- `contact_instagram_btn_text` (text, default 'Seguir')

**Gallery/Video section titles:**
- `gallery_section_title`, `gallery_section_subtitle`
- `video_section_title`, `video_section_subtitle`

**Footer:**
- `footer_description` (text)
- `copyright_text` (text)

**Social handles (for Siga-nos display):**
- `instagram_handle`, `facebook_handle`, `tiktok_handle`, `youtube_handle`
- `instagram_btn_text`, `whatsapp_btn_text`, `facebook_btn_text`, `tiktok_btn_text`, `youtube_btn_text`

**Fale Conosco page:**
- `faleconosco_title`, `faleconosco_subtitle`, `faleconosco_card_title`, `faleconosco_card_text`, `faleconosco_btn_text`

**Localização page:**
- `localizacao_title`, `localizacao_subtitle`, `localizacao_maps_btn_text`, `localizacao_route_btn_text`, `localizacao_howto_text`

---

## 2. Copy Logo to Project

Copy the uploaded logo (`user-uploads://image-4.png`) to `public/images/logo-levillepet.png` so the Navbar, Footer, Admin sidebar, and Siga-nos page can display it.

---

## 3. Update All Public Pages to Fetch from DB

### Index.tsx (Home)
- Fetch `site_config` and use ALL configurable fields for Hero text, stats, buttons, Sobre section, CTA Hotel section, Contact section, Gallery titles, Video titles
- Replace hardcoded strings with `config?.field || 'fallback'`

### Hotelzinho.tsx
- Change hero to standard dark PageHero (no background photo — per user request "fundo preto com branco padrão")
- Already fetches from `hotelzinho_content` — keep as-is

### VenhaNosConhecer.tsx
- Already fetches from DB — working correctly

### FaleConosco.tsx
- Fetch `site_config` for WhatsApp number, message, address, Instagram, and page texts

### Localizacao.tsx
- Fetch `site_config` for address, maps URL, page titles

### SigaNos.tsx
- Fetch `site_config` for all social networks, handles, active toggles, logo, name, slogan
- Show only active networks

### Fotos.tsx / Videos.tsx
- Already data-driven — no major changes needed

---

## 4. Expand AdminHome Module

Add editors for ALL configurable Home sections:
- **Hero**: title, highlight word, subtitle, btn texts, stats (6 fields), bg image upload
- **Sobre**: title, text, CTA text, image upload
- **Gallery section**: title, subtitle
- **Video section**: title, subtitle  
- **CTA Hotel**: title, text, btn1 text, btn2 text, image upload
- **Contact**: WhatsApp btn text, Maps btn text, Instagram btn text
- **Cards**: already editable (title, description, toggle) — add inline editing of title/description

---

## 5. Expand AdminConfig Module

Add all missing fields:
- Address line 1/2/3 (separate fields instead of `address_full`)
- Footer description, copyright text
- Logo upload with live preview
- "Test Maps link" button (already exists)
- Google Maps embed URL

---

## 6. Expand AdminSocial Module

Add for each network:
- Handle field (e.g., `@levillepetbauru`)
- Button text field (e.g., "Seguir no Instagram")
- Active/inactive toggle (already exists)
- URL field (already exists)

---

## 7. Refine Admin UI Colors

Update all admin modules consistently:
- Cards: `bg-[#18181B]` instead of `bg-[#1A1A1A]`
- Inputs: `bg-[#27272A]` with `border-[#3F3F46]`
- Text labels: `text-[#A1A1AA]`
- Consistent rounded-2xl, border-white/[0.07]

---

## 8. Update Navbar & Footer with Logo

- **Navbar**: Show logo image if `logo_url` exists, otherwise show text badge
- **Footer**: Same logo treatment + use configurable description/copyright from DB

---

## 9. Hotelzinho Hero Change

Remove `bgImage` and `tall` props from PageHero in Hotelzinho — use the standard dark gradient hero pattern matching other pages.

---

## Files to Create/Modify

| File | Action |
|------|--------|
| Migration SQL | New columns in site_config |
| `public/images/logo-levillepet.png` | Copy from upload |
| `src/pages/Index.tsx` | Fetch config, use all fields |
| `src/pages/Hotelzinho.tsx` | Standard dark hero |
| `src/pages/FaleConosco.tsx` | Fetch config |
| `src/pages/Localizacao.tsx` | Fetch config |
| `src/pages/SigaNos.tsx` | Fetch config, show active networks |
| `src/pages/admin/AdminHome.tsx` | Full hero/sobre/gallery/video/cta/contact editors |
| `src/pages/admin/AdminConfig.tsx` | Add address lines, footer, logo upload |
| `src/pages/admin/AdminSocial.tsx` | Add handles, btn texts |
| `src/pages/admin/AdminDashboard.tsx` | Update colors |
| `src/pages/admin/AdminPhotos.tsx` | Update colors |
| `src/pages/admin/AdminVideos.tsx` | Update colors |
| `src/pages/admin/AdminHotelzinho.tsx` | Update colors |
| `src/pages/admin/AdminConhecer.tsx` | Update colors |
| `src/pages/admin/AdminSecurity.tsx` | Update colors |
| `src/components/Navbar.tsx` | Use logo from config |
| `src/components/Footer.tsx` | Use config for all text |

