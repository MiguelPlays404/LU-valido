import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const networks = [
  { key: "instagram", activeKey: "instagram_active", label: "Instagram", urlKey: "instagram_url" },
  { key: "whatsapp", activeKey: "whatsapp_active", label: "WhatsApp", urlKey: "whatsapp_number" },
  { key: "facebook", activeKey: "facebook_active", label: "Facebook", urlKey: "facebook_url" },
  { key: "tiktok", activeKey: "tiktok_active", label: "TikTok", urlKey: "tiktok_url" },
  { key: "youtube", activeKey: "youtube_active", label: "YouTube", urlKey: "youtube_url" },
];

export default function AdminSocial() {
  const [config, setConfig] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("site_config").select("*").limit(1).single().then(({ data }) => { if (data) setConfig(data); });
  }, []);

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    const { error } = await supabase.from("site_config").update(config).eq("id", config.id);
    toast({ title: error ? "Erro ao salvar" : "✅ Redes sociais salvas!" });
    setSaving(false);
  };

  if (!config) return <AdminLayout title="Redes Sociais"><div className="text-[#666]">Carregando...</div></AdminLayout>;

  return (
    <AdminLayout title="Redes Sociais">
      <div className="max-w-2xl space-y-6">
        {networks.map(n => (
          <div key={n.key} className="bg-[#1A1A1A] rounded-xl p-5 border border-[#222]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-heading font-semibold text-white">{n.label}</span>
              <button onClick={() => setConfig({...config, [n.activeKey]: !config[n.activeKey]})}
                className={`w-10 h-6 rounded-full transition-colors ${config[n.activeKey] ? "bg-primary" : "bg-[#333]"}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform mx-1 ${config[n.activeKey] ? "translate-x-4" : ""}`} />
              </button>
            </div>
            <input value={config[n.urlKey] || ""} onChange={e => setConfig({...config, [n.urlKey]: e.target.value})}
              placeholder={n.key === "whatsapp" ? "5514997145610" : `https://${n.key}.com/...`}
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white" />
          </div>
        ))}
        <div className="flex justify-end pt-4">
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm">{saving ? "Salvando..." : "💾 Salvar"}</button>
        </div>
      </div>
    </AdminLayout>
  );
}
