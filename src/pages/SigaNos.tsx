import { PublicLayout } from "@/components/PublicLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageCircle } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    handle: "@levillepetbauru",
    url: "https://www.instagram.com/levillepetbauru/",
    bg: "linear-gradient(135deg, #F56040 0%, #E1306C 50%, #833AB4 100%)",
    icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    name: "WhatsApp",
    handle: "(14) 99714-5610",
    url: "https://wa.me/5514997145610",
    bg: "#25D366",
    icon: <MessageCircle className="w-7 h-7" />,
  },
];

const SigaNos = () => {
  useScrollAnimation();

  return (
    <PublicLayout>
      <section className="min-h-screen bg-black flex items-center justify-center py-16">
        <div className="w-full max-w-[520px] mx-auto px-6">
          <div className="text-center mb-10">
            <div data-animate="fade-scale" className="h-[110px] w-[110px] bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="font-heading font-black text-black text-3xl">LV</span>
            </div>
            <h1 data-animate="fade-up" data-delay="1" className="font-heading font-bold text-white text-[26px] mb-1">Le Ville Pet</h1>
            <p data-animate="fade-up" data-delay="2" className="font-heading italic text-primary text-[17px]">"a gente se entende"</p>
            <div data-animate="fade-up" data-delay="3" className="mt-4 h-[1px] w-32 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #F5C000, transparent)' }} />
          </div>

          <div className="flex flex-col gap-3 mb-10 max-w-[440px] mx-auto">
            {socialLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-animate="bounce"
                data-delay={String(i + 1)}
                className="flex items-center gap-4 w-full h-16 text-white font-heading font-semibold text-lg rounded-2xl px-6 transition-all hover:-translate-y-1 hover:shadow-lg min-h-[64px]"
                style={{ background: link.bg }}
              >
                {link.icon}
                <div className="flex-1 flex items-center justify-between">
                  <span>{link.name}</span>
                  <span className="text-sm opacity-80 font-normal" style={{ fontFamily: 'Inter' }}>{link.handle}</span>
                </div>
              </a>
            ))}
          </div>

          <p data-animate="fade-up" data-delay="4" className="text-center text-[#666] text-sm" style={{ fontFamily: 'Inter' }}>
            🐾 Feito com amor para você e seu pet
          </p>
        </div>
      </section>
    </PublicLayout>
  );
};

export default SigaNos;
