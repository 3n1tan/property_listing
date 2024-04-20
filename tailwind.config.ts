import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
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
          background: "#F9FEED",
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
          foreground: '#F9FEED',
          primary: {
            DEFAULT: '#f5ee20',
            foreground: '#ffffff',
          },
        }
      }
    }
  })],
};