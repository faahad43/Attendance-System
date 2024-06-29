/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        green: '#4D8B31',
        lightgreen:'#70a25d',
        darkgreen:'#427829',
        yellow: '#FFC800',
        lightYellow:'#ffda7a',
        darkYellow:'#deae00',
        white:'#ffffff',
        lightgrey:'#dedede',
        darkBlackPearl:'#1E212B',
        blackPearl:"#31343d",
        lightBlackPearl:'#595c64',
        orange:'#FF8427',
        lightOrange:'#ff9f60',
        darkOrange:'#de7220'
      },
     
    },
  },
  plugins: [],
}

