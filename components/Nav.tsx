import Link from "next/link";
import ThemeChanger from "./ThemeChanger";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 dark:bg-blue-900 p-4">
      <div className="w-full flex-grow flex items-center w-auto">
        <div className="text-sm flex-grow">
          {[
            ["Home", "/"],
            ["Game", "/game"],
          ].map(([name, url]) => (
            <Link key={url} href={url}>
              <a className="inline-block mt-0 text-blue-200 hover:text-white mr-4">
                {name}
              </a>
            </Link>
          ))}
        </div>
        <ThemeChanger />
      </div>
    </nav>
  );
};

export default Nav;
