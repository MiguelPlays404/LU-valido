import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavigationProgress } from "@/components/NavigationProgress";
import { PageTransition } from "@/components/PageTransition";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import FaleConosco from "./pages/FaleConosco";
import Hotelzinho from "./pages/Hotelzinho";
import VenhaNosConhecer from "./pages/VenhaNosConhecer";
import Localizacao from "./pages/Localizacao";
import Fotos from "./pages/Fotos";
import Videos from "./pages/Videos";
import SigaNos from "./pages/SigaNos";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPhotos from "./pages/admin/AdminPhotos";
import AdminVideos from "./pages/admin/AdminVideos";
import AdminHotelzinho from "./pages/admin/AdminHotelzinho";
import AdminConhecer from "./pages/admin/AdminConhecer";
import AdminConfig from "./pages/admin/AdminConfig";
import AdminSocial from "./pages/admin/AdminSocial";
import AdminSecurity from "./pages/admin/AdminSecurity";
import AdminHome from "./pages/admin/AdminHome";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NavigationProgress />
        <Routes>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/fale-conosco" element={<PageTransition><FaleConosco /></PageTransition>} />
          <Route path="/hotelzinho" element={<PageTransition><Hotelzinho /></PageTransition>} />
          <Route path="/venha-nos-conhecer" element={<PageTransition><VenhaNosConhecer /></PageTransition>} />
          <Route path="/localizacao" element={<PageTransition><Localizacao /></PageTransition>} />
          <Route path="/fotos" element={<PageTransition><Fotos /></PageTransition>} />
          <Route path="/videos" element={<PageTransition><Videos /></PageTransition>} />
          <Route path="/siga-nos" element={<PageTransition><SigaNos /></PageTransition>} />
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/home" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path="/admin/fotos" element={<ProtectedRoute><AdminPhotos /></ProtectedRoute>} />
          <Route path="/admin/videos" element={<ProtectedRoute><AdminVideos /></ProtectedRoute>} />
          <Route path="/admin/hotelzinho" element={<ProtectedRoute><AdminHotelzinho /></ProtectedRoute>} />
          <Route path="/admin/conhecer" element={<ProtectedRoute><AdminConhecer /></ProtectedRoute>} />
          <Route path="/admin/config" element={<ProtectedRoute><AdminConfig /></ProtectedRoute>} />
          <Route path="/admin/social" element={<ProtectedRoute><AdminSocial /></ProtectedRoute>} />
          <Route path="/admin/seguranca" element={<ProtectedRoute><AdminSecurity /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
