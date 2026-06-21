"use client";

import { FiZoomIn, FiZoomOut, FiMaximize } from "react-icons/fi";

export default function GraphControls({
  onZoomIn,
  onZoomOut,
  onZoomReset,
  zoomLevel,
}) {
  return (
    <div className="kg-controls">
      <button className="kg-control-btn" onClick={onZoomIn} title="Zoom In">
        <FiZoomIn />
      </button>
      <button className="kg-control-btn" onClick={onZoomOut} title="Zoom Out">
        <FiZoomOut />
      </button>
      <button
        className="kg-control-btn"
        onClick={onZoomReset}
        title="Reset View"
      >
        <FiMaximize />
      </button>
      <span className="kg-zoom-level">{Math.round(zoomLevel * 100)}%</span>
    </div>
  );
}
