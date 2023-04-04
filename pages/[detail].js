import Link from "next/link";
import Image from "next/image";

const Detail = ({ country, borders }) => {
  console.log({ country, borders });

  const { name, flags, population, region, subregion, capital, tld, currencies, languages } = country;

  const currencyDrill = currencies[Object.keys(currencies)[0]].name;

  let langObToArr = [];
  for (const lang in languages) {
    langObToArr.push(languages[lang]);
  }

  let langStr = langObToArr.join(", ");

  console.log(langStr);

  return (
    <div className="container mx-auto">
      <div className="py-8">
        <Link href={"/"} className="py-2 px-8 rounded shadow-md bg-white dark:bg-slate-800 flex justify-between items-center gap-4 max-w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>

          <span>Back</span>
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-4 items-center">
        <div className="col-span-3">
          <Image src={flags.png} width={700} height={600} style={{ objectFit: "contain" }} alt={`The flag of ${name.official}`} priority />
        </div>
        <div className="col-span-2">
          <h2 className="font-bold text-3xl">{country.name.common}</h2>

          <div className="grid grid-cols-2 justify-between gap-4 items-start pt-8 pb-12">
            <div className="flex flex-col gap-4">
              <p className="font-semibold">
                Native Name: <span className="font-light">{}</span>
              </p>
              <p className="font-semibold">
                Population: <span className="font-light">{population.toLocaleString()}</span>
              </p>
              <p className="font-semibold">
                Region: <span className="font-light">{region}</span>
              </p>
              <p className="font-semibold">
                Sub Region: <span className="font-light">{subregion}</span>
              </p>
              <p className="font-semibold">
                Capital: <span className="font-light">{capital}</span>
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-semibold">
                Top Level Domain: <span className="font-light">{tld}</span>
              </p>
              <p className="font-semibold">
                Currencies: <span className="font-light">{currencyDrill}</span>
              </p>
              <p className="font-semibold">
                Languages: <span className="font-light">{langStr}</span>
              </p>
            </div>
          </div>

          {borders && borders.length ? (
            <div className="flex justify-start items-center gap-2 flex-wrap">
              <p className="semi-bold pe-2">Border Countries:</p>
              {borders.map((border, idx) => {
                return (
                  <Link
                    key={idx}
                    className="py-2 px-6 rounded shadow-sm bg-white dark:bg-slate-800"
                    href={{
                      pathname: "/[slug]",
                      query: {
                        slug: border.link,
                        official: border.official,
                      },
                    }}
                  >
                    {border.common}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Detail;

export async function getServerSideProps(context) {
  //   console.log(context.query.official);
  const official = context.query.official;

  const res = await fetch(`https://restcountries.com/v3.1/name/${official}?fullText=true
      `);
  const data = await res.json();

  const country = data[0];

  const borderingNations = country.borders?.join(",") || false;

  let borders = [];

  if (borderingNations) {
    const borderRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderingNations}`);
    const borderData = await borderRes.json();

    borders = borderData.map((border) => {
      return {
        link: border.name.common.toLowerCase().split(" ").join("-"),
        official: border.name.official,
        common: border.name.common,
      };
    });
  }

  return {
    props: { country, borders },
  };
}
