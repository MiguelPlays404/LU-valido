import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Image, Video, Hotel, Eye, Settings, Share2, Shield, LogOut, ExternalLink, X, Menu } from "lucide-react";
import { destroyAdminSession, getSessionAge } from "@/lib/adminSession";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Fotos", path: "/admin/fotos", icon: Image },
  { label: "Vídeos", path: "/admin/videos", icon: Video },
  { label: "Hotelzinho", path: "/admin/hotelzinho", icon: Hotel },
  { label: "Venha Nos Conhecer", path: "/admin/conhecer", icon: Eye },
  { label: "Configurações", path: "/admin/config", icon: Settings },
  { label: "Redes Sociais", path: "/admin/social", icon: Share2 },
  { label: "Segurança", path: "/admin/seguranca", icon: Shield },
];

export function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    if (confirm("Deseja sair do painel administrativo?")) {
      destroyAdminSession();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0A0A0A] text-white">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#111111] border-r border-[#222] flex flex-col shrink-0 h-screen sticky top-0">
        <div className="p-5 border-b border-[#222]">
          <img src="/images/logo-levillepet.png" alt="Le Ville Pet" className="h-10 rounded" />
          <p className="text-primary text-xs font-heading italic mt-1">Painel Admin</p>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-body transition-colors ${active ? "bg-primary/10 text-primary border-l-[3px] border-primary" : "text-[#999] hover:text-white hover:bg-white/5 border-l-[3px] border-transparent"}`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#222] space-y-2">
          <a href="/" target="_blank" className="flex items-center gap-2 text-xs text-[#666] hover:text-primary transition-colors">
            <ExternalLink className="w-3.5 h-3.5" /> Ver Site
          </a>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs text-[#666] hover:text-red-400 transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Sair
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-h-screen">
        <header className="h-16 border-b border-[#222] flex items-center px-8">
          <h1 className="font-heading font-bold text-lg">{title}</h1>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
