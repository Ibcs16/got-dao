module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        got: "url('/assets/got_banner.jpg')",
        voteBtn: "url('/assets/vote_btn.png')",
        voteBtnDisabled: "url('/assets/vote_btn_disabled.png')",
      },
      screens: {
        "2xl": "1280px",
      },
    },
  },
  plugins: [],
};
