// src/utils/scroller/components/Tooltip.jsx

"use client";

const Tooltip = ({ isMobile = false }) => {
  return (
    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-50">
      <div className="flex flex-col items-center gap-0.5">
        <span>🖱️ Click to scroll up</span>
        <span className="text-[10px] text-gray-400">
          {isMobile ? "⏱️ Hold to hide" : "⏱️ Hold to hide"}
        </span>
      </div>
      {/* Tooltip arrow */}
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
    </div>
  );
};

export default Tooltip;
