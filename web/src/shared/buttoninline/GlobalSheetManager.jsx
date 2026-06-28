"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const GlobalSheetContext = createContext();

export const GlobalSheetProvider = ({ children }) => {
  const [sheetData, setSheetData] = useState(null);

  const openSheet = useCallback((data) => {
    setSheetData(data);
  }, []);

  const closeSheet = useCallback(() => {
    setSheetData(null);
  }, []);

  return (
    <GlobalSheetContext.Provider value={{ sheetData, openSheet, closeSheet }}>
      {children}
    </GlobalSheetContext.Provider>
  );
};

export const useGlobalSheet = () => {
  const context = useContext(GlobalSheetContext);
  if (!context) {
    throw new Error("useGlobalSheet must be used within GlobalSheetProvider");
  }
  return context;
};

export default GlobalSheetContext;
