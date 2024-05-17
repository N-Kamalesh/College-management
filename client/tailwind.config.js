/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        ball: "url(/images/auth-bg.jpg)",
        blue: "url(/images/register-bg.jpg)",
        circ: "url(/images/circle.jpg)",
      },
      fontFamily: {
        cursive: ["Kalam", "cursive"],
      },
      keyframes: {
        "open-menu": {
          "0%": { transform: "scaleY(0)" },
          "80%": { transform: "scaleY(1.2)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "open-menu": "open-menu 0.5s ease-in-out forwards",
      },
      boxShadow: {
        "3xl": "20px 20px 60px  rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
