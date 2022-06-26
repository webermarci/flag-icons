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
  square?: boolean;
}

const Flag = ({ code, square = false }: Props) => {
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
    <div className="col-xl-2 col-lg-3 col-md-4 col-6" id={flag.code}>
      <div className="flag">
        <div className="flag-country no-wrap" title={flag.name}>
          <span className="flag-code">{flag.code}</span>
          <span> </span>
          <span>{flag.name}</span>
        </div>
        {square ? (
          <img
            className="flag-img-sqaure"
            src={`https://flagicons.lipis.dev/${flag.flag_1x1}`}
            alt={flag.name}
          />
        ) : (
          <img
            className="flag-img"
            src={`https://flagicons.lipis.dev/${flag.flag_4x3}`}
            alt={flag.name}
          />
        )}
      </div>
    </div>
  );
};

export default Flag;
