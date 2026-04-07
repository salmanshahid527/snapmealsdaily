import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "var(--background, #faf9f8)",
      "background-alt": "var(--background-alt, #fef5f0)",
      card: "var(--card, #ffffff)",
      foreground: "var(--foreground, #2d2d2d)",
      "foreground-muted": "var(--foreground-muted, #666666)",
      "foreground-subtle": "var(--foreground-subtle, #999999)",
      primary: "var(--primary, #ff8c42)",
      "primary-foreground": "var(--primary-foreground, #ffffff)",
      "primary-muted": "var(--primary-muted, #ffe8d6)",
      "primary-hover": "var(--primary-hover, #ff7b2e)",
      secondary: "var(--secondary, #d4a574)",
      "secondary-foreground": "var(--secondary-foreground, #ffffff)",
      muted: "var(--muted, #f5f5f5)",
      "muted-foreground": "var(--muted-foreground, #999999)",
      accent: "var(--accent, #ffe8d6)",
      "accent-foreground": "var(--accent-foreground, #ff8c42)",
      border: "var(--border, #f0e6d2)",
      input: "var(--input, #f0e6d2)",
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        display: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.04))",
        md: "var(--shadow-md, 0 8px 24px rgba(0,0,0,0.06))",
        lg: "var(--shadow-lg, 0 20px 48px rgba(0,0,0,0.08))",
        brand: "var(--shadow-brand, 0 4px 20px rgba(255,140,66,0.15))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
