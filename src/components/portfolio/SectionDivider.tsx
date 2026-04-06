import { motion } from "framer-motion";

type Variant = "wave" | "circuit" | "pulse";

const SectionDivider = ({ variant = "wave" }: { variant?: Variant }) => {
  if (variant === "circuit") {
    return (
      <div className="relative w-full h-16 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute left-0 right-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/60 origin-right"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute left-1/2 right-0 h-px bg-gradient-to-l from-transparent via-primary/30 to-primary/60 origin-left"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="absolute left-[20%] w-1.5 h-1.5 rounded-full bg-primary/40"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="absolute right-[20%] w-1.5 h-1.5 rounded-full bg-primary/40"
          />
        </div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className="relative w-full h-12 flex items-center justify-center gap-2" aria-hidden="true">
        {[0, 0.06, 0.12].map((delay, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.2 }}
            className={`rounded-full bg-primary/40 ${i === 1 ? "w-2 h-2 bg-primary/60" : "w-1.5 h-1.5"}`}
          />
        ))}
      </div>
    );
  }

  // Default: wave
  return (
    <div className="relative w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-10 md:h-14"
      >
        <motion.path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30"
          fill="none"
          stroke="hsl(var(--primary) / 0.15)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,35 C300,55 500,10 700,35 C900,55 1100,15 1200,35"
          fill="none"
          stroke="hsl(var(--cyber-blue) / 0.1)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
