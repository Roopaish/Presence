/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6C6DC0",
          50: "#ededf7",
          100: "##c9cae8",
          200: "#a6a6d9",
          300: "#8283c9",
          400: "#5e5fba",
          500: "#4546a1",
          600: "#36367d",
          700: "#262759",
          800: "#171736",
          900: "#080812",
        },
      },
    },
  },
  plugins: [],
};
