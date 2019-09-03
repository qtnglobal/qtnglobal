import Typography from "typography";
const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  googleFonts: [
    {
      name: "Roboto",
      styles: ["700"]
    },
    {
      name: "Open Sans",
      styles: ["400", "400i", "700", "700i"]
    }
  ],
  headerFontFamily: [
    "Roboto",
    "Avenir Next",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif"
  ],
  bodyFontFamily: ["Roboto", "Georgia", "serif"]
});
export default typography;
