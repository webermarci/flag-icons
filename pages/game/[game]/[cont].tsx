import countries from "flag-icons/country.json";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Flag, { Country } from "../../../components/Flag";
import Layout from "../../../components/Layout";

interface Continent {
  [name: string]: Country[];
}

const CONTINENTS = [
  ["all", "All"],
  ["europe", "Europe"],
  ["asia", "Asia"],
  ["africa", "Africa"],
  ["north-america", "North America"],
  ["south-america", "South America"],
  ["oceania", "Oceania"],
];

const getRandomCountry = (countries: Country[]): Country => {
  const max = countries.length;
  return countries[Math.floor(Math.random() * max)];
};

const Game: NextPage = () => {
  const router = useRouter();
  let { game, cont } = router.query;
  const [continent, setContinent] = useState("All");
  const [continents, setContinents] = useState<Continent>();
  const [country, setCountry] = useState<Country>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let conts: Continent = {
      All: [],
      "North America": [],
      "South America": [],
      Africa: [],
      Asia: [],
      Europe: [],
      Oceania: [],
    };
    for (const country of countries) {
      if (country.continent && country.iso) {
        if (conts.hasOwnProperty(country.continent)) {
          conts[country.continent].push(country);
        }
        conts.All.push(country);
      }
    }
    setContinents(conts);
    setCountry(getRandomCountry(conts[continent]));
  }, []);

  useEffect(() => {
    if (continents) {
      setCountry(getRandomCountry(continents[continent]));
    }
  }, [continents, continent, game]);

  useEffect(() => {
    if (cont) {
      let found = false;
      for (const _cont of CONTINENTS) {
        console.log(_cont);
        if (cont === _cont[0]) {
          setContinent(_cont[1]);
          setLoading(false);
          found = true;
          break;
        }
      }
      if (!found) {
        setContinent(CONTINENTS[0][1]);
        setLoading(false);
    }
    }
  }, [cont]);

  return (
    <Layout title={game == "flags" ? "Flags" : "Capitals"}>
      <h1>{game === "flags" ? "Find the Flag" : "Find the Capital"}</h1>
      {!loading && (
        <ul className="nav nav-tabs justify-content-center">
          {CONTINENTS.map(([slug, name]) => (
            <li key={name} className="nav-item active">
              <Link href={`/game/${game}/${slug}`}>
                <a
                  href=""
                  className={`nav-link ${continent === name ? "active" : ""}`}
                >
                  {name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!loading && continents && country ? (
        <div>
          <Flag code={country.code} />
          <p>{continents[continent].length}</p>
          <hr />
          <div className="row">
            {continents[continent].map((country, index) => {
              return <Flag key={index} code={country.code} />;
            })}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </Layout>
  );
};

export default Game;
