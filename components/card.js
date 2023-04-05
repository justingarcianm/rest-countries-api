import Image from "next/image";
import Link from "next/link";
import Router from "next/router";

const Card = ({ country, index }) => {
  const { flag, flagAlt, region, name, population, capital } = country;
  const link = name.common.toLowerCase().split(" ").join("-");

  return (
    <Link href={{ pathname: `/${link}`, query: { official: name.official } }} as={`/${link}`} className="block col-span-4 md:col-span-2 lg:col-span-1 ">
      <div className="shadow-md rounded dark:bg-slate-800 min-h-full">
        <div className="relative">
          <Image alt={flagAlt || `The flag of ${name.official}`} src={flag} width={600} height={300} priority={index < 9 ? true : false} />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold pb-4">{name.common}</h3>
          <p>
            Population: <span className="font-light">{population.toLocaleString()}</span>
          </p>
          <p>
            Region: <span className="font-light">{region}</span>
          </p>
          <p>
            Capital: <span className="font-light">{capital}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
