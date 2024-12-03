/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f3',
          100: '#ffe4e9',
          200: '#fecdd5',
          300: '#fda4b3',
          400: '#fb7189',
          500: '#f43f5e',
          600: '#e11d3f',
          700: '#be122f',
          800: '#9f122a',
          900: '#881327',
          950: '#4c0511',
        },
        secondary: {
          50: '#f7f8f8',
          100: '#edeef1',
          200: '#d8dbdf',
          300: '#b6bac3',
          400: '#8e95a2',
          500: '#6b7280',
          600: '#5b616e',
          700: '#4a4e5a',
          800: '#40444c',
          900: '#383a42',
          950: '#25272c',
        },
      },
    },
  },
  plugins: [],
  important: true,
};
