import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/PublicLayout";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import {
  Hotel, Camera, Video, MapPin, MessageCircle, Share2,
  ChevronDown, Search, Heart, Shield, Sparkles
} from "lucide-react";

const sectionCards = [
  { icon: Hotel, title: "Nosso Hotelzinho", desc: "Seu pet em boas mãos enquanto você viaja.", link: "/hotelzinho" },
  { icon: Camera, title: "Galeria de Fotos", desc: "Confira nosso espaço e os pets que atendemos.", link: "/fotos" },
  { icon: Video, title: "Vídeos", desc: "Veja momentos especiais dos nossos pets.", link: "/videos" },
  { icon: MapPin, title: "Nossa Localização", desc: "No coração do Villaggio Mall Center, Bauru-SP.", link: "/localizacao" },
  { icon: MessageCircle, title: "Fale Conosco", desc: "Tire dúvidas e agende pelo WhatsApp.", link: "/fale-conosco" },
  { icon: Share2, title: "Redes Sociais", desc: "Siga a gente e fique por dentro das novidades.", link: "/siga-nos" },
];

const placeholderPhotos = [
  { url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop", title: "Cachorro feliz" },
  { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop", title: "Gatinho fofo" },
  { url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop", title: "Passeio no parque" },
  { url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop", title: "Banho e tosa" },
  { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop", title: "Amigos peludos" },
  { url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop", title: "Gato descansando" },
];

const Index = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center bg-surface-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-dark/85 via-surface-dark/70 to-surface-dark/60" />
        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-0">
          <div className="max-w-2xl">
            <span className="animate-fade-in-up inline-block bg-primary/15 border border-primary text-primary text-sm font-body px-4 py-1.5 rounded-full mb-6">
              🐾 Petshop em Bauru-SP
            </span>
            <h1 className="animate-fade-in-up animation-delay-200 font-heading font-black text-text-on-dark text-4xl lg:text-6xl leading-tight mb-5">
              Porque seu pet merece o <span className="text-primary">melhor.</span>
            </h1>
            <p className="animate-fade-in-up animation-delay-400 text-text-on-dark-muted text-base lg:text-lg mb-8 max-w-lg font-body leading-relaxed">
              No Le Ville Pet, cuidamos do seu companheiro com todo o amor e profissionalismo que ele merece.
            </p>
            <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold text-base px-7 py-3.5 rounded-xl hover:bg-primary-vibrant transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
              >
                <MessageCircle className="w-5 h-5" />
                Fale no WhatsApp
              </a>
              <Link
                to="/hotelzinho"
                className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-heading font-bold text-base px-7 py-3.5 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-200 min-h-[44px]"
              >
                Conheça o Hotelzinho
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </section>

      {/* SOBRE O PETSHOP */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
              <div className="lg:col-span-3">
                <span className="inline-block bg-primary/15 text-primary text-sm font-body px-4 py-1.5 rounded-full mb-4">
                  Quem Somos
                </span>
                <h2 className="font-heading font-bold text-foreground text-2xl lg:text-4xl mb-5">
                  O Le Ville Pet — onde seu pet se sente em casa
                </h2>
                <p className="text-text-secondary text-base lg:text-lg leading-relaxed mb-5 font-body">
                  Somos um petshop em Bauru-SP dedicado a oferecer os melhores cuidados para o seu companheiro de quatro patas.
                  Com uma equipe apaixonada por animais, oferecemos serviços de qualidade em um ambiente confortável e seguro.
                  Aqui, "a gente se entende" — você, nós, e seu pet.
                </p>
                <Link
                  to="/venha-nos-conhecer"
                  className="text-primary font-heading font-semibold hover:underline transition-all"
                >
                  Venha nos conhecer →
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=450&fit=crop"
                    alt="Pets no Le Ville Pet"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CARDS DAS PÁGINAS */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-12">
            <h2 className="font-heading font-bold text-foreground text-2xl lg:text-4xl mb-3">
              Explore o Le Ville Pet
            </h2>
            <p className="text-text-muted font-body">
              Tudo que você precisa saber sobre nossos serviços e espaço
            </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectionCards.map((card, i) => (
              <AnimateOnScroll key={card.link} delay={i * 0.1}>
                <Link
                  to={card.link}
                  className="group block bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                >
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4">
                    <card.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{card.title}</h3>
                  <p className="text-text-muted text-sm font-body mb-3">{card.desc}</p>
                  <span className="text-primary text-sm font-heading font-semibold group-hover:underline">
                    Saiba mais →
                  </span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA RÁPIDA */}
      <section className="py-16 lg:py-20 bg-surface-dark">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-10">
            <h2 className="font-heading font-bold text-text-on-dark text-2xl lg:text-4xl mb-3">
              Momentos Especiais
            </h2>
            <p className="text-text-on-dark-muted font-body">
              Confira alguns registros do nosso espaço e dos nossos pets
            </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {placeholderPhotos.map((photo, i) => (
              <AnimateOnScroll key={i} delay={i * 0.08}>
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-square rounded-xl overflow-hidden w-full cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-surface-dark/0 group-hover:bg-surface-dark/40 transition-colors duration-300 flex items-center justify-center">
                    <Search className="w-8 h-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </button>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll className="text-center mt-8">
            <Link
              to="/fotos"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary font-heading font-bold px-7 py-3 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all min-h-[44px]"
            >
              Ver Todas as Fotos
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* VÍDEO DESTAQUE */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-10">
            <h2 className="font-heading font-bold text-foreground text-2xl lg:text-4xl mb-3">
              Em Destaque
            </h2>
            <p className="text-text-muted font-body">Assista ao nosso vídeo mais recente</p>
          </AnimateOnScroll>
          <AnimateOnScroll className="max-w-3xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-surface-dark flex items-center justify-center">
              <div className="text-center p-8">
                <Video className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-text-on-dark-muted font-body">
                  Nenhum vídeo em destaque no momento.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll className="text-center mt-8">
            <Link
              to="/videos"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-7 py-3 rounded-xl hover:bg-primary-vibrant transition-all min-h-[44px]"
            >
              Ver Todos os Vídeos
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA HOTELZINHO */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <AnimateOnScroll>
              <span className="inline-flex items-center gap-2 text-primary-foreground/70 text-sm font-body mb-3">
                <Hotel className="w-5 h-5" /> Nosso Hotelzinho
              </span>
              <h2 className="font-heading font-extrabold text-primary-foreground text-3xl lg:text-4xl mb-5">
                Vai viajar? Deixe seu pet com a gente!
              </h2>
              <p className="text-primary-foreground/80 text-base lg:text-lg font-body mb-8 leading-relaxed">
                Nosso hotelzinho oferece um ambiente seguro, confortável e cheio de carinho
                para o seu pet enquanto você viaja com tranquilidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/hotelzinho"
                  className="flex items-center justify-center bg-surface-dark text-primary font-heading font-bold px-7 py-3.5 rounded-xl hover:bg-surface-dark-soft transition-all min-h-[44px]"
                >
                  Saiba Mais Sobre o Hotelzinho
                </Link>
                <a
                  href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20hotelzinho."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center border-2 border-primary-foreground text-primary-foreground font-heading font-bold px-7 py-3.5 rounded-xl hover:bg-primary-foreground/10 transition-all min-h-[44px]"
                >
                  Agendar pelo WhatsApp
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=450&fit=crop"
                  alt="Hotelzinho Le Ville Pet"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CONTATO RÁPIDO */}
      <section className="py-16 lg:py-20 bg-surface-dark-soft">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-12">
            <h2 className="font-heading font-bold text-text-on-dark text-2xl lg:text-4xl">
              Entre em Contato
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <AnimateOnScroll delay={0}>
              <div className="bg-surface-dark-muted rounded-2xl p-8 text-center border border-text-on-dark/5">
                <div className="w-14 h-14 bg-whatsapp/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-7 h-7 text-whatsapp" />
                </div>
                <h3 className="font-heading font-semibold text-text-on-dark text-lg mb-1">WhatsApp</h3>
                <p className="text-primary font-heading font-bold text-xl mb-4">(14) 99714-5610</p>
                <a
                  href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-whatsapp text-text-on-dark font-heading font-bold px-6 py-3 rounded-xl hover:bg-whatsapp-hover transition-colors min-h-[44px]"
                >
                  Chamar no WhatsApp
                </a>
              </div>
            </AnimateOnScroll>

            {/* Endereço */}
            <AnimateOnScroll delay={0.1}>
              <div className="bg-surface-dark-muted rounded-2xl p-8 text-center border border-text-on-dark/5">
                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-text-on-dark text-lg mb-1">Nossa Localização</h3>
                <p className="text-text-on-dark-muted text-sm font-body mb-4 leading-relaxed">
                  Villaggio Mall Center<br />
                  Av. Affonso José Aiello, 14-45 - Loja 19<br />
                  Vila Aviação, Bauru-SP
                </p>
                <Link
                  to="/localizacao"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-6 py-3 rounded-xl hover:bg-primary-vibrant transition-colors min-h-[44px]"
                >
                  Ver no Google Maps
                </Link>
              </div>
            </AnimateOnScroll>

            {/* Instagram */}
            <AnimateOnScroll delay={0.2}>
              <div className="bg-surface-dark-muted rounded-2xl p-8 text-center border border-text-on-dark/5">
                <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
                <h3 className="font-heading font-semibold text-text-on-dark text-lg mb-1">Instagram</h3>
                <p className="text-primary font-heading font-bold text-lg mb-4">@levillepetbauru</p>
                <a
                  href="https://www.instagram.com/levillepetbauru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-text-on-dark font-heading font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity min-h-[44px]"
                >
                  Seguir no Instagram
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={placeholderPhotos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </PublicLayout>
  );
};

export default Index;
