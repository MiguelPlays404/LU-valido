import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminConhecer() {
  const [content, setContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("conhecer_content").select("*").limit(1).single().then(({ data }) => { if (data) setContent(data); });
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    const { error } = await supabase.from("conhecer_content").update(content).eq("id", content.id);
    toast({ title: error ? "Erro ao salvar" : "✅ Conteúdo salvo!" });
    setSaving(false);
  };

  if (!content) return <AdminLayout title="Venha Nos Conhecer"><div className="text-[#666]">Carregando...</div></AdminLayout>;

  return (
    <AdminLayout title="Venha Nos Conhecer">
      <div className="max-w-2xl space-y-6">
        <div><label className="text-xs text-[#666] mb-1 block">Título da Página</label><input value={content.page_title || ""} onChange={e => setContent({...content, page_title: e.target.value})} className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2 text-sm text-white" /></div>
        <div><label className="text-xs text-[#666] mb-1 block">Texto de Introdução</label><textarea value={content.intro_text || ""} onChange={e => setContent({...content, intro_text: e.target.value})} rows={2} className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2 text-sm text-white resize-y" /></div>
        <div><label className="text-xs text-[#666] mb-1 block">Texto Sobre</label><textarea value={content.about_text || ""} onChange={e => setContent({...content, about_text: e.target.value})} rows={6} className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2 text-sm text-white resize-y" /></div>
        <div className="flex gap-3 justify-end pt-4">
          <a href="/venha-nos-conhecer" target="_blank" className="px-4 py-2 text-sm text-[#888] hover:text-primary">Ver página ↗</a>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm">{saving ? "Salvando..." : "💾 Salvar"}</button>
        </div>
      </div>
    </AdminLayout>
  );
}
