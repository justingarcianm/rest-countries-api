import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import "../styles/global.css";

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider attribute="class">
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
