import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";

import "../styles/globals.css";
import "antd/dist/antd.css";

// components
import VisitorNavBar from "../components/navBars/visitor/VisitorNavBar";
import Footer from "../components/footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Provider> allows instances of useSession() to share the session object across components, by using React Context under the hood */}
      {/* This improves performance, reduces network calls and avoids page flicker when rendering */}
      <Provider session={pageProps.session}>
        <VisitorNavBar />
        <Component {...pageProps} />;
        <Footer />
      </Provider>
    </>
  );
}
export default MyApp;
