import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, Cpu, Zap } from "lucide-react";

const DemoPreview = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const demoMessages = [
    {
      type: "user",
      content:
        "My washing machine is making a loud noise during spin cycle. What could be wrong?",
      delay: 2000,
    },
    {
      type: "ai",
      content:
        "Based on your washing machine manual, loud noises during spin cycle are commonly caused by:\n\n1. **Unbalanced load** - Redistribute clothes evenly\n2. **Loose drum** - Check if drum moves excessively\n3. **Worn bearings** - May need professional service\n\nLet me walk you through the troubleshooting steps...",
      source: "Whirlpool WTW5000DW Manual, Page 23",
      delay: 3000,
    },
    {
      type: "user",
      content: "How do I redistribute the clothes?",
      delay: 2000,
    },
    {
      type: "ai",
      content:
        "**Step-by-step instructions:**\n\n1. **Stop the cycle** - Press pause/stop button\n2. **Wait 2 minutes** - Allow drum to stop completely\n3. **Open lid** - Machine will unlock automatically\n4. **Redistribute items** - Spread clothes evenly around drum\n5. **Close lid** - Resume cycle by pressing start\n\n💡 **Pro tip:** Mix large and small items for better balance.",
      source: "General Appliance Care Guide",
      delay: 3000,
    },
  ];

  useEffect(() => {
    if (currentStep < demoMessages.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, demoMessages[currentStep]?.delay || 2000);
      return () => clearTimeout(timer);
    } else if (currentStep >= demoMessages.length) {
      const resetTimer = setTimeout(() => {
        setCurrentStep(0);
      }, 4000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep]);

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 0 50px rgba(255,255,255,0.15), inset 0 0 30px rgba(255,255,255,0.05)",
      }}
      className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden"
      style={{
        boxShadow:
          "0 0 40px rgba(255,255,255,0.1), inset 0 0 25px rgba(255,255,255,0.03)",
      }}
    >
      {/* Animated header background */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      {/* Demo Header */}
      <div className="relative p-6 border-b border-white/10">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                boxShadow: [
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 30px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.3)",
                ],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 2, repeat: Infinity },
              }}
              className="relative w-12 h-12 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl"
            >
              <Bot className="w-6 h-6 text-white" />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 border-2 border-white/50 rounded-2xl"
              />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                Live Demo
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap className="w-4 h-4 text-white" />
                </motion.div>
              </h3>
              <p className="text-sm text-gray-400">
                AI-Powered Appliance Support
              </p>
            </div>
          </div>
        </div>

        {/* Processing indicator */}
        <motion.div
          animate={{ width: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
        />
      </div>

      {/* Chat Messages */}
      <div className="p-6 space-y-6 min-h-[450px] max-h-[550px] overflow-y-auto relative">
        {/* Background circuit pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <defs>
              <pattern
                id="circuit"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="white" />
                <path d="M2 2h16M2 2v16" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>

        <AnimatePresence>
          {demoMessages.slice(0, currentStep).map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.1,
              }}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              } relative z-10`}
            >
              <div
                className={`flex items-start space-x-4 max-w-md ${
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`
                  w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 relative
                  ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl"
                      : "bg-gradient-to-r from-white/30 to-white/15 backdrop-blur-xl"
                  }
                `}
                  style={{
                    boxShadow:
                      message.type === "user"
                        ? "0 0 20px rgba(255,255,255,0.2)"
                        : "0 0 25px rgba(255,255,255,0.3)",
                  }}
                >
                  {message.type === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <>
                      <Bot className="w-5 h-5 text-white" />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 border border-white/30 rounded-2xl"
                      />
                    </>
                  )}
                </motion.div>

                {/* Message Bubble */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      message.type === "user"
                        ? "0 0 30px rgba(255,255,255,0.15)"
                        : "0 0 35px rgba(255,255,255,0.2)",
                  }}
                  className={`
                  p-5 rounded-2xl backdrop-blur-xl relative overflow-hidden
                  ${
                    message.type === "user"
                      ? "bg-white/10 border border-white/20 text-white rounded-tr-md"
                      : "bg-black/40 border border-white/15 text-white rounded-tl-md"
                  }
                `}
                  style={{
                    boxShadow:
                      message.type === "user"
                        ? "0 0 20px rgba(255,255,255,0.1)"
                        : "0 0 25px rgba(255,255,255,0.12)",
                  }}
                >
                  {/* Message glow effect */}
                  <motion.div
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-white/5 rounded-2xl"
                  />

                  <div className="prose prose-invert prose-sm max-w-none relative z-10">
                    <p className="mb-0 whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>

                  {/* Source for AI messages */}
                  {message.type === "ai" && message.source && (
                    <div className="mt-4 pt-3 border-t border-white/20 relative z-10">
                      <div className="text-xs text-gray-400 flex items-center space-x-2">
                        <Cpu className="w-3 h-3" />
                        <span>Source: {message.source}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Enhanced Typing indicator */}
        {currentStep < demoMessages.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start relative z-10"
          >
            <div className="flex items-start space-x-4">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255,255,255,0.3)",
                    "0 0 30px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-10 h-10 bg-gradient-to-r from-white/30 to-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center"
              >
                <Bot className="w-5 h-5 text-white" />
              </motion.div>
              <div
                className="bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl rounded-tl-md p-5"
                style={{
                  boxShadow: "0 0 25px rgba(255,255,255,0.12)",
                }}
              >
                <div className="flex space-x-2">
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                        boxShadow: [
                          "0 0 5px rgba(255,255,255,0.3)",
                          "0 0 15px rgba(255,255,255,0.8)",
                          "0 0 5px rgba(255,255,255,0.3)",
                        ],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dot * 0.2,
                        ease: "easeInOut",
                      }}
                      className="w-2.5 h-2.5 bg-white rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Demo completion message */}
        {currentStep >= demoMessages.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 relative z-10"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255,255,255,0.2)",
                  "0 0 40px rgba(255,255,255,0.4)",
                  "0 0 20px rgba(255,255,255,0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
            >
              <motion.h4
                animate={{
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.8)",
                    "0 0 10px rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white font-semibold mb-2 text-lg"
              >
                Demo Complete! ✨
              </motion.h4>
              <p className="text-gray-400 text-sm">
                Experience the full power with your own appliances!
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Enhanced Demo Footer */}
      <div className="relative border-t border-white/10 p-4 text-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        />
        <p className="text-xs text-gray-400 relative z-10">
          ⚡ Powered by NVIDIA NIM • Real-time Processing • Source-verified
          Responses
        </p>
      </div>
    </motion.div>
  );
};

export default DemoPreview;
