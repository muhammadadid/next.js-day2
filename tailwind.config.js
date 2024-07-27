/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        gray: {
          "100": "#fffef9",
          "200": "#8d8d8d",
          "300": "#808080",
          "400": "#172432",
          "500": "#141b34",
        },
        whitesmoke: "#f5f6f7",
        slategray: "#767e86",
        khaki: {
          "100": "#d9ed82",
          "200": "#bfd469",
          "300": "rgba(191, 212, 105, 0.52)",
          "400": "rgba(217, 237, 130, 0.52)",
          "500": "rgba(191, 212, 105, 0.49)",
          "600": "rgba(216, 236, 129, 0.49)",
        },
        greenyellow: "#ccf32f",
        yellowgreen: {
          "100": "#b3d914",
          "200": "#aec742",
        },
        black: "#000",
        coral: "#ff7757",
        darkslateblue: "#131e46",
        midnightblue: "rgba(4, 16, 59, 0.94)",
        darkgray: {
          "100": "#adadad",
          "200": "#ababab",
        },
        maroon: "#611502",
        dodgerblue: "#4285f4",
        darkblue: "#000088",
        dark: "#222",
        darkgoldenrod: "#b87514",
        burlywood: "#ecbc76",
      },
      spacing: {},
      fontFamily: {
        rubik: "Rubik",
        "playfair-display": "'Playfair Display'",
        mulish: "Mulish",
        poppins: "Poppins",
        "dm-sans": "'DM Sans'",
      },
      borderRadius: {
        "81xl": "100px",
        "7xl": "26px",
        "21xl": "40px",
        "4xs": "9px",
        "3xs": "10px",
        "22xl-5": "41.5px",
      },
    },
    fontSize: {
      "5xl": "24px",
      lgi: "19px",
      lg: "18px",
      sm: "14px",
      "45xl": "64px",
      "32xl": "51px",
      "19xl": "38px",
      "9xl": "28px",
      "3xl": "22px",
      "13xl": "32px",
      xl: "20px",
      base: "16px",
      "21xl": "40px",
      smi: "13px",
      "36xl": "55px",
      "14xl": "33px",
      "25xl": "44px",
      inherit: "inherit",
    },
    screens: {
      mq1750 : {
        raw: "screen and (max-width: 1750px)",
      },
      mq1350: {
        raw: "screen and (max-width: 1350px)",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq800: {
        raw: "screen and (max-width: 800px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
      mq375: {
        raw: "screen and (max-width: 375px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};