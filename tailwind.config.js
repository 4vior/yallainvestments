/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070E19',
        surface: '#0D1B2E',
        border: '#182C47',
        gain: '#10B981',
        loss: '#EF4444',
        dividend: '#F59E0B',
        accent: '#3B82F6',
      },
      fontFamily: {
        sans: ['Heebo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
