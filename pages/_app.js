import Layout from "../components/layout";
import GlobalStyles from "../styled/global";
import { ThemeProvider as StyledComponentTheme } from "styled-components";

import React, { useState, useEffect } from "react";
import { light, dark } from "../styled/theme";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(undefined);
  const [mounted, setMounted] = useState(false);

  const themeToggler = (themeColor) => setTheme(themeColor);

  useEffect(() => {
    const initialColorValue = document.body.style.getPropertyValue("--initial-color-mode");

    setTheme(initialColorValue === "dark");

    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <StyledComponentTheme theme={theme ? dark : light}>
        <Layout theme={theme} themeToggler={themeToggler}>
          <GlobalStyles />
          <Component {...pageProps} />
        </Layout>
      </StyledComponentTheme>
    );
  }
}

export default MyApp;
