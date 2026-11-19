import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { SEOHead } from "@/components/SEOHead";

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
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
        </TooltipProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
