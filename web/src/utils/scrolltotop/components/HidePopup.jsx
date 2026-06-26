// src/utils/scroller/components/HidePopup.jsx

"use client";

import { FaTimes, FaClock } from "react-icons/fa";

const HidePopup = ({ hideDuration, onDurationChange, onHide, onCancel }) => {
  const durationOptions = [
    { label: "30s", value: 30 },
    { label: "1 min", value: 60 },
    { label: "2 min", value: 120 },
    { label: "5 min", value: 300 },
    { label: "10 min", value: 600 },
    { label: "Forever", value: 9999 },
  ];

  const formatDuration = (seconds) => {
    if (seconds === 9999) return "Forever";
    if (seconds >= 60) {
      const mins = Math.floor(seconds / 60);
      return `${mins} min${mins > 1 ? "s" : ""}`;
    }
    return `${seconds} sec`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onCancel}
    >
      <div
        className="relative w-[320px] max-w-[90vw] p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl animate-scaleIn popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <FaTimes className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
            <FaClock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Hide Scroll Button
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose how long to hide the button
            </p>
          </div>
        </div>

        {/* Duration options */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {durationOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onDurationChange(option.value)}
              className={`
                py-2 px-3 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  hideDuration === option.value
                    ? "bg-sky-600 text-white shadow-md scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Selected duration display */}
        <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Selected:
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {formatDuration(hideDuration)}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg font-medium text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onHide}
            className="flex-1 py-2.5 rounded-lg font-medium text-sm bg-gradient-to-r from-sky-600 to-sky-500 text-white hover:scale-105 transition-all duration-200 shadow-md"
          >
            Hide Button
          </button>
        </div>

        {/* Info text */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
          The button will reappear after the selected time
        </p>
      </div>
    </div>
  );
};

export default HidePopup;
