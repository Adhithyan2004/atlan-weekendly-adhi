"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000); // ⏳ delay before exiting
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-violet-400 text-black z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }} // ✅ smooth fade & slight upward slide
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.h1
        className="text-4xl font-bold"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        WEEKENDLY
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-3 text-lg font-medium"
      >
        Your weekend, your vibe.
      </motion.p>
    </motion.div>
  );
}
