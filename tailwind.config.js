/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background:{
          100:'#ECECEC',
          200:'#d6d6d7'
        },
        headerFontColor:{
          100:'#132050'
        },
        iphoneBlue:{
          100:'#007aff'
        }
      },

      boxShadow: {
        'formInput': 'inset 0px 2px 3px rgba(0, 0, 0, 0.5)',
      },


    },
  },
  plugins: [],
}

