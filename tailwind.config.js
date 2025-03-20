/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        korean: ['Noto Sans KR', 'sans-serif'],
      },
      screens: {
        xs: '380px',
        s:  '410px'
      },
    },
  },
  plugins: [],
}