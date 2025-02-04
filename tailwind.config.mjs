module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#efa5b8",
        tertiary: "#1a1a1a",
      },
      fontFamily: {
        main: ["Poppins", "sans-serif"],
        header: ["Bebas Neue", "sans-serif"],
      },
      animation: {
        jelloHorizontal: "jelloHorizontal 0.9s both",
      },
      keyframes: {
        jelloHorizontal: {
          "0%": { transform: "scale3d(1, 1, 1)" },
          "25%": { transform: "scale3d(1.15, 0.85, 1)" },
          "50%": { transform: "scale3d(0.85, 1.15, 1)" },
          "75%": { transform: "scale3d(1.05, 0.95, 1)" },
          "100%": { transform: "scale3d(1, 1, 1)" },
        },
      },
    },
  },
  plugins: [],
};
