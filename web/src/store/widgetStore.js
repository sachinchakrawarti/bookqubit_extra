// src/store/widgetStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Constants
const DEFAULT_WIDGETS = {
  quickAction: true,
  scrollToTop: true,
};

// Optional: Add more widget types here
// const WIDGET_TYPES = ['quickAction', 'scrollToTop'];

const useWidgetStore = create(
  persist(
    (set, get) => ({
      // State
      widgets: { ...DEFAULT_WIDGETS },

      // Core Actions
      toggleWidget: (widgetName) =>
        set((state) => ({
          widgets: {
            ...state.widgets,
            [widgetName]: !state.widgets[widgetName],
          },
        })),

      showWidget: (widgetName) =>
        set((state) => ({
          widgets: {
            ...state.widgets,
            [widgetName]: true,
          },
        })),

      hideWidget: (widgetName) =>
        set((state) => ({
          widgets: {
            ...state.widgets,
            [widgetName]: false,
          },
        })),

      resetWidgets: () =>
        set({
          widgets: { ...DEFAULT_WIDGETS },
        }),

      getWidgetState: (widgetName) => {
        const state = get();
        return state.widgets[widgetName] ?? DEFAULT_WIDGETS[widgetName] ?? false;
      },

      // Batch update
      setWidgets: (newWidgets) =>
        set((state) => ({
          widgets: {
            ...state.widgets,
            ...newWidgets,
          },
        })),

      // New: Toggle multiple widgets at once
      toggleMultipleWidgets: (widgetNames) =>
        set((state) => {
          const updates = {};
          widgetNames.forEach(name => {
            updates[name] = !state.widgets[name];
          });
          return {
            widgets: {
              ...state.widgets,
              ...updates,
            },
          };
        }),

      // New: Set all widgets to a specific value
      setAllWidgets: (value) =>
        set((state) => {
          const updated = {};
          Object.keys(state.widgets).forEach(key => {
            updated[key] = value;
          });
          return {
            widgets: {
              ...state.widgets,
              ...updated,
            },
          };
        }),

      // New: Get all active widget names
      getActiveWidgets: () => {
        const state = get();
        return Object.keys(state.widgets).filter(key => state.widgets[key]);
      },

      // New: Get all inactive widget names
      getInactiveWidgets: () => {
        const state = get();
        return Object.keys(state.widgets).filter(key => !state.widgets[key]);
      },

      // New: Get count of active widgets
      getActiveCount: () => {
        const state = get();
        return Object.values(state.widgets).filter(Boolean).length;
      },

      // New: Get total widget count
      getTotalCount: () => {
        const state = get();
        return Object.keys(state.widgets).length;
      },

      // New: Add a new widget (for dynamic widget registration)
      addWidget: (widgetName, defaultValue = true) =>
        set((state) => ({
          widgets: {
            ...state.widgets,
            [widgetName]: defaultValue,
          },
        })),

      // New: Remove a widget (for dynamic widget removal)
      removeWidget: (widgetName) =>
        set((state) => {
          const { [widgetName]: removed, ...remaining } = state.widgets;
          return {
            widgets: remaining,
          };
        }),
    }),
    {
      name: 'widget-settings', // Storage key
      storage: createJSONStorage(() => localStorage), // Explicit storage configuration
      // Optional: Only persist specific parts
      // partialize: (state) => ({ widgets: state.widgets }),
      
      // Optional: Version the storage for migrations
      // version: 1,
      // migrate: (persistedState, version) => {
      //   if (version === 0) {
      //     // Migration logic
      //     return { widgets: { ...persistedState.widgets } };
      //   }
      //   return persistedState;
      // },
      
      // Optional: Merge persisted state with defaults
      // merge: (persistedState, currentState) => {
      //   return {
      //     ...currentState,
      //     ...persistedState,
      //   };
      // },
    }
  )
);

// Optional: Create selector hooks for better performance
export const useWidgetVisibility = (widgetName) => {
  return useWidgetStore((state) => state.widgets[widgetName] ?? DEFAULT_WIDGETS[widgetName] ?? false);
};

export const useWidgetToggle = (widgetName) => {
  const isVisible = useWidgetStore((state) => state.widgets[widgetName] ?? DEFAULT_WIDGETS[widgetName] ?? false);
  const toggle = useWidgetStore((state) => state.toggleWidget);
  
  return {
    isVisible,
    toggle: () => toggle(widgetName),
  };
};

export const useWidgetStats = () => {
  return useWidgetStore((state) => ({
    activeCount: Object.values(state.widgets).filter(Boolean).length,
    totalCount: Object.keys(state.widgets).length,
  }));
};

// Optional: Export for type safety (if using TypeScript)
// export type WidgetStore = typeof useWidgetStore;

export default useWidgetStore;