/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{jsx, tsx}", "./src/**/*.{jsx, tsx}"],
  theme: {
    extend: {
      colors: {
        lightCream: "#F8F6F4",
        veryLightBlue: "#E3F4F4",
        lightBlue: "#D2E9E9",
        blue: "#C4DFDF",
      },
    },
  },
  plugins: [],
};
