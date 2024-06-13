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
        semi: "#F1613F",
        dark: "#373A40",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      transitionDelay: {
        0: "0ms",
        200: "200ms",
        500: "500ms",
        1000: "1000ms",
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
        "slide-to-left": {
          "0%": {
            "-webkit-transform": "translateX(-1000px)",
            transform: "translateX(-1000px)",
            opacity: "0",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-in-top": {
          "0%": {
            "-webkit-transform": "translateY(-1000px)",
            transform: "translateY(-1000px)",
            opacity: "0",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "slide-top": "slide-top 0.3s cubic-bezier(0.250,0.460,0.940) both",
        "slide-top-sm": "slide-top-sm 0.2s linear both",
        "slide-to-left": "slide-to-left 0.5s ease-out forwards",
        "slide-in-top":
          "slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["responsive", "hover", "focus", "group-hover"],
      transitionDelay: ["hover", "focus"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    // ...
  ],
};
