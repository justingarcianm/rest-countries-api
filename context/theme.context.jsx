import React, { useState, createContext } from "react";
import { light, dark } from "../styled/theme";

export const ThemeContext = createContext();

export const MyThemeProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(light);

  return <ThemeContext.Provider value={{ setSelectedTheme, selectedTheme }}>{children}</ThemeContext.Provider>;
};
