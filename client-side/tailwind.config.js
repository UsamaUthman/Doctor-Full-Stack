/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '10px',
        md: "50px",
        lg: "70px",
        xl: "100px",
        '2xl': '140px',
      }
    },
    screens:{
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl':'1280px',
      '2xl':'1536px',
    },
    extend: {
      colors : {
        primaryColor: '#0067FF',
        yellowColor: '#FEB60D',
        purpleColor: '#9771FF',
        irisBlueColor: '#01B5C5',
        headingColor: '#181A1E',
        textColor: '#4E545F',

        boxShadowColor: {
          panelShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        }
      }
    },
  },
  plugins: [],
}

