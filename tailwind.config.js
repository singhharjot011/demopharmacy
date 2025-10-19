/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,css,js}"],
  // safelist: ["hover"],
  theme: {
    extend: {
      colors: {
        primary: "#8372A6",
        light: "#E5D4D0",
        darkButton: "#A68C86",
        // darkText: "#553159",
        darkText: "#663366",
        lightGreen: "#B7DBD0",
        lightYellow: "#FAE17D",
        darkGreen: "#1E624D",
        pinkishWhite: "#F9F0FE",
        blackAlternate: "#101722",
        lightViolet: "#BEC7E6",
        violet: "#6D5BE6",
        pinkAlternate: "#E93E68",
        whiteAlternate: "#FDFCFD",
      },
      keyframes: {
        bounceWithTranslate: {
          "0%": { transform: "translateY(-200%)" },
          "50%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(-20%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        bounceWithTranslate: "bounceWithTranslate 1s ease-in forwards",
      },
      
    },
  },
  plugins: [],
};
