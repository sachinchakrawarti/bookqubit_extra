// src/modules/admin-dashboard/languages/LanguagesModule.jsx
"use client";

import React, { useState } from "react";
import "./LanguagesModule.css";

const LanguagesModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);

  // Dummy data
  const languages = [
    { id: 1, code: "en", name: "English", nativeName: "English", status: "Active", direction: "LTR", flag: "🇺🇸", isDefault: true },
    { id: 2, code: "es", name: "Spanish", nativeName: "Español", status: "Active", direction: "LTR", flag: "🇪🇸", isDefault: false },
    { id: 3, code: "fr", name: "French", nativeName: "Français", status: "Active", direction: "LTR", flag: "🇫🇷", isDefault: false },
    { id: 4, code: "de", name: "German", nativeName: "Deutsch", status: "Active", direction: "LTR", flag: "🇩🇪", isDefault: false },
    { id: 5, code: "ja", name: "Japanese", nativeName: "日本語", status: "Inactive", direction: "LTR", flag: "🇯🇵", isDefault: false },
    { id: 6, code: "zh", name: "Chinese", nativeName: "中文", status: "Active", direction: "LTR", flag: "🇨🇳", isDefault: false },
    { id: 7, code: "ar", name: "Arabic", nativeName: "العربية", status: "Active", direction: "RTL", flag: "🇸🇦", isDefault: false },
    { id: 8, code: "hi", name: "Hindi", nativeName: "हिन्दी", status: "Inactive", direction: "LTR", flag: "🇮🇳", isDefault: false },
  ];

  const handleEdit = (language) => {
    setEditingLanguage(language);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this language?")) {
      console.log("Delete language:", id);
    }
  };

  const handleSetDefault = (id) => {
    console.log("Set default language:", id);
  };

  return (
    <div className="languages-module">
      {/* Header */}
      <div className="module-header">
        <div className="header-left">
          <h2 className="module-title">Language Management</h2>
          <p className="module-subtitle">Manage your multilingual content settings</p>
        </div>
        <div className="header-right">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setEditingLanguage(null);
              setShowForm(true);
            }}
          >
            <svg className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Language
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="module-filters">
        <div className="search-wrapper">
          <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <select className="filter-select">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select className="filter-select">
            <option value="all">All Direction</option>
            <option value="ltr">LTR</option>
            <option value="rtl">RTL</option>
          </select>
          <button className="btn btn-outline">Reset</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total"></div>
          <div className="stat-info">
            <span className="stat-value">{languages.length}</span>
            <span className="stat-label">Total Languages</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active"></div>
          <div className="stat-info">
            <span className="stat-value">{languages.filter(l => l.status === "Active").length}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon inactive"></div>
          <div className="stat-info">
            <span className="stat-value">{languages.filter(l => l.status === "Inactive").length}</span>
            <span className="stat-label">Inactive</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon rtl"></div>
          <div className="stat-info">
            <span className="stat-value">{languages.filter(l => l.direction === "RTL").length}</span>
            <span className="stat-label">RTL</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="language-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Code</th>
              <th>Name</th>
              <th>Native Name</th>
              <th>Status</th>
              <th>Direction</th>
              <th>Default</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang) => (
              <tr key={lang.id}>
                <td className="flag-cell">{lang.flag}</td>
                <td className="code-cell">{lang.code}</td>
                <td className="name-cell">{lang.name}</td>
                <td className="native-cell">{lang.nativeName}</td>
                <td>
                  <span className={`status-badge ${lang.status.toLowerCase()}`}>
                    {lang.status}
                  </span>
                </td>
                <td>
                  <span className="direction-badge">{lang.direction}</span>
                </td>
                <td>
                  {lang.isDefault ? (
                    <span className="default-badge">Default</span>
                  ) : (
                    <button 
                      className="set-default-btn"
                      onClick={() => handleSetDefault(lang.id)}
                    >
                      Set Default
                    </button>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEdit(lang)}
                      title="Edit"
                    >
                      <svg className="action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(lang.id)}
                      title="Delete"
                    >
                      <svg className="action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Showing 1 to {languages.length} of {languages.length} languages
        </div>
        <div className="pagination-controls">
          <button className="page-btn" disabled>Previous</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">Next</button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingLanguage ? "Edit Language" : "Add New Language"}</h3>
              <button className="modal-close" onClick={() => setShowForm(false)}>
                <svg className="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Language Name</label>
                <input type="text" className="form-input" placeholder="Enter language name" />
              </div>
              <div className="form-group">
                <label>Native Name</label>
                <input type="text" className="form-input" placeholder="Enter native name" />
              </div>
              <div className="form-group">
                <label>Code</label>
                <input type="text" className="form-input" placeholder="Enter language code (e.g., en)" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="form-select">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label>Direction</label>
                <select className="form-select">
                  <option value="ltr">LTR (Left to Right)</option>
                  <option value="rtl">RTL (Right to Left)</option>
                </select>
              </div>
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" /> Set as Default Language
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary">Save Language</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguagesModule;