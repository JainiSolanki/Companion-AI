import React from "react";
import { motion } from "framer-motion";

const GlassmorphismCard = ({
  children,
  className = "",
  blur = "xl",
  opacity = 40,
  ...props
}) => {
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 30px 60px -12px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255,255,255,0.1)",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
      className={`
        relative overflow-hidden
        bg-black/${opacity} ${blurClasses[blur]} 
        border border-white/20 rounded-3xl 
        shadow-2xl shadow-black/20
        ${className}
      `}
      style={{
        boxShadow:
          "0 20px 40px -12px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255,255,255,0.05), inset 0 0 30px rgba(255,255,255,0.03)",
      }}
      {...props}
    >
      {/* Animated border gradient */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(0deg, transparent, rgba(255,255,255,0.1), transparent)",
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            "linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)",
            "linear-gradient(270deg, transparent, rgba(255,255,255,0.1), transparent)",
            "linear-gradient(360deg, transparent, rgba(255,255,255,0.1), transparent)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-50 rounded-3xl"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Corner decorations */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
      <div className="absolute bottom-3 left-3 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
    </motion.div>
  );
};

export default GlassmorphismCard;
