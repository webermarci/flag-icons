import Link from "next/link";
import ThemeChanger from "./ThemeChanger";

const Header = () => {
  return (
    <div className="header">
      <div className="container-md">
        <h1>Free Country Flags in SVG</h1>
        <p className="lead">
          A curated collection of all country flags in SVG — plus the CSS for
          easier integration.
        </p>
        <p className="lead">
          All flags are in <strong>4x3</strong> and <strong>1x1</strong> formats
          only.
        </p>
        <pre className="install">yarn add flag-icons</pre>
        <p>For more instructions check out on GitHub.</p>
        <p>
          <a
            className="btn btn-light"
            href="https://github.com/lipis/flag-icons"
          >
            <i className="bi bi-github"></i> View on GitHub
          </a>
          <a
            className="btn btn-light"
            href="https://github.com/lipis/flag-icons/archive/main.zip"
          >
            <i className="bi bi-download"></i> Download Flags
          </a>
        </p>
        <p>
          <Link href="/game/capitals/all">
            <a className="btn btn-lg btn-light">
              <i className="bi bi-controller"></i> Play the game
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Header;
