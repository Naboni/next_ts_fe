import type { AppProps } from "next/app";

import "../styles/globals.css";
import "antd/dist/antd.css";

// components
import NavBar from "../components/navBars/NavBar";
import VisitorNavBar from "../components/navBars/visitor/VisitorNavBar";
import Footer from "../components/footer/Footer";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <VisitorNavBar />
      <Component {...pageProps} />;
      <Footer />
    </>
  );
}
export default MyApp;
