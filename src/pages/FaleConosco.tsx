import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { MessageCircle, MapPin, Phone } from "lucide-react";

const FaleConosco = () => {
  return (
    <PublicLayout>
      <PageHero
        badge="💬 Contato"
        title="Fale com o Le Ville Pet"
        subtitle="Estamos prontos para atender você e seu pet"
      />

      {/* WhatsApp Card */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="max-w-xl mx-auto">
            <div className="bg-primary rounded-3xl p-10 lg:p-12 text-center shadow-xl">
              <div className="w-16 h-16 bg-whatsapp rounded-2xl flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="w-8 h-8 text-text-on-dark" />
              </div>
              <h2 className="font-heading font-bold text-primary-foreground text-2xl lg:text-3xl mb-3">
                Chame a gente no WhatsApp!
              </h2>
              <p className="text-primary-foreground/70 font-body mb-4">
                Tire suas dúvidas, agende serviços ou venha nos conhecer. Respondemos rapidinho!
              </p>
              <p className="font-heading font-extrabold text-primary-foreground text-3xl mb-6">
                (14) 99714-5610
              </p>
              <a
                href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-whatsapp text-text-on-dark font-heading font-bold text-lg w-full py-4 rounded-xl hover:bg-whatsapp-hover transition-colors min-h-[56px]"
              >
                <MessageCircle className="w-6 h-6" />
                Abrir WhatsApp Agora
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading font-semibold text-foreground text-xl mb-4">
                  Informações de Contato
                </h3>
                <div className="space-y-4 text-sm font-body">
                  <a href="https://wa.me/5514997145610" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    (14) 99714-5610
                  </a>
                  <a href="https://www.instagram.com/levillepetbauru/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    @levillepetbauru
                  </a>
                  <div className="flex items-start gap-3 text-text-secondary">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Villaggio Mall Center<br/>Av. Affonso José Aiello, 14-45 - Loja 19<br/>Vila Aviação, Bauru-SP, 17018-520</span>
                  </div>
                </div>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=375&fit=crop"
                  alt="Le Ville Pet"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-center text-text-muted font-body mt-8">
              Venha nos visitar! Estamos te esperando 🐾
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </PublicLayout>
  );
};

export default FaleConosco;
