import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ComingSoon from "./pages/ComingSoon.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ComingSoon title="Services" description="Our full services page is being polished — for now, see the services preview on the homepage or get in touch." />} />
          <Route path="/about" element={<ComingSoon title="About Web Shrimp" description="Our story, team and values page is on the way." />} />
          <Route path="/portfolio" element={<ComingSoon title="Our Portfolio" description="The full case-study gallery is coming soon." />} />
          <Route path="/pricing" element={<ComingSoon title="Pricing" description="Transparent packages and add-ons are being finalised." />} />
          <Route path="/resources" element={<ComingSoon title="Resources & Blog" description="Articles, guides and free resources — launching shortly." />} />
          <Route path="/contact" element={<ComingSoon title="Get In Touch" description="A full contact form is on the way. In the meantime, email hello@webshrimp.lk." />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
