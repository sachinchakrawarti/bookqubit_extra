"use client";

import { useState } from "react";
import { toolsData } from "../data/toolsData";
import ToolCard from "./ToolCard";
import BookComparisonTool from "./BookComparisonTool";
import ReadingSpeedCalculator from "./ReadingSpeedCalculator";
import BookProgressTracker from "./BookProgressTracker";

export default function ToolsHub() {
  const [activeTool, setActiveTool] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(toolsData.map((t) => t.category))];

  const filteredTools = toolsData.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderTool = () => {
    switch (activeTool) {
      case "book-comparison":
        return <BookComparisonTool onClose={() => setActiveTool(null)} />;
      case "reading-speed":
        return <ReadingSpeedCalculator onClose={() => setActiveTool(null)} />;
      case "book-progress":
        return <BookProgressTracker onClose={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="tools-hub">
      <div className="tools-header">
        <h1>🔧 Tools Hub</h1>
        <p>Discover powerful tools to enhance your reading experience</p>
      </div>

      <div className="tools-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="tools-grid">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onSelect={() => setActiveTool(tool.id)}
          />
        ))}
      </div>

      {activeTool && renderTool()}
    </div>
  );
}
