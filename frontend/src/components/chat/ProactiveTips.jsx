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
          icon: <Thermometer className="text-blue-400" size={20} />,
          title: "LG Temperature Settings",
          description: "Optimal temperature: 37-40°F for fridge, 0-5°F for freezer",
          priority: "medium",
        },
        {
          icon: <Droplets className="text-cyan-400" size={20} />,
          title: "Water Filter Replacement",
          description: "Replace LG water filter every 6 months for best taste",
          priority: "low",
        },
        {
          icon: <Zap className="text-yellow-400" size={20} />,
          title: "Energy Efficiency Check",
          description: "Clean LG coils every 3 months to maintain efficiency",
          priority: "medium",
        },
      ];
    }

    if (selectedAppliance === "washing-machine") {
      return [
        {
          icon: <Settings className="text-purple-400" size={20} />,
          title: "Load Settings",
          description: "Use appropriate water level for load size",
          priority: "high",
        },
        {
          icon: <Wrench className="text-orange-400" size={20} />,
          title: "Monthly Maintenance",
          description: "Run cleaning cycle monthly with washing machine cleaner",
          priority: "medium",
        },
        {
          icon: <AlertTriangle className="text-red-400" size={20} />,
          title: "Common Issues",
          description: "Check door seal and lint filter regularly",
          priority: "high",
        },
      ];
    }

    return [];
  };

  const tips = getBrandSpecificTips();

  // ===== NO CHANGES: Keep existing return structure but ensure it fits in sidebar =====
  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      {/* ===== MODIFIED: Updated header for sidebar integration ===== */}
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="text-yellow-400" size={20} />
        <h3 className="text-lg font-semibold text-white">Smart Tips</h3>
      </div>

      {selectedAppliance && selectedBrand ? (
        <>
          {/* ===== NO CHANGES: Keep existing brand/appliance display ===== */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white text-sm font-medium">
                {selectedBrand?.toUpperCase()} {selectedAppliance?.replace("-", " ")} expert advice
              </span>
            </div>
          </div>

          {/* ===== NO CHANGES: Keep existing tips mapping ===== */}
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer ${
                  tip.priority === "high" ? "border-red-500/30" :
                  tip.priority === "medium" ? "border-yellow-500/30" :
                  "border-green-500/30"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {tip.description}
                    </p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      tip.priority === "high" ? "bg-red-500/20 text-red-400" :
                      tip.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-green-500/20 text-green-400"
                    }`}>
                      {tip.priority}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ===== NO CHANGES: Keep existing help section ===== */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium text-sm mb-2">
                Need immediate help?
              </h4>
              <p className="text-gray-300 text-xs mb-3">
                Get instant answers to your specific questions
              </p>
              <div className="space-y-2">
                {[
                  "My lg refrigerator is making strange noises",
                  "How do I clean my lg refrigerator?", 
                  "refrigerator not working properly"
                ].map((question, index) => (
                  <div
                    key={index}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded px-3 py-2 cursor-pointer transition-colors text-xs text-gray-300"
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ===== NO CHANGES: Keep existing empty state ===== */
        <div className="text-center py-8">
          <Lightbulb className="mx-auto text-gray-500 mb-4" size={48} />
          <h4 className="text-white font-medium mb-2">No appliance selected</h4>
          <p className="text-gray-400 text-sm">
            Select an appliance and brand to see personalized tips
          </p>
        </div>
      )}

      {/* ===== NO CHANGES: Keep existing quick actions ===== */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-white font-medium text-sm mb-3">Quick Actions</h4>
        <div className="space-y-2">
          {[
            { icon: "📖", text: "Download LG refrigerator manual" },
            { icon: "📍", text: "Find lg service centers nearby" },
            { icon: "⏰", text: "Set maintenance reminder" }
          ].map((action, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
            >
              <span className="text-sm">{action.icon}</span>
              <span className="text-gray-300 text-xs">{action.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProactiveTips;
