import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  Wrench,
  Globe,
  Zap,
  MessageSquare,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Cpu,
  Refrigerator,
  Microwave,
  WashingMachine,
  AirVent,
  Tv,
  Coffee,
  Lightbulb,
  Wifi,
  Radio,
  Activity,
} from "lucide-react";
import Button from "../components/common/Button";
import FeatureCard from "../components/ui/FeatureCard";
import DemoPreview from "../components/ui/DemoPreview";

const HomePage = () => {
  const navigate = useNavigate();

  // Appliance data for animated background
  const appliances = [
    { icon: Refrigerator, name: "Refrigerator", position: { x: 10, y: 15 } },
    {
      icon: WashingMachine,
      name: "Washing Machine",
      position: { x: 85, y: 25 },
    },
    { icon: Microwave, name: "Microwave", position: { x: 15, y: 70 } },
    { icon: AirVent, name: "Air Conditioner", position: { x: 80, y: 65 } },
    { icon: Tv, name: "Television", position: { x: 25, y: 45 } },
    { icon: Coffee, name: "Coffee Maker", position: { x: 70, y: 85 } },
    { icon: Lightbulb, name: "Smart Lights", position: { x: 5, y: 55 } },
    { icon: Radio, name: "Sound System", position: { x: 90, y: 45 } },
  ];

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Smart Query Answering",
      description:
        "AI-powered responses from your appliance manuals with step-by-step troubleshooting guides.",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Proactive Maintenance Tips",
      description:
        "Get personalized maintenance schedules and tips to extend your appliance lifespan.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Brand Support",
      description:
        "Works across multiple appliance brands and models. Just upload new manuals to expand.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Local & Private",
      description:
        "Runs on NVIDIA GPUs locally. No external APIs needed, keeping your data secure.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated House Outline */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <motion.svg
          width="800"
          height="600"
          viewBox="0 0 800 600"
          className="max-w-full max-h-full"
          animate={{
            strokeDashoffset: [0, -100],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            strokeDashoffset: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: { duration: 4, repeat: Infinity },
          }}
        >
          <path
            d="M100 500 L100 300 L400 100 L700 300 L700 500 L100 500 Z M200 500 L200 400 L300 400 L300 500 M500 350 L600 350 L600 450 L500 450 L500 350"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="10,5"
          />
        </motion.svg>
      </div>

      {/* Dynamic Appliance Network */}
      <div className="absolute inset-0">
        {appliances.map((appliance, index) => {
          const IconComponent = appliance.icon;
          return (
            <React.Fragment key={appliance.name}>
              {/* Appliance Icons */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(255,255,255,0.3)",
                    "0 0 40px rgba(255,255,255,0.6)",
                    "0 0 20px rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="absolute"
                style={{
                  left: `${appliance.position.x}%`,
                  top: `${appliance.position.y}%`,
                }}
              >
                <div className="relative">
                  {/* Appliance Icon */}
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center"
                    style={{
                      boxShadow: "0 0 25px rgba(255,255,255,0.2)",
                    }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Status Indicator */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
                    style={{
                      boxShadow: "0 0 10px rgba(34, 197, 94, 0.6)",
                    }}
                  />

                  {/* Appliance Label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg px-2 py-1 whitespace-nowrap"
                  >
                    <span className="text-xs text-white">{appliance.name}</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Connection Lines to Center AI */}
              <motion.svg
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2={`${appliance.position.x + 3}%`}
                  y2={`${appliance.position.y + 3}%`}
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="5,5"
                  animate={{
                    strokeDashoffset: [0, -20],
                    strokeOpacity: [0.1, 0.4, 0.1],
                  }}
                  transition={{
                    strokeDashoffset: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    strokeOpacity: {
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    },
                  }}
                />
              </motion.svg>
            </React.Fragment>
          );
        })}

        {/* Data Flow Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [
                Math.cos((((i * 360) / 12) * Math.PI) / 180) * 200 +
                  window.innerWidth / 2,
                window.innerWidth / 2,
                Math.cos((((i * 360) / 12) * Math.PI) / 180) * 200 +
                  window.innerWidth / 2,
              ],
              y: [
                Math.sin((((i * 360) / 12) * Math.PI) / 180) * 200 +
                  window.innerHeight / 2,
                window.innerHeight / 2,
                Math.sin((((i * 360) / 12) * Math.PI) / 180) * 200 +
                  window.innerHeight / 2,
              ],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              boxShadow: "0 0 15px rgba(255,255,255,0.8)",
            }}
          />
        ))}

        {/* AI Processing Waves */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [0, 2.5, 0],
              opacity: [0.8, 0.2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/30 rounded-full"
          />
        ))}

        {/* Smart Home Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* Troubleshooting Icons Animation */}
        <motion.div
          animate={{
            rotate: 360,
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 15, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-20 right-20"
        >
          <div className="flex space-x-4">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="w-8 h-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center"
            >
              <Wrench className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="w-8 h-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center"
            >
              <Activity className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="w-8 h-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center"
            >
              <Zap className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Manual Pages Flying Animation */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [window.innerWidth + 100, -100],
              y: [100 + i * 80, 150 + i * 80],
              rotate: [0, 360],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear",
            }}
            className="absolute"
          >
            <div className="w-6 h-8 bg-white/20 border border-white/30 rounded-sm flex items-center justify-center">
              <div className="w-3 h-0.5 bg-white/40 mb-1"></div>
              <div className="w-4 h-0.5 bg-white/40 mb-1"></div>
              <div className="w-2 h-0.5 bg-white/40"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Bot className="w-8 h-8 text-white" />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 w-8 h-8 border-2 border-white rounded-full"
                style={{ filter: "blur(2px)" }}
              />
            </motion.div>
            <span className="text-2xl font-bold text-white tracking-wider">
              DoraAI
            </span>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-2"
            >
              <Sparkles className="w-4 h-4 text-gray-400" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-x-4"
          >
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="primary" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center py-20 px-6"
      >
        <div className="max-w-5xl mx-auto">

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
            style={{
              textShadow:
                "0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.2)",
              background:
                "linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #999999 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI-Powered
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.8)",
                  "0 0 40px rgba(255,255,255,1)",
                  "0 0 20px rgba(255,255,255,0.8)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="block mt-4"
              style={{
                background:
                  "linear-gradient(90deg, #ffffff 0%, #f0f0f0 25%, #cccccc 50%, #f0f0f0 75%, #ffffff 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            >
              Appliance Assistant
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{
              textShadow: "0 0 10px rgba(255,255,255,0.3)",
            }}
          >
            Never flip through thick manuals again. Get instant, intelligent
            help for troubleshooting, maintenance, and operating your household
            appliances with our AI-powered assistant.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              onClick={() => navigate("/chat")}
              className="group"
            >
              Try Demo
              {/* <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /> */}
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Rest of your sections remain the same */}
      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-white mb-4"
              style={{
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
            >
              Why Choose DoraAI?
            </motion.h2>
            <p className="text-gray-400 text-lg">
              Powered by NVIDIA NIM for reliable, local, and intelligent
              appliance support
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FeatureCard {...feature} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Demo Preview Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.h2
              className="text-4xl font-bold text-white mb-4"
              style={{
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
            >
              See It In Action
            </motion.h2>
            <p className="text-gray-400 text-lg">
              Experience how DoraAI makes appliance support effortless
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <DemoPreview />
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                number: "99%",
                label: "Accuracy Rate",
                icon: <Zap className="w-8 h-8" />,
              },
              {
                number: "<2s",
                label: "Response Time",
                icon: <Clock className="w-8 h-8" />,
              },
              {
                number: "50+",
                label: "Supported Brands",
                icon: <Globe className="w-8 h-8" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 0 50px rgba(255,255,255,0.2), inset 0 0 30px rgba(255,255,255,0.1)",
                }}
                className="relative group"
              >
                <div
                  className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-8 overflow-hidden"
                  style={{
                    boxShadow:
                      "0 0 30px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)",
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-10 -right-10 w-20 h-20 border border-white/10 rounded-full"
                  />
                  <div className="text-white mb-4 flex justify-center relative z-10">
                    {stat.icon}
                  </div>
                  <div
                    className="text-4xl font-bold text-white mb-2 relative z-10"
                    style={{
                      textShadow: "0 0 15px rgba(255,255,255,0.5)",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-400 relative z-10">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <Bot className="w-6 h-6 text-white mr-2" />
            <span className="text-xl font-bold text-white tracking-wider">
              DoraAI
            </span>
          </div>
          <p className="text-gray-400 mb-6">
            Making appliance support intelligent, instant, and effortless.
          </p>
          <div className="flex justify-center space-x-8 text-gray-400">
            <motion.a
              href="#"
              whileHover={{
                color: "#ffffff",
                textShadow: "0 0 10px rgba(255,255,255,0.5)",
              }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{
                color: "#ffffff",
                textShadow: "0 0 10px rgba(255,255,255,0.5)",
              }}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{
                color: "#ffffff",
                textShadow: "0 0 10px rgba(255,255,255,0.5)",
              }}
              className="hover:text-white transition-colors"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </footer>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
