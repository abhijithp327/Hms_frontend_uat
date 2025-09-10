/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#29317C",
        primaryRed: "#E22127",
        primary: "#2FA9DA",
        secondary: "#f5f5f5",
        background: "#ffffff",
        foreground: "#000000",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}

