"use client";

import { FiX, FiStar, FiClock, FiTrendingUp, FiBookOpen } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NodeDetailsPanel({
  node,
  connections,
  allNodes,
  onClose,
}) {
  const { td } = useLanguage();

  const getNodeIcon = (type) => {
    const icons = {
      book: "📖",
      author: "👤",
      genre: "🏷️",
      tag: "#",
    };
    return icons[type] || "•";
  };

  const getNodeTypeLabel = (type) => {
    const labels = {
      book: td("book") || "Book",
      author: td("author") || "Author",
      genre: td("genre") || "Genre",
      tag: td("tag") || "Tag",
    };
    return labels[type] || type;
  };

  const getOtherNode = (link, nodeId) => {
    const source = link.source.id || link.source;
    const target = link.target.id || link.target;
    const otherId = source === nodeId ? target : source;
    return allNodes.find((n) => n.id === otherId);
  };

  return (
    <div className="kg-details-panel">
      <div className="kg-details-header">
        <div className="kg-details-icon">{getNodeIcon(node.type)}</div>
        <div className="kg-details-title">
          <h3>{node.label}</h3>
          <span className="kg-details-type">{getNodeTypeLabel(node.type)}</span>
        </div>
        <button className="kg-details-close" onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className="kg-details-body">
        {node.rating && (
          <div className="kg-detail-item">
            <FiStar className="kg-detail-icon" />
            <div>
              <span className="kg-detail-label">
                {td("rating") || "Rating"}
              </span>
              <span className="kg-detail-value">⭐ {node.rating}/5</span>
            </div>
          </div>
        )}

        {node.year && (
          <div className="kg-detail-item">
            <FiClock className="kg-detail-icon" />
            <div>
              <span className="kg-detail-label">{td("year") || "Year"}</span>
              <span className="kg-detail-value">{node.year}</span>
            </div>
          </div>
        )}

        {node.followers && (
          <div className="kg-detail-item">
            <FiTrendingUp className="kg-detail-icon" />
            <div>
              <span className="kg-detail-label">
                {td("followers") || "Followers"}
              </span>
              <span className="kg-detail-value">
                {node.followers.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {connections.length > 0 && (
          <div className="kg-detail-connections">
            <h4>{td("connections") || "Connections"}</h4>
            <div className="kg-connection-list">
              {connections.slice(0, 10).map((link, idx) => {
                const otherNode = getOtherNode(link, node.id);
                return (
                  <div key={idx} className="kg-connection-item">
                    <span className="kg-connection-type">{link.type}</span>
                    <span className="kg-connection-node">
                      {otherNode?.label || "Unknown"}
                    </span>
                  </div>
                );
              })}
              {connections.length > 10 && (
                <div className="kg-connection-more">
                  +{connections.length - 10} more
                </div>
              )}
            </div>
          </div>
        )}

        {(node.type === "book" || node.type === "author") && (
          <button
            className="kg-details-action"
            onClick={() => {
              const path = node.type === "book" ? "books" : "authors";
              window.location.href = `/${path}/${node.id}`;
            }}
          >
            <FiBookOpen /> {td("viewDetails") || "View Details"}
          </button>
        )}
      </div>
    </div>
  );
}
