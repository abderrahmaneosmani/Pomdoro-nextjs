import "../styles/globals.css";
import AuthContextProvider from "../contexts/AuthContext";

import Layout from "../components/Layout/Layout";
import { CounterProvider } from "../contexts/CounterContex";
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
