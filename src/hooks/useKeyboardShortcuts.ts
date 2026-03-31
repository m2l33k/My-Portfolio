import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const sectionMap: Record<string, string> = {
  "1": "#about",
  "2": "#certifications",
  "3": "#projects",
  "4": "#internships",
  "5": "#education",
  "6": "#languages",
  "7": "#motivation",
};

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore if typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "Escape") {
        if (location.pathname !== "/") {
          navigate("/");
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const href = sectionMap[e.key];
      if (href) {
        if (location.pathname !== "/") {
          navigate("/");
          // Wait for navigation then scroll
          setTimeout(() => {
            document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
          }, 400);
        } else {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, location.pathname]);
};
