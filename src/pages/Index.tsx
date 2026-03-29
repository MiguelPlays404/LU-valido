import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/PublicLayout";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useState, useEffect } from "react";
import { Lightbox } from "@/components/Lightbox";
import { supabase } from "@/integrations/supabase/client";
import {
  Hotel, Camera, Video, MapPin, MessageCircle, Share2,
  ChevronDown, Search, Heart
} from "lucide-react";

const iconMap: Record<string, any> = { Home: Hotel, Camera, Video, MapPin, MessageCircle, Heart: Share2 };

const Index = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<any>(null);

  useEffect(() => {
    supabase.from("home_sections").select("*").eq("is_active", true).order("display_order").then(({ data }) => setSections(data || []));
    supabase.from("photos").select("*").eq("is_active", true).eq("category", "galeria").order("display_order").limit(6).then(({ data }) => setPhotos(data || []));
    supabase.from("videos").select("*").eq("is_active", true).eq("is_featured", true).limit(1).single().then(({ data }) => setFeaturedVideo(data));
  }, []);

  return (
    <PublicLayout>
      {/* HERO PROVISÓRIO */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 65% 40%, #1A1400 0%, #000000 65%)' }}>
        {/* Glow circles */}
        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none animate-scale-breath" style={{ background: 'radial-gradient(circle, rgba(245,192,0,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,192,0,0.06) 0%, transparent 70%)', animation: 'scaleBreath 6s ease-in-out infinite 2s' }} />
        
        {/* Paw pattern */}
        <div className="absolute inset-0 paw-pattern-bg pointer-events-none" />
        
        {/* Floating paws */}
        {[0,1,2,3,4].map(i => (
          <div key={i} className="absolute pointer-events-none text-primary" style={{ fontSize: `${24 + i * 8}px`, opacity: 0.08 + i * 0.02, animation: `floatPaw ${4 + i}s ease-in-out infinite ${i * 0.8}s`, top: `${15 + i * 15}%`, right: `${5 + i * 8}%` }}>
            🐾
          </div>
        ))}
        
        {/* Vertical line */}
        <div className="absolute right-[15%] top-[10%] bottom-[10%] w-px pointer-events-none hidden lg:block animate-line-grow-v" style={{ background: 'linear-gradient(to bottom, transparent, rgba(245,192,0,0.3), transparent)' }} />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-28 pb-20 lg:pt-32 lg:pb-24">
          <div className="max-w-[700px]">
            <span className="animate-fade-in-up inline-flex items-center gap-2 bg-primary/12 border border-primary/40 text-primary text-[13px] font-heading font-semibold tracking-wider uppercase px-5 py-2 rounded-full mb-8">
              🐾 Petshop em Bauru-SP
            </span>
            
            <h1 className="animate-fade-in-up animation-delay-200 hero-title text-text-on-dark mb-6">
              Porque seu pet merece o{' '}
              <span className="highlight">melhor.</span>
            </h1>
            
            <p className="animate-fade-in-up animation-delay-400 font-body text-[#AAAAAA] text-lg leading-relaxed mb-10 max-w-[520px]">
              No Le Ville Pet, cuidamos do seu companheiro com todo o amor e profissionalismo que ele merece. <em className="text-primary">"a gente se entende"</em> 🐾
            </p>
            
            <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20Le%20Ville%20Pet!" target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 Fale no WhatsApp
              </a>
              <Link to="/hotelzinho" className="btn-secondary">
                Conheça o Hotelzinho →
              </Link>
            </div>
            
            {/* Stats */}
            <div className="animate-fade-in-up animation-delay-800 flex gap-10 mt-16 border-t border-white/8 pt-8">
              {[
                { num: '500+', label: 'Pets Atendidos' },
                { num: '5★', label: 'Avaliação no Google' },
                { num: '3+', label: 'Anos de Experiência' },
              ].map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="font-heading font-extrabold text-[1.75rem] text-primary leading-none">{stat.num}</div>
                  <div className="font-body text-[13px] text-text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 text-2xl animate-bounce-down">↓</div>
      </section>

      {/* SOBRE */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-3">
                <span className="inline-block bg-primary/15 text-primary text-sm font-body px-4 py-1.5 rounded-full mb-4">Quem Somos</span>
                <h2 className="section-title text-foreground text-2xl lg:text-4xl mb-5">
                  O Le Ville Pet — onde seu pet se sente <span className="text-primary">em casa</span>
                </h2>
                <p className="text-text-secondary text-base lg:text-lg leading-relaxed mb-5 font-body">
                  Somos um petshop em Bauru-SP dedicado a oferecer os melhores cuidados para o seu companheiro de quatro patas.
                  Com uma equipe apaixonada por animais, oferecemos serviços de qualidade em um ambiente confortável e seguro.
                  Aqui, <em className="text-primary">"a gente se entende"</em> — você, nós, e seu pet.
                </p>
                <Link to="/venha-nos-conhecer" className="text-primary font-heading font-semibold hover:underline transition-all inline-flex items-center gap-1 group">
                  Venha nos conhecer <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] rounded-[20px] overflow-hidden border-[3px] border-primary">
                  <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=450&fit=crop" alt="Pets no Le Ville Pet" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CARDS */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-14">
            <h2 className="section-title text-foreground text-2xl lg:text-4xl mb-3">Explore o Le Ville Pet</h2>
            <p className="section-subtitle mx-auto">Tudo que você precisa saber sobre nossos serviços e espaço</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(sections.length > 0 ? sections : [
              { icon: 'Home', title: 'Nosso Hotelzinho', description: 'Seu pet em boas mãos.', link_url: '/hotelzinho' },
              { icon: 'Camera', title: 'Galeria de Fotos', description: 'Confira nosso espaço.', link_url: '/fotos' },
              { icon: 'Video', title: 'Vídeos', description: 'Momentos especiais.', link_url: '/videos' },
              { icon: 'MapPin', title: 'Localização', description: 'Villaggio Mall Center.', link_url: '/localizacao' },
              { icon: 'MessageCircle', title: 'Fale Conosco', description: 'WhatsApp disponível.', link_url: '/fale-conosco' },
              { icon: 'Heart', title: 'Redes Sociais', description: 'Siga a gente!', link_url: '/siga-nos' },
            ]).map((card: any, i: number) => {
              const Icon = iconMap[card.icon] || Hotel;
              return (
                <AnimateOnScroll key={card.link_url || i} delay={i * 0.1}>
                  <Link to={card.link_url} className="group block bg-card rounded-[20px] p-8 border border-border/50 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(245,192,0,0.15)] transition-all duration-300">
                    <div className="w-14 h-14 bg-primary rounded-[14px] flex items-center justify-center mb-4 group-hover:animate-[rotatePaw_0.5s_ease]">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{card.title}</h3>
                    <p className="text-text-muted text-sm font-body mb-3">{card.description}</p>
                    <span className="text-primary text-sm font-heading font-semibold group-hover:underline">Saiba mais →</span>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="py-20 lg:py-28 bg-surface-dark">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-12">
            <h2 className="section-title text-text-on-dark text-2xl lg:text-4xl mb-3">Momentos Especiais</h2>
            <p className="section-subtitle text-text-on-dark-muted mx-auto">Confira alguns registros do nosso espaço e dos nossos pets</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {photos.map((photo: any, i: number) => (
              <AnimateOnScroll key={photo.id} delay={i * 0.08}>
                <button onClick={() => setLightboxIndex(i)} className="group relative aspect-square rounded-xl overflow-hidden w-full">
                  <img src={photo.image_url} alt={photo.title} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-108" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Search className="w-8 h-8 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100" />
                  </div>
                </button>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll className="text-center mt-10">
            <Link to="/fotos" className="btn-secondary">Ver Todas as Fotos</Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* VIDEO DESTAQUE */}
      {featuredVideo && (
        <section className="py-20 lg:py-28 bg-muted">
          <div className="container mx-auto px-4">
            <AnimateOnScroll className="text-center mb-10">
              <h2 className="section-title text-foreground text-2xl lg:text-4xl mb-3">Em Destaque</h2>
              <p className="section-subtitle mx-auto">{featuredVideo.title}</p>
            </AnimateOnScroll>
            <AnimateOnScroll className="max-w-3xl mx-auto">
              <div className="aspect-video rounded-[20px] overflow-hidden shadow-xl">
                <iframe
                  src={featuredVideo.video_url.includes('embed') ? featuredVideo.video_url : `https://www.youtube.com/embed/${featuredVideo.video_url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1] || ''}`}
                  className="w-full h-full" allowFullScreen loading="lazy" title={featuredVideo.title}
                />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll className="text-center mt-8">
              <Link to="/videos" className="btn-primary">Ver Todos os Vídeos</Link>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* CTA HOTELZINHO */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <span className="inline-flex items-center gap-2 text-primary-foreground/70 text-sm font-body mb-3"><Hotel className="w-5 h-5" /> Nosso Hotelzinho</span>
              <h2 className="font-heading font-extrabold text-primary-foreground text-3xl lg:text-4xl mb-5">Vai viajar? Deixe seu pet com a gente!</h2>
              <p className="text-primary-foreground/80 text-base lg:text-lg font-body mb-8 leading-relaxed">Nosso hotelzinho oferece um ambiente seguro, confortável e cheio de carinho para o seu pet enquanto você viaja com tranquilidade.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/hotelzinho" className="flex items-center justify-center bg-surface-dark text-primary font-heading font-bold px-7 py-3.5 rounded-xl hover:bg-surface-dark-soft transition-all min-h-[44px]">
                  Saiba Mais
                </Link>
                <a href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20hotelzinho." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center border-2 border-primary-foreground text-primary-foreground font-heading font-bold px-7 py-3.5 rounded-xl hover:bg-primary-foreground/10 transition-all min-h-[44px]">
                  Agendar pelo WhatsApp
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="aspect-[4/3] rounded-[20px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=450&fit=crop" alt="Hotelzinho Le Ville Pet" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section className="py-20 lg:py-28 bg-surface-dark-soft">
        <div className="container mx-auto px-4">
          <AnimateOnScroll className="text-center mb-12">
            <h2 className="section-title text-text-on-dark text-2xl lg:text-4xl">Entre em Contato</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimateOnScroll delay={0}>
              <div className="bg-surface-dark-muted rounded-[20px] p-8 text-center border border-text-on-dark/5">
                <div className="w-14 h-14 bg-whatsapp/20 rounded-[14px] flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-7 h-7 text-whatsapp" />
                </div>
                <h3 className="font-heading font-semibold text-text-on-dark text-lg mb-1">WhatsApp</h3>
                <p className="text-primary font-heading font-bold text-xl mb-4">(14) 99714-5610</p>
                <a href="https://wa.me/5514997145610" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-whatsapp text-text-on-dark font-heading font-bold px-6 py-3 rounded-xl hover:bg-whatsapp-hover transition-colors min-h-[44px]">
                  Chamar no WhatsApp
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.15}>
              <div className="bg-surface-dark-muted rounded-[20px] p-8 text-center border border-text-on-dark/5">
                <div className="w-14 h-14 bg-primary/20 rounded-[14px] flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-text-on-dark text-lg mb-1">Localização</h3>
                <p className="text-text-on-dark-muted text-sm font-body mb-4 leading-relaxed">Villaggio Mall Center<br />Bauru-SP</p>
                <Link to="/localizacao" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-6 py-3 rounded-xl hover:bg-primary-vibrant transition-colors min-h-[44px]">
                  Ver no Mapa
                </Link>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.3}>
              <div className="bg-surface-dark-muted rounded-[20px] p-8 text-center border border-text-on-dark/5">
                <div className="w-14 h-14 bg-pink-500/20 rounded-[14px] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
                <h3 className="font-heading font-semibold text-text-on-dark text-lg mb-1">Instagram</h3>
                <p className="text-primary font-heading font-bold text-lg mb-4">@levillepetbauru</p>
                <a href="https://www.instagram.com/levillepetbauru/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-text-on-dark font-heading font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all min-h-[44px]">
                  Seguir no Instagram
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && photos.length > 0 && (
        <Lightbox images={photos.map(p => ({ url: p.image_url, title: p.title }))} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </PublicLayout>
  );
};

export default Index;
