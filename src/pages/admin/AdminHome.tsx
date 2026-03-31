import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminHome() {
  const { toast } = useToast();
  const [config, setConfig] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [saving, setSaving] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [sobreTitle, setSobreTitle] = useState("");
  const [sobreText, setSobreText] = useState("");

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const { data: cfg } = await supabase.from("site_config").select("*").limit(1).single();
    if (cfg) {
      setConfig(cfg);
      setHeroTitle(cfg.hero_title || "");
      setHeroSubtitle(cfg.hero_subtitle || "");
      setSobreTitle(cfg.sobre_title || "");
      setSobreText(cfg.sobre_text || "");
    }
    const { data: secs } = await supabase.from("home_sections").select("*").order("display_order");
    setSections(secs || []);
  };

  const saveHero = async () => {
    setSaving("hero");
    const { error } = await supabase.from("site_config").update({ hero_title: heroTitle, hero_subtitle: heroSubtitle }).eq("id", config.id);
    setSaving("");
    toast({ title: error ? "Erro ao salvar" : "✅ Hero salvo!", variant: error ? "destructive" : "default" });
  };

  const saveSobre = async () => {
    setSaving("sobre");
    const { error } = await supabase.from("site_config").update({ sobre_title: sobreTitle, sobre_text: sobreText }).eq("id", config.id);
    setSaving("");
    toast({ title: error ? "Erro ao salvar" : "✅ Sobre salvo!", variant: error ? "destructive" : "default" });
  };

  const toggleSection = async (id: string, active: boolean) => {
    await supabase.from("home_sections").update({ is_active: !active }).eq("id", id);
    loadData();
    toast({ title: `Seção ${!active ? "ativada" : "desativada"}` });
  };

  if (!config) return <AdminLayout title="🏠 Gerenciar Home"><div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full" style={{ animation: 'spinSmooth 1s linear infinite' }} /></div></AdminLayout>;

  return (
    <AdminLayout title="🏠 Gerenciar Home">
      {/* Hero Editor */}
      <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07] mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-white">Editor do Hero</h2>
          <a href="/" target="_blank" className="text-xs text-primary hover:underline">Ver página →</a>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[#A1A1AA] uppercase tracking-wider font-heading mb-1 block">Título Principal ({heroTitle.length}/80)</label>
            <input value={heroTitle} onChange={e => setHeroTitle(e.target.value)} maxLength={80} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white text-sm focus:border-primary outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs text-[#A1A1AA] uppercase tracking-wider font-heading mb-1 block">Subtítulo ({heroSubtitle.length}/200)</label>
            <textarea value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} maxLength={200} rows={3} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white text-sm focus:border-primary outline-none transition-colors resize-none" />
          </div>
          <button onClick={saveHero} disabled={saving === "hero"} className="bg-primary text-black font-heading font-bold px-6 py-2.5 rounded-lg hover:bg-primary-vibrant transition-colors disabled:opacity-50">
            {saving === "hero" ? "Salvando..." : "💾 Salvar Hero"}
          </button>
        </div>
      </div>

      {/* Sobre Editor */}
      <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07] mb-6">
        <h2 className="font-heading font-semibold text-white mb-4">Sobre o Petshop</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[#A1A1AA] uppercase tracking-wider font-heading mb-1 block">Título da Seção Sobre</label>
            <input value={sobreTitle} onChange={e => setSobreTitle(e.target.value)} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white text-sm focus:border-primary outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs text-[#A1A1AA] uppercase tracking-wider font-heading mb-1 block">Texto de Apresentação</label>
            <textarea value={sobreText} onChange={e => setSobreText(e.target.value)} rows={8} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white text-sm focus:border-primary outline-none transition-colors resize-none" />
          </div>
          <button onClick={saveSobre} disabled={saving === "sobre"} className="bg-primary text-black font-heading font-bold px-6 py-2.5 rounded-lg hover:bg-primary-vibrant transition-colors disabled:opacity-50">
            {saving === "sobre" ? "Salvando..." : "💾 Salvar Sobre"}
          </button>
        </div>
      </div>

      {/* Home Sections */}
      <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
        <h2 className="font-heading font-semibold text-white mb-4">Cards das Páginas</h2>
        <div className="space-y-3">
          {sections.map((s) => (
            <div key={s.id} className="flex items-center justify-between bg-[#27272A] rounded-xl px-4 py-3 border border-[#3F3F46]">
              <div>
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
    </AdminLayout>
  );
}
