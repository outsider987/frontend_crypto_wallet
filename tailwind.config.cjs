module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {},
      spacing: {},
      maxWidth: {},
      screens: {},
      fontFamily: {},
      keyframes: {
        fade_in: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        menu_collpase_on: {
          "0%": { height: "0vh", opacity: 0 },
          "100%": { height: "50vh", opacity: 100 },
        },
        menu_collpase_off: {
          "0%": { height: "50vh", opacity: 100 },
          "100%": { height: "0vh", opacity: 0 },
        },
        pop: {
          "0%": { marginBottom: "15vh", opacity: 0 },
          "100%": { marginBottom: "0vh", opacity: 100 },
        },
      },
      animation: {
        menu_collpase_on: "menu_collpase_on 0.5s ease-in ",
        menu_collpase_off: "menu_collpase_off 0.5s ease-in ",
        fade_in: "fade_in 0.2s ease-in ",
        pop: "pop 0.2s ease-in",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
