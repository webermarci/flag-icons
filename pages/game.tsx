import countries from "flag-icons/country.json";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Flag, { Country } from "../components/Flag";
import Layout from "../components/Layout";

interface Continent {
  [name: string]: Country[];
}

const CONTINENTS = [
  "All",
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
];

const getRandomCountry = (countries: Country[]): Country => {
  const max = countries.length;
  return countries[Math.floor(Math.random() * max)];
};

const Capital: NextPage = () => {
  const [continent, setContinent] = useState("All");
  const [continents, setContinents] = useState<Continent>();
  const [country, setCountry] = useState<Country>();

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
  }, [continents, continent]);

  return (
    <Layout title="Capitals">
      {CONTINENTS.map((name) => (
        <button
          key={name}
          className={`btn ${
            continent == name ? "btn-secondary" : "btn-primary"
          }`}
          onClick={() => setContinent(name)}
        >
          {name}
        </button>
      ))}

      {continents && country? (
        <div>
          <hr />
          <Flag code={country.code} />
          <p>{continents[continent].length}</p>
          <hr />
          <div className="row">
            {continents[continent]
              .map((country, index) => {
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

export default Capital;
