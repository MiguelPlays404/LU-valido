# Plano: Editor Total de Mídia + Bugs + Telefone Fixo

## Resumo dos problemas e soluções


| #   | Problema                                 | Solução                                                                                                                                                                                                      |
| --- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Menu mobile fica transparente (image-16) | Forçar `bg-[#0D0D0D]` opaco + `z-50` correto + `body { overflow:hidden }` quando aberto                                                                                                                      |
| 2   | Navbar não fixa em todas páginas         | Já tem `fixed top-0 z-50`, mas alguns scroll containers cancelam — garantir + adicionar shadow contínuo                                                                                                      |
| 3   | Vídeo destaque da Home não editável      | Já lê `is_featured=true` da tabela videos. Adicionar **toggle "destaque"** no AdminVideos (falta hoje)                                                                                                       |
| 4   | Fotos "Momentos Especiais" não editáveis | Já lê `is_featured=true` em photos. Adicionar **toggle "destaque"** funcional já existe — falta evidenciar/explicar e separar por aba                                                                        |
| 5   | Foto "Quem Somos" / Sobre não editável   | Já existe `sobre_image_url` em AdminHome (campo URL) — substituir por **MediaUploader visual**                                                                                                               |
| 6   | Upload de vídeo (arquivo, não só link)   | Adicionar `MediaUploader accept="video"` no AdminVideos + suportar `video_type='upload'` no player                                                                                                           |
| 7   | Telefone fixo no rodapé e Siga-nos       | Adicionar campo `fixed_phone` em site_config + render em Footer e SigaNos                                                                                                                                    |
| 8   | Mídia tudo junto                         | Reorganizar AdminPhotos e AdminVideos com **abas por categoria/local**                                                                                                                                       |
| 9   | Outros itens não editáveis encontrados   | Hero badge, scroll arrow, "Entre em Contato" title, PageHero badges, Hotelzinho gallery title, Conhecer "Sobre o Le Ville Pet" title, Fotos filtros, FaleConosco bottom text — **nova aba "Textos Globais"** |


---

## 1. Migration (campos + bucket video)

```sql
ALTER TABLE site_config
  ADD COLUMN IF NOT EXISTS fixed_phone TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS hero_badge_text TEXT DEFAULT '🐾 Petshop em Bauru-SP',
  ADD COLUMN IF NOT EXISTS contact_section_title TEXT DEFAULT 'Entre em Contato',
  ADD COLUMN IF NOT EXISTS faleconosco_visit_text TEXT DEFAULT 'Venha nos visitar! Estamos te esperando 🐾',
  ADD COLUMN IF NOT EXISTS conhecer_about_title TEXT DEFAULT 'Sobre o Le Ville Pet',
  ADD COLUMN IF NOT EXISTS conhecer_cta_title TEXT DEFAULT 'Venha nos visitar!',
  ADD COLUMN IF NOT EXISTS conhecer_cta_btn_text TEXT DEFAULT 'Fale Conosco',
  ADD COLUMN IF NOT EXISTS hotel_cta_title TEXT DEFAULT 'Quer agendar uma estadia para o seu pet?',
  ADD COLUMN IF NOT EXISTS hotel_gallery_section_title TEXT DEFAULT 'Nosso Espaço',
  ADD COLUMN IF NOT EXISTS faleconosco_info_title TEXT DEFAULT 'Informações de Contato',
  ADD COLUMN IF NOT EXISTS faleconosco_image_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS localizacao_howto_title TEXT DEFAULT 'Como Chegar',
  ADD COLUMN IF NOT EXISTS fotos_filter_all TEXT DEFAULT 'Todas',
  ADD COLUMN IF NOT EXISTS fotos_filter_galeria TEXT DEFAULT 'Galeria',
  ADD COLUMN IF NOT EXISTS fotos_filter_hotel TEXT DEFAULT 'Hotelzinho',
  ADD COLUMN IF NOT EXISTS fotos_filter_conhecer TEXT DEFAULT 'Nosso Espaço',
  ADD COLUMN IF NOT EXISTS siganos_footer_text TEXT DEFAULT '🐾 Feito com amor para você e seu pet';

-- Adicionar 'video_url' na tabela photos? NÃO. Manter videos separado.
-- Tornar video_type aceitar 'upload' (já é text — apenas usar o valor)

-- Garantir bucket aceita videos grandes (já é levillepet-media público)
UPDATE storage.buckets SET file_size_limit = NULL WHERE id = 'levillepet-media';
```

---

## 2. Bug navbar mobile transparente

`src/components/Navbar.tsx`:

- Garantir sidebar mobile com `**background: #0D0D0D !important**` + `**isolation: isolate**`
- Adicionar `useEffect` que faz `document.body.style.overflow = isOpen ? 'hidden' : ''`
- Aumentar overlay para `bg-black/95 backdrop-blur-md`

---

## 3. Navbar fixa robusta em todas páginas

Já é `fixed top-0`. Garantir não há `transform/filter` em ancestrais (PublicLayout) que quebre `position: fixed`. Inspecionar PublicLayout — se `pt-16` está OK. Sem mudanças além de remover qualquer `overflow-hidden` problemático.

---

## 4. AdminPhotos com abas por categoria

Reescrever `AdminPhotos.tsx` com **tabs no topo**:

