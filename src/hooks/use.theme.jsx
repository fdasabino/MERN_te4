import { useContext } from "react";
import { ThemeContext } from "../context";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme needs to be in the them context to work - Have you wrapped your app?"
    );
  }
  return context;
};
