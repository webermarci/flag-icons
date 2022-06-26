import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      {[
        ["Home", "/"],
        ["Game", "/game"],
      ].map(([name, url]) => (
        <Link key={url} href={url}>
          <a className="btn btn-info">{name}</a>
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
