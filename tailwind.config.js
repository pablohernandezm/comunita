/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        emphasis1: '#002C3F',
      },
    }
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