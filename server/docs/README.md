<style>
  .server-overview {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    line-height: 1.6;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: #1a1a2e;
  }
  
  .server-overview h1,
  .server-overview h2,
  .server-overview h3 {
    color: #2563eb;
    margin-top: 1.5em;
    font-weight: 600;
  }
  
  .server-overview h1 {
    font-size: 2.5em;
    border-bottom: 3px solid #2563eb;
    padding-bottom: 0.3em;
    margin-bottom: 0.5em;
  }
  
  .server-overview h2 {
    font-size: 1.8em;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.2em;
  }
  
  .server-overview blockquote {
    border-left: 4px solid #2563eb;
    padding-left: 1rem;
    color: #4b5563;
    background: #f3f4f6;
    border-radius: 0 4px 4px 0;
    margin: 1em 0;
    padding: 1em 1.5em;
  }
  
  .server-overview code {
    background: #f3f4f6;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
    color: #1e293b;
  }
  
  .server-overview pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
  }
  
  .server-overview pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }
  
  .server-overview table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
  }
  
  .server-overview th,
  .server-overview td {
    border: 1px solid #e5e7eb;
    padding: 0.75em;
    text-align: left;
  }
  
  .server-overview th {
    background: #2563eb;
    color: white;
  }
  
  .server-overview tr:nth-child(even) {
    background: #f9fafb;
  }
  
  .server-overview .badge {
    display: inline-block;
    padding: 0.2em 0.8em;
    border-radius: 20px;
    font-size: 0.75em;
    font-weight: 600;
    margin-right: 0.5em;
  }
  
  .badge-success {
    background: #10b981;
    color: white;
  }
  
  .badge-warning {
    background: #f59e0b;
    color: white;
  }
  
  .badge-danger {
    background: #ef4444;
    color: white;
  }
  
  .badge-info {
    background: #3b82f6;
    color: white;
  }
  
  .server-overview .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5em;
    margin: 1.5em 0;
  }
  
  .server-overview .feature-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5em;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .server-overview .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
  
  .server-overview .feature-card h3 {
    margin-top: 0;
    color: #1e293b;
  }
  
  .server-overview .feature-card p {
    margin-bottom: 0;
    color: #4b5563;
  }
  
  .server-overview .architecture-diagram {
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 2em;
    text-align: center;
    font-family: monospace;
    font-size: 0.9em;
    margin: 1.5em 0;
  }
  
  .server-overview .diagram-layer {
    padding: 0.5em 1em;
    margin: 0.25em 0;
    border-radius: 4px;
    display: inline-block;
    border: 2px solid #2563eb;
    background: white;
  }
  
  .server-overview .diagram-arrow {
    color: #2563eb;
    font-size: 1.5em;
    margin: 0.25em 0;
  }
  
  .server-overview .diagram-layer-1 { border-color: #3b82f6; background: #eff6ff; }
  .server-overview .diagram-layer-2 { border-color: #8b5cf6; background: #f5f3ff; }
  .server-overview .diagram-layer-3 { border-color: #10b981; background: #ecfdf5; }
  .server-overview .diagram-layer-4 { border-color: #f59e0b; background: #fffbeb; }
  .server-overview .diagram-layer-5 { border-color: #ef4444; background: #fef2f2; }
  
  .server-overview .modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1em;
    margin: 1em 0;
  }
  
  .server-overview .module-item {
    background: #f3f4f6;
    padding: 0.75em 1em;
    border-radius: 6px;
    border-left: 3px solid #2563eb;
  }
  
  .server-overview .toc {
    background: #f8fafc;
    padding: 1.5em;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    margin: 1.5em 0;
  }
  
  .server-overview .toc ul {
    columns: 2;
    column-gap: 2em;
    list-style: none;
    padding: 0;
  }
  
  .server-overview .toc li {
    padding: 0.25em 0;
  }
  
  .server-overview .toc a {
    color: #2563eb;
    text-decoration: none;
  }
  
  .server-overview .toc a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .server-overview .toc ul {
      columns: 1;
    }
    
    .server-overview .feature-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="server-overview">

# 📚 BookQubit Server

> A modular, secure, and enterprise-ready REST API for the BookQubit ecosystem.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-4.x-blue)](https://expressjs.com/)
[![SQLite Version](https://img.shields.io/badge/sqlite-3.x-blue)](https://sqlite.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](http://makeapullrequest.com)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-ff69b4)](https://prettier.io/)
[![Security](https://img.shields.io/badge/security-helmet%2Frate%20limit-green)](https://helmetjs.github.io/)

---

## 📋 Table of Contents

<div class="toc">
<ul>
<li><a href="#-overview">Overview</a></li>
<li><a href="#-architecture">Architecture</a></li>
<li><a href="#-design-goals">Design Goals</a></li>
<li><a href="#%EF%B8%8F-quick-start">Quick Start</a></li>
<li><a href="#-project-structure">Project Structure</a></li>
<li><a href="#-feature-modules">Feature Modules</a></li>
<li><a href="#%EF%B8%8F-code-generation">Code Generation</a></li>
<li><a href="#-database">Database</a></li>
<li><a href="#-api-endpoints">API Endpoints</a></li>
<li><a href="#-security">Security</a></li>
<li><a href="#-testing">Testing</a></li>
<li><a href="#-logging">Logging</a></li>
<li><a href="#-deployment">Deployment</a></li>
<li><a href="#-contributing">Contributing</a></li>
<li><a href="#-license">License</a></li>
</ul>
</div>

---

## 🚀 Overview

The BookQubit Server is a **Node.js** and **Express** REST API built with **ES Modules (ESM)**. It provides the core backend infrastructure for the BookQubit platform, handling:

- **Book Management** - Create, read, update, and delete books
- **Author Management** - Manage author profiles and their works
- **Category & Tag Systems** - Organize and classify content
- **User Authentication** - Secure JWT-based authentication
- **Dashboard Analytics** - Trends and user analytics
- **Content Moderation** - Admin controls for content management

<div class="feature-grid">
  <div class="feature-card">
    <h3>🎯 Modular Architecture</h3>
    <p>Feature-based organization with clear separation of concerns for maintainability and scalability.</p>
  </div>
  
  <div class="feature-card">
    <h3>🔒 Enterprise Security</h3>
    <p>Comprehensive security with Helmet, rate limiting, input validation, and SQL injection prevention.</p>
  </div>
  
  <div class="feature-card">
    <h3>⚡ Code Generation</h3>
    <p>Plop-based code generation for rapid module creation with consistent patterns and best practices.</p>
  </div>
  
  <div class="feature-card">
    <h3>📊 SQLite Database</h3>
    <p>Lightweight, file-based database with parameterized queries for security and performance.</p>
  </div>
  
  <div class="feature-card">
    <h3>🔧 Registry System</h3>
    <p>Dynamic module registration and discovery for plugins, hooks, and middleware.</p>
  </div>
  
  <div class="feature-card">
    <h3>🧪 Test Coverage</h3>
    <p>Comprehensive testing with Jest, including unit tests, integration tests, and fixtures.</p>
  </div>
</div>

---

## 🏗 Architecture

### High-Level Architecture

<div class="architecture-diagram">
  <div>
    <div class="diagram-layer diagram-layer-1">🌐 HTTP / HTTPS</div>
    <div class="diagram-arrow">↓</div>
    <div class="diagram-layer diagram-layer-2">🛡️ Security Middleware (Helmet, Rate Limit, CORS)</div>
    <div class="diagram-arrow">↓</div>
    <div class="diagram-layer diagram-layer-3">🔄 Express Router (Routes & Controllers)</div>
    <div class="diagram-arrow">↓</div>
    <div class="diagram-layer diagram-layer-4">📦 Business Logic (Services & Validations)</div>
    <div class="diagram-arrow">↓</div>
    <div class="diagram-layer diagram-layer-5">🗄️ Data Access (Repositories & SQLite)</div>
  </div>
</div>

### Module Structure (Clean Architecture)

Each module follows the **Layered Architecture** pattern:

```mermaid
graph TD
    A[Routes Layer] --> B[Controllers Layer]
    B --> C[Services Layer]
    C --> D[Repositories Layer]
    D --> E[(Database)]
    
    B --> F[Validation Layer]
    C --> G[DTO Layer]
    D --> H[SQL Queries Layer]