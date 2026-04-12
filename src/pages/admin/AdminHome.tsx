import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminHome() {
  const { toast } = useToast();
  const [config, setConfig] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [saving, setSaving] = useState("");
  const [editSection, setEditSection] = useState<any>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const { data: cfg } = await supabase.from("site_config").select("*").limit(1).single();
    if (cfg) setConfig(cfg);
    const { data: secs } = await supabase.from("home_sections").select("*").order("display_order");
    setSections(secs || []);
  };

  const saveFields = async (fields: Record<string, any>, label: string) => {
    setSaving(label);
    const { error } = await supabase.from("site_config").update(fields).eq("id", config.id);
    setSaving("");
    toast({ title: error ? "Erro ao salvar" : `✅ ${label} salvo!` });
    if (!error) setConfig({ ...config, ...fields });
  };

  const toggleSection = async (id: string, active: boolean) => {
    await supabase.from("home_sections").update({ is_active: !active }).eq("id", id);
    loadData();
    toast({ title: `Seção ${!active ? "ativada" : "desativada"}` });
  };

  const saveSection = async () => {
    if (!editSection) return;
    await supabase.from("home_sections").update({ title: editSection.title, description: editSection.description }).eq("id", editSection.id);
    toast({ title: "✅ Card atualizado!" });
    setEditSection(null);
    loadData();
  };

  if (!config) return <AdminLayout title="🏠 Gerenciar Home"><div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full" style={{ animation: 'spinSmooth 1s linear infinite' }} /></div></AdminLayout>;

  const Field = ({ label, field, max, textarea }: { label: string; field: string; max?: number; textarea?: boolean }) => (
    <div>
      <label className="text-xs text-[#A1A1AA] uppercase tracking-wider font-heading mb-1 block">{label} {max && `(${(config[field] || '').length}/${max})`}</label>
      {textarea ? (
        <textarea value={config[field] || ""} onChange={e => setConfig({ ...config, [field]: e.target.value })} maxLength={max} rows={3} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white text-sm focus:border-primary outline-none transition-colors resize-none" />
      ) : (
        <input value={config[field] || ""} onChange={e => setConfig({ ...config, [field]: e.target.value })} maxLength={max} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white text-sm focus:border-primary outline-none transition-colors" />
      )}
    </div>
  );

  const SaveBtn = ({ label, fields }: { label: string; fields: string[] }) => (
    <button onClick={() => saveFields(Object.fromEntries(fields.map(f => [f, config[f]])), label)} disabled={saving === label} className="bg-primary text-black font-heading font-bold px-6 py-2.5 rounded-lg hover:bg-primary-vibrant transition-colors disabled:opacity-50">
      {saving === label ? "Salvando..." : `💾 Salvar ${label}`}
    </button>
  );

  return (
    <AdminLayout title="🏠 Gerenciar Home">
      {/* Hero Editor */}
      <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07] mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-white">Editor do Hero</h2>
          <a href="/" target="_blank" className="text-xs text-primary hover:underline">Ver página →</a>
        </div>
        <div className="space-y-4">
          <Field label="Título Principal" field="hero_title" max={80} />
          <Field label="Palavra em Destaque (amarela)" field="hero_highlight_word" />
          <Field label="Subtítulo" field="hero_subtitle" max={200} textarea />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Texto Botão Primário" field="hero_btn_primary_text" />
            <Field label="Texto Botão Secundário" field="hero_btn_secondary_text" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Stat 1 Número" field="hero_stat_1_num" />
            <Field label="Stat 1 Label" field="hero_stat_1_label" />
            <div />
            <Field label="Stat 2 Número" field="hero_stat_2_num" />
            <Field label="Stat 2 Label" field="hero_stat_2_label" />
            <div />
            <Field label="Stat 3 Número" field="hero_stat_3_num" />
            <Field label="Stat 3 Label" field="hero_stat_3_label" />
          </div>
          <SaveBtn label="Hero" fields={["hero_title","hero_highlight_word","hero_subtitle","hero_btn_primary_text","hero_btn_secondary_text","hero_stat_1_num","hero_stat_1_label","hero_stat_2_num","hero_stat_2_label","hero_stat_3_num","hero_stat_3_label"]} />
        </div>
      </div>

      {/* Sobre Editor */}
      <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07] mb-6">
        <h2 className="font-heading font-semibold text-white mb-4">Sobre o Petshop</h2>
        <div className="space-y-4">
          <Field label="Título da Seção" field="sobre_title" />
          <Field label="Texto de Apresentação" field="sobre_text" textarea />
          <Field label="Texto do CTA" field="sobre_cta_text" />
          <Field label="URL da Imagem" field="sobre_image_url" />
          <SaveBtn label="Sobre" fields={["sobre_title","sobre_text","sobre_cta_text","sobre_image_url"]} />
        </div>
      </div>

      {/* Gallery/Video Section Titles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
          <h2 className="font-heading font-semibold text-white mb-4">Seção Galeria</h2>
          <div className="space-y-4">
            <Field label="Título" field="gallery_section_title" />
            <Field label="Subtítulo" field="gallery_section_subtitle" />
            <SaveBtn label="Galeria" fields={["gallery_section_title","gallery_section_subtitle"]} />
          </div>
        </div>
        <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
          <h2 className="font-heading font-semibold text-white mb-4">Seção Vídeo</h2>
          <div className="space-y-4">
            <Field label="Título" field="video_section_title" />
            <Field label="Subtítulo" field="video_section_subtitle" />
            <SaveBtn label="Vídeo" fields={["video_section_title","video_section_subtitle"]} />
          </div>
        </div>
      </div>

      {/* CTA Hotel */}
      <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07] mb-6">
        <h2 className="font-heading font-semibold text-white mb-4">CTA Hotelzinho (faixa amarela)</h2>
        <div className="space-y-4">
          <Field label="Título" field="cta_hotel_title" />
          <Field label="Texto Descritivo" field="cta_hotel_text" textarea />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Botão 1" field="cta_hotel_btn1_text" />
            <Field label="Botão 2" field="cta_hotel_btn2_text" />
          </div>
          <Field label="URL da Imagem" field="cta_hotel_image_url" />
          <SaveBtn label="CTA Hotel" fields={["cta_hotel_title","cta_hotel_text","cta_hotel_btn1_text","cta_hotel_btn2_text","cta_hotel_image_url"]} />
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07] mb-6">
        <h2 className="font-heading font-semibold text-white mb-4">Textos dos Botões de Contato</h2>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Botão WhatsApp" field="contact_whatsapp_btn_text" />
          <Field label="Botão Mapa" field="contact_maps_btn_text" />
          <Field label="Botão Instagram" field="contact_instagram_btn_text" />
        </div>
        <div className="mt-4">
          <SaveBtn label="Contato" fields={["contact_whatsapp_btn_text","contact_maps_btn_text","contact_instagram_btn_text"]} />
        </div>
      </div>

      {/* Home Sections / Cards */}
      <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
        <h2 className="font-heading font-semibold text-white mb-4">Cards das Páginas</h2>
        <div className="space-y-3">
          {sections.map((s) => (
            <div key={s.id} className="flex items-center justify-between bg-[#27272A] rounded-xl px-4 py-3 border border-[#3F3F46]">
              <div className="flex-1 cursor-pointer" onClick={() => setEditSection({ ...s })}>
                <p className="text-white text-sm font-heading font-semibold">{s.title}</p>
                <p className="text-[#71717A] text-xs">{s.description}</p>
              </div>
              <button onClick={() => toggleSection(s.id, s.is_active)} className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors ${s.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {s.is_active ? "Ativo" : "Inativo"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Section Modal */}
      {editSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setEditSection(null)}>
          <div className="bg-[#18181B] rounded-2xl p-6 max-w-md w-full mx-4 border border-[#3F3F46]" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading font-bold text-white mb-4">Editar Card</h3>
            <div className="space-y-4">
              <div><label className="text-xs text-[#A1A1AA] mb-1 block">Título</label><input value={editSection.title} onChange={e => setEditSection({...editSection, title: e.target.value})} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white" /></div>
              <div><label className="text-xs text-[#A1A1AA] mb-1 block">Descrição</label><textarea value={editSection.description} onChange={e => setEditSection({...editSection, description: e.target.value})} rows={3} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white resize-none" /></div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setEditSection(null)} className="px-4 py-2 text-sm text-[#A1A1AA]">Cancelar</button>
                <button onClick={saveSection} className="btn-primary text-sm">Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
