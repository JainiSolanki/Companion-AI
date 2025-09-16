import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bot, Menu, X, Cpu, Zap, Activity, Wifi } from "lucide-react";
import { toggleSidebar } from "../store/slices/chatSlice";
import { logoutUser } from "../store/slices/authSlice";
import Sidebar from "../components/chat/Sidebar";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import ProactiveTips from "../components/chat/ProactiveTips";
import Button from "../components/common/Button";

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { messages, isTyping, sidebarOpen, selectedAppliance, selectedBrand } = useSelector(
    (state) => state.chat
  );

  // Floating particles for background
  const floatingElements = [
    { icon: Cpu, position: { x: 10, y: 15 }, delay: 0 },
    { icon: Zap, position: { x: 85, y: 20 }, delay: 0.5 },
    { icon: Activity, position: { x: 5, y: 60 }, delay: 1 },
    { icon: Wifi, position: { x: 90, y: 70 }, delay: 1.5 },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen bg-black flex overflow-hidden relative">
      {/* Advanced Background Effects */}
      
      {/* Neural Network Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon;
          return (
            <motion.div
              key={index}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
                opacity: [0.8, 0.8, 0.8],
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                left: `${element.position.x}%`,
                top: `${element.position.y}%`,
              }}
            >
              <div className="w-8 h-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center">
                <IconComponent className="w-4 h-4 text-white/30" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Data Flow Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(255,255,255,0.6)',
            }}
          />
        ))}
      </div>

      {/* Layout Container with Smooth Transitions */}
      <div className="flex w-full h-full relative z-10">
        {/* Sidebar with Smooth Animation */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -350, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -350, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.4
              }}
              className="w-80 flex-shrink-0 z-40"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area with Smooth Width Transitions */}
        <motion.div
          animate={{
            width: sidebarOpen ? "calc(100% - 320px)" : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4,
          }}
          className="flex flex-col bg-transparent"
        >
          {/* Enhanced Header */}
          <motion.header 
            className="bg-black/60 backdrop-blur-xl border-b border-white/20 p-4 relative overflow-hidden"
            animate={{ 
              paddingLeft: sidebarOpen ? "1rem" : "1rem" 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            {/* Header Background Animation */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0"
            />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => dispatch(toggleSidebar())}
                    className="p-2"
                  >
                    <motion.div
                      animate={{ 
                        rotate: sidebarOpen ? 0 : 0,
                        scale: sidebarOpen ? 1 : 1
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                    >
                      <motion.div
                        animate={{
                          rotateY: sidebarOpen ? 180 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {sidebarOpen ? (
                          <X className="w-5 h-5" />
                        ) : (
                          <Menu className="w-5 h-5" />
                        )}
                      </motion.div>
                    </motion.div>
                  </Button>
                </motion.div>
                
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                      boxShadow: [
                        '0 0 20px rgba(255,255,255,0.3)',
                        '0 0 30px rgba(255,255,255,0.5)',
                        '0 0 20px rgba(255,255,255,0.3)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-10 h-10 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20"
                  >
                    <Bot className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-xl font-bold text-white flex items-center">
                      Companion AI
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="ml-2"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </motion.div>
                    </h1>
                    <p className="text-xs text-gray-400">
                      {selectedAppliance && selectedBrand 
                        ? `${selectedBrand} ${selectedAppliance.replace('-', ' ')} Assistant`
                        : "Smart Appliance Assistant"
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm text-gray-300 flex items-center space-x-2"
                >
                  <span>Welcome, {user?.name || "User"}</span>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <span className="text-xs text-green-400">Online</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="glass" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.header>

          {/* Chat Messages Container with Smooth Transitions */}
          <div className="flex-1 flex overflow-hidden">
            {/* Messages Area with Animated Width */}
            <motion.div
              animate={{
                width: selectedAppliance && selectedBrand ? "calc(100% - 320px)" : "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
              className="flex flex-col"
            >
              <div className="flex-1 overflow-y-auto p-6 space-y-8 relative chat-scrollbar">
                <AnimatePresence>
                  {messages.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-20 relative"
                    >
                      {/* Central AI Avatar */}
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 2, -2, 0],
                          boxShadow: [
                            '0 0 30px rgba(255,255,255,0.3)',
                            '0 0 50px rgba(255,255,255,0.5)',
                            '0 0 30px rgba(255,255,255,0.3)'
                          ]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-24 h-24 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20 relative overflow-hidden"
                      >
                        {/* Orbital Rings */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-2 border-white/20 rounded-3xl"
                        />
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border border-white/10 rounded-3xl m-2"
                        />
                        
                        <Bot className="w-12 h-12 text-white relative z-10" />
                      </motion.div>

                      <motion.h2 
                        className="text-3xl font-bold text-white mb-3"
                        style={{
                          textShadow: '0 0 20px rgba(255,255,255,0.5)'
                        }}
                      >
                        {selectedAppliance && selectedBrand 
                          ? `${selectedBrand} ${selectedAppliance.replace('-', ' ')} Expert`
                          : "Hello! I'm your Companion AI"
                        }
                      </motion.h2>
                      
                      <p className="text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                        {selectedAppliance && selectedBrand 
                          ? `I specialize in ${selectedBrand} ${selectedAppliance.replace('-', ' ')} troubleshooting, maintenance, and optimization. How can I help you today?`
                          : "Select your appliance and brand from the sidebar to get started with personalized assistance."
                        }
                      </p>

                      {/* Quick Action Cards */}
                      {selectedAppliance && selectedBrand && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                          {[
                            {
                              icon: "🔧",
                              title: "Troubleshooting",
                              desc: "Fix common issues",
                              query: `My ${selectedBrand} ${selectedAppliance.replace('-', ' ')} is not working properly`
                            },
                            {
                              icon: "🧹",
                              title: "Maintenance",
                              desc: "Cleaning & care tips",
                              query: `How do I clean my ${selectedBrand} ${selectedAppliance.replace('-', ' ')}?`
                            },
                            {
                              icon: "⚙️",
                              title: "Settings",
                              desc: "Optimize performance",
                              query: `What are the best settings for my ${selectedBrand} ${selectedAppliance.replace('-', ' ')}?`
                            },
                          ].map((action, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index }}
                              whileHover={{ scale: 1.05, y: -5 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                // This would trigger sending the query
                                const textarea = document.querySelector('textarea');
                                if (textarea) {
                                  textarea.value = action.query;
                                  textarea.dispatchEvent(new Event('input', { bubbles: true }));
                                  textarea.focus();
                                }
                              }}
                              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-left hover:bg-white/10 transition-all duration-300 group"
                              style={{
                                boxShadow: '0 10px 30px rgba(255,255,255,0.05)'
                              }}
                            >
                              <div className="text-2xl mb-2">{action.icon}</div>
                              <h3 className="text-white font-semibold mb-1 group-hover:text-gray-100">
                                {action.title}
                              </h3>
                              <p className="text-gray-400 text-sm group-hover:text-gray-300">
                                {action.desc}
                              </p>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))
                  )}
                </AnimatePresence>

                {/* Enhanced Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Bot className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>
                      <div 
                        className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl rounded-tl-md p-6 relative overflow-hidden"
                        style={{
                          boxShadow: '0 0 30px rgba(255,255,255,0.1)'
                        }}
                      >
                        {/* Thinking animation */}
                        <motion.div
                          animate={{ x: [-100, 300] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                        />
                        
                        <div className="flex items-center space-x-2 relative z-10">
                          <span className="text-white text-sm">AI is thinking</span>
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((dot) => (
                              <motion.div
                                key={dot}
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: dot * 0.2,
                                  ease: "easeInOut",
                                }}
                                className="w-2 h-2 bg-white rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Chat Input */}
              <motion.div 
                className="p-6 border-t border-white/10 relative"
                animate={{
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {/* Input Background Animation */}
                <motion.div
                  animate={{
                    opacity: [0.05, 0.1, 0.05],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
                <div className="relative z-10">
                  <ChatInput />
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Proactive Tips Panel with Smooth Animation */}
            <AnimatePresence>
              {selectedAppliance && selectedBrand && (
                <motion.div
                  initial={{ x: 320, opacity: 0, width: 0 }}
                  animate={{ x: 0, opacity: 1, width: "320px" }}
                  exit={{ x: 320, opacity: 0, width: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.4
                  }}
                  className="border-l border-white/20 bg-black/40 backdrop-blur-xl relative overflow-hidden"
                >
                  {/* Tips Panel Background */}
                  <motion.div
                    animate={{
                      background: [
                        'linear-gradient(180deg, transparent, rgba(255,255,255,0.02), transparent)',
                        'linear-gradient(180deg, transparent, rgba(255,255,255,0.05), transparent)',
                        'linear-gradient(180deg, transparent, rgba(255,255,255,0.02), transparent)',
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute inset-0"
                  />
                  <div className="relative z-10">
                    <ProactiveTips />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatPage;
