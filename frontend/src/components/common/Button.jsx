import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-white via-gray-100 to-white text-black hover:from-gray-50 hover:to-gray-200",
    secondary: "bg-black/50 text-white border border-white/20 backdrop-blur-xl",
    outline:
      "border-2 border-white text-white hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]",
    glass:
      "bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-white/10 hover:border-white/30",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{
        scale: disabled ? 1 : 1.02,
        boxShadow:
          variant === "primary"
            ? "0 0 30px rgba(255,255,255,0.4), inset 0 0 20px rgba(255,255,255,0.1)"
            : "0 0 20px rgba(255,255,255,0.2)",
      }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-xl font-semibold
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
        relative overflow-hidden
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Animated background effect */}
      <motion.div
        animate={{
          x: [-100, 300],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;
