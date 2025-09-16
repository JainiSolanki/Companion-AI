import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  Refrigerator,
  WashingMachine,
  ChevronRight,
  ArrowLeft,
  Home,
  Star,
} from "lucide-react";
import {
  setSelectedAppliance,
  setSelectedBrand,
  clearSelection,
} from "../../store/slices/chatSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { selectedAppliance, selectedBrand } = useSelector(
    (state) => state.chat
  );

  const appliances = [
    {
      id: "refrigerator",
      name: "Refrigerator",
      icon: <Refrigerator className="w-6 h-6" />,
      brands: [
        { id: "lg", name: "LG", color: "from-red-500 to-red-600", logo: "🔴" },
        {
          id: "samsung",
          name: "Samsung",
          color: "from-blue-500 to-blue-600",
          logo: "🔵",
        },
      ],
    },
    {
      id: "washing-machine",
      name: "Washing Machine",
      icon: <WashingMachine className="w-6 h-6" />,
      brands: [
        { id: "lg", name: "LG", color: "from-red-500 to-red-600", logo: "🔴" },
        {
          id: "samsung",
          name: "Samsung",
          color: "from-blue-500 to-blue-600",
          logo: "🔵",
        },
      ],
    },
  ];

  const handleApplianceSelect = (applianceId) => {
    dispatch(setSelectedAppliance(applianceId));
    dispatch(setSelectedBrand(null)); // Clear brand when changing appliance
  };

  const handleBrandSelect = (brandId) => {
    dispatch(setSelectedBrand(brandId));
  };

  const handleBack = () => {
    if (selectedBrand) {
      dispatch(setSelectedBrand(null));
    } else if (selectedAppliance) {
      dispatch(setSelectedAppliance(null));
    }
  };

  const handleClearAll = () => {
    dispatch(clearSelection());
  };

  const currentAppliance = appliances.find((a) => a.id === selectedAppliance);

  return (
    <div className="h-full bg-black/60 backdrop-blur-xl border-r border-white/20 flex flex-col relative overflow-hidden">
      {/* Sidebar Background Animation */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)",
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.05) 100%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-8 h-8 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20"
          >
            <Home className="w-4 h-4 text-white" />
          </motion.div>

          {(selectedAppliance || selectedBrand) && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClearAll}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Clear All
            </motion.button>
          )}
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          {selectedBrand && currentAppliance
            ? `${selectedBrand.toUpperCase()} ${currentAppliance.name}`
            : selectedAppliance && currentAppliance
            ? currentAppliance.name
            : "Select Appliance"}
        </h2>

        <p className="text-sm text-gray-400">
          {selectedBrand && currentAppliance
            ? "Ready to assist you!"
            : selectedAppliance
            ? "Choose your brand"
            : "Choose your appliance type"}
        </p>

        {/* Back Button */}
        {(selectedAppliance || selectedBrand) && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={handleBack}
            className="flex items-center space-x-2 mt-4 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">
              {selectedBrand ? "Back to brands" : "Back to appliances"}
            </span>
          </motion.button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 relative z-10">
        <AnimatePresence mode="wait">
          {!selectedAppliance ? (
            // Appliance Selection View
            <motion.div
              key="appliances"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              {appliances.map((appliance, index) => (
                <motion.button
                  key={appliance.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApplianceSelect(appliance.id)}
                  className="w-full group relative overflow-hidden"
                >
                  <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300">
                    {/* Hover animation */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white via-gray-300 to-white origin-left"
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-white group-hover:scale-110 transition-transform">
                          {appliance.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-white group-hover:text-gray-100">
                            {appliance.name}
                          </h3>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300">
                            {appliance.brands.length} brands available
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : !selectedBrand ? (
            // Brand Selection View
            <motion.div
              key="brands"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20"
                >
                  {currentAppliance?.icon}
                </motion.div>
                <p className="text-sm text-gray-400">
                  Select your {currentAppliance?.name} brand
                </p>
              </div>

              {currentAppliance?.brands.map((brand, index) => (
                <motion.button
                  key={brand.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBrandSelect(brand.id)}
                  className="w-full group"
                >
                  <div
                    className={`bg-gradient-to-r ${brand.color} p-0.5 rounded-2xl`}
                  >
                    <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 hover:bg-black/60 transition-all duration-300 relative overflow-hidden">
                      {/* Brand shine effect */}
                      <motion.div
                        animate={{ x: [-100, 300] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                      />

                      <div className="relative z-10 text-center">
                        <div className="text-3xl mb-2">{brand.logo}</div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {brand.name}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {brand.name} {currentAppliance?.name}
                        </p>

                        {/* Trust indicators */}
                        <div className="flex justify-center items-center space-x-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 text-yellow-400 fill-current"
                            />
                          ))}
                          <span className="text-xs text-gray-400 ml-2">
                            Trusted Brand
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            // Selected State View
            <motion.div
              key="selected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 20px rgba(255,255,255,0.3)",
                    "0 0 30px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-green-500/30"
              >
                <div className="text-2xl">✅</div>
              </motion.div>

              <h3 className="text-lg font-bold text-white mb-2">
                Ready to Help!
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                I'm specialized in {selectedBrand?.toUpperCase()}{" "}
                {currentAppliance?.name} support
              </p>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <p className="text-xs text-green-400 mb-1">
                  ✨ Expert Mode Active
                </p>
                <p className="text-xs text-gray-300">
                  Get personalized solutions for your specific model
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="relative z-10 p-4 border-t border-white/20">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 text-center border border-white/10">
          <p className="text-xs text-gray-400 mb-1">
            Need help with other brands?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs text-white font-medium hover:text-gray-300 transition-colors"
          >
            Request Support
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
