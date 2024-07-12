/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        header: "url('/bg.jpg')",
      },
    },
  },
  plugins: [],
};