- Aba **"Galeria Geral"** → categoria `galeria`
- Aba **"Hotelzinho"** → `hotelzinho`
- Aba **"Venha Nos Conhecer"** → `conhecer`
- Aba **"Home/Momentos Especiais"** → fotos com `is_featured=true` (não importa categoria)

Cada aba mostra:

- Uploader **dedicado** (já cria com a categoria certa)
- Grid filtrado **só dessa categoria**
- Botão "⭐ Destacar na Home" visível e claro

---

## 5. AdminVideos com abas + upload de vídeo + toggle destaque

Reescrever `AdminVideos.tsx`:

- Aba **"Todos"** / **"Em Destaque (Home)"** / **"Hotelzinho"**
- Adicionar coluna `category` na tabela videos (migration)
- 2 modos de adicionar:
  - **Adicionar via Link** (atual)
  - **Upload de Arquivo** (novo — `MediaUploader accept="video"`, salva `video_type='upload'`, `video_url` = URL do storage)
- **Toggle ⭐ Destaque** funcional para escolher o vídeo da home

Player Videos.tsx detecta `video_type === 'upload'` e usa `<video>` em vez de `<iframe>`. Index.tsx idem para o featured.

```sql
ALTER TABLE videos ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'geral';
```

---

## 6. AdminHome — substituir campos URL por MediaUploader

- `sobre_image_url` → MediaUploader image
- `cta_hotel_image_url` → MediaUploader image
- `hero_bg_image_url` → MediaUploader image (novo)

---

## 7. Telefone fixo (rodapé + SigaNos)

Footer.tsx: nova linha

```tsx
{c?.fixed_phone && (
  <a href={`tel:${c.fixed_phone.replace(/\D/g,'')}`} className="...">
    <Phone /> {c.fixed_phone}
  </a>
)}
```

SigaNos.tsx: card extra acima dos sociais com mesma lógica.

AdminConfig: novo campo "Telefone Fixo" na seção WhatsApp.

---

## 8. Nova aba "Textos Globais" em AdminPageTexts

Adicionar tab `global` com:

- `hero_badge_text`
- `contact_section_title`
- `faleconosco_visit_text`, `faleconosco_info_title`
- `conhecer_about_title`, `conhecer_cta_title`, `conhecer_cta_btn_text`
- `hotel_cta_title`, `hotel_gallery_section_title`
- `localizacao_howto_title`
- `fotos_filter_*` (4 campos)
- `siganos_footer_text`

E usar todos esses campos nas páginas públicas.

---

## 9. Aplicar campos editáveis nas páginas

- `Index.tsx`: hero_badge_text, contact_section_title (linha 247)
- `Hotelzinho.tsx`: hotel_cta_title, hotel_gallery_section_title
- `VenhaNosConhecer.tsx`: conhecer_about_title, conhecer_cta_title, conhecer_cta_btn_text
- `FaleConosco.tsx`: faleconosco_visit_text, faleconosco_info_title, faleconosco_image_url
- `Localizacao.tsx`: localizacao_howto_title
- `Fotos.tsx`: filtros vindos do config
- `SigaNos.tsx`: siganos_footer_text + telefone fixo

---

## 10. Upload de vídeo em galerias (extra)

`MediaUploader` já aceita `accept="both"`. Habilitar em AdminPhotos? Não — fotos é fotos. Mas adicionar **opção de vídeo curto** em AdminVideos para todas categorias (Hotelzinho, Conhecer também) via aba.

---

## Arquivos alterados


| Arquivo                              | Mudança                                                     |
| ------------------------------------ | ----------------------------------------------------------- |
| `supabase/migrations/...sql`         | novos campos site_config + videos.category                  |
| `src/components/Navbar.tsx`          | bg opaco + overflow body lock                               |
| `src/components/Footer.tsx`          | telefone fixo                                               |
| `src/pages/SigaNos.tsx`              | telefone fixo + footer text editável                        |
| `src/pages/Index.tsx`                | hero_badge_text, contact_section_title, vídeo upload player |
| `src/pages/Hotelzinho.tsx`           | títulos editáveis                                           |
| `src/pages/VenhaNosConhecer.tsx`     | títulos editáveis                                           |
| `src/pages/FaleConosco.tsx`          | textos + imagem editáveis                                   |
| `src/pages/Localizacao.tsx`          | título "Como Chegar"                                        |
| `src/pages/Fotos.tsx`                | filtros editáveis                                           |
| `src/pages/Videos.tsx`               | suporte a video_type=upload                                 |
| `src/pages/admin/AdminPhotos.tsx`    | reescrita com abas por categoria                            |
| `src/pages/admin/AdminVideos.tsx`    | reescrita: abas + upload arquivo + destaque toggle          |
| `src/pages/admin/AdminHome.tsx`      | MediaUploader em vez de URL                                 |
| `src/pages/admin/AdminConfig.tsx`    | campo fixed_phone                                           |
| `src/pages/admin/AdminPageTexts.tsx` | nova aba "Globais"                                          |


Sem alteração de RLS — políticas já permitem CRUD anônimo (admin via sessionStorage).   
  
O telefone fixo do estabelecimento é (14) 3204-7040.

Use esse valor como padrão no campo fixed_phone da migration

e exiba já preenchido no admin e no footer/siga-nos.