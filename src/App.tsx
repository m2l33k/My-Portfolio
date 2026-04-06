import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./context/LanguageContext";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import PageTransition from "./components/portfolio/PageTransition";
import BackToTopButton from "./components/portfolio/BackToTopButton";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import CommandPalette from "./components/portfolio/CommandPalette";
import CookieConsent from "./components/portfolio/CookieConsent";
import KeyboardShortcutsModal from "./components/portfolio/KeyboardShortcutsModal";

// Lazy-loaded routes for code splitting
const Chatbot = lazy(() => import("./pages/Chatbot"));
const Activity = lazy(() => import("./pages/Activity"));
const Volunteering = lazy(() => import("./pages/Volunteering"));
const Blog = lazy(() => import("./pages/Blog"));
const Recruiter = lazy(() => import("./pages/Recruiter"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  useKeyboardShortcuts();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Welcome /></PageTransition>} />
          <Route path="/portfolio" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/chat" element={<PageTransition><Chatbot /></PageTransition>} />
          <Route path="/activity" element={<PageTransition><Activity /></PageTransition>} />
          <Route path="/volunteering" element={<PageTransition><Volunteering /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/recruiter" element={<PageTransition><Recruiter /></PageTransition>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
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
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;


