import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html,
    body {
        font-family: system-ui, sans-serif;
        height: 100%;
        min-height: 100%;
        min-width: 320px;
        padding: 0;
        margin:0;
    }
`;

export default GlobalStyles;
