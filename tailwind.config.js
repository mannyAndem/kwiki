/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{jsx, tsx}", "./src/**/*.{jsx, tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // light theme colors
        veryLightBlue: "#DAFFFB",
        lightBlue: "#64CCC5",
        blue: "#176B87",
        darkBlue: "#04364A",
        // dark theme colors
        black: "#040D12",
        gray: "#183D3D",
        lightGray: "#5C8374",
        veryLightGray: "#93B1A6",
      },
    },
  },
  plugins: [],
};
