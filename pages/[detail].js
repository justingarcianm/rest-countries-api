import Link from "next/link";
import Image from "next/image";

const Detail = ({ data: { filteredData, borders } }) => {
  const { name, nativeName, flag, flagAlt, population, region, subregion, capital, tld, currencies, languages } = filteredData;

  return (
    <div className="container mx-auto px-8 ">
      <div className="py-8">
        <Link href={"/"} className="py-2 px-8 rounded shadow-md bg-white dark:bg-slate-800 flex justify-between items-center gap-4 max-w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>

          <span>Back</span>
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-4 items-center">
        <div className="lg:col-span-3 col-span-5">
          <Image src={flag} width={700} height={600} style={{ objectFit: "contain" }} alt={flagAlt || `The flag of ${name.official}`} priority />
        </div>
        <div className="lg:col-span-2 col-span-5 ">
          <h2 className="font-bold text-3xl">{name.common}</h2>

          <div className="grid grid-cols-2 justify-between gap-4 items-start pt-8 pb-12">
            <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
              <p className="font-semibold">
                Native Name: <span className="font-light">{nativeName}</span>
              </p>
              <p className="font-semibold">
                Population: <span className="font-light">{population}</span>
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
            <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
              <p className="font-semibold">
                Top Level Domain: <span className="font-light">{tld}</span>
              </p>
              <p className="font-semibold">
                Currencies: <span className="font-light">{currencies}</span>
              </p>
              <p className="font-semibold">
                Languages: <span className="font-light">{languages}</span>
              </p>
            </div>
          </div>

          {borders && borders.length ? (
            <div className="flex justify-start items-center gap-2 flex-wrap">
              <p className="font-semibold pe-2 min-w-full lg:min-w-fit">Border Countries:</p>
              {borders.map((border, idx) => {
                return (
                  <Link key={idx} className="py-1 px-6 rounded shadow-sm bg-white dark:bg-slate-800" href={`/${border.link}`}>
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
  const detail = context.query.detail;
  const detailSplit = detail.split("-");
  const detailRejoined = detailSplit.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");

  const res = await fetch(`http://localhost:3000/api/${detailRejoined}`);

  const data = await res.json();

  return {
    props: { data },
  };
}
