import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const { game, cont } = router.query;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-md">
        <Link href="/">
          <a className="navbar-brand" href="#">
            Flag Icons
          </a>
        </Link>
        <ul className="navbar-nav">
          {[
            ["Answers", `/answers/${cont}`],
            ["Capitals", `/game/capitlals/${cont}`],
            ["Flags", `/game/flags/${cont}`],
          ].map(([name, url]) => (
            <li
              key={url}
              className={`nav-item ${
                name.toLowerCase() === game ? "active" : ""
              }`}
            >
              <Link href={url}>
                <a className="nav-link">{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
