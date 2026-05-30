import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5514997145610?text=Ol%C3%A1!%20Vim%20pelo%20site%20Le%20Ville%20Pet!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 lg:bottom-6 lg:right-6 z-[9999] w-[60px] h-[60px] rounded-full bg-whatsapp flex items-center justify-center shadow-lg whatsapp-fab group"
      aria-label="Fale Conosco no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-text-on-dark" />
      <span className="absolute right-full mr-3 bg-surface-dark text-text-on-dark text-sm font-body px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden lg:block">
        Fale Conosco!
      </span>
    </a>
  );
}
