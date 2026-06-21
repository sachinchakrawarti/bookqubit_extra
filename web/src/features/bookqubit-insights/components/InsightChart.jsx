"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/themes/useTheme";

export default function InsightChart({
  data,
  type = "bar", // bar, line, pie, horizontal
  height = 200,
  color = "#3b82f6",
  label = "",
}) {
  const canvasRef = useRef(null);
  const { themeName } = useTheme();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  useEffect(() => {
    if (!data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 20, bottom: 30, left: 40, right: 20 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxValue = Math.max(...data.map((d) => d.value || d.popularity || 0));
    const minValue = Math.min(...data.map((d) => d.value || d.popularity || 0));
    const range = maxValue - minValue || 1;

    const textColor = isDarkMode ? "#9ca3af" : "#6b7280";
    const gridColor = isDarkMode ? "#374151" : "#e5e7eb";

    if (type === "bar") {
      // Draw bar chart
      const barWidth = (chartWidth / data.length) * 0.6;
      const gap = (chartWidth / data.length) * 0.4;

      data.forEach((item, index) => {
        const value = item.value || item.popularity || 0;
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding.left + index * (barWidth + gap) + gap / 2;
        const y = padding.top + chartHeight - barHeight;

        // Bar with gradient
        const gradient = ctx.createLinearGradient(
          x,
          y,
          x,
          padding.top + chartHeight,
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + "40");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 4);
        ctx.fill();

        // Value on top
        ctx.fillStyle = textColor;
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(value, x + barWidth / 2, y - 5);

        // Label below
        ctx.fillStyle = textColor;
        ctx.font = "9px sans-serif";
        ctx.textAlign = "center";
        const labelText = item.name || item.label || "";
        ctx.fillText(
          labelText.length > 10 ? labelText.substring(0, 8) + "..." : labelText,
          x + barWidth / 2,
          padding.top + chartHeight + 18,
        );
      });
    } else if (type === "line") {
      // Draw line chart
      const points = data.map((item, index) => {
        const value = item.value || item.popularity || 0;
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
        return { x, y, value };
      });

      // Draw grid lines
      for (let i = 0; i <= 4; i++) {
        const y = padding.top + (i / 4) * chartHeight;
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = textColor;
        ctx.font = "8px sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(
          Math.round(maxValue - (i / 4) * range),
          padding.left - 5,
          y + 3,
        );
      }

      // Draw line
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      // Draw area under line
      ctx.lineTo(points[points.length - 1].x, padding.top + chartHeight);
      ctx.lineTo(points[0].x, padding.top + chartHeight);
      ctx.closePath();
      ctx.fillStyle = color + "20";
      ctx.fill();

      // Draw points
      points.forEach((p) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Value on hover (always show for now)
        ctx.fillStyle = textColor;
        ctx.font = "8px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(p.value, p.x, p.y - 8);
      });

      // Labels
      data.forEach((item, index) => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        ctx.fillStyle = textColor;
        ctx.font = "8px sans-serif";
        ctx.textAlign = "center";
        const labelText = item.name || item.label || "";
        ctx.fillText(
          labelText.length > 8 ? labelText.substring(0, 6) + "..." : labelText,
          x,
          padding.top + chartHeight + 18,
        );
      });
    } else if (type === "pie") {
      // Draw pie chart
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 - 30;

      const total = data.reduce(
        (sum, d) => sum + (d.value || d.popularity || 0),
        0,
      );
      let startAngle = -Math.PI / 2;

      const colors = [
        "#3b82f6",
        "#8b5cf6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#ec4899",
        "#14b8a6",
        "#6366f1",
        "#eab308",
      ];

      data.forEach((item, index) => {
        const value = item.value || item.popularity || 0;
        const sliceAngle = (value / total) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;

        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();

        // Label
        const midAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + radius * 0.65 * Math.cos(midAngle);
        const labelY = centerY + radius * 0.65 * Math.sin(midAngle);
        ctx.fillStyle = "white";
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (value / total > 0.05) {
          ctx.fillText(Math.round((value / total) * 100) + "%", labelX, labelY);
        }

        startAngle = endAngle;
      });

      // Legend
      let legendY = 10;
      data.forEach((item, index) => {
        const value = item.value || item.popularity || 0;
        const percentage = Math.round((value / total) * 100);
        const x = 10;
        const y = legendY;

        ctx.fillStyle = colors[index % colors.length];
        ctx.fillRect(x, y, 12, 12);

        ctx.fillStyle = textColor;
        ctx.font = "9px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        const labelText =
          (item.name || item.label || "") + " (" + percentage + "%)";
        ctx.fillText(
          labelText.length > 15
            ? labelText.substring(0, 13) + "..."
            : labelText,
          x + 16,
          y,
        );

        legendY += 18;
      });
    } else if (type === "horizontal") {
      // Draw horizontal bar chart
      const barHeight = (chartHeight / data.length) * 0.7;
      const gap = (chartHeight / data.length) * 0.3;

      data.forEach((item, index) => {
        const value = item.value || item.popularity || 0;
        const barWidth = (value / maxValue) * chartWidth;
        const x = padding.left;
        const y = padding.top + index * (barHeight + gap) + gap / 2;

        // Bar with gradient
        const gradient = ctx.createLinearGradient(x, y, x + barWidth, y);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + "60");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 4);
        ctx.fill();

        // Value
        ctx.fillStyle = textColor;
        ctx.font = "10px sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(value, x + barWidth - 5, y + barHeight / 2 + 3);

        // Label
        ctx.fillStyle = textColor;
        ctx.font = "9px sans-serif";
        ctx.textAlign = "right";
        const labelText = item.name || item.label || "";
        ctx.fillText(
          labelText.length > 12
            ? labelText.substring(0, 10) + "..."
            : labelText,
          x - 8,
          y + barHeight / 2 + 3,
        );
      });
    }

    // Title
    if (label) {
      ctx.fillStyle = textColor;
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, width / 2, 12);
    }
  }, [data, type, color, label, isDarkMode]);

  return (
    <div className="insight-chart-container">
      <canvas
        ref={canvasRef}
        width={400}
        height={height + 40}
        className="insight-chart-canvas"
      />
    </div>
  );
}
