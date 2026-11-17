/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F8F7F4',
          card: '#FFFFFF',
          soft: '#F0EEE8',
        },
        brand: {
          DEFAULT: '#526B62',
          hover: '#40584F',
          soft: '#E8EEE9',
          light: '#F4F7F5',
        },
        text: {
          primary: '#262B32',
          secondary: '#747A80',
          muted: '#9A9D9F',
        },
        sand: {
          DEFAULT: '#EDE7DC',
          light: '#F7F4EE',
        },
        terracotta: {
          DEFAULT: '#B77A61',
          soft: '#F5ECE8',
        },
        softblue: {
          DEFAULT: '#E9EFF4',
          light: '#F3F7FA',
        },
        surface: {
          border: '#E9E7E1',
          hover: '#F2F0EA',
        },
        status: {
          success: '#688A70',
          'success-soft': '#EBF2ED',
          warning: '#C18A4F',
          'warning-soft': '#FAF3EA',
          danger: '#B96E68',
          'danger-soft': '#F8ECEB',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        secondary: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        'card': '18px',
        'card-lg': '22px',
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(38, 43, 50, 0.04), 0 1px 3px 0 rgba(38, 43, 50, 0.02)',
        'soft-md': '0 6px 20px -3px rgba(38, 43, 50, 0.06), 0 2px 6px -1px rgba(38, 43, 50, 0.03)',
        'soft-lg': '0 12px 30px -4px rgba(38, 43, 50, 0.08), 0 4px 10px -2px rgba(38, 43, 50, 0.04)',
      }
    },
  },
  plugins: [],
}
