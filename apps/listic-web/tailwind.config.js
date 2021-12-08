const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        container: '1320px',
        heroText: '672px',
      },
      minHeight: {
        hero: '800px',
      },
      width: {
        'off-canvas': '300px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
