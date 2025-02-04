const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F7F2",
        ourLime: "#CED629",
        ourBlue: "#5567AF",
        ourPink: "#EB1763",
        ourOrange:"#F27825",
        fontBlueHome: "#4B578F",
        fontGrayHome: "#7B8B99"
      },
      fontFamily:{
        'pop':['Poppins','sans-serif']
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

