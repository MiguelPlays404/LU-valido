import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";

export default function AdminConfig() {
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
    toast({ title: error ? "Erro ao salvar" : "✅ Configurações salvas!" });
    setSaving(false);
  };

  if (!config) return <AdminLayout title="Configurações Gerais"><div className="text-[#666]">Carregando...</div></AdminLayout>;

  const fields = [
    { key: "site_name", label: "Nome do Petshop" },
    { key: "site_slogan", label: "Slogan" },
    { key: "whatsapp_number", label: "WhatsApp (apenas números)" },
    { key: "whatsapp_message", label: "Mensagem padrão WhatsApp", type: "textarea" },
    { key: "address_full", label: "Endereço completo", type: "textarea" },
    { key: "google_maps_url", label: "Link Google Maps" },
    { key: "instagram_url", label: "Link Instagram" },
  ];

  return (
    <AdminLayout title="Configurações Gerais">
      <div className="max-w-2xl space-y-6">
        {fields.map(f => (
          <div key={f.key}>
            <label className="text-xs text-[#666] mb-1 block font-body">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea value={config[f.key] || ""} onChange={e => setConfig({...config, [f.key]: e.target.value})} rows={2} className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2 text-sm text-white resize-y" />
            ) : (
              <input value={config[f.key] || ""} onChange={e => setConfig({...config, [f.key]: e.target.value})} className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2 text-sm text-white" />
            )}
          </div>
        ))}
        
        {config.google_maps_url && (
          <a href={config.google_maps_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-primary hover:underline">
            <ExternalLink className="w-3.5 h-3.5" /> Testar link do Maps
          </a>
        )}

        <div className="flex gap-3 justify-end pt-4">
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm">{saving ? "Salvando..." : "💾 Salvar"}</button>
        </div>
      </div>
    </AdminLayout>
  );
}
