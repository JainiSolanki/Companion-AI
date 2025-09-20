import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Send, Zap, Mic, MicOff } from "lucide-react";
import { addMessage, sendMessageAPI } from "../../store/slices/chatSlice";
import Button from "../common/Button";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";

const ChatInput = () => {
  const dispatch = useDispatch();
  const { selectedAppliance, selectedBrand, isLoading } = useSelector(
    (state) => state.chat
  );

  const [message, setMessage] = useState("");
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const textareaRef = useRef(null);

  // Speech recognition hook
  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening
  } = useSpeechRecognition();

  // Update message when speech transcript changes
  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
      setIsVoiceInput(true);
      // Auto-resize textarea for voice input
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
      }
    }
  }, [transcript]);

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
    setIsVoiceInput(false);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Handle voice input toggle
  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      setMessage(""); // Clear current message
      setIsVoiceInput(false);
      startListening();
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
    setIsVoiceInput(false);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const isDisabled = !selectedAppliance || !selectedBrand;

  return (
    <motion.div
      className="relative p-6 bg-gradient-to-r from-black/90 to-black/95 backdrop-blur-xl border-t border-white/10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Input Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-50"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {isDisabled ? (
        // Selection Required State
        <div className="text-center py-8">
          <motion.div
            className="text-gray-400 text-lg mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Please select your appliance and brand
          </motion.div>
          <motion.div
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Choose from the sidebar to start chatting
          </motion.div>
        </div>
      ) : (
        // Active Chat Input
        <div className="flex items-end gap-3 relative">
          {/* Message Input with Icons Inside */}
          <div className="flex-1 relative">
            <motion.textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={`Ask me about your ${selectedAppliance?.replace(
                "-",
                " "
              )}... (Shift+Enter for new line)`}
              className={`w-full px-4 py-3 pr-20 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 resize-none min-h-[52px] max-h-[120px] ${
                isVoiceInput ? 'border-blue-400/50 bg-blue-500/10' : ''
              } ${isListening ? 'border-red-400/50 bg-red-500/10' : ''}`}
              disabled={isLoading || isListening}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            />

            {/* Icons Container - INSIDE the input field */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              {/* Speaker/Microphone Icon - INSIDE input */}
              {isSupported && (
                <motion.button
                  type="button"
                  onClick={handleVoiceToggle}
                  disabled={isLoading}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isListening
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                      : 'bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  title={isListening ? 'Stop Recording' : 'Start Voice Input'}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-6 h-6" />
                  )}
                </motion.button>
              )}

              {/* Send Message Icon - INSIDE input */}
              <motion.button
                type="submit"
                onClick={handleSend}
                disabled={!message.trim() || isLoading || isListening}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-all duration-300 relative overflow-hidden group"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Send className="w-6 h-6 relative z-10" />
                {/* Button animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </div>

            {/* Voice Input Indicators */}
            {isVoiceInput && message && !isListening && (
              <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
                🎙️ Voice
              </div>
            )}
            
            {isListening && (
              <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-md animate-pulse">
                🔴 Listening...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Voice Input Status Message */}
      {isVoiceInput && message && !isListening && (
        <motion.div 
          className="mt-3 text-sm text-blue-400 flex items-center space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>🎙️</span>
          <span>Voice input detected. You can edit before sending.</span>
        </motion.div>
      )}

      {/* Quick Actions */}
      {!isDisabled && message === "" && !isListening && (
        <motion.div
          className="flex flex-wrap gap-2 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
              onClick={() => setMessage(suggestion)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-3 py-2 text-xs text-gray-400 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {suggestion}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Status Indicator */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          {message.length > 0 && `${message.length} characters`}
          {selectedAppliance && selectedBrand && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400">
                ● {selectedBrand.toUpperCase()}{" "}
                {selectedAppliance.replace("-", " ")} Expert Active
              </span>
            </div>
          )}
        </div>
        <div>
          {isListening ? (
            <span className="text-red-400">🔴 Voice recording active</span>
          ) : (
            "Enter to send • Shift+Enter for new line"
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInput;
