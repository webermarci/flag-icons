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
  const [isLoading, setIsLoading] = useState(true);
  const [continents, setContinents] = useState<Continent>();

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
      if (country.continent) {
        if (conts.hasOwnProperty(country.continent)) {
          conts[country.continent].push(country);
        }
        conts.All.push(country);
      }
    }
    setContinents(conts);
    setIsLoading(false);
  }, []);

  return (
    <Layout title="Capitals">
      {[
        "All",
        "Europe",
        "Asia",
        "Africa",
        "North America",
        "South America",
        "Oceania",
      ].map((name) => (
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

      {continents ? (
        <div>
          <hr />
          <Flag code={getRandomCountry(continents[continent]).code} />
          <hr />
          <div className="row">
            {continents[continent]
              .filter((country) => country.iso)
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
