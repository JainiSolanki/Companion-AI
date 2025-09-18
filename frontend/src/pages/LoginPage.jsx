import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Bot,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Cpu,
  Wrench,
  Shield,
  Zap,
  Home,
  Wifi,
  Activity,
  Settings,
} from "lucide-react";
import { loginUser, signupUser, clearError } from "../store/slices/authSlice";
import { setActiveTab } from "../store/slices/uiSlice";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import GlassmorphismCard from "../components/ui/GlassmorphismCard";



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  // const { activeTab } = useSelector((state) => state.ui);
  const [activeTab, setActiveTab] = useState("login")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Appliance icons for animated background
  const applianceIcons = [
    { icon: Home, position: { x: 10, y: 20 }, delay: 0 },
    { icon: Wifi, position: { x: 85, y: 15 }, delay: 0.5 },
    { icon: Settings, position: { x: 15, y: 75 }, delay: 1 },
    { icon: Activity, position: { x: 80, y: 70 }, delay: 1.5 },
    { icon: Wrench, position: { x: 5, y: 50 }, delay: 2 },
    { icon: Zap, position: { x: 90, y: 45 }, delay: 2.5 },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "login") {
      dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );
    } else {
      if (formData.password !== formData.confirmPassword) {
        return;
      }
      dispatch(
        signupUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          setActiveTab
        })
      );
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden relative">
      {/* Advanced Appliance-Themed Background */}

      {/* Smart Home Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Appliance Icons */}
      <div className="absolute inset-0">
        {applianceIcons.map((appliance, index) => {
          const IconComponent = appliance.icon;
          return (
            <motion.div
              key={index}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                delay: appliance.delay,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                left: `${appliance.position.x}%`,
                top: `${appliance.position.y}%`,
              }}
            >
              <div
                className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center"
                style={{
                  boxShadow: "0 0 20px rgba(255,255,255,0.1)",
                }}
              >
                <IconComponent className="w-6 h-6 text-white/40" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Central AI Network Hub */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity },
          }}
          className="absolute"
        >
          <div
            className="w-32 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center"
            style={{
              boxShadow:
                "0 0 40px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)",
            }}
          >
            <Bot className="w-16 h-16 text-white/30" />

            {/* Orbital Connection Lines */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                animate={{ rotate: ring % 2 === 0 ? [0, 360] : [360, 0] }}
                transition={{
                  duration: 15 + ring * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute border border-white/5 rounded-full"
                style={{
                  width: `${120 + ring * 40}px`,
                  height: `${120 + ring * 40}px`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Data Flow Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 300 - 150, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, Math.random() * 300 - 150, 0],
              opacity: [0, 0.6, 0.3, 0],
              scale: [0, 1, 0.5, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div
              className="w-1 h-1 bg-white rounded-full"
              style={{
                boxShadow: "0 0 10px rgba(255,255,255,0.6)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Scanning Lines */}
      <motion.div
        animate={{
          x: [-1000, window.innerWidth + 1000],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          width: "150px",
          transform: "skewX(-45deg)",
        }}
      />

      {/* Login Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative z-50 w-full max-w-md"
      >
        <GlassmorphismCard className="p-8 bg-black/60 backdrop-blur-xl border border-white/20">
          {/* Enhanced Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">


            <motion.h1
              className="text-3xl font-bold text-white mb-3"
              style={{
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
            >
              Companion AI
            </motion.h1>
            <motion.p
              className="text-gray-400 text-lg mb-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Smart Appliance Assistant
            </motion.p>
            <div className="flex justify-center space-x-2 text-xs text-gray-500">
              <span>🏠 Smart Home</span>
              <span>•</span>
              <span>🔧 AI-Powered</span>
              <span>•</span>
              <span>⚡ Instant Help</span>
            </div>
          </motion.div>

          {/* Enhanced Tab Switcher */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-2 flex border border-white/10">
              {["login", "signup"].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => dispatch(setActiveTab(tab))}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    boxShadow:
                      activeTab !== tab
                        ? "0 0 15px rgba(255,255,255,0.1)"
                        : undefined,
                  }}
                  className={`
                    flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden
                    ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-white to-gray-200 text-black shadow-xl"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {/* Animated background for active tab */}
                  {activeTab === tab && (
                    <motion.div
                      animate={{
                        x: [-100, 300],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    />
                  )}
                  <span className="relative z-10">
                    {tab === "login" ? "Sign In" : "Create Account"}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === "login" ? 20 : -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {activeTab === "signup" && (
                <Input
                  label="Full Name"
                  name="username"
                  placeholder="Enter your full name"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              )}

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-3 top-13 text-gray-400 hover:text-white transition-colors"//change position of eye icon.place it in center.

                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </motion.button>
              </div>

              {activeTab === "signup" && (
                <div className="relative">
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword
                        ? "Passwords do not match"
                        : null
                    }
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-3 top-13 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm backdrop-blur-xl"
                  style={{
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
                    {error}
                  </div>
                </motion.div>
              )}

              {/* Enhanced Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full relative overflow-hidden"
                  disabled={isLoading}
                  size="lg"
                >
                  {/* Button background animation */}
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

                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full mr-3"
                        />
                        {activeTab === "login"
                          ? "Connecting to AI..."
                          : "Setting up your assistant..."}
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        {activeTab === "login"
                          ? "Access AI Assistant"
                          : "Join Companion AI"}
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>
              
            </motion.form>
          </AnimatePresence>

          {/* Enhanced Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center space-y-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center group"
              >
                <motion.span
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-2 group-hover:mr-3 transition-all"
                >
                  ←
                </motion.span>
                Back to Home
              </Link>
            </motion.div>

            <div className="text-xs text-gray-500 flex items-center justify-center space-x-2">
              <Shield className="w-3 h-3" />
              <span>Secure • Private • AI-Powered</span>
            </div>
          </motion.div>
        </GlassmorphismCard>
      </motion.div>
    </div>
  );
};

export default LoginPage;
