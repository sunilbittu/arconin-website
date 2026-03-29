import { type ReactNode } from "react";
import { motion } from "motion/react";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="noise-bg min-h-screen pt-24 md:pt-32"
    >
      {children}
    </motion.div>
  );
}
