import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeToggler = () => {
  const { isLightTheme, handleThemeChange } = useContext(ThemeContext);

  return (
    <div>
      <BsToggle2Off
        color={isLightTheme ? "#04364A" : "#93B1A6"}
        size={28}
        className={isLightTheme ? "cursor-pointer" : "hidden"}
        onClick={handleThemeChange}
      />
      <BsToggle2On
        color={isLightTheme ? "#04364A" : "#93B1A6"}
        size={28}
        className={isLightTheme ? "hidden cursor-pointer" : "cursor-pointer"}
        onClick={handleThemeChange}
      />
    </div>
  );
};

export default ThemeToggler;
