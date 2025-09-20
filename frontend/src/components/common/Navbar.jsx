import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Bot,
  Menu,
  X,
  Home,
  MessageSquare,
  LogIn,
  LogOut,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import { logoutUser } from "../../store/slices/authSlice";
import Button from "./Button";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const navigationItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="w-4 h-4" />,
      public: true,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: <MessageSquare className="w-4 h-4" />,
      protected: true,
    },
    {
      name: "Help",
      path: "/help",
      icon: <HelpCircle className="w-4 h-4" />,
      public: true,
    },
  ];

  const filteredNavItems = navigationItems.filter(
    (item) => item.public || (item.protected && isAuthenticated)
  );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled || location.pathname !== "/"
            ? "bg-black/20 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center"
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <span className="text-xl font-bold text-white">DoraAI</span>
              <div className="text-xs text-accent">Appliance Assistant</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNavItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                    ${
                      location.pathname === item.path
                        ? "text-white bg-white/20 backdrop-blur-sm"
                        : "text-neutral hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User Menu */}
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">
                      {user?.name || "User"}
                    </span>
                  </motion.button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2 space-y-1">
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-neutral hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-neutral hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        <span>Help & Support</span>
                      </button>
                      <hr className="border-white/20 my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-white/10 mt-4">
                {/* Navigation Items */}
                {filteredNavItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${
                          location.pathname === item.path
                            ? "text-white bg-white/20 backdrop-blur-sm"
                            : "text-neutral hover:text-white hover:bg-white/10"
                        }
                      `}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Auth Actions */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-3 px-4 py-2 text-white">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {user?.name || "User"}
                          </div>
                          <div className="text-xs text-neutral">
                            {user?.email}
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </motion.button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        variant="glass"
                        className="w-full justify-center"
                        onClick={() => navigate("/login")}
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                      <Button
                        variant="primary"
                        className="w-full justify-center"
                        onClick={() => navigate("/signup")}
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
// 