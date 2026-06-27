// src/utils/quickaction/QuickAction.jsx
import React, { useState, useEffect, useCallback } from 'react';
import useWidgetStore from '../../store/widgetStore';
import './QuickAction.css';

const QuickAction = () => {
  // Using Zustand
  const isVisible = useWidgetStore((state) => state.widgets.quickAction);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Auto-close on scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open (for mobile)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // If widget is hidden globally, don't render
  if (!isVisible) return null;

  const actions = [
    {
      id: 'chat',
      label: 'Live Chat',
      icon: '💬',
      color: '#4CAF50',
      onClick: () => {
        console.log('Open chat');
        // Implement chat logic
        closeMenu();
      }
    },
    {
      id: 'help',
      label: 'Help Center',
      icon: '❓',
      color: '#2196F3',
      onClick: () => {
        console.log('Open help');
        // Implement help logic
        closeMenu();
      }
    },
    {
      id: 'feedback',
      label: 'Send Feedback',
      icon: '📝',
      color: '#FF9800',
      onClick: () => {
        console.log('Open feedback');
        // Implement feedback logic
        closeMenu();
      }
    },
    {
      id: 'share',
      label: 'Share',
      icon: '📤',
      color: '#9C27B0',
      onClick: () => {
        console.log('Share');
        // Implement share logic
        closeMenu();
      }
    }
  ];

  return (
    <div className={`quick-action ${isOpen ? 'open' : ''}`}>
      {/* Main Toggle Button */}
      <button
        className="quick-action-toggle"
        onClick={toggleMenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Toggle quick actions"
        aria-expanded={isOpen}
        aria-controls="quick-action-menu"
      >
        <span className="toggle-icon">
          {isOpen ? '✕' : '⚡'}
        </span>
        {isHovered && !isOpen && (
          <span className="toggle-tooltip">Quick Actions</span>
        )}
      </button>

      {/* Action Menu */}
      <div 
        className="quick-action-menu" 
        id="quick-action-menu"
        role="menu"
        aria-label="Quick actions menu"
      >
        {actions.map((action) => (
          <button
            key={action.id}
            className="quick-action-item"
            onClick={action.onClick}
            style={{ '--action-color': action.color }}
            aria-label={action.label}
            role="menuitem"
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
            <span className="action-ring"></span>
          </button>
        ))}
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="quick-action-backdrop" 
          onClick={closeMenu}
          role="button"
          aria-label="Close menu"
        />
      )}
    </div>
  );
};

export default QuickAction;