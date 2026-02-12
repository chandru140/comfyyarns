/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baby-pink': {
          50: '#FFF5F7',
          100: '#FFE4E9',
          200: '#FFC9D4',
          300: '#FFB6C1',
          400: '#FFA0B0',
          500: '#FF8FA3',
          600: '#FF6B8A',
          700: '#FF4D78',
          800: '#E63960',
          900: '#B82E4D',
        },
        'soft-rose': {
          50: '#FFF8F8',
          100: '#FFE4E1',
          200: '#FDD7E4',
          300: '#FFC0CB',
          400: '#FFB3C1',
          500: '#FFA6B8',
        },
        'white': '#FFFFFF',
        'off-white': '#FAFAFA',
      },
      fontFamily: {
        'logo': ['Caveat', 'cursive'],
        'body': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'pink-sm': '0 1px 3px 0 rgb(255 182 193 / 0.1), 0 1px 2px -1px rgb(255 182 193 / 0.1)',
        'pink-md': '0 4px 6px -1px rgb(255 182 193 / 0.1), 0 2px 4px -2px rgb(255 182 193 / 0.1)',
        'pink-lg': '0 10px 15px -3px rgb(255 182 193 / 0.1), 0 4px 6px -4px rgb(255 182 193 / 0.1)',
        'pink-xl': '0 20px 25px -5px rgb(255 182 193 / 0.1), 0 8px 10px -6px rgb(255 182 193 / 0.1)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slideInUp': 'slideInUp 0.5s ease-out',
        'fadeIn': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
