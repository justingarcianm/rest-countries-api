import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    ::root {

    }

    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Nunito', sans-serif;
        overflow-x: hidden;
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
    }
`;
export default GlobalStyles;
