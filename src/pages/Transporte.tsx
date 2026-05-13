import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lightbox } from "@/components/Lightbox";

const Transporte = () => {
  const [content, setContent] = useState<any>(null);
  const [waNum, setWaNum] = useState("5514997145610");
  const [lightbox, setLightbox] = useState<number | null>(null);
  useScrollAnimation();

  useEffect(() => {
    supabase.from("transporte_content").select("*").limit(1).maybeSingle().then(({ data }) => setContent(data));
    supabase.from("site_config").select("whatsapp_number").limit(1).maybeSingle().then(({ data }) => { if (data?.whatsapp_number) setWaNum(data.whatsapp_number); });
  }, []);

  const highlights = content ? [1, 2, 3, 4, 5, 6].map(n => ({
    icon: content[`highlight_${n}_icon`],
    title: content[`highlight_${n}_title`],
    text: content[`highlight_${n}_text`],
  })).filter(h => h.title) : [];

  const photos = content
    ? [content.photo_main_url, content.photo_2_url, content.photo_3_url, content.photo_4_url].filter(Boolean)
    : [];

  const waMsg = encodeURIComponent(content?.whatsapp_message || "Olá! Gostaria de agendar o transporte para o meu pet.");

  return (
    <PublicLayout>
      <PageHero
        badge="🚐 Transporte"
        title={content?.page_title || "Transporte Pet"}
        subtitle={content?.page_subtitle || "Buscamos e levamos seu pet com segurança e carinho"}
        bgImage={content?.hero_image_url || undefined}
      />

      {/* Intro */}
      <section className="py-20" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <p data-animate="fade-up" className="text-[#444] text-lg leading-[1.8] text-center" style={{ fontFamily: "Inter" }}>
            {content?.intro_text}
          </p>
        </div>
      </section>

      {/* Highlights / Selos */}
      {highlights.length > 0 && (
        <section className="py-20" style={{ background: "#F8F8F6" }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((h, i) => (
                <div key={i} data-animate="card" data-delay={String(Math.min(i, 5))} className="bg-white rounded-[18px] p-8 text-center border border-[#E8E8E8] shadow-sm">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                    {h.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-black mb-2">{h.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed" style={{ fontFamily: "Inter" }}>{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Description */}
      {content?.description_text && (
        <section className="py-20" style={{ background: "#FFFFFF" }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <p data-animate="fade-up" className="text-[#444] text-base leading-[1.8] text-center" style={{ fontFamily: "Inter" }}>
              {content.description_text}
            </p>
          </div>
        </section>
      )}

      {/* Driver + main photo */}
      {(content?.driver_section_title || content?.photo_main_url) && (
        <section className="py-20" style={{ background: "#0D0D0D" }}>
          <div className="container mx-auto px-4 max-w-5xl">
            {content?.driver_section_title && (
              <h2 data-animate="fade-up" className="section-title text-white text-center mb-4">{content.driver_section_title}</h2>
            )}
            {content?.driver_text && (
              <p data-animate="fade-up" data-delay="1" className="text-[#AAA] text-center max-w-2xl mx-auto mb-10" style={{ fontFamily: "Inter" }}>
                {content.driver_text}
              </p>
            )}
            {content?.photo_main_url && (
              <button
                data-animate="fade-scale"
                onClick={() => setLightbox(0)}
                className="block w-full rounded-2xl overflow-hidden bg-[#222] aspect-[16/10] group"
              >
                <img
                  src={content.photo_main_url}
                  alt={content.driver_name || "Motorista"}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Extra gallery (3 secondary photos) */}
      {photos.length > 1 && (
        <section className="py-20" style={{ background: "#FAFAF8" }}>
          <div className="container mx-auto px-4">
            {content?.gallery_section_title && (
              <h2 data-animate="fade-up" className="section-title text-black text-center mb-10">{content.gallery_section_title}</h2>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              {photos.slice(1).map((url: string, idx: number) => (
                <button
                  key={idx}
                  data-animate="fade-scale"
                  data-delay={String(idx)}
                  onClick={() => setLightbox(idx + 1)}
                  className="group relative w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] aspect-[4/3] rounded-2xl overflow-hidden bg-[#222] shadow-md hover:shadow-[0_15px_40px_-10px_rgba(245,192,0,0.4)] transition-all duration-500"
                >
                  <img
                    src={url}
                    alt={`Transporte ${idx + 2}`}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20" style={{ background: "#F5C000" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 data-animate="fade-up" className="font-heading font-extrabold text-black text-2xl lg:text-3xl mb-6">
            {content?.cta_title || "Quer agendar o transporte?"}
          </h2>
          <a data-animate="fade-up" data-delay="1" href={`https://wa.me/${waNum}?text=${waMsg}`} target="_blank" rel="noopener noreferrer" className="btn-dark inline-flex items-center gap-2 text-lg">
            <MessageCircle className="w-6 h-6" />
            {content?.cta_btn_text || "🚐 Agendar pelo WhatsApp"}
          </a>
        </div>
      </section>

      {lightbox !== null && photos.length > 0 && (
        <Lightbox
          images={photos.map((url: string, i: number) => ({ url, title: i === 0 ? (content?.driver_name || "Motorista") : `Transporte ${i + 1}` }))}
          initialIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </PublicLayout>
  );
};

export default Transporte;
