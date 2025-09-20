import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  ExternalLink,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Check,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const ChatMessage = ({ message }) => {
  const isUser = message.type === "user";
  const isAI = message.type === "ai";
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'up', 'down', or null

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    // Here you would typically send feedback to your backend
    console.log(`Feedback: ${type} for message:`, message.id);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: 0.05,
      }}
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } group relative`}
    >
      <div
        className={`flex items-start space-x-4 max-w-4xl ${
          isUser ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {/* Enhanced Avatar */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`
          w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden
          ${
            isUser
              ? "bg-gradient-to-r from-white/20 to-gray-400/20 backdrop-blur-xl border border-white/30"
              : "bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-xl border border-white/20"
          }
        `}
          style={{
            boxShadow: isUser
              ? "0 0 20px rgba(255,255,255,0.3), inset 0 0 10px rgba(255,255,255,0.1)"
              : "0 0 25px rgba(255,255,255,0.4), inset 0 0 15px rgba(255,255,255,0.05)",
          }}
        >
          {/* Avatar background animation */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          {isUser ? (
            <User className="w-5 h-5 text-white relative z-10" />
          ) : (
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <Bot className="w-5 h-5 text-white" />
            </motion.div>
          )}

          {/* Status indicator for AI */}
          {isAI && (
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black"
            />
          )}
        </motion.div>

        {/* Message Content */}
        <div
          className={`flex flex-col ${
            isUser ? "items-end" : "items-start"
          } flex-1`}
        >
          {/* Message Header */}
          <div
            className={`flex items-center space-x-2 mb-2 ${
              isUser ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <span className="text-xs font-medium text-gray-300">
              {isUser ? "You" : "DoraAI"}
            </span>
            {isAI && (
              <div className="flex items-center space-x-1 text-xs text-green-400">
                <Shield className="w-3 h-3" />
                <span>Verified Expert</span>
              </div>
            )}
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{formatTimestamp(message.timestamp)}</span>
            </div>
          </div>

          {/* Enhanced Message Bubble */}
          <motion.div
            whileHover={{
              scale: 1.01,
              boxShadow: isUser
                ? "0 0 30px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.05)"
                : "0 0 35px rgba(255,255,255,0.25), inset 0 0 25px rgba(255,255,255,0.03)",
            }}
            className={`
              relative p-5 rounded-3xl max-w-3xl backdrop-blur-xl overflow-hidden
              ${
                isUser
                  ? "bg-gradient-to-r from-white/10 to-gray-200/10 text-white rounded-tr-lg border border-white/20"
                  : "bg-black/40 text-white rounded-tl-lg border border-white/15"
              }
            `}
            style={{
              boxShadow: isUser
                ? "0 10px 30px rgba(255,255,255,0.1), inset 0 0 15px rgba(255,255,255,0.03)"
                : "0 15px 40px rgba(255,255,255,0.15), inset 0 0 20px rgba(255,255,255,0.02)",
            }}
          >
            {/* Message Background Animation */}
            <motion.div
              animate={{
                x: [-100, 400],
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            />

            {/* Corner Decorations */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" />

            {/* Message Text */}
            <div className="prose prose-invert max-w-none relative z-10">
              <motion.p
                className="mb-0 whitespace-pre-wrap leading-relaxed text-[15px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {message.content}
              </motion.p>
            </div>

            {/* AI Enhancement Indicators */}
            {isAI && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-3 mt-3 pt-3 border-t border-white/10"
              >
                <div className="flex items-center space-x-1 text-xs text-blue-400">
                  <Zap className="w-3 h-3" />
                  <span>AI-Powered</span>
                </div>
                {message.confidence && (
                  <div className="text-xs text-green-400">
                    {Math.round(message.confidence * 100)}% Confidence
                  </div>
                )}
              </motion.div>
            )}

            {/* Source Citation for AI Messages */}
            {isAI && message.source && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 0.4 }}
                className="mt-4 pt-3 border-t border-white/20"
              >
                <div className="flex items-center space-x-2 text-xs text-white/70 bg-white/5 rounded-xl p-2 backdrop-blur-sm">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Source: {message.source}</span>
                </div>
              </motion.div>
            )}

            {/* Enhanced Message Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`
              absolute -bottom-12 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300
              ${isUser ? "right-0" : "left-0"}
            `}
            >
              {/* Copy Button */}
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopyMessage}
                className="p-2 bg-black/60 backdrop-blur-xl rounded-xl text-white/60 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200"
                title="Copy message"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <Check className="w-3 h-3 text-green-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="w-3 h-3" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* AI Feedback Buttons */}
              {isAI && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleFeedback("up")}
                    className={`p-2 bg-black/60 backdrop-blur-xl rounded-xl border transition-all duration-200 ${
                      feedback === "up"
                        ? "text-green-400 border-green-400/50 bg-green-400/10"
                        : "text-white/60 hover:text-green-400 border-white/20 hover:border-green-400/40"
                    }`}
                    title="Good response"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleFeedback("down")}
                    className={`p-2 bg-black/60 backdrop-blur-xl rounded-xl border transition-all duration-200 ${
                      feedback === "down"
                        ? "text-red-400 border-red-400/50 bg-red-400/10"
                        : "text-white/60 hover:text-red-400 border-white/20 hover:border-red-400/40"
                    }`}
                    title="Poor response"
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Message Status Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`mt-2 flex items-center space-x-2 text-xs ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            {copied && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-green-400 flex items-center space-x-1"
              >
                <Check className="w-3 h-3" />
                <span>Copied!</span>
              </motion.span>
            )}

            {feedback && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex items-center space-x-1 ${
                  feedback === "up" ? "text-green-400" : "text-red-400"
                }`}
              >
                {feedback === "up" ? (
                  <ThumbsUp className="w-3 h-3" />
                ) : (
                  <ThumbsDown className="w-3 h-3" />
                )}
                <span>Feedback sent</span>
              </motion.span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Message Connection Line (subtle) */}
      {!isUser && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute left-5 top-12 w-8 h-px bg-gradient-to-r from-white/20 to-transparent"
        />
      )}
    </motion.div>
  );
};

export default ChatMessage;
