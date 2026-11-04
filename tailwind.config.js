import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Figtree',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#e6f4f3',
          100: '#c2e5e2',
          200: '#8fd0ca',
          300: '#55b5ad',
          400: '#23968e',
          500: '#0d7c75', // sea teal
          600: '#0a655f',
          700: '#0b504c',
          800: '#0c3f3c',
          900: '#082a28',
        },
        secondary: {
          50: '#fdecec',
          100: '#f9d0d0',
          200: '#f2a1a1',
          300: '#e86b6b',
          400: '#d83c3c',
          500: '#b8202a', // Moriones red
          600: '#9a1a23',
          700: '#7a151c',
          800: '#5a1015',
          900: '#3a0a0d',
        },
        accent: {
          50: '#fdf8e7',
          100: '#faefc4',
          200: '#f5df8a',
          300: '#efcb4f',
          400: '#e5b52a',
          500: '#c99a14', // festival gold
          600: '#a07a0f',
          700: '#7a5d0c',
          800: '#54400a',
          900: '#2f2405',
        },
        success: {
          50: '#e6f7ef',
          100: '#ccefdf',
          200: '#99dfbf',
          300: '#66cf9f',
          400: '#33bf7f',
          500: '#00af5f',
          600: '#008c4c',
          700: '#006939',
          800: '#004626',
          900: '#002313',
        },
        warning: {
          50: '#fff8e6',
          100: '#fff1cc',
          200: '#ffe399',
          300: '#ffd566',
          400: '#ffc733',
          500: '#ffb900',
          600: '#cc9400',
          700: '#996f00',
          800: '#664a00',
          900: '#332500',
        },
        error: {
          50: '#fceaea',
          100: '#f9d5d5',
          200: '#f3abab',
          300: '#ed8282',
          400: '#e75858',
          500: '#e12e2e',
          600: '#b42525',
          700: '#871c1c',
          800: '#5a1212',
          900: '#2d0909',
        },
        gray: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [typography],
};
