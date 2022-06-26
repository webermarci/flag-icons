import Head from "next/head";
import Header from "./Header";
import Nav from "./Nav";

interface Props {
  title?: string;
  index?: boolean;
  children: React.ReactNode;
}

const Layout = ({ title, index, children }: Props) => {
  title = title ? `${title} | flag-icons` : "flag-icons";
  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {index ? <Header /> : <Nav />}
      <div className="container-md">{children}</div>
      <footer className="text-center text-gray-600 bg-blue-200 dark:bg-blue-800 dark:text-gray-200 p-4">
        <span>Made with love by Less is More</span>
      </footer>
    </main>
  );
};

export default Layout;
