"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";

/**
 * ScrollToTop — fixed bottom-right button that appears after scrolling 400px.
 * Smooth-scrolls back to the top on click.
 * Responsive: smaller on mobile (40px), larger on desktop (48px).
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="
            fixed bottom-6 right-6 z-[250]
            w-10 h-10 md:w-12 md:h-12
            rounded-full
            bg-primary text-white
            flex items-center justify-center
            shadow-lg shadow-primary/30
            hover:bg-primary/80
            transition-colors duration-200
            cursor-pointer
          "
        >
          <ChevronUp className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
