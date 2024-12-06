import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-drop': '4px 4px 10px rgba(0, 0, 0, 0.25)', // Customize values here
      },
      screens: {
        'sm-custom': '425px', // Define a custom screen size breakpoint
        'sm-middle':'375px',
        'sm-small':"320px",
      },
      spacing: {
        '403': '403px',
        '108': '108px',
        '194':'194px',
        '505':'505px',
        '155':'155px',
        '300':"300px",
        '330':"330px",
        '310':"310px",
        '350':"350px",
        '355':"355px",
        '360':"360px",
        '365':"365px",
        '380':"380px",
      },
      fontFamily: {
        primary: ['var(--font-sora)', 'sans-serif'],
        secondary: ['var(--font-inter)', 'sans-serif'],
        tertiary: ['var(--font-playfair)', 'serif'],
        oregano: ['Oregano', 'sans-serif'], // Add Oregano directly
      },
      fontSize: {
        'btn':'16px',
        'ab': '32.02px',   
        'header': '44.02px',
        'para': '21.35px', 
        'future':'40px',
        'book':'15.2px',
        'heading':'13.64px',
        'card': '8px' ,
        'hawk':'28px',
        'testHeading':'41.57px',
        'gallery':'120px',
        'testStyle':'55.42px', 
      },
      colors: {
        mainColor:"#040313",
        textColor: "#FCFCFA",
        bgColor: "#050715",
        paraColor:'#B3C2CB',
       innovaColor:"#D7D7D7",
       btnColor:"#0F151F",
       contactColor:"#D0DAF5",
       formBtnColor:"#030713",
       secondBtnColor:"#4D6043",
       cardColor:"#0F151F",
       boost:"#B3C2CB",
       techColor:"#030204",
       coursesColor:"#B4B3B3",
       courseCardColor:"#0F151F",
       testimonial:"#0F151F",
       testiColor:"#B3C2CB",
       galleryColor:"#BFBFBF",
       landingColor:"#FFD700",
       disBtnColor:"#A8A3A3",
       courseBtnColor:"#E346EB",
       arrowBtnColor:"#7B68EE",
       dotColor:"#535078",
       finalEventColor:"#030713",
      },
    },
    
  },
  plugins: [],
};
export default config;

