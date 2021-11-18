import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";

import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";

import "../styles/globals.css";
import "antd/dist/antd.css";

// components
import VisitorNavBar from "../components/navBars/visitor/VisitorNavBar";
import Footer from "../components/footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      {/* <Provider> allows instances of useSession() to share the session object across components, by using React Context under the hood */}
      {/* This improves performance, reduces network calls and avoids page flicker when rendering */}
      <Provider session={pageProps.session}>
        {!router.pathname.startsWith("/auth/") && <VisitorNavBar />}
        <Component {...pageProps} />;
        <Footer />
      </Provider>
    </>
  );
}
export default MyApp;
