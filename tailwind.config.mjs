/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#efa5b8",
        tertiary: "#1e1e1e",
      },
      keyframes: {
        "jello-horizontal": {
          "0%, 100%": { transform: "scale3d(1, 1, 1)" },
          "30%": { transform: "scale3d(1.25, 0.75, 1)" },
          "40%": { transform: "scale3d(0.75, 1.25, 1)" },
          "50%": { transform: "scale3d(1.15, 0.85, 1)" },
          "65%": { transform: "scale3d(0.95, 1.05, 1)" },
          "75%": { transform: "scale3d(1.05, 0.95, 1)" },
        },
        moveAndFade: {
          "0%": { opacity: 0, transform: "translateY(0)" },
          "50%": { opacity: 1, transform: "translateY(-20px)" },
          "100%": { opacity: 0, transform: "translateY(-40px)" },
        },
      },
      animation: {
        "jello-horizontal": "jello-horizontal 0.9s both",
        moveAndFade:
          "moveAndFade 1.8s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
