/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '786px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    },
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        modalOverlay: 'var(--modal-overlay-color)'
      },
      container: {
        center: true,
        padding: '1rem',
      },
      transitionTimingFunction: {
        ease: 'ease'
      }
    },
  },
  plugins: [],
}

