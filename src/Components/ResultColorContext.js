// ResultColorContext.js
import React, { createContext, useContext, useState } from 'react';

const ResultColorContext = createContext();

export const useResultColor = () => useContext(ResultColorContext);

export const ResultColorProvider = ({ children }) => {
  const [resultColor, setResultColor] = useState('');

  return (
    <ResultColorContext.Provider value={{ resultColor, setResultColor }}>
      {children}
    </ResultColorContext.Provider>
  );
};