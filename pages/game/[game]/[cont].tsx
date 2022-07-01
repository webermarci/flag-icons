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
  ["world", "World"],
  ["europe", "Europe"],
  ["asia", "Asia"],
  ["africa", "Africa"],
  ["north-america", "North America"],
  ["south-america", "South America"],
  ["oceania", "Oceania"],
];

const shuffleArray = (array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getRandomCountry = (countries: Country[]): Country => {
  const max = countries.length;
  return countries[Math.floor(Math.random() * max)];
};

const getNCountries = (
  size: number,
  countries: Country[],
  ignore: Country
): Country[] => {
  let result: Country[] = [];
  while (true) {
    let country = getRandomCountry(countries);
    if (country === ignore || result.includes(country)) {
      continue;
    }
    result.push(country);
    if (result.length === size) {
      break;
    }
  }
  console.log(result);
  return result;
};

interface GameProps {
  countries: Country[];
  continent: string;
}

const CapitalGame = ({ countries, continent }: GameProps) => {
  const [country, setCountry] = useState<Country>(getRandomCountry(countries));
  const [strike, setStrike] = useState(0);
  const [answers, setAnswers] = useState<Country[]>();
  const [last, setLast] = useState<Country>();

  const newGame = () => {
    const next = getRandomCountry(countries);
    let answers = getNCountries(4, countries, next);
    answers.push(next);
    shuffleArray(answers);
    setCountry(next);
    setAnswers(answers);
  };

  useEffect(() => {
    newGame();
    setLast(undefined);
    setStrike(0);
  }, [countries, continent]);

  return (
    <div>
      <h2>Capital of {country.name}?</h2>

      <div className="row justify-content-center">
        <div className="col-5 answers">
          {answers &&
            answers.map((count, index) => {
              return (
                <button
                  key={count.name}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (count.name === country.name) {
                      setStrike(strike + 1);
                    } else {
                      setStrike(0);
                    }
                    setLast(country);
                    newGame();
                  }}
                >
                  {count.capital}
                </button>

              );
            })}
          {last && (strike > 0 ? "correct" : "wrong")}
          {last && (
            <div>
              {last.name} {last.capital}
            </div>
          )}
          <h3>Strike: {strike}</h3>
        </div>
      </div>
    </div>
  );
};

const Game: NextPage = () => {
  const router = useRouter();
  let { game, cont } = router.query;
  const [continent, setContinent] = useState(CONTINENTS[0][1]);
  const [continents, setContinents] = useState<Continent>();
  const [country, setCountry] = useState<Country>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let conts: Continent = {
      World: [],
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
        conts.World.push(country);
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
          {game === "flags" ? (
            <p></p>
          ) : (
            <CapitalGame
              countries={continents[continent]}
              continent={continent}
            />
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </Layout>
  );
};

export default Game;
