/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        wireframe: {
          ...require('daisyui/src/colors/themes')['[data-theme=wireframe]'],
          accent: '#5878c9',
          info: '#9CC6EC',
          success: '#6EE7A1',
          error: '#DA2E2B',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
  'files.associations': {
    '*.css': 'tailwindcss',
  },
};
