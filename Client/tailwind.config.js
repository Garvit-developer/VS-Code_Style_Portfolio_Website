// module.exports = {
//   purge: ['./components//*.{js,ts,jsx,tsx}', './pages//*.{js,ts,jsx,tsx}', './Components//*.{js,ts,jsx,tsx}'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}", // if you have a capitalized folder
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // for Next.js app directory (optional)
    "./src/**/*.{js,ts,jsx,tsx,mdx}",        // for src-based setups
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // custom blue
        secondary: "#1e293b", // dark gray-blue
        accent: "#f59e0b",    // amber accent
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
