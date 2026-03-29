import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { Search, Camera } from "lucide-react";

const allPhotos = [
  { url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop", title: "Pet feliz", category: "galeria" },
  { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop", title: "Gatinho fofo", category: "galeria" },
  { url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop", title: "Passeio", category: "galeria" },
  { url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop", title: "Hotelzinho", category: "hotelzinho" },
  { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop", title: "Amiguinhos", category: "galeria" },
  { url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop", title: "Gato relaxando", category: "galeria" },
  { url: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&h=600&fit=crop", title: "No espaço", category: "conhecer" },
  { url: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&h=600&fit=crop", title: "Brincando", category: "hotelzinho" },
];

const filters = ["Todas", "Hotelzinho", "Nosso Espaço", "Pets"];
const filterMap: Record<string, string | null> = {
  "Todas": null,
  "Hotelzinho": "hotelzinho",
  "Nosso Espaço": "conhecer",
  "Pets": "galeria",
};

const Fotos = () => {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filterMap[activeFilter]
    ? allPhotos.filter((p) => p.category === filterMap[activeFilter])
    : allPhotos;

  return (
    <PublicLayout>
      <PageHero
        badge="📸 Fotos"
        title="Galeria de Fotos"
        subtitle="Momentos especiais dos nossos pets"
      />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all min-h-[44px] ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent border border-border text-text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((photo, i) => (
                <AnimateOnScroll key={`${photo.url}-${i}`} delay={i * 0.05}>
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="group relative aspect-square rounded-xl overflow-hidden w-full cursor-pointer"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-surface-dark/0 group-hover:bg-surface-dark/40 transition-colors flex items-center justify-center">
                      <Search className="w-7 h-7 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-text-muted font-body text-lg">Fotos em breve!</p>
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={filtered} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </PublicLayout>
  );
};

export default Fotos;
