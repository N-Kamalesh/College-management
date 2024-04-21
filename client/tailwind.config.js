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
    },
  },
  plugins: [],
};
