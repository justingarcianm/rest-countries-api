import Layout from "../components/layout";
import GlobalStyles from "../styled/global";
import { ThemeProvider } from "styled-components";
import { dark, light } from "../styled/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={light}>
      <Layout>
        <GlobalStyles />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
