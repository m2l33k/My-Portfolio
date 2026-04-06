import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

const isMobile = () => window.innerWidth < 768;

export const CyberParticles = () => {
  const [init, setInit] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  const isDark = resolvedTheme === "dark";
  const mobile = isMobile();
  const particleColor = isDark ? "#00FF00" : "#0d9488";
  const linkColor = isDark ? "#00FF00" : "#14b8a6";
  const linkOpacity = isDark ? 0.2 : 0.12;
  const particleOpacity = isDark ? 0.5 : 0.35;

  return (
    <Particles
      key={resolvedTheme}
      id="cyber-particles"
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: mobile ? 30 : 60,
        interactivity: {
          events: {
            onClick: {
              enable: !mobile,
              mode: "push",
            },
            onHover: {
              enable: !mobile,
              mode: "grab",
            },
            resize: { enable: true },
          },
          modes: {
            push: {
              quantity: 2,
            },
            grab: {
              distance: 120,
              links: {
                opacity: 0.4,
              },
            },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: linkColor,
            distance: mobile ? 120 : 150,
            enable: true,
            opacity: linkOpacity,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: mobile ? 0.5 : 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: mobile ? 1200 : 900,
            },
            value: mobile ? 30 : 60,
          },
          opacity: {
            value: particleOpacity,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1.5, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-[1]"
    />
  );
};
