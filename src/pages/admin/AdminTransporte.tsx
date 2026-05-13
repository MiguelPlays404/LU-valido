import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { MediaUploader } from "@/components/MediaUploader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminTransporte() {
  const [content, setContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("transporte_content").select("*").limit(1).maybeSingle().then(({ data }) => setContent(data));
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    const { id, updated_at, ...rest } = content;
    const { error } = await supabase.from("transporte_content").update(rest).eq("id", id);
    toast({ title: error ? "Erro ao salvar" : "✅ Salvo!" });
    setSaving(false);
  };

  if (!content) return <AdminLayout title="Transporte"><div className="text-[#71717A]">Carregando...</div></AdminLayout>;

  const set = (k: string, v: any) => setContent({ ...content, [k]: v });

  const textFields: { key: string; label: string; type?: "input" | "textarea" }[] = [
    { key: "page_title", label: "Título da Página" },
    { key: "page_subtitle", label: "Subtítulo da Página" },
    { key: "intro_text", label: "Texto de Introdução", type: "textarea" },
    { key: "highlight_1_icon", label: "Selo 1 - Ícone (emoji)" },
    { key: "highlight_1_title", label: "Selo 1 - Título" },
    { key: "highlight_1_text", label: "Selo 1 - Texto", type: "textarea" },
    { key: "highlight_2_icon", label: "Selo 2 - Ícone (emoji)" },
    { key: "highlight_2_title", label: "Selo 2 - Título" },
    { key: "highlight_2_text", label: "Selo 2 - Texto", type: "textarea" },
    { key: "highlight_3_icon", label: "Selo 3 - Ícone (emoji)" },
    { key: "highlight_3_title", label: "Selo 3 - Título" },
    { key: "highlight_3_text", label: "Selo 3 - Texto", type: "textarea" },
    { key: "highlight_4_icon", label: "Selo 4 - Ícone (emoji)" },
    { key: "highlight_4_title", label: "Selo 4 - Título" },
    { key: "highlight_4_text", label: "Selo 4 - Texto", type: "textarea" },
    { key: "highlight_5_icon", label: "Selo 5 - Ícone (emoji)" },
    { key: "highlight_5_title", label: "Selo 5 - Título" },
    { key: "highlight_5_text", label: "Selo 5 - Texto", type: "textarea" },
    { key: "highlight_6_icon", label: "Selo 6 - Ícone (emoji)" },
    { key: "highlight_6_title", label: "Selo 6 - Título" },
    { key: "highlight_6_text", label: "Selo 6 - Texto", type: "textarea" },
    { key: "description_text", label: "Descrição do Serviço", type: "textarea" },
    { key: "driver_section_title", label: "Título da Seção do Motorista" },
    { key: "driver_name", label: "Nome do Motorista" },
    { key: "driver_text", label: "Texto sobre o Motorista", type: "textarea" },
    { key: "gallery_section_title", label: "Título da Galeria" },
    { key: "cta_title", label: "Título do CTA" },
    { key: "cta_btn_text", label: "Texto do Botão CTA" },
    { key: "whatsapp_message", label: "Mensagem WhatsApp", type: "textarea" },
  ];

  const imageFields = [
    { key: "hero_image_url", label: "Imagem/Vídeo do Topo (Hero)", path: "transporte/hero", accept: "both" as const },
    { key: "photo_main_url", label: "Foto principal (motorista + veículo)", path: "transporte/main", accept: "image" as const },
    { key: "photo_2_url", label: "Foto extra 2", path: "transporte/extras", accept: "image" as const },
    { key: "photo_3_url", label: "Foto extra 3", path: "transporte/extras", accept: "image" as const },
    { key: "photo_4_url", label: "Foto extra 4", path: "transporte/extras", accept: "image" as const },
  ];

  return (
    <AdminLayout title="Transporte">
      <div className="max-w-2xl space-y-6">
        {imageFields.map(f => (
          <div key={f.key}>
            <label className="text-xs text-[#A1A1AA] uppercase tracking-wider font-heading mb-2 block">{f.label}</label>
            <MediaUploader accept={f.accept} pathPrefix={f.path} currentUrl={content[f.key]} onUploaded={(url) => set(f.key, url)} label="" />
            {content[f.key] && (
              <button onClick={() => set(f.key, "")} className="text-xs text-red-400 hover:text-red-300 mt-1">Remover imagem</button>
            )}
          </div>
        ))}

        {textFields.map(f => (
          <div key={f.key}>
            <label className="text-xs text-[#A1A1AA] uppercase tracking-wider font-heading mb-1 block">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea value={content[f.key] || ""} onChange={e => set(f.key, e.target.value)} rows={3} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white resize-y" />
            ) : (
              <input value={content[f.key] || ""} onChange={e => set(f.key, e.target.value)} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white" />
            )}
          </div>
        ))}

        <div className="flex gap-3 justify-end pt-4 sticky bottom-0 bg-[#09090B] py-3">
          <a href="/transporte" target="_blank" className="px-4 py-2 text-sm text-[#A1A1AA] hover:text-primary">Ver página ↗</a>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm">{saving ? "Salvando..." : "💾 Salvar"}</button>
        </div>
      </div>
    </AdminLayout>
  );
}
