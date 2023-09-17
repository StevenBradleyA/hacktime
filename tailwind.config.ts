import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ["var(--font-aeonik)"],
      },
      textColor: {
        neonTeal: "#00FF99",
      },
      backgroundColor: {
        dark: "#1E1E1E",
        slateBlack: "#202124",
        charcoal: "#333",
      },
      screens: {
        mobile: "320px",
        full: "1920px",
        ultrawide: "2560px",
      },
    },
  },
  plugins: [],
} satisfies Config;
