/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000',
        secondary: '#fff',
        transparent: 'transparent',
        current: 'currentColor',
        white: '#fff',
        black: '#000',
        gray: {
          100: '#e8eafc',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          DEFAULT: '#646464',
        },
        error: '#FF605C',
        danger: '#FFBD44',
        success: '#00CA4E',
      },
    },
  },
  plugins: [],
}
