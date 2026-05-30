-- ============================================================
-- MIGRATION: Adicionar coluna publish_at para agendamento
-- Le Ville Pet — AdminAgendamento feature
-- Aplique no Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Adiciona publish_at na tabela de fotos
ALTER TABLE public.photos
  ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ DEFAULT NULL;

-- 2. Adiciona publish_at na tabela de vídeos
ALTER TABLE public.videos
  ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ DEFAULT NULL;

-- 3. Índices para performance na consulta do auto-publisher
--    (busca itens pendentes com publish_at <= now())
CREATE INDEX IF NOT EXISTS idx_photos_publish_at
  ON public.photos (publish_at)
  WHERE is_active = false AND publish_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_videos_publish_at
  ON public.videos (publish_at)
  WHERE is_active = false AND publish_at IS NOT NULL;

-- ============================================================
-- PRONTO. Após rodar, adicione a rota e o menu no código
-- conforme instruções no arquivo INSTRUCOES_APP.md
-- ============================================================
