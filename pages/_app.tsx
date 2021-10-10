import type { AppProps } from "next/app";

import "../styles/globals.css";
import "antd/dist/antd.css";

// components
import NavBar from "../components/navBars/NavBar";
import Footer from "../components/footer/Footer";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />;
      <Footer />
    </>
  );
}
export default MyApp;
