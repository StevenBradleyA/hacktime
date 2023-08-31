import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        hacktime: "#00FF99",
      },
    },
  },
  plugins: [],
} satisfies Config;
