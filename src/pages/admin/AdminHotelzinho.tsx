import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminHotelzinho() {
  const [content, setContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("hotelzinho_content").select("*").limit(1).single().then(({ data }) => { if (data) setContent(data); });
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    const { error } = await supabase.from("hotelzinho_content").update(content).eq("id", content.id);
    toast({ title: error ? "Erro ao salvar" : "✅ Conteúdo salvo!" });
    setSaving(false);
  };

  if (!content) return <AdminLayout title="Hotelzinho"><div className="text-[#666]">Carregando...</div></AdminLayout>;

  const fields = [
    { key: "page_title", label: "Título da Página", type: "input" },
    { key: "intro_text", label: "Texto de Introdução", type: "textarea" },
    { key: "description_block_1", label: "Bloco de Texto 1", type: "textarea" },
    { key: "description_block_2", label: "Bloco de Texto 2", type: "textarea" },
    { key: "description_block_3", label: "Bloco de Texto 3", type: "textarea" },
    { key: "highlight_1_title", label: "Destaque 1 - Título", type: "input" },
    { key: "highlight_1_text", label: "Destaque 1 - Texto", type: "textarea" },
    { key: "highlight_2_title", label: "Destaque 2 - Título", type: "input" },
    { key: "highlight_2_text", label: "Destaque 2 - Texto", type: "textarea" },
    { key: "highlight_3_title", label: "Destaque 3 - Título", type: "input" },
    { key: "highlight_3_text", label: "Destaque 3 - Texto", type: "textarea" },
    { key: "cta_text", label: "Texto do Botão CTA", type: "input" },
  ];

  return (
    <AdminLayout title="Hotelzinho">
      <div className="max-w-2xl space-y-6">
        {fields.map(f => (
          <div key={f.key}>
            <label className="text-xs text-[#666] mb-1 block font-body">{f.label}</label>
            {f.type === "input" ? (
              <input value={content[f.key] || ""} onChange={e => setContent({ ...content, [f.key]: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2 text-sm text-white" />
            ) : (
              <textarea value={content[f.key] || ""} onChange={e => setContent({ ...content, [f.key]: e.target.value })} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2 text-sm text-white resize-y" />
            )}
          </div>
        ))}
        <div className="flex gap-3 justify-end pt-4">
          <a href="/hotelzinho" target="_blank" className="px-4 py-2 text-sm text-[#888] hover:text-primary">Ver página ↗</a>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm">{saving ? "Salvando..." : "💾 Salvar"}</button>
        </div>
      </div>
    </AdminLayout>
  );
}
