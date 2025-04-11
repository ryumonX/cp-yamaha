"use client";
import { motion } from "framer-motion";
import React from "react";

interface FadeUpSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeUpSection: React.FC<FadeUpSectionProps> = ({ children, delay = 0, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default FadeUpSection;
