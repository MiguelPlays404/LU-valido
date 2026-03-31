import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Início", path: "/" },
  { label: "Hotelzinho", path: "/hotelzinho" },
  { label: "Venha Nos Conhecer", path: "/venha-nos-conhecer" },
  { label: "Fotos", path: "/fotos" },
  { label: "Vídeos", path: "/videos" },
  { label: "Localização", path: "/localizacao" },
  { label: "Siga-nos", path: "/siga-nos" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navBg = isHome && !scrolled
    ? "bg-transparent"
    : "bg-black/95 backdrop-blur-[20px] shadow-lg";

  const borderClass = scrolled || !isHome ? "border-b border-[rgba(245,192,0,0.15)]" : "";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} ${borderClass}`}>
      <div className="container mx-auto flex items-center justify-between h-16 lg:h-[72px] px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:scale-[1.04] transition-transform">
          <div className="h-10 lg:h-[46px] px-3 py-1 bg-primary rounded-lg flex items-center">
            <span className="font-heading font-extrabold text-black text-lg lg:text-xl tracking-tight">Le Ville Pet</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 rounded-lg text-[15px] transition-colors duration-200 ${
                  active
                    ? "text-primary"
                    : "text-white hover:text-primary"
                }`}
                style={{ fontFamily: 'Inter', fontWeight: 500 }}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" style={{ animation: 'lineGrow 0.3s ease forwards' }} />
                )}
              </Link>
            );
          })}
        </div>

        {/* WhatsApp Button Desktop */}
        <a
          href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20Le%20Ville%20Pet!"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex btn-primary text-sm py-2.5 px-5"
        >
          💬 WhatsApp
        </a>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(true)} className="lg:hidden text-white p-2" aria-label="Abrir menu">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: '#0D0D0D' }}
      >
        <div className="flex items-center justify-between p-4 border-b border-[rgba(245,192,0,0.15)]">
          <span className="font-heading font-bold text-primary text-lg">Le Ville Pet</span>
          <button onClick={() => setIsOpen(false)} className="text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col py-4">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-6 py-4 font-heading font-semibold text-xl transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10 border-l-[3px] border-primary"
                  : "text-white hover:text-primary hover:bg-primary/5"
              }`}
              style={{ animation: `fadeInLeft 0.3s ease ${i * 0.05}s both` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 pt-4">
            <a
              href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20Le%20Ville%20Pet!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-heading font-bold text-base w-full py-3.5 rounded-xl hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Fale no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
