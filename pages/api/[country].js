import axios from "axios";

export default async function handler(req, res) {
  const { country } = req.query;

  const response = await axios.get(`https://restcountries.com/v3.1/name/${country}
  `);

  const data = await response.data;

  let langObToArr = [];
  for (const lang in data[0].languages) {
    langObToArr.push(data[0].languages[lang]);
  }

  let langStr = langObToArr.join(", ");

  const filteredData = {
    name: data[0].name,
    nativeName: data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].common,
    flag: data[0].flags.svg,
    flagAlt: data[0].flags.alt,
    population: data[0].population.toLocaleString(),
    region: data[0].region,
    subregion: data[0].subregion,
    capital: data[0].capital.join(", "),
    tld: data[0].tld[0],
    currencies: data[0].currencies[Object.keys(data[0].currencies)[0]].name,
    languages: langStr,
  };

  let borders = null;

  if (data[0].borders && data[0].borders.length > 0) {
    const borderStr = data[0].borders.join(", ");
    const borderRes = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${borderStr}`);
    const borderData = await borderRes.data;

    borders = borderData.map((border) => {
      return {
        link: border.name.common.toLowerCase().split(" ").join("-"),
        common: border.name.common,
      };
    });
  }

  return res.status(200).json({ filteredData, borders });
}
