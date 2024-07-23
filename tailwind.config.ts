import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        main: {
          1: "#08121d",
          2: "#0d1927",
          3: "#05274a",
          4: "#003166",
          5: "#003e79",
          6: "#044b8b",
          7: "#105ba1",
          8: "#126cc0",
          9: "#04549a",
          10: "#004584",
          11: "#6eb9ff",
          12: "#c9e4ff",
          500: "#04549A",

          a1: "#0025fd0d",
          a2: "#0066fb18",
          a3: "#006cfc3e",
          a4: "#006afd5c",
          a5: "#0077fd70",
          a6: "#0082ff83",
          a7: "#108bfe9b",
          a8: "#138dffbc",
          a9: "#0086ff93",
          a10: "#007cfd7c",
          a11: "#6eb9ff",
          a12: "#c9e4ff",

          contrast: "#fff",
          surface: "#0a213d80",
          indicator: "#04549a",
          track: "#04549a",
        },

        slate: {
          1: "#101113",
          2: "#18191b",
          3: "#212225",
          4: "#282a2d",
          5: "#2e3135",
          6: "#373a3f",
          7: "#44474e",
          8: "#5c616a",
          9: "#696e77",
          10: "#777b84",
          11: "#b0b4ba",
          12: "#edeef0",

          a1: "#0011bb03",
          a2: "#b4cbf90b",
          a3: "#cad6f916",
          a4: "#d5e6ff1e",
          a5: "#cfe3fd27",
          a6: "#d3e2fc32",
          a7: "#d6e2fd42",
          a8: "#d8e5fd60",
          a9: "#dde8fd6e",
          a10: "#e3ebfd7c",
          a11: "#f0f5feb6",
          a12: "#fcfdffef",

          contrast: "#FFFFFF",
          surface: "rgba(0, 0, 0, 0.05)",
          indicator: "#696e77",
          track: "#696e77",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
