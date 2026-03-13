'use client';

import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function GlassButton({ 
  children, 
  className,
  variant = 'primary',
  ...props 
}: GlassButtonProps) {
  const variants = {
    primary: "bg-blue-600/50 hover:bg-blue-500/60 border border-blue-400/30 text-white",
    secondary: "glass hover:bg-white/10 text-white",
    danger: "bg-red-500/50 hover:bg-red-400/60 border border-red-400/30 text-white",
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "px-6 py-3 rounded-full font-medium transition-colors shadow-lg backdrop-blur-md",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
