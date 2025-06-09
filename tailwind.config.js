/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        title: "var(--title)",
        background: "var(--background)",
        navBackground: "var(--navBackground)",
        iconColor: "var(--iconColor)",
        iconColorFocused: "var(--iconColorFocused)",
        uiBackground: "var(--uiBackground)",
        primary: "var(--primary)",
        warning: "var(--warning)",
      },
    },
  },
  plugins: [],
};
