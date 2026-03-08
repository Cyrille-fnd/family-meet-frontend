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
        "primary-light": "var(--color-primary-light)",
        "primary-surface": "var(--color-primary-surface)",
        accent: "var(--color-accent)",
        "accent-dark": "var(--color-accent-dark)",
        "bg-page": "var(--color-bg-page)",
        "bg-surface": "var(--color-bg-surface)",
        "bg-muted": "var(--color-bg-muted)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "text-inverse": "var(--color-text-inverse)",
        "border-default": "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        "border-focus": "var(--color-border-focus)",
        overlay: "var(--color-overlay)",
        error: "var(--color-error)",
        success: "var(--color-success)",
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
