import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import FaleConosco from "./pages/FaleConosco";
import Hotelzinho from "./pages/Hotelzinho";
import VenhaNosConhecer from "./pages/VenhaNosConhecer";
import Localizacao from "./pages/Localizacao";
import Fotos from "./pages/Fotos";
import Videos from "./pages/Videos";
import SigaNos from "./pages/SigaNos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fale-conosco" element={<FaleConosco />} />
          <Route path="/hotelzinho" element={<Hotelzinho />} />
          <Route path="/venha-nos-conhecer" element={<VenhaNosConhecer />} />
          <Route path="/localizacao" element={<Localizacao />} />
          <Route path="/fotos" element={<Fotos />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/siga-nos" element={<SigaNos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
