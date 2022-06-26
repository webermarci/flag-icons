import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
