import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { Video, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";

const spacePhotos = [
  { url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=450&fit=crop", title: "Nosso espaço" },
  { url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=450&fit=crop", title: "Atendimento" },
  { url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=450&fit=crop", title: "Área pet" },
  { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=450&fit=crop", title: "Nossos amigos" },
];

const VenhaNosConhecer = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <PublicLayout>
      <PageHero
        badge="📍 Venha Nos Conhecer"
        title="Conheça o Nosso Espaço"
        subtitle="Um ambiente preparado com amor para você e seu pet"
        tall
      />

      {/* About */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-heading font-bold text-foreground text-2xl lg:text-3xl mb-5">
                  Sobre o Le Ville Pet
                </h2>
                <p className="text-text-secondary text-base leading-relaxed font-body">
                  O Le Ville Pet nasceu do amor pelos animais e da vontade de oferecer aos tutores de Bauru
                  um espaço de confiança para seus companheiros. Localizado no Villaggio Mall Center, nosso
                  petshop reúne profissionais dedicados e um ambiente pensado para o bem-estar animal.
                  Aqui, cada pet é tratado como parte da família.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {spacePhotos.slice(0, 3).map((photo, i) => (
                  <div
                    key={i}
                    className={`rounded-xl overflow-hidden cursor-pointer ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-10">
            <h2 className="font-heading font-bold text-foreground text-2xl lg:text-3xl">
              Galeria do Espaço
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {spacePhotos.map((photo, i) => (
              <AnimateOnScroll key={i} delay={i * 0.08}>
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-square rounded-xl overflow-hidden w-full cursor-pointer"
                >
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </button>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Videos placeholder */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-foreground text-2xl lg:text-3xl mb-4">Vídeos do Espaço</h2>
            <div className="max-w-md mx-auto bg-muted rounded-2xl p-10">
              <Video className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-text-muted font-body">Em breve, vídeos do nosso espaço!</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-primary-foreground text-2xl lg:text-3xl mb-6">
              Venha nos visitar!
            </h2>
            <a
              href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20conhecer%20o%20Le%20Ville%20Pet."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-surface-dark text-primary font-heading font-bold px-8 py-4 rounded-xl hover:bg-surface-dark-soft transition-colors min-h-[56px]"
            >
              <MessageCircle className="w-6 h-6" />
              Fale Conosco
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={spacePhotos} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </PublicLayout>
  );
};

export default VenhaNosConhecer;
