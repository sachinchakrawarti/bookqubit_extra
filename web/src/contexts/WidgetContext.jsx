// src/contexts/WidgetContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// Constants
const STORAGE_KEY = 'widget-settings';
const DEFAULT_WIDGETS = {
  quickAction: true,
  scrollToTop: true,
};

// Types (if using TypeScript)
// export interface WidgetState {
//   quickAction: boolean;
//   scrollToTop: boolean;
//   [key: string]: boolean;
// }

// export interface WidgetContextValue {
//   widgets: WidgetState;
//   toggleWidget: (widgetName: string) => void;
//   showWidget: (widgetName: string) => void;
//   hideWidget: (widgetName: string) => void;
//   resetWidgets: () => void;
//   getWidgetState: (widgetName: string) => boolean;
//   setWidgets: React.Dispatch<React.SetStateAction<WidgetState>>;
//   isWidgetVisible: (widgetName: string) => boolean;
//   activeCount: number;
//   totalCount: number;
// }

const WidgetContext = createContext();

// Helper function to load from localStorage
const loadWidgetsFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { ...DEFAULT_WIDGETS };
    
    const parsed = JSON.parse(saved);
    // Support both old and new storage formats
    const widgets = parsed.state?.widgets || parsed;
    
    // Merge with defaults to ensure all keys exist
    return { ...DEFAULT_WIDGETS, ...widgets };
  } catch (error) {
    console.warn('Failed to load widget settings from localStorage:', error);
    return { ...DEFAULT_WIDGETS };
  }
};

export const WidgetProvider = ({ children }) => {
  // Initialize state from localStorage
  const [widgets, setWidgets] = useState(loadWidgetsFromStorage);
  const [isInitialized, setIsInitialized] = useState(false);

  // Save to localStorage with debounce
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    const saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
      } catch (error) {
        console.warn('Failed to save widget settings:', error);
      }
    }, 300); // Debounce saves

    return () => clearTimeout(saveTimer);
  }, [widgets, isInitialized]);

  // Memoized actions
  const toggleWidget = useCallback((widgetName) => {
    setWidgets(prev => ({
      ...prev,
      [widgetName]: !prev[widgetName]
    }));
  }, []);

  const showWidget = useCallback((widgetName) => {
    setWidgets(prev => ({
      ...prev,
      [widgetName]: true
    }));
  }, []);

  const hideWidget = useCallback((widgetName) => {
    setWidgets(prev => ({
      ...prev,
      [widgetName]: false
    }));
  }, []);

  const resetWidgets = useCallback(() => {
    setWidgets({ ...DEFAULT_WIDGETS });
    // Optionally clear localStorage
    // localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getWidgetState = useCallback((widgetName) => {
    return widgets[widgetName] ?? DEFAULT_WIDGETS[widgetName] ?? false;
  }, [widgets]);

  const isWidgetVisible = useCallback((widgetName) => {
    return getWidgetState(widgetName);
  }, [getWidgetState]);

  // Computed values
  const activeCount = useMemo(() => {
    return Object.values(widgets).filter(Boolean).length;
  }, [widgets]);

  const totalCount = useMemo(() => {
    return Object.keys(widgets).length;
  }, [widgets]);

  // Batch update multiple widgets at once
  const setMultipleWidgets = useCallback((updates) => {
    setWidgets(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Get all active widget names
  const getActiveWidgets = useCallback(() => {
    return Object.keys(widgets).filter(key => widgets[key]);
  }, [widgets]);

  // Get all inactive widget names
  const getInactiveWidgets = useCallback(() => {
    return Object.keys(widgets).filter(key => !widgets[key]);
  }, [widgets]);

  // Context value with memoization
  const value = useMemo(() => ({
    widgets,
    toggleWidget,
    showWidget,
    hideWidget,
    resetWidgets,
    getWidgetState,
    setWidgets,
    // Additional utilities
    isWidgetVisible,
    setMultipleWidgets,
    getActiveWidgets,
    getInactiveWidgets,
    // Computed values
    activeCount,
    totalCount,
  }), [
    widgets,
    toggleWidget,
    showWidget,
    hideWidget,
    resetWidgets,
    getWidgetState,
    isWidgetVisible,
    setMultipleWidgets,
    getActiveWidgets,
    getInactiveWidgets,
    activeCount,
    totalCount,
  ]);

  return (
    <WidgetContext.Provider value={value}>
      {children}
    </WidgetContext.Provider>
  );
};

// Custom hook with better error handling
export const useWidgets = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgets must be used within a WidgetProvider');
  }
  return context;
};

// Higher-order component for class components
export const withWidgets = (Component) => {
  const WrappedComponent = (props) => {
    const widgetContext = useWidgets();
    return <Component {...props} widgetContext={widgetContext} />;
  };
  
  WrappedComponent.displayName = `WithWidgets(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
};

// Hook for just checking a single widget's visibility
export const useWidgetVisibility = (widgetName) => {
  const { widgets } = useWidgets();
  return widgets[widgetName] ?? DEFAULT_WIDGETS[widgetName] ?? false;
};

// Hook for toggling a specific widget
export const useWidgetToggle = (widgetName) => {
  const { toggleWidget, getWidgetState } = useWidgets();
  const isVisible = getWidgetState(widgetName);
  
  const toggle = useCallback(() => {
    toggleWidget(widgetName);
  }, [toggleWidget, widgetName]);
  
  return { isVisible, toggle };
};

// Optional: Add a debug component for development
export const WidgetDebugger = () => {
  const { widgets, toggleWidget, resetWidgets } = useWidgets();
  
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 10,
      left: 10,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px',
      maxHeight: '300px',
      overflow: 'auto'
    }}>
      <h4 style={{ margin: '0 0 8px 0' }}>Widget Debug</h4>
      {Object.entries(widgets).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <button
            onClick={() => toggleWidget(key)}
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              border: 'none',
              background: value ? '#4CAF50' : '#f44336',
              color: 'white',
              cursor: 'pointer',
              fontSize: '10px'
            }}
          >
            {value ? 'ON' : 'OFF'}
          </button>
          <span>{key}: {value ? '✅' : '❌'}</span>
        </div>
      ))}
      <button
        onClick={resetWidgets}
        style={{
          marginTop: '8px',
          padding: '4px 12px',
          borderRadius: '4px',
          border: 'none',
          background: '#ff9800',
          color: 'white',
          cursor: 'pointer',
          fontSize: '10px'
        }}
      >
        Reset All
      </button>
    </div>
  );
};

// Export defaults for convenience
export default WidgetContext;