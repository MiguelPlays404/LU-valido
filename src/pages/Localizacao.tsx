import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Navigation } from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/nkuDnVyBe6ZHYNbS8";

const Localizacao = () => {
  useScrollAnimation();

  return (
    <PublicLayout>
      <PageHero badge="📍 Nossa Localização" title="Como Chegar" subtitle="Estamos no coração do Villaggio Mall Center" />

      {/* Card — WHITE bg */}
      <section className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="container mx-auto px-4 max-w-[700px]">
          <div data-animate="fade-scale" className="rounded-[24px] p-10 lg:p-12 text-center" style={{ background: '#F5C000', boxShadow: 'var(--shadow-yellow-lg)' }}>
            <div className="w-12 h-12 bg-black/10 rounded-[14px] flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-black" />
            </div>
            <h2 className="font-heading font-extrabold text-black text-[28px] mb-2">Le Ville Pet</h2>
            <div className="mb-6">
              <p className="font-heading font-bold text-black text-xl">Villaggio Mall Center</p>
              <p className="font-heading font-semibold text-[#333] text-[17px]">Av. Affonso José Aiello, 14-45 - Loja 19</p>
              <p className="text-[#444] text-[15px] mt-1" style={{ fontFamily: 'Inter' }}>Vila Aviação, Bauru-SP, 17018-520</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-dark inline-flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" /> Abrir no Google Maps
              </a>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-dark inline-flex items-center justify-center gap-2">
                <Navigation className="w-5 h-5" /> Calcular Rota
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map — CREAM */}
      <section className="py-10" style={{ background: '#FAFAF8' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div data-animate="fade-up" className="rounded-[20px] overflow-hidden" style={{ boxShadow: 'var(--shadow-xl)' }}>
            <iframe
              src="https://maps.google.com/maps?q=Le+Ville+Pet+Bauru+SP+Villaggio+Mall+Center&output=embed"
              width="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Le Ville Pet"
              className="w-full h-[300px] lg:h-[450px]"
            />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Localizacao;
