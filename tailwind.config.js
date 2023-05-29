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
          // eslint-disable-next-line no-undef
          ...require('daisyui/src/colors/themes')['[data-theme=wireframe]'],
          accent: '#5878c9',
          info: '#79BED2',
          success: '#6EE7A1',
          error: '#DA2E2B',
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  'files.associations': {
    '*.css': 'tailwindcss',
  },
};
