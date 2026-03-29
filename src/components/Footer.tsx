import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { AdminAccessModal } from "./AdminAccessModal";

const footerLinks = [
  { label: "Início", path: "/" },
  { label: "Hotelzinho", path: "/hotelzinho" },
  { label: "Fotos", path: "/fotos" },
  { label: "Vídeos", path: "/videos" },
  { label: "Localização", path: "/localizacao" },
  { label: "Siga-nos", path: "/siga-nos" },
];

export function Footer() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <footer className="bg-surface-dark-soft pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Col 1 - Logo & About */}
          <div>
            <img src="/images/logo-levillepet.png" alt="Le Ville Pet" className="h-10 rounded mb-3" />
            <p className="font-heading italic text-primary text-sm mb-3">a gente se entende</p>
            <p className="text-text-on-dark-muted text-sm leading-relaxed">
              Cuidamos do seu pet com amor e profissionalismo em Bauru-SP.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/levillepetbauru/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://wa.me/5514997145610"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-whatsapp/10 flex items-center justify-center text-whatsapp hover:bg-whatsapp/20 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2 - Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-text-on-dark text-base mb-4">Navegação</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-text-on-dark-muted text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 - Contact */}
          <div>
            <h3 className="font-heading font-semibold text-text-on-dark text-base mb-4">Contato</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://wa.me/5514997145610"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-on-dark-muted hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                (14) 99714-5610
              </a>
              <div className="flex items-start gap-2 text-text-on-dark-muted">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Villaggio Mall Center<br />Av. Affonso José Aiello, 14-45 - Loja 19<br />Vila Aviação, Bauru-SP</span>
              </div>
              <a
                href="https://www.instagram.com/levillepetbauru/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-on-dark-muted hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                @levillepetbauru
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-text-on-dark/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-muted text-xs">
            © 2026 Le Ville Pet — Todos os direitos reservados
          </p>
          <button
            onClick={() => setShowAdmin(true)}
            className="text-text-muted text-xs hover:text-text-on-dark-muted transition-colors cursor-pointer"
          >
            v1.0
          </button>
        </div>
      </div>

      <AdminAccessModal open={showAdmin} onClose={() => setShowAdmin(false)} />
    </footer>
  );
}
