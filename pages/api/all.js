import axios from "axios";

export default async function handler(req, res) {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  const data = await response.data;

  const filteredData = data.map((country) => {
    return {
      name: country.name,
      flag: country.flags.svg,
      flagAlt: country.flags.alt,
      population: country.population,
      region: country.region,
      subregion: country.subregion,
      capital: country.capital,
      tld: country.tld,
      currencies: country.currencies,
      languages: country.languages,
      borders: country.borders,
    };
  });

  return res.status(200).json(filteredData);
}
