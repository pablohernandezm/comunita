/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        emphasis1: '#002C3F',
      },
    },
    fontFamily:{
      DMSans: "DMSans"
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        "myTheme": {

          "primary": "#fb7185",

          "info": "#f3f4f6",

          "secondary": "#fb7185",

          "accent": "#ff4f00",

          "neutral": "#f3f4f6",

          "base-100": "#fff",


          "success": "#00ca00",

          "warning": "#fb7185",

          "error": "#ff96b5",
        },
      },
    ],
  },
};