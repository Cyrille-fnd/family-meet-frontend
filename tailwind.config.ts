import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        overlay: "var(--color-overlay)",
        "gray-muted": "var(--color-gray-muted)",
        "gray-secondary": "var(--color-gray-secondary)",
        "gray-hover": "var(--color-gray-hover)",
        "gray-separator": "var(--color-gray-separator)",
        "gray-loader": "var(--color-gray-loader)",
        error: "var(--color-error)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
        full: "var(--radius-full)",
      },
      fontSize: {
        "token-xs": "var(--font-size-xs)",
        "token-base": "var(--font-size-base)",
        "token-md": "var(--font-size-md)",
        "token-lg": "var(--font-size-lg)",
        "token-xl": "var(--font-size-xl)",
        "token-2xl": "var(--font-size-2xl)",
      },
    },
  },
  plugins: [],
}
export default config
