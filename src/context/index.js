import { createContext } from "react";
import { lightTheme } from "../theme";

export const ThemeContext = createContext({
  theme: lightTheme,
  isLightTheme: true,
  toggleTheme: () => {},
});
