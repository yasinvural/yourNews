import React, { createContext, useContext, useReducer } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ reducer, initialState, children }) => (
  <NewsContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </NewsContext.Provider>
);

export const useNewsValue = () => useContext(NewsContext);
