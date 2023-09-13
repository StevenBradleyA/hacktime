import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ["var(--font-aeonik)"],
      },
      textColor: {
        hacktime: "#00FF99",
      },
      backgroundColor: {
        dark: "#1E1E1E",
        slateBlack: "#202124",
        charcoal: "#333",
      },
    },
  },
  plugins: [],
} satisfies Config;
