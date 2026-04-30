import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { AdminAccessField } from "./AdminAccessField";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function Footer() {
  useScrollAnimation();
  const [c, setC] = useState<any>(null);
  const [footerLinks, setFooterLinks] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("site_config").select("*").limit(1).maybeSingle(),
      supabase.from("nav_items").select("*").eq("is_active", true).eq("show_in_footer", true).order("display_order"),
    ]).then(([cfg, nav]) => {
      setC(cfg.data);
      setFooterLinks(nav.data || []);
    });
  }, []);

  const waNum = c?.whatsapp_number || '5514997145610';
  const phone = `(${waNum.slice(2,4)}) ${waNum.slice(4,9)}-${waNum.slice(9)}`;

  return (
    <footer style={{ background: '#111111' }} className="pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            {c?.logo_url ? (
              <img src={c.logo_url} alt={c?.site_name || 'Le Ville Pet'} className="h-11 rounded-lg mb-3" />
            ) : (
              <div className="flex items-center gap-2 mb-3">
                <img src="/images/logo-levillepet.png" alt="Le Ville Pet" className="h-11 rounded-lg" />
              </div>
            )}
            <p className="font-heading italic text-primary text-[15px] mb-3">"{c?.site_slogan || 'a gente se entende'}"</p>
            <p className="text-[#888] text-sm leading-relaxed mb-4" style={{ fontFamily: 'Inter' }}>
              {c?.footer_description || 'Cuidamos do seu pet com amor em Bauru-SP.'}
            </p>
            <div className="flex gap-3">
              {(c?.footer_show_instagram ?? true) && (
                <a href={c?.instagram_url || "https://www.instagram.com/levillepetbauru/"} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/40 transition-all" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {(c?.footer_show_whatsapp ?? true) && (
                <a href={`https://wa.me/${waNum}`} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all" aria-label="WhatsApp">
                  <Phone className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4">{c?.footer_nav_title || 'Navegação'}</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link key={link.id} to={link.path} className="text-[#888] text-sm hover:text-primary transition-colors" style={{ fontFamily: 'Inter' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4">{c?.footer_contact_title || 'Contato'}</h3>
            <div className="flex flex-col gap-3 text-sm mb-6" style={{ fontFamily: 'Inter' }}>
              {c?.fixed_phone && (
                <a href={`tel:${c.fixed_phone.replace(/\D/g,'')}`} className="flex items-center gap-2 text-[#888] hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary" /> {c.fixed_phone}
                </a>
              )}
              <a href={`https://wa.me/${waNum}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#888] hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> {phone} <span className="text-[10px] text-[#25D366]">WhatsApp</span>
              </a>
              <a href={c?.google_maps_url || "https://maps.app.goo.gl/nkuDnVyBe6ZHYNbS8"} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-[#888] hover:text-primary transition-colors">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{c?.address_line1 || 'Villaggio Mall Center'}<br />{c?.address_line2 || 'Av. Affonso José Aiello, 14-45 - Loja 19'}<br />{c?.address_line3 || 'Vila Aviação, Bauru-SP'}</span>
              </a>
              <a href={c?.instagram_url || "https://www.instagram.com/levillepetbauru/"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#888] hover:text-primary transition-colors">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                {c?.instagram_handle || '@levillepetbauru'}
              </a>
            </div>
          </div>
        </div>

        <div data-animate="fade-up" className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <AdminAccessField />
          <p className="text-[#444] text-[13px]" style={{ fontFamily: 'Inter' }}>
            {c?.copyright_text || '© 2026 Le Ville Pet — Todos os direitos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
