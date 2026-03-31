import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { LanguageProvider } from "./context/LanguageContext";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import LoadingScreen from "./components/portfolio/LoadingScreen";
import PageTransition from "./components/portfolio/PageTransition";
import BackToTopButton from "./components/portfolio/BackToTopButton";
import Index from "./pages/Index";
import Chatbot from "./pages/Chatbot";
import Activity from "./pages/Activity";
import Volunteering from "./pages/Volunteering";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import CommandPalette from "./components/portfolio/CommandPalette";
import CookieConsent from "./components/portfolio/CookieConsent";
import KeyboardShortcutsModal from "./components/portfolio/KeyboardShortcutsModal";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  useKeyboardShortcuts();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/chat" element={<PageTransition><Chatbot /></PageTransition>} />
        <Route path="/activity" element={<PageTransition><Activity /></PageTransition>} />
        <Route path="/volunteering" element={<PageTransition><Volunteering /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(() => {
    const hasVisited = sessionStorage.getItem("portfolio-loaded");
    return !hasVisited;
  });

  const handleLoadingComplete = useCallback(() => {
    sessionStorage.setItem("portfolio-loaded", "true");
    setLoading(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
          <BrowserRouter>
            <CommandPalette />
            <KeyboardShortcutsModal />
            <AnimatedRoutes />
            <BackToTopButton />
          </BrowserRouter>
          <CookieConsent />
          <Analytics />
          <SpeedInsights />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;


