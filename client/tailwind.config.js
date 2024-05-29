/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}", ".public/index.html"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "303030",
      },
      colors: {
        main: "303030",
        error: "#FF0000",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            transform: "translateY(20px)",
            "-webkit-transform": "translateY(20px)",
          },
          "100%": {
            transform: "translateY(0px)",
            "-webkit-transform": "translateY(0px)",
          },
        },
        "slide-top-sm": {
          "0%": {
            transform: "translateY(4px)",
            "-webkit-transform": "translateY(4px)",
          },
          "100%": {
            transform: "translateY(0px)",
            "-webkit-transform": "translateY(0px)",
          },
        },
      },
      animation: {
        "slide-top": "slide-top 0.5s cubic-bezier(0.250,0.460,0.940) both;",
        "slide-top-sm": "slide-top-sm 0.2s linear both;",
      },
    },
  },
  plugins: [],
};
