import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Video, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Lightbox } from "@/components/Lightbox";
import { supabase } from "@/integrations/supabase/client";

const VenhaNosConhecer = () => {
  const [content, setContent] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  useScrollAnimation();

  useEffect(() => {
    supabase.from("conhecer_content").select("*").limit(1).single().then(({ data }) => setContent(data));
    supabase.from("photos").select("*").eq("is_active", true).eq("category", "conhecer").order("display_order").then(({ data }) => setPhotos(data || []));
  }, []);

  return (
    <PublicLayout>
      <PageHero
        badge="📍 Venha Nos Conhecer"
        title={content?.page_title || "Conheça o Nosso Espaço"}
        subtitle={content?.page_subtitle || "Um ambiente preparado com amor para você e seu pet"}
        tall
      />

      {/* About — WHITE */}
      <section className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 data-animate="fade-up" className="section-title text-black mb-5">
                Sobre o <span className="text-primary">Le Ville Pet</span>
              </h2>
              <div data-animate="fade-up" data-delay="1" className="text-[#444] text-base leading-relaxed whitespace-pre-line" style={{ fontFamily: 'Inter' }}>
                {content?.about_text || 'O Le Ville Pet nasceu do amor pelos animais e da vontade de oferecer um espaço de confiança.'}
              </div>
            </div>
            <div data-animate="fade-right" data-delay="2" className="grid grid-cols-2 gap-3">
              {photos.slice(0, 3).map((photo, i) => (
                <button
                  key={photo.id}
                  className={`rounded-xl overflow-hidden cursor-pointer group ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                  onClick={() => setLightboxIndex(i)}
                >
                  <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — PEARL */}
      <section className="py-20" style={{ background: '#F8F8F6' }}>
        <div className="container mx-auto px-4">
          <h2 data-animate="fade-up" className="section-title text-black text-center mb-10">Galeria do Espaço</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {photos.map((photo, i) => (
              <button key={photo.id} data-animate="fade-scale" data-delay={String(i)}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-square rounded-xl overflow-hidden">
                <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <span className="text-primary text-xl opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — YELLOW */}
      <section className="py-20" style={{ background: '#F5C000' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 data-animate="fade-up" className="font-heading font-extrabold text-black text-2xl lg:text-3xl mb-6">
            Venha nos visitar!
          </h2>
          <a
            data-animate="fade-up"
            data-delay="1"
            href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20conhecer%20o%20Le%20Ville%20Pet."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark inline-flex items-center gap-2"
          >
            <MessageCircle className="w-6 h-6" />
            Fale Conosco
          </a>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={photos.map(p => ({ url: p.image_url, title: p.title }))} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </PublicLayout>
  );
};

export default VenhaNosConhecer;
