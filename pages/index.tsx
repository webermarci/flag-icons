import type { NextPage } from "next";
import Flag from "../components/Flag";
import Layout from "../components/Layout";
import countries from "flag-icons/country.json";
import { useState } from "react";

const Home: NextPage = () => {
  const [square, setSquare] = useState(false);
  return (
    <Layout title="Free Country Flags in SVG" index>
      <div className="switch">
        {square ? (
          <button
            id="click-4x3"
            className="btn btn-secondary"
            onClick={() => setSquare(false)}
          >
            4x3
          </button>
        ) : (
          <button
            id="click-1x1"
            className="btn btn-secondary"
            onClick={() => setSquare(true)}
          >
            1x1
          </button>
        )}
      </div>

      <h2>ISO 3166-1-alpha-2 Flags</h2>
      <div className="row">
        {countries
          .filter((country) => country.iso)
          .map((country, index) => {
            return <Flag key={index} code={country.code} square={square} />;
          })}
      </div>
      <h2>Other Flags</h2>
      <div className="row">
        {countries
          .filter((country) => !country.iso)
          .map((country, index) => {
            return <Flag key={index} code={country.code} square={square} />;
          })}
      </div>
    </Layout>
  );
};

export default Home;
