/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['wireframe', 'dark'],
  },
  plugins: [require('daisyui')],
  'files.associations': {
    '*.css': 'tailwindcss',
  },
};
