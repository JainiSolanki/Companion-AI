import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      onKeyDown,
      error,
      disabled = false,
      className = "",
      multiline = false,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const Component = multiline ? motion.textarea : motion.input;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <motion.label
            className="block text-sm font-semibold text-gray-300 mb-3 flex items-center"
            whileHover={{ x: 2 }}
          >
            {label}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="ml-2 w-1 h-1 bg-white rounded-full"
            />
          </motion.label>
        )}

        <div className="relative">
          <Component
            ref={ref}
            type={multiline ? undefined : type}
            rows={multiline ? rows : undefined}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            disabled={disabled}
            whileFocus={{
              scale: 1.02,
              boxShadow:
                "0 0 25px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
            w-full px-4 py-4 rounded-xl
            bg-black/40 backdrop-blur-xl
            border border-white/20
            text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-white/30
            focus:border-white/40
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300
            ${multiline ? "resize-none" : ""}
            ${
              error
                ? "border-red-400/50 focus:ring-red-400/30 bg-red-500/5"
                : ""
            }
          `}
            style={{
              boxShadow: error
                ? "0 0 20px rgba(239, 68, 68, 0.2)"
                : "0 0 15px rgba(255,255,255,0.05), inset 0 0 15px rgba(255,255,255,0.02)",
            }}
            {...props}
          />

          {/* Scanning line effect on focus */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileFocus={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent origin-left"
          />
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-red-400 text-sm mt-3 flex items-center"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="mr-2"
            >
              ⚠️
            </motion.span>
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
