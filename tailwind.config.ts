import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        '2xl': "1536px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
    defaultTheme: "light",
    defaultExtendTheme: "light",
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          foreground: "#11181C",
          primary: {
            DEFAULT: '#000000',
            foreground: '#ffffff',
          }
        }
      },
      dark: {
        colors: {
          background: '#000000',
          foreground: '#FFFFFF',
          primary: {
            DEFAULT: '#f5ee20',
            foreground: '#ffffff',
          },
        }
      }
    }
  })],
};
export default config;
