import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useContext } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const { get, set } = useLocalStorage("isLightTheme");

  const [isLightTheme, setIsLightTheme] = useState(get() || true);

  const handleThemeChange = () => {
    setIsLightTheme((prev) => !prev);
  };

  set(isLightTheme);

  return (
    <ThemeContext.Provider value={{ isLightTheme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
