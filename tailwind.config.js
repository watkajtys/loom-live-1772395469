/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          "alabaster": "#F0F2F0","charcoal": "#333333","cobalt": "#0047AB","cobalt-light": "#E6F0FF",
          "stone-soft": "#EBECEB",
      },
      fontFamily: {
          "sans": ["Space Grotesk", "sans-serif"],
          "serif": ["Playfair Display", "serif"],
      },
      borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
      animation: {
          'pulse-once': 'pulse-glow 2s ease-out forwards',
      },
      keyframes: {
          'pulse-glow': {
              '0%': { boxShadow: 'inset 0 0 0 0px rgba(0, 71, 171, 0)' },
              '50%': { boxShadow: 'inset 0 0 50px 0px rgba(0, 71, 171, 0.1)' },
              '100%': { boxShadow: 'inset 0 0 0 0px rgba(0, 71, 171, 0)' },
          }
      }
    },
  },
  plugins: [],
}
