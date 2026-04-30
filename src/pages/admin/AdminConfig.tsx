import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Upload } from "lucide-react";

export default function AdminConfig() {
  const [config, setConfig] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleLogoUpload = async (files: FileList | null) => {
    if (!files?.[0]) return;
    setUploading(true);
    const file = files[0];
    const path = `branding/logo_${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from("levillepet-media").upload(path, file);
    if (error) { toast({ title: "Erro no upload" }); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("levillepet-media").getPublicUrl(path);
    setConfig({ ...config, logo_url: urlData.publicUrl });
    toast({ title: "✅ Logo enviada! Clique em Salvar." });
    setUploading(false);
  };

  if (!config) return <AdminLayout title="Configurações Gerais"><div className="text-[#71717A]">Carregando...</div></AdminLayout>;

  const Field = ({ label, field, type }: { label: string; field: string; type?: string }) => (
    <div>
      <label className="text-xs text-[#A1A1AA] uppercase tracking-wider font-heading mb-1 block">{label}</label>
      {type === "textarea" ? (
        <textarea value={config[field] || ""} onChange={e => setConfig({...config, [field]: e.target.value})} rows={2} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white resize-y" />
      ) : (
        <input value={config[field] || ""} onChange={e => setConfig({...config, [field]: e.target.value})} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white" />
      )}
    </div>
  );

  return (
    <AdminLayout title="Configurações Gerais">
      <div className="max-w-2xl space-y-6">
        {/* Identity */}
        <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
          <h3 className="font-heading font-semibold text-white text-sm mb-4">Identidade</h3>
          <div className="space-y-4">
            <Field label="Nome do Petshop" field="site_name" />
            <Field label="Slogan" field="site_slogan" />
          </div>
        </div>

        {/* Logo */}
        <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
          <h3 className="font-heading font-semibold text-white text-sm mb-4">Logo</h3>
          <div className="flex items-center gap-4">
            {config.logo_url ? (
              <img src={config.logo_url} alt="Logo" className="h-16 w-16 rounded-lg object-contain bg-[#27272A]" />
            ) : (
              <div className="h-16 w-16 rounded-lg bg-[#27272A] flex items-center justify-center text-[#71717A] text-xs">Sem logo</div>
            )}
            <label className="flex items-center gap-2 text-sm text-primary cursor-pointer hover:underline">
              <Upload className="w-4 h-4" /> {uploading ? "Enviando..." : "Enviar nova logo"}
              <input type="file" accept="image/*" className="hidden" onChange={e => handleLogoUpload(e.target.files)} disabled={uploading} />
            </label>
          </div>
          {config.logo_url && (
            <button onClick={() => setConfig({...config, logo_url: ''})} className="text-xs text-red-400 mt-2 hover:underline">Remover logo</button>
          )}
        </div>

        {/* WhatsApp & Telefone */}
        <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
          <h3 className="font-heading font-semibold text-white text-sm mb-4">Telefones & WhatsApp</h3>
          <div className="space-y-4">
            <Field label="📞 Telefone Fixo (ex: (14) 3204-7040)" field="fixed_phone" />
            <Field label="WhatsApp — Número (apenas dígitos, ex: 5514997145610)" field="whatsapp_number" />
            <Field label="Mensagem padrão WhatsApp" field="whatsapp_message" type="textarea" />
          </div>
        </div>

        {/* Address */}
        <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
          <h3 className="font-heading font-semibold text-white text-sm mb-4">Localização</h3>
          <div className="space-y-4">
            <Field label="Endereço Linha 1 (nome do local)" field="address_line1" />
            <Field label="Endereço Linha 2 (rua e número)" field="address_line2" />
            <Field label="Endereço Linha 3 (bairro, cidade, CEP)" field="address_line3" />
            <Field label="Link Google Maps" field="google_maps_url" />
            <Field label="Google Maps Embed URL (para iframe)" field="google_maps_embed" />
            {config.google_maps_url && (
              <a href={config.google_maps_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-primary hover:underline">
                <ExternalLink className="w-3.5 h-3.5" /> Testar link do Maps
              </a>
            )}
          </div>
        </div>

        {/* Instagram */}
        <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
          <h3 className="font-heading font-semibold text-white text-sm mb-4">Instagram</h3>
          <Field label="URL do Instagram" field="instagram_url" />
        </div>

        {/* Footer */}
        <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
          <h3 className="font-heading font-semibold text-white text-sm mb-4">Footer</h3>
          <div className="space-y-4">
            <Field label="Descrição curta no footer" field="footer_description" type="textarea" />
            <Field label="Texto de copyright" field="copyright_text" />
          </div>
        </div>

        {/* Fale Conosco page */}
        <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
          <h3 className="font-heading font-semibold text-white text-sm mb-4">Página Fale Conosco</h3>
          <div className="space-y-4">
            <Field label="Título da página" field="faleconosco_title" />
            <Field label="Subtítulo" field="faleconosco_subtitle" />
            <Field label="Título do card WhatsApp" field="faleconosco_card_title" />
            <Field label="Texto do card" field="faleconosco_card_text" type="textarea" />
            <Field label="Texto do botão" field="faleconosco_btn_text" />
          </div>
        </div>

        {/* Localização page */}
        <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07]">
          <h3 className="font-heading font-semibold text-white text-sm mb-4">Página Localização</h3>
          <div className="space-y-4">
            <Field label="Título" field="localizacao_title" />
            <Field label="Subtítulo" field="localizacao_subtitle" />
            <Field label="Texto botão Maps" field="localizacao_maps_btn_text" />
            <Field label="Texto botão Rota" field="localizacao_route_btn_text" />
            <Field label="Texto 'Como Chegar'" field="localizacao_howto_text" type="textarea" />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm">{saving ? "Salvando..." : "💾 Salvar Tudo"}</button>
        </div>
      </div>
    </AdminLayout>
  );
}
