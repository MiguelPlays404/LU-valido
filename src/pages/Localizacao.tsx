import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { MapPin, Navigation } from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/nkuDnVyBe6ZHYNbS8";

const Localizacao = () => {
  return (
    <PublicLayout>
      <PageHero badge="📍 Nossa Localização" title="Como Chegar" subtitle="Estamos no coração do Villaggio Mall Center" />
      
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimateOnScroll>
            <div className="bg-primary rounded-[24px] p-10 text-center">
              <div className="w-14 h-14 bg-primary-foreground/10 rounded-[14px] flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-heading font-bold text-primary-foreground text-2xl mb-2">Le Ville Pet</h2>
              <div className="text-primary-foreground/80 font-body text-lg leading-relaxed mb-6">
                <p className="font-heading font-semibold text-primary-foreground">Villaggio Mall Center</p>
                <p>Av. Affonso José Aiello, 14-45 - Loja 19</p>
                <p className="text-sm mt-1">Vila Aviação, Bauru-SP, 17018-520</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-surface-dark text-primary font-heading font-bold px-7 py-3.5 rounded-xl hover:bg-surface-dark-soft transition-colors min-h-[44px]">
                  <MapPin className="w-5 h-5" /> Abrir no Google Maps
                </a>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-heading font-bold px-7 py-3.5 rounded-xl hover:bg-primary-foreground/10 transition-colors min-h-[44px]">
                  <Navigation className="w-5 h-5" /> Calcular Rota
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimateOnScroll>
            <div className="rounded-[20px] overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.8!2d-49.07!3d-22.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVillaggio+Mall+Center!5e0!3m2!1spt-BR!2sbr"
                width="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localização Le Ville Pet"
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
