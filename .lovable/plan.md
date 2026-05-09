## Plano

### 1. Substituir mídias antigas (bebês/camisetas) por fotos de cachorros
- Auditar `site_config` e tabelas `photos`/`videos` para localizar URLs que ainda apontam para imagens antigas (ex.: `cta_hotel_image_url`, `sobre_image_url`, `hero_bg_image_url`, hero das páginas internas, `faleconosco_image_url`).
- Gerar novas imagens de cachorros (via imagegen) para preencher esses slots e salvar em `public/images/seed-dogs/`.
- Migration `UPDATE site_config SET ... = '/images/seed-dogs/...'` apontando para as novas imagens.

### 2. Adicionar mais fotos e vídeos pet ao banco
- Gerar +6 fotos novas (variando: banho, tosa, pet shop, hotel, brincadeira, loja).
- Inserir na tabela `photos` distribuindo `locations` entre `geral`, `hotelzinho`, `conhecer`, `home`.
- Adicionar +2 vídeos demo (usar assets já existentes em `public/videos/seed-dogs/` + 1 novo se possível) marcando alguns como `home` (destaque).

### 3. Nova seção "Produtos que utilizamos" na página Venha Nos Conhecer
Layout entre **Sobre** e **Galeria do Espaço**:

```text
[ Imagem produtos ]   PRODUTOS QUE UTILIZAMOS
                      Texto explicando marcas/qualidade/cuidado.
                      (badge amarelo no topo)
```

- Adicionar colunas em `site_config`:
  - `conhecer_produtos_badge` (default "🛍️ Qualidade")
  - `conhecer_produtos_title` (default "Produtos que utilizamos no seu pet")
  - `conhecer_produtos_text` (texto longo)
  - `conhecer_produtos_image_url` (imagem/vídeo)
- Renderizar nova `<section>` em `src/pages/VenhaNosConhecer.tsx`.
- Em `src/pages/admin/AdminConhecer.tsx`: nova aba/grupo "Produtos" com inputs + `MediaUploader` (aceitando imagem e vídeo).

### 4. Animações mais elegantes/modernas (sem mudar identidade visual)
Manter paleta amarelo `#F5C000` + preto `#09090B` + Poppins/Inter. Apenas refinar movimento.

- Em `src/index.css` / `tailwind.config.ts`:
  - Adicionar keyframes: `float-slow`, `shimmer`, `fade-up-soft` (translateY 24→0, blur 4px→0), `subtle-zoom`.
  - Easing padrão: `cubic-bezier(0.22, 1, 0.36, 1)` (mais suave que ease-out).
- `useScrollAnimation`: aumentar duração para 700ms, stagger entre filhos, suportar `data-animate="fade-up-soft"` e `blur-in`.
- `PageTransition`: cross-fade + scale leve (0.995→1) com 350ms; corrigir possível salto do scroll.
- Hover refinado em cards (`.card-hover`): `translateY(-4px)` + sombra amarela suave + borda do primary aparecendo.
- Botões `.btn-primary` / `.btn-dark`: brilho `shimmer` discreto on hover.
- Imagens em galerias: `subtle-zoom` no hover (já existe scale-105, deixar mais lento, 600ms).

### 5. Refinos de elegância no UI (mínimos, sem reestruturar)
- Bordas mais arredondadas em hero badges (já ok), reforçar `backdrop-blur` nos overlays.
- Adicionar grão/ruído sutil opcional via CSS no fundo escuro de seções pretas (overlay 2% noise).
- Espaçamento vertical entre seções: garantir `py-20 lg:py-24` consistente.

### Detalhes técnicos
- Migration única cobrindo: novas colunas em `site_config`, UPDATE de URLs antigas, INSERTs de novas photos/videos.
- Frontend: `VenhaNosConhecer.tsx`, `AdminConhecer.tsx`, `index.css`, `tailwind.config.ts`, `useScrollAnimation.ts`, `PageTransition.tsx`.
- Sem mudanças em backend/edge functions.

### Arquivos a alterar
- `supabase/migrations/<novo>.sql`
- `src/pages/VenhaNosConhecer.tsx`
- `src/pages/admin/AdminConhecer.tsx`
- `src/index.css`, `tailwind.config.ts`
- `src/hooks/useScrollAnimation.ts`
- `src/components/PageTransition.tsx`
- Novos assets em `public/images/seed-dogs/`
