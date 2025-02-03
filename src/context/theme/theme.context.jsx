import PropTypes from "prop-types";
import { useState } from "react";
import { darkTheme, lightTheme } from "../../theme/index";
import { ThemeContext } from "../index";

export const ThemeProvider = ({ children }) => {
  let theme = "light";
  const [isLight, setIsLight] = useState(theme === "light");

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  const value = {
    theme: isLight ? lightTheme : darkTheme,
    isLightTheme: isLight,
    toggleTheme,
  };

  ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
