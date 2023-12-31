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
        hack: "#00dd00",
        failure: "#ff0000",
        hackGray: "#adadad",
        chillWhite: "#f1f1ef",
        charcoal: "#333",
        slateBlack: "#202124",
      },
      backgroundColor: {
        dark: "#1E1E1E",
        keeby: "#222",
        slateBlack: "#202124",
        charcoal: "#333",
        gold: "#D4AF37",
        lessDark: "#101010",
        offDark: "#2f2f2f",
        lightGray: "#464646",
        chillWhite: "#f1f1ef",
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
