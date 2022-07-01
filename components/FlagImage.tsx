import countries from "flag-icons/country.json";

export interface Country {
  capital?: string;
  code: string;
  continent?: string;
  flag_1x1: string;
  flag_4x3: string;
  iso: boolean;
  name: string;
}

interface Props {
  code: string;
}

const FlagImage = ({ code }: Props) => {
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
    <div className="flag">
      <img
        className="flag-img"
        src={`https://flagicons.lipis.dev/${flag.flag_4x3}`}
        alt={flag.name}
      />
    </div>
  );
};

export default FlagImage;
