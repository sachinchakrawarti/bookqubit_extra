"use client";

import { useEffect, useRef } from "react";

export default function DNAHelix({ dnaData, width = 300, height = 400 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!dnaData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const categories = [
      "themes",
      "writingStyle",
      "emotionalTone",
      "complexity",
    ];

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(0,0,0,0.02)";
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 80;
    const amplitude = 30;
    const waves = 3;

    for (let strand = 0; strand < 2; strand++) {
      ctx.beginPath();
      const offset = strand === 0 ? 0 : Math.PI;

      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const angle = t * waves * 2 * Math.PI + offset;
        const x =
          centerX +
          (radius + amplitude * Math.sin(angle)) * (strand === 0 ? 1 : -1);
        const y = 20 + t * (height - 40);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = strand === 0 ? "#3b82f6" : "#8b5cf6";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      const angle = t * waves * 2 * Math.PI;
      const x1 = centerX + (radius + amplitude * Math.sin(angle));
      const y1 = 20 + t * (height - 40);
      const x2 = centerX - (radius + amplitude * Math.sin(angle + Math.PI));
      const y2 = 20 + t * (height - 40);

      const categoryIndex = i % categories.length;
      const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = colors[categoryIndex];
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc((x1 + x2) / 2, (y1 + y2) / 2, 3, 0, Math.PI * 2);
      ctx.fillStyle = colors[categoryIndex];
      ctx.fill();
    }

    ctx.fillStyle = "#6b7280";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Themes", 30, 50);
    ctx.fillText("Writing", 30, 120);
    ctx.fillText("Emotion", 30, 190);
    ctx.fillText("Complexity", 30, 260);

    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`DNA Score: ${dnaData.dnaScore}/10`, centerX, height - 20);
  }, [dnaData, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="dna-helix-canvas"
    />
  );
}
