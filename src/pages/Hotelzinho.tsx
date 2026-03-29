import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { Shield, Heart, CheckCircle, MessageCircle } from "lucide-react";

const highlights = [
  { icon: Shield, title: "Ambiente Seguro", text: "Espaço projetado para o conforto e segurança do seu pet, com supervisão constante da nossa equipe." },
  { icon: Heart, title: "Carinho e Atenção", text: "Cada pet recebe atenção individual e muito carinho da nossa equipe especializada." },
  { icon: CheckCircle, title: "Serviço Confiável", text: "Anos de experiência cuidando dos pets de Bauru com dedicação e profissionalismo." },
];

const hotelPhotos = [
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=375&fit=crop",
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=375&fit=crop",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=375&fit=crop",
];

const Hotelzinho = () => {
  return (
    <PublicLayout>
      <PageHero
        badge="🏨 Hotelzinho"
        title="Nosso Hotelzinho"
        subtitle="O lar temporário do seu pet"
        tall
      />

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimateOnScroll>
            <p className="text-text-secondary text-lg leading-[1.8] font-body text-center">
              Sabemos que deixar seu pet pode ser uma decisão difícil. É por isso que criamos um espaço
              especialmente pensado para que ele se sinta em casa, seguro, confortável e amado.
              No Le Ville Pet, seu companheiro terá todo o cuidado e atenção que merece durante sua estadia.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <AnimateOnScroll key={h.title} delay={i * 0.1}>
                <div className="bg-card rounded-2xl p-8 text-center border border-border/50">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <h.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{h.title}</h3>
                  <p className="text-text-muted text-sm font-body leading-relaxed">{h.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-10">
            <h2 className="font-heading font-bold text-foreground text-2xl lg:text-3xl">
              Nosso Espaço
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotelPhotos.map((url, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src={url} alt={`Hotelzinho ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-primary-foreground text-2xl lg:text-3xl mb-6">
              Quer agendar uma estadia para o seu pet?
            </h2>
            <a
              href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20o%20hotelzinho%20para%20o%20meu%20pet.%20Pode%20me%20passar%20as%20informa%C3%A7%C3%B5es%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-surface-dark text-primary font-heading font-bold text-lg px-8 py-4 rounded-xl hover:bg-surface-dark-soft transition-colors min-h-[56px]"
            >
              <MessageCircle className="w-6 h-6" />
              Agendar pelo WhatsApp
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Hotelzinho;
