import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";

import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";

import "../styles/globals.css";
import "antd/dist/antd.css";

// components
import VisitorNavBar from "../components/navBars/visitor/VisitorNavBar";
import AppFooter from "@/components/footer/Footer";
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

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
      <Provider session={pageProps.session}>
        <Layout className="mainLayout">
          <Header>
            {!router.pathname.startsWith("/auth/") && <VisitorNavBar />}
          </Header>
          <Content>
            <Component {...pageProps} />
          </Content>
          <Footer>
            {!router.pathname.startsWith("/auth/") && <AppFooter />}
          </Footer>
        </Layout>
      </Provider>
    </>
  );
}
export default MyApp;
