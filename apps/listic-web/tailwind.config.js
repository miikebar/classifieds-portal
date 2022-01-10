const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      height: {
        chat: 'calc(100vh - 64px - 96px - 16px)',
      },
      maxWidth: {
        container: '1320px',
        heroText: '672px',
      },
      minHeight: {
        hero: '800px',
        textarea: '300px',
      },
      width: {
        'off-canvas': '300px',
      },
    },
  },
  plugins: [],
};
