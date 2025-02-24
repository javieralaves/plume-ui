import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Neutral scale
        neutral: {
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
        },

        // Surfaces
        surface: {
          primary: "var(--surface-primary)",
          secondary: "var(--surface-secondary)",
          tertiary: "var(--surface-tertiary)",
        },

        // Interactive
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          light: "var(--primary-light)",
        },
        interactive: {
          primary: {
            bg: "var(--interactive-primary-bg)",
            "bg-hover": "var(--interactive-primary-bg-hover)",
            "bg-active": "var(--interactive-primary-bg-active)",
          },
        },

        // Status
        success: {
          DEFAULT: "var(--success)",
          light: "var(--success-light)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          light: "var(--warning-light)",
        },
        error: {
          DEFAULT: "var(--error)",
          light: "var(--error-light)",
        },

        // Text
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          disabled: "var(--text-disabled)",
        },

        // Borders
        border: {
          light: "var(--border-light)",
          medium: "var(--border-medium)",
          heavy: "var(--border-heavy)",
        },
      },
      fontFamily: {
        matter: ["Matter", "sans-serif"],
        reckless: ["Reckless", "serif"],
      },
      fontSize: {
        // Marketing typography scale
        "marketing-h1": ["4rem", { lineHeight: "1.1", fontWeight: "600" }], // 64px
        "marketing-h2": ["3rem", { lineHeight: "1.2", fontWeight: "600" }], // 48px
        "marketing-h3": ["2rem", { lineHeight: "1.2", fontWeight: "600" }], // 32px
        "marketing-h4": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }], // 24px
        "marketing-h5": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }], // 20px
        "marketing-body": [
          "1.125rem",
          { lineHeight: "1.5", fontWeight: "400" },
        ], // 18px
        "marketing-body-sm": ["1rem", { lineHeight: "1.5", fontWeight: "400" }], // 16px
        "marketing-caption": [
          "0.875rem",
          { lineHeight: "1.5", fontWeight: "400" },
        ], // 14px

        // App typography scale
        "app-h1": ["2rem", { lineHeight: "1.2", fontWeight: "600" }], // 32px
        "app-h2": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }], // 24px
        "app-h3": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }], // 20px
        "app-h4": ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }], // 18px
        "app-body": ["1rem", { lineHeight: "1.5", fontWeight: "400" }], // 16px
        "app-body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }], // 14px
        "app-caption": ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }], // 12px
      },
    },
  },
  plugins: [],
} satisfies Config;
