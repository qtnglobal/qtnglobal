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
    "system-ui",
    "sans-serif"
  ],
  bodyFontFamily: ["Roboto", "Georgia", "system-ui", "serif"]
});
export default typography;
