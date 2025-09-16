/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A3AFF",
        secondary: "#170F49",
        accent: "#C9C4FF",
        neutral: "#A0A3BD",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
        typing: "typing 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 20px rgba(74, 58, 255, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(74, 58, 255, 0.6)" },
        },
        typing: {
          "0%, 60%": { opacity: 1 },
          "30%": { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};
