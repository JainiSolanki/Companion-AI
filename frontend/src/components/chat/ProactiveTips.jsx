import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  Lightbulb,
  Calendar,
  Wrench,
  AlertTriangle,
  Thermometer,
  Droplets,
  Zap,
  Settings,
} from "lucide-react";
import { getMaintenanceTips } from "../../store/slices/chatSlice";

const ProactiveTips = () => {
  const dispatch = useDispatch();
  const { selectedAppliance, selectedBrand, maintenanceTips } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    if (selectedAppliance && selectedBrand) {
      dispatch(
        getMaintenanceTips({
          appliance: selectedAppliance,
          brand: selectedBrand,
        })
      );
    }
  }, [selectedAppliance, selectedBrand, dispatch]);

  // Brand and appliance-specific tips
  const getBrandSpecificTips = () => {
    const applianceType = selectedAppliance?.replace("-", " ");
    const brand = selectedBrand?.toUpperCase();

    if (selectedAppliance === "refrigerator") {
      return [
        {
          icon: <Thermometer className="w-4 h-4" />,
          title: `${brand} Temperature Settings`,
          description: `Optimal temperature: 37-40°F for fridge, 0-5°F for freezer`,
          type: "settings",
          urgency: "medium",
        },
        {
          icon: <Droplets className="w-4 h-4" />,
          title: "Water Filter Replacement",
          description: `Replace ${brand} water filter every 6 months for best taste`,
          type: "maintenance",
          urgency: "low",
        },
        {
          icon: <AlertTriangle className="w-4 h-4" />,
          title: "Energy Efficiency Check",
          description: `Clean ${brand} coils every 3 months to maintain efficiency`,
          type: "maintenance",
          urgency: "medium",
        },
      ];
    } else if (selectedAppliance === "washing-machine") {
      return [
        {
          icon: <Settings className="w-4 h-4" />,
          title: `${brand} Load Settings`,
          description: `Use appropriate load size and water temperature settings`,
          type: "settings",
          urgency: "medium",
        },
        {
          icon: <Wrench className="w-4 h-4" />,
          title: "Monthly Cleaning Cycle",
          description: `Run ${brand} self-clean cycle monthly to prevent buildup`,
          type: "maintenance",
          urgency: "high",
        },
        {
          icon: <Droplets className="w-4 h-4" />,
          title: "Door Seal Maintenance",
          description: `Check and clean door seal weekly to prevent mold`,
          type: "maintenance",
          urgency: "medium",
        },
      ];
    }

    return [];
  };

  const tips =
    maintenanceTips.length > 0 ? maintenanceTips : getBrandSpecificTips();

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="p-6 border-b border-white/20 relative">
        <motion.div
          animate={{
            background: [
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0"
        />

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-8 h-8 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-yellow-500/30"
            >
              <Lightbulb className="w-4 h-4 text-yellow-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Smart Tips</h3>
          </div>
          <p className="text-sm text-gray-400">
            {selectedBrand?.toUpperCase()}{" "}
            {selectedAppliance?.replace("-", " ")} expert advice
          </p>
        </div>
      </div>

      {/* Tips List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -3 }}
            className="group cursor-pointer"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
              {/* Hover effect */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent origin-left"
              />

              <div className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-xl flex-shrink-0 border ${getUrgencyColor(
                    tip.urgency
                  )}`}
                >
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white group-hover:text-gray-100">
                      {tip.title}
                    </h4>
                    {tip.urgency && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${getUrgencyColor(
                          tip.urgency
                        )}`}
                      >
                        {tip.urgency}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                    {tip.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Brand-Specific Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3 pt-4 border-t border-white/20"
        >
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-blue-400" />
            Quick Actions
          </h4>

          {[
            `Download ${selectedBrand?.toUpperCase()} ${selectedAppliance?.replace(
              "-",
              " "
            )} manual`,
            `Find ${selectedBrand} service centers nearby`,
            `Set maintenance reminder`,
            `Order ${selectedBrand} genuine parts`,
          ].map((action, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left text-sm text-gray-400 hover:text-white p-3 rounded-xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20"
            >
              {action}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/20">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-xl p-3 text-center border border-white/10">
          <p className="text-xs text-gray-400 mb-1">Need immediate help?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs text-white font-semibold hover:text-gray-300 transition-colors"
          >
            Contact {selectedBrand?.toUpperCase()} Support
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProactiveTips;
