import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { MapPin, Navigation } from "lucide-react";

const Localizacao = () => {
  const mapsEmbedUrl = "https://maps.google.com/maps?q=Villaggio+Mall+Center+Bauru+SP&output=embed";
  const mapsDirectUrl = "https://www.google.com/maps/search/Villaggio+Mall+Center+Av.+Affonso+Jos%C3%A9+Aiello+14-45+Bauru+SP";

  return (
    <PublicLayout>
      <PageHero
        badge="📍 Nossa Localização"
        title="Como Chegar"
        subtitle="Estamos no coração do Villaggio Mall Center"
      />

      {/* Address Card */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimateOnScroll>
            <div className="bg-primary rounded-3xl p-10 text-center">
              <div className="w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-heading font-bold text-primary-foreground text-2xl mb-2">Le Ville Pet</h2>
              <div className="text-primary-foreground/80 font-body text-lg leading-relaxed mb-6">
                <p className="font-heading font-semibold text-primary-foreground">Villaggio Mall Center</p>
                <p>Av. Affonso José Aiello, 14-45 - Loja 19</p>
                <p className="text-sm mt-1">Vila Aviação, Bauru-SP, 17018-520</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={mapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-surface-dark text-primary font-heading font-bold px-7 py-3.5 rounded-xl hover:bg-surface-dark-soft transition-colors min-h-[44px]"
                >
                  <MapPin className="w-5 h-5" />
                  Abrir no Google Maps
                </a>
                <a
                  href={`https://www.google.com/maps/dir//${encodeURIComponent("Villaggio Mall Center, Av. Affonso José Aiello, 14-45, Bauru - SP")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-heading font-bold px-7 py-3.5 rounded-xl hover:bg-primary-foreground/10 transition-colors min-h-[44px]"
                >
                  <Navigation className="w-5 h-5" />
                  Calcular Rota
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimateOnScroll>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={mapsEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Le Ville Pet"
                className="w-full h-[300px] lg:h-[450px]"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Localizacao;
