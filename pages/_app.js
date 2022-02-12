import "../styles/globals.css";

import Layout from "../components/Layout/Layout";
import { CounterProvider } from "../contexts/CounterContext";
function MyApp({ Component, pageProps }) {
  return (
    <CounterProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CounterProvider>
  );
}

export default MyApp;
