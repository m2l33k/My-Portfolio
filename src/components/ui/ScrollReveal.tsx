import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export const ScrollReveal = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up",
  duration = 0.5
}: ScrollRevealProps) => {
  
  const getVariants = () => {
    const distance = 50;
    switch (direction) {
      case "up": return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
      case "down": return { hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } };
      case "left": return { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } };
      case "right": return { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } };
      case "none": return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
      default: return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={getVariants()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
