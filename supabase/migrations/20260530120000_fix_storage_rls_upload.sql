-- ============================================================
-- MIGRATION: Corrigir políticas RLS do Storage (upload de mídia)
-- Le Ville Pet — Fix 403 Unauthorized no upload de fotos/vídeos
-- ============================================================
-- COMO APLICAR:
--   Supabase Dashboard → SQL Editor → Cole este conteúdo → Run
-- ============================================================

-- 1. Garantir que o bucket existe, é público e sem limite de tamanho
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('levillepet-media', 'levillepet-media', true, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  public            = true,
  file_size_limit   = NULL,
  allowed_mime_types = NULL;

-- 2. Remover TODAS as políticas antigas do bucket (evita conflitos)
DROP POLICY IF EXISTS "Public read levillepet-media"   ON storage.objects;
DROP POLICY IF EXISTS "Anon upload levillepet-media"   ON storage.objects;
DROP POLICY IF EXISTS "Anon update levillepet-media"   ON storage.objects;
DROP POLICY IF EXISTS "Anon delete levillepet-media"   ON storage.objects;
DROP POLICY IF EXISTS "LeVillePet public read"         ON storage.objects;
DROP POLICY IF EXISTS "LeVillePet anon insert"         ON storage.objects;
DROP POLICY IF EXISTS "LeVillePet anon update"         ON storage.objects;
DROP POLICY IF EXISTS "LeVillePet anon delete"         ON storage.objects;
-- Políticas extras que possam ter sido criadas manualmente
DROP POLICY IF EXISTS "Allow public read"              ON storage.objects;
DROP POLICY IF EXISTS "Allow anon insert"              ON storage.objects;
DROP POLICY IF EXISTS "Allow anon update"              ON storage.objects;
DROP POLICY IF EXISTS "Allow anon delete"              ON storage.objects;

-- 3. Criar políticas limpas e corretas
-- SELECT: qualquer pessoa pode ver os arquivos (público)
CREATE POLICY "lvp_storage_select"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'levillepet-media');

-- INSERT: anon pode criar novos arquivos
CREATE POLICY "lvp_storage_insert"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'levillepet-media');

-- UPDATE: anon pode sobrescrever arquivos (necessário para x-upsert)
CREATE POLICY "lvp_storage_update"
  ON storage.objects FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'levillepet-media')
  WITH CHECK (bucket_id = 'levillepet-media');

-- DELETE: anon pode excluir arquivos
CREATE POLICY "lvp_storage_delete"
  ON storage.objects FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'levillepet-media');

-- ============================================================
-- PRONTO. Após rodar, tente fazer upload novamente no painel.
-- ============================================================
