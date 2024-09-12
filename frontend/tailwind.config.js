/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
      },
      keyframes: {
        'blob': {
          '0%, 100%': { borderRadius: '40% 60% 70% 30% / 50% 40% 60% 50%' },
          '50%': { borderRadius: '60% 40% 30% 70% / 60% 50% 40% 50%' },
        },
        'wave': {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-10px) rotate(-5deg)' },
          '100%': { transform: 'translateX(0) rotate(5deg)' },
        },
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'blob': 'blob 8s infinite',
        'wave': 'wave 6s infinite ease-in-out',
        'spin': 'spin 4s linear infinite',
      },
    },
  
    
  },
  darkMode: "class",
  plugins: [nextui()]
}

