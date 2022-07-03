import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
