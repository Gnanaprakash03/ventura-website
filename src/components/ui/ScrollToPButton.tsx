"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-2 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center"
        >
          <button
            onClick={scrollToTop}
            className="bg-gradient-to-r from-blue-600 to-teal-400
                       text-white p-2 sm:p-3 md:p-4
                       rounded-full shadow-lg
                       hover:scale-105 transition-transform"
          >
            <ArrowUp size={22} />
          </button>
          <span className="mt-2 text-sm sm:text-base text-blue-800 font-medium">
            Back to Top
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
