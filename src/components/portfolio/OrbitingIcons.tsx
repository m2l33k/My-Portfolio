import { motion } from "framer-motion";

interface OrbitIcon {
  label: string;
  src: string;
}

const outerIcons: OrbitIcon[] = [
  { label: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { label: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { label: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { label: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { label: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
];

const innerIcons: OrbitIcon[] = [
  { label: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { label: "TensorFlow", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { label: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const OrbitRing = ({
  icons,
  radius,
  duration,
  reverse,
  size,
  delay,
}: {
  icons: OrbitIcon[];
  radius: number;
  duration: number;
  reverse?: boolean;
  size: number;
  delay: number;
}) => {
  const direction = reverse ? -1 : 1;

  return (
    <div
      className={reverse ? "animate-orbit-reverse" : "animate-orbit-slow"}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: radius * 2,
        height: radius * 2,
        marginTop: -radius,
        marginLeft: -radius,
      }}
    >
      {/* Dashed ring */}
      <div
        className="absolute inset-0 rounded-full border border-dashed"
        style={{ borderColor: reverse ? "hsl(200 100% 60% / 0.06)" : "hsl(120 100% 50% / 0.07)" }}
      />

      {icons.map((icon, i) => {
        const angle = (2 * Math.PI * i) / icons.length - Math.PI / 2;
        const x = radius + Math.cos(angle) * radius;
        const y = radius + Math.sin(angle) * radius;

        return (
          <motion.div
            key={icon.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + i * 0.06, duration: 0.25 }}
            className="absolute"
            style={{
              left: x,
              top: y,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              // Counter-rotate so icons stay upright
              animation: `${reverse ? "orbit-slow" : "orbit-reverse"} ${duration}s linear infinite`,
            }}
          >
            <div
              className="rounded-lg bg-card/80 backdrop-blur-sm border border-primary/10 shadow-lg shadow-primary/5 flex items-center justify-center pointer-events-auto group hover:border-primary/30 hover:shadow-primary/15 transition-all duration-300 hover:scale-110"
              style={{ width: size, height: size }}
            >
              <img
                src={icon.src}
                alt={icon.label}
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ width: size * 0.55, height: size * 0.55 }}
                loading="lazy"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const OrbitingIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <OrbitRing icons={outerIcons} radius={220} duration={60} size={36} delay={0.3} />
      <OrbitRing icons={innerIcons} radius={170} duration={45} reverse size={32} delay={0.5} />
    </div>
  );
};

export default OrbitingIcons;
