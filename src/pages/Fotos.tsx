import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useState, useEffect } from "react";
import { Lightbox } from "@/components/Lightbox";
import { Search, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const filters = ["Todas", "Hotelzinho", "Nosso Espaço", "Pets"];
const filterMap: Record<string, string | null> = {
  "Todas": null, "Hotelzinho": "hotelzinho", "Nosso Espaço": "conhecer", "Pets": "galeria",
};

const Fotos = () => {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    supabase.from("photos").select("*").eq("is_active", true).order("display_order").then(({ data }) => {
      setPhotos(data || []);
      setLoading(false);
    });
  }, []);

  const filtered = filterMap[activeFilter]
    ? photos.filter((p) => p.category === filterMap[activeFilter])
    : photos;

  const visible = filtered.slice(0, visibleCount);

  return (
    <PublicLayout>
      <PageHero badge="📸 Galeria" title="Momentos Especiais" subtitle="Confira os pets que já passaram pelo Le Ville Pet" />
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {filters.map((f) => (
              <button key={f} onClick={() => { setActiveFilter(f); setVisibleCount(12); }}
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all min-h-[44px] ${
                  activeFilter === f ? "bg-primary text-primary-foreground" : "bg-transparent border border-border text-text-muted hover:border-primary hover:text-primary"
                }`}>{f}</button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square skeleton-light" />
              ))}
            </div>
          ) : visible.length > 0 ? (
            <>
              <p className="text-center text-text-muted text-sm mb-4">Exibindo {visible.length} de {filtered.length} fotos</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {visible.map((photo, i) => (
                  <AnimateOnScroll key={photo.id} delay={i * 0.05}>
                    <button onClick={() => setLightboxIndex(i)} className="group relative aspect-square rounded-xl overflow-hidden w-full">
                      <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <Search className="w-7 h-7 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  </AnimateOnScroll>
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="text-center mt-8">
                  <button onClick={() => setVisibleCount(c => c + 12)} className="btn-secondary">Ver mais fotos</button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-text-muted font-body text-lg">Nenhuma foto nesta categoria.</p>
            </div>
          )}
        </div>
      </section>
      {lightboxIndex !== null && (
        <Lightbox images={visible.map(p => ({ url: p.image_url, title: p.title }))} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </PublicLayout>
  );
};

export default Fotos;
