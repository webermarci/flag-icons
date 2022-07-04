
export interface Country {
  capital?: string;
  code: string;
  continent?: string;
  flag_1x1: string;
  flag_4x3: string;
  iso: boolean;
  name: string;
}

export interface Continent {
  [name: string]: Country[];
}

export const CONTINENTS = [
  ["world", "World"],
  ["europe", "Europe"],
  ["asia", "Asia"],
  ["africa", "Africa"],
  ["north-america", "North America"],
  ["south-america", "South America"],
  ["oceania", "Oceania"],
];
