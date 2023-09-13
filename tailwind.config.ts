import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ['var(--font-aeonik)'],
      },
      textColor: {
        hacktime: "#00FF99",
      },
    },
  },
  plugins: [],
} satisfies Config;
