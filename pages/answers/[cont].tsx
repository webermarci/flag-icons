import countries from "flag-icons/country.json";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FlagImg from "../../components/FlagImg";
import Layout from "../../components/Layout";
import { Continent, CONTINENTS } from "../../lib/common";

const Answers: NextPage = () => {
  const router = useRouter();
  let { cont } = router.query;
  const [continent, setContinent] = useState(CONTINENTS[0][1]);
  const [continents, setContinents] = useState<Continent>();
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
  }, []);

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
    <Layout title={"Answers"}>
      <h1>Countries</h1>
      {!loading && (
        <ul className="nav nav-tabs justify-content-center">
          {CONTINENTS.map(([slug, name]) => (
            <li key={name} className="nav-item active">
              <Link href={`/answers/${slug}`}>
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
      {!loading && continents ? (
        <table className="table answers table-bordered table-hover">
          <thead>
            <tr>
              <th className="col-1">#</th>
              <th className="col-1">Flag</th>
              <th className="col-4">Country</th>
              <th className="col-4">Capital</th>
              <th className="col-2">Continent</th>
            </tr>
          </thead>
          <tbody>
            {continents[continent].map((country, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td className="flag-col">
                    <FlagImg code={country.code} />
                  </td>
                  <td>{country.name}</td>
                  <td>{country.capital}</td>
                  <td>{country.continent}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>Loading</div>
      )}
    </Layout>
  );
};

export default Answers;
