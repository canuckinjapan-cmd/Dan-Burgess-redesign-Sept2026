import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SEOHead } from "./components/SEOHead";
import { LanguageDetector } from "./components/LanguageDetector";

const queryClient = new QueryClient();

function AppRoutes() {
  const { lang } = useLanguage();

  return (
    <>
      <SEOHead lang={lang} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/en" element={<Index />} />
        <Route path="/en/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => {
  useEffect(() => {
    // Determine the API base URL and share it with static sample pages via localStorage
    const appUrl = import.meta.env.VITE_APP_URL;
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    const finalUrl = (apiBase || appUrl || "").trim().replace(/\/+$/, "");
    
    if (finalUrl) {
      localStorage.setItem('AIS_API_URL', finalUrl);
      console.log(">>> [APP] Saved API URL to localStorage for samples:", finalUrl);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <LanguageDetector>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </TooltipProvider>
          </LanguageProvider>
        </LanguageDetector>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
