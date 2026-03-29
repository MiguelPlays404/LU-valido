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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-dark/95 backdrop-blur-md shadow-lg border-b border-primary/20"
          : "bg-surface-dark"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 lg:h-[72px] px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:scale-[1.03] transition-transform">
          <img
            src="/images/logo-levillepet.png"
            alt="Le Ville Pet"
            className="h-10 lg:h-12 rounded-lg"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-on-dark hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* WhatsApp Button Desktop */}
        <a
          href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20Le%20Ville%20Pet!"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary-vibrant transition-colors duration-200"
        >
          <MessageCircle className="w-4 h-4" />
          Fale no WhatsApp
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-text-on-dark p-2"
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-surface-dark/80 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-surface-dark-soft z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-primary/20">
          <img src="/images/logo-levillepet.png" alt="Le Ville Pet" className="h-8 rounded" />
          <button onClick={() => setIsOpen(false)} className="text-text-on-dark p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col py-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-6 py-4 font-heading font-semibold text-lg transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10 border-l-[3px] border-primary"
                  : "text-text-on-dark hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 pt-4">
            <a
              href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20Le%20Ville%20Pet!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-whatsapp text-text-on-dark font-heading font-bold text-base w-full py-3.5 rounded-xl hover:bg-whatsapp-hover transition-colors"
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
