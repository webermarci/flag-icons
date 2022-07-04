import countries from "flag-icons/country.json";
import { Country } from "../lib/common";

interface Props {
  code: string;
}

const FlagImg = ({ code }: Props) => {
  let flag = null;
  const UNKOWN: Country = {
    code: "xx",
    flag_1x1: "flags/1x1/xx.svg",
    flag_4x3: "flags/4x3/xx.svg",
    iso: false,
    name: "Unknown",
  };
  for (const country of countries) {
    if (country.code == code) {
      flag = country;
      break;
    }
  }

  flag = flag || UNKOWN;
  return (
    <img
      className="flag-img"
      src={`https://flagicons.lipis.dev/${flag.flag_4x3}`}
      alt={flag.name}
    />
  );
};

export default FlagImg;
