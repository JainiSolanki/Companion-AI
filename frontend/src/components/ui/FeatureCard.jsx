import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -10,
        rotateY: 5,
        boxShadow:
          "0 20px 60px rgba(255,255,255,0.1), inset 0 0 30px rgba(255,255,255,0.05)",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="group cursor-pointer h-full"
    >
      <div
        className="relative bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full overflow-hidden"
        style={{
          boxShadow:
            "0 0 30px rgba(255,255,255,0.05), inset 0 0 20px rgba(255,255,255,0.02)",
        }}
      >
        {/* Animated corner decoration */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, delay: index * 0.5 },
          }}
          className="absolute -top-5 -right-5 w-10 h-10 border border-white/20 rounded-full"
        />

        {/* Scanning line effect */}
        <motion.div
          animate={{
            x: [-200, 400],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "linear",
          }}
          className="absolute inset-0 w-1 bg-gradient-to-b from-transparent via-white/40 to-transparent -skew-x-12"
        />

        {/* Icon with glow effect */}
        <motion.div
          whileHover={{
            rotate: 10,
            scale: 1.2,
            filter: "drop-shadow(0 0 15px rgba(255,255,255,0.5))",
          }}
          className="text-white mb-6 relative z-10"
          style={{
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
          }}
        >
          {icon}
        </motion.div>

        {/* Content */}
        <h3
          className="text-xl font-semibold text-white mb-4 group-hover:text-gray-100 transition-all duration-300 relative z-10"
          style={{
            textShadow: "group-hover:0 0 10px rgba(255,255,255,0.5)",
          }}
        >
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 relative z-10">
          {description}
        </p>

        {/* Animated bottom border */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{
            scaleX: 1,
            opacity: 1,
            boxShadow: "0 0 15px rgba(255,255,255,0.5)",
          }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent origin-left"
        />

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 25}%`,
              top: `${10 + i * 15}%`,
              boxShadow: "0 0 10px rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FeatureCard;
