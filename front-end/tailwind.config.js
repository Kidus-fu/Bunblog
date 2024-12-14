const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        btnColorMess: '#2e1065',
        btnColorMessHov: "#3b82f6",
        MenuColor:'rbga(1, 0, 1,0.9)'
      },
      
    },
    
  },
  plugins: [
    nextui(),
  ]
}
