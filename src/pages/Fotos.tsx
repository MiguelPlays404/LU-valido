import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { Lightbox } from "@/components/Lightbox";
import { Search, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const filters = ["Todas", "Galeria", "Hotelzinho", "Nosso Espaço"];
const filterMap: Record<string, string | null> = {
  "Todas": null, "Galeria": "galeria", "Hotelzinho": "hotelzinho", "Nosso Espaço": "conhecer",
};

const Fotos = () => {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  useScrollAnimation();

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
      <PageHero badge="📸 Fotos" title="Galeria de Momentos" subtitle="Os pets mais lindos de Bauru" />

      {/* Filters + Grid — WHITE */}
      <section className="py-16" style={{ background: '#FFFFFF' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {filters.map((f) => (
              <button key={f} onClick={() => { setActiveFilter(f); setVisibleCount(12); }}
                className={`px-5 py-2 rounded-full text-sm font-heading font-semibold transition-all min-h-[44px] ${
                  activeFilter === f
                    ? "bg-primary text-black"
                    : "bg-transparent border border-[#D4D4D4] text-[#666] hover:border-primary hover:text-primary"
                }`}>
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square skeleton-light rounded-xl" />)}
            </div>
          ) : visible.length > 0 ? (
            <>
              <p className="text-center text-[#888] text-sm mb-4" style={{ fontFamily: 'Inter' }}>
                Exibindo {visible.length} de {filtered.length} fotos
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {visible.map((photo, i) => (
                  <button key={photo.id} data-animate="fade-scale" data-delay={String(Math.min(i, 6))}
                    onClick={() => setLightboxIndex(i)}
                    className="group relative aspect-square rounded-[12px] overflow-hidden">
                    <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                      <Search className="w-7 h-7 text-primary opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-100" />
                    </div>
                  </button>
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
              <p className="text-[#888] text-lg" style={{ fontFamily: 'Inter' }}>Nenhuma foto nesta categoria.</p>
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
