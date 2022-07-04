import countries from "flag-icons/country.json";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Country } from "../../../components/Flag";
import FlagImage from "../../../components/FlagImage";
import Layout from "../../../components/Layout";
import { setCookie, getCookie } from "cookies-next";
import { event } from "../../../lib/gtag";

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

const shuffleArray = (array: any) => {
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
  return result;
};

interface AnswerProps {
  gameType: string;
  country: Country;
}

const Answer = ({ gameType, country }: AnswerProps) => {
  return gameType === "flags" ? (
    <div>
      <strong>{country.name}</strong>
      <div style={{ width: "128px", margin: "0 auto" }}>
        <FlagImage code={country.code} />
      </div>
    </div>
  ) : (
    <div>
      <strong>{country.capital}</strong> is capital of{" "}
      <strong>{country.name}</strong>.
    </div>
  );
};

interface GameProps {
  gameType: string;
  countries: Country[];
  continent: string;
}

const GamePlay = ({
  gameType = "capitals",
  countries,
  continent,
}: GameProps) => {
  const [country, setCountry] = useState<Country>(getRandomCountry(countries));
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState<Country[]>();
  const [last, setLast] = useState<Country>();
  const [size, setSize] = useState(4);
  const [record, setRecord] = useState(0);

  const newGame = (reset: boolean) => {
    const next = getRandomCountry(countries);
    let answers = getNCountries(reset ? 4 : size, countries, next);
    answers.push(next);
    shuffleArray(answers);
    setCountry(next);
    setAnswers(answers);
  };

  useEffect(() => {
    newGame(true);
    setLast(undefined);
    setStreak(0);
  }, [countries, continent, gameType]);

  useEffect(() => {
    if (streak < 7) {
      setSize(4);
    } else if (streak < 15) {
      setSize(5);
    } else {
      setSize(6);
    }

    const keyName = `${gameType}-${continent}`;
    const stored = getCookie(keyName);
    if (stored === undefined) {
      setCookie(keyName, streak, { maxAge: 60 * 60 * 24 * 365 });
      setRecord(streak);
    } else {
      if (parseInt(stored as string) < streak) {
        setCookie(keyName, streak, { maxAge: 60 * 60 * 24 * 365 });
        setRecord(streak);
      } else {
        setRecord(parseInt(stored as string));
      }
    }
  }, [streak]);

  useEffect(() => {
    const keyName = `${gameType}-${continent}`;
    const stored = getCookie(keyName);
    if (stored === undefined) {
      setRecord(0);
    } else {
      setRecord(parseInt(stored as string));
    }
  }, [continent, gameType]);

  return (
    <div>
      {gameType === "flags" ? (
        <h2>This flag belongs to?</h2>
      ) : (
        <h2>Capital of {country.name}?</h2>
      )}

      <div style={{ width: "180px", margin: "0 auto" }}>
        <FlagImage code={country.code} />
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-7 col-lg-5 answers">
          <div className="row score">
            <div className="col-6 streak text-primary">Streak: {streak}</div>
            <div className="col-6 record text-success">Record: {record}</div>
          </div>
          {answers &&
            answers.map((cntry, index) => {
              return (
                <button
                  key={cntry.name}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (cntry.name === country.name) {
                      setStreak(streak + 1);
                      newGame(false);
                      event({
                        action: gameType,
                        category: continent,
                        label: 'win',
                        value: 1,
                      });
                    } else {
                      event({
                        action: gameType,
                        category: continent,
                        label: 'lose',
                        value: 1,
                      });
                      setStreak(0);
                      newGame(true);
                    }
                    setLast(country);
                  }}
                >
                  {gameType === "flags" ? cntry.name : cntry.capital}
                </button>
              );
            })}
          {last &&
            (streak > 0 ? (
              <div className="text-center alert alert-success" role="alert">
                <h5 className="alert-heading">Correct!</h5>
                <Answer gameType={gameType} country={last} />
              </div>
            ) : (
              <div className="text-center alert alert-danger" role="alert">
                <h5 className="alert-heading">Wrong!</h5>
                <Answer gameType={gameType} country={last} />
              </div>
            ))}
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
    <Layout
      title={game == "flags" ? `Flags: ${continent}` : `Capitals: ${continent}`}
    >
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
          <GamePlay
            gameType={game as string}
            countries={continents[continent]}
            continent={continent}
          />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </Layout>
  );
};

export default Game;
