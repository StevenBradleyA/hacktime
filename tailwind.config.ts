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
        neonPurp: "#9900FF",
        hack: "#00dd00",
        failure: "#ff0000",
        hackGray: "#adadad",
        chillWhite: "#f1f1ef",
        charcoal: "#333",
        slateBlack: "#202124",
        darkGray: "#616161",
        keebyGray: "#2f2f2f",
      },
      backgroundColor: {
        dark: "#1E1E1E",
        keeby: "#222",
        slateBlack: "#202124",
        hackGray: "#adadad",
        charcoal: "#333",
        gold: "#D4AF37",
        lessDark: "#101010",
        offDark: "#2f2f2f",
        lightGray: "#464646",
        chillWhite: "#f1f1ef",
        darkGray: "#616161",
        keebyGray: "#2f2f2f",
      },
      screens: {
        mobile: "320px",
        tablet: "600px",
        laptop: "1024px",
        largeLaptop: "1440px",
        desktop: "1920px",
        ultrawide: "2560px",
      },
    },
  },
  plugins: [],
} satisfies Config;
