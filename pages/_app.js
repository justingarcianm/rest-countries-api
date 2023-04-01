import Layout from "../components/layout";
import GlobalStyles from "../styled/global";
import { ThemeProvider as StyledComponentTheme } from "styled-components";

import React, { useState } from "react";
import { light, dark } from "../styled/theme";

function MyApp({ Component, pageProps }) {
  const [themeSelected, setThemeSelected] = useState(light);

  const themeToggle = (theme) => setThemeSelected(theme === "light-theme" ? dark : light);

  return (
    <StyledComponentTheme theme={themeSelected}>
      <Layout themeOptions={{ themeToggle, themeSelected }}>
        <GlobalStyles />
        <Component {...pageProps} />
      </Layout>
    </StyledComponentTheme>
  );
}

export default MyApp;
