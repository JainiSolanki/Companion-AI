import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Send, Zap } from "lucide-react";
import { addMessage, sendMessageAPI } from "../../store/slices/chatSlice";
import Button from "../common/Button";

const ChatInput = () => {
  const dispatch = useDispatch();
  const { selectedAppliance, selectedBrand, isLoading } = useSelector(
    (state) => state.chat
  );
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSend = (e) => {
    //e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = {
      type: "user",
      content: message.trim(),
    };
    
    // Add user message immediately
    dispatch(addMessage(userMessage));

    // Send to backend
    dispatch(
      sendMessageAPI({
        message: message.trim(),
        selectedAppliance,
        selectedBrand,
      })
    );

    setMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Shift + Enter: New line (default behavior)
        return;
      } else {
        // Enter: Send message
        e.preventDefault();
        handleSend();
      }
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const isDisabled = !selectedAppliance || !selectedBrand;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative"
    >
      <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-4 relative overflow-hidden">
        {/* Input Background Animation */}
        <motion.div
          animate={{
            background: [
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl"
        />

        {isDisabled ? (
          // Selection Required State
          <div className="text-center py-6 relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 mx-auto mb-3 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20"
            >
              <Zap className="w-6 h-6 text-gray-400" />
            </motion.div>
            <p className="text-gray-400 mb-2">
              Please select your appliance and brand
            </p>
            <p className="text-xs text-gray-500">
              Choose from the sidebar to start chatting
            </p>
          </div>
        ) : (
          // Active Chat Input
          <div className="flex items-end space-x-4 relative z-10">
            {/* Message Input */}
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder={`Ask me about your ${selectedBrand} ${selectedAppliance?.replace(
                  "-",
                  " "
                )}... (Shift+Enter for new line)`}
                className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[44px] max-h-[120px] py-2 px-2"
                rows={1}
                disabled={isLoading}
              />
            </div>

            {/* Send Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
                className="p-3 min-w-0 relative overflow-hidden"
                size="sm"
              >
                {/* Button animation */}
                <motion.div
                  animate={{
                    x: [-100, 400],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                />

                <motion.div
                  animate={isLoading ? { rotate: 360 } : {}}
                  transition={{
                    duration: 1,
                    repeat: isLoading ? Infinity : 0,
                    ease: "linear",
                  }}
                  className="relative z-10"
                >
                  <Send className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {!isDisabled && message === "" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {[
            `My ${selectedBrand} ${selectedAppliance?.replace(
              "-",
              " "
            )} is making strange noises`,
            `How do I clean my ${selectedBrand} ${selectedAppliance?.replace(
              "-",
              " "
            )}?`,
            `${selectedAppliance?.replace("-", " ")} not working properly`,
            `Best settings for ${selectedBrand} ${selectedAppliance?.replace(
              "-",
              " "
            )}`,
          ].map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMessage(suggestion)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-3 py-2 text-xs text-gray-400 hover:text-white transition-all duration-300"
            >
              {suggestion}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Status Indicator */}
      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
        <span>
          {message.length > 0 && `${message.length} characters`}
          {selectedAppliance && selectedBrand && (
            <span className="ml-2 text-green-400">
              ● {selectedBrand.toUpperCase()}{" "}
              {selectedAppliance.replace("-", " ")} Expert Active
            </span>
          )}
        </span>
        <span>Enter to send • Shift+Enter for new line</span>
      </div>
    </motion.div>
  );
};

export default ChatInput;
