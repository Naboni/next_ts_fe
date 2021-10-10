import type { AppProps } from "next/app";

import "../styles/globals.css";
import "antd/dist/antd.css";

// components
import NavBar from "../components/navBars/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />;
    </>
  );
}
export default MyApp;
