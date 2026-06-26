// src/utils/scroller/components/ProgressRing.jsx

"use client";

const ProgressRing = ({ progress = 0, size = "w-12 h-12" }) => {
  // Calculate ring size based on button size
  const getRingSize = () => {
    const sizeMap = {
      "w-8 h-8": 36,
      "w-10 h-10": 44,
      "w-12 h-12": 52,
      "w-14 h-14": 60,
      "w-16 h-16": 68,
    };
    return sizeMap[size] || 52;
  };

  const ringSize = getRingSize();
  const radius = ringSize / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg
      className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90"
      viewBox={`0 0 ${ringSize} ${ringSize}`}
      style={{
        pointerEvents: "none",
      }}
    >
      {/* Background circle */}
      <circle
        cx={ringSize / 2}
        cy={ringSize / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="3"
      />
      {/* Progress circle */}
      <circle
        cx={ringSize / 2}
        cy={ringSize / 2}
        r={radius}
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-all duration-75"
        style={{
          transition: "stroke-dashoffset 0.05s linear",
        }}
      />
    </svg>
  );
};

export default ProgressRing;
