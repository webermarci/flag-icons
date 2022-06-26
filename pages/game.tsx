import type { NextPage } from "next";
import Flag, { Country } from "../components/Flag";
import Layout from "../components/Layout";
import countries from "flag-icons/country.json";
import { useEffect, useState } from "react";

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

  const allCountries: Country[] = countries.filter(
    (country) => country.capital && country.continent
  );

  let continents: Continent = {
    All: [],
    "North America": [],
    "South America": [],
    Africa: [],
    Asia: [],
    Europe: [],
    Oceania: [],
  };

  for (const country of allCountries) {
    if (country.continent) {
      if (continents.hasOwnProperty(country.continent)) {
        continents[country.continent].push(country);
      }
      continents.All.push(country);
    }
  }

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
          className={`btn ${continent == name ? "btn-secondary" : "btn-primary"}`}
          onClick={() => setContinent(name)}
        >
          {name}
        </button>
      ))}
      <div>{continents[continent].length}</div>
      <Flag code={getRandomCountry(continents[continent]).code} />
      <hr />
      {continents[continent].map((country, index) => {
        return <Flag key={index} code={country.code} />;
      })}
    </Layout>
  );
};

export default Capital;
