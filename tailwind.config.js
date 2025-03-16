import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: ['business', 'autumn'],
  },
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
