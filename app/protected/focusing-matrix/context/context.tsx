"use client"

import { createContext, Dispatch, useContext, useReducer, useState } from 'react';
import { focusingMatrixReducer, initialFocusingMatrixData } from './intialAndReducer';
import { FocusingMatrixContextType, FocusingMatrixData } from './types';


  const FocusingMatrixContext = createContext<FocusingMatrixContextType | undefined>(undefined);

export const FocusingMatrixProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(focusingMatrixReducer, initialFocusingMatrixData);

    return (
        <FocusingMatrixContext.Provider value={{state, dispatch  }}>
            {children}
        </FocusingMatrixContext.Provider>
    );
};

export const useFocusingMatrixContext = () => {
    const context = useContext(FocusingMatrixContext);
    if (!context) {
      throw new Error("useFocusingMatrixContext must be used within a FocusingMatrixProvider");
    }
    return context;
  };