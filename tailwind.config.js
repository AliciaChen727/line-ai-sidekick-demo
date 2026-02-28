/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        line: {
          green: '#06C755',
          greenHover: '#05B34C',
          greenPress: '#04A043',
          dark: '#111111',
          gray: '#8B8C8E',
          lightBg: '#F5F5F7',
          border: '#EBEBEB',
          red: '#FF4C4C',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        'widget': '0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
