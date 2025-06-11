/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        linkedin: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dcff',
          300: '#7cc2ff',
          400: '#36a5ff',
          500: '#0a8df1',
          600: '#0072ce',
          700: '#005ba6',
          800: '#004d89',
          900: '#003f70',
        },
      },
    },
  },
  plugins: [],
}