import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card";

function Home({ data }) {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [regionDropdown, setRegionDropdown] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Select Region");

  useEffect(() => {
    let allRegions = [];

    if (data.length) {
      setCountries(data);

      data.map((country) => allRegions.push(country.region));
      setRegions([...new Set(allRegions)]);
    }
  }, [data]);

  const updateRegions = (selected) => {
    const newList = data.filter((country) => country.region === selected);
    document.querySelector(".search-countries").value = "";
    return setCountries(newList);
  };

  const updateSearch = (input) => {
    let value = input.target.value.toLowerCase();

    if (value.length > 4) {
      const newList = data.filter((country) => country.name.common.toLowerCase().includes(value));

      return setCountries(newList);
    }
    if (value.length === 0 && input.key === "Backspace") {
      return setCountries(data);
    }

    setSelectedRegion("Select Region");
  };

  return (
    <>
      <div className="container px-8 mx-auto">
        <div className="lg:flex block justify-between items-stretch">
          <div className="max-w-full shadow-md p-4 rounded flex justify-start items-stretch w-[30rem] bg-white dark:text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input className="bg-transparent search-countries leading-tight focus:outline-none w-full px-4" placeholder="Search for a country..." onKeyUp={(e) => updateSearch(e)} />
          </div>
          <div className=" lg:pt-0 pt-8 lg:max-w-full max-w-fit relative leading-tight focus:outline-none">
            <button type="button" className="flex bg-white dark:bg-slate-800 shadow-md w-full items-center justify-between rounded p-4 min-w-full gap-4" onClick={() => setRegionDropdown(!regionDropdown)}>
              <span>{selectedRegion}</span>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${regionDropdown && "hidden"} `}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${!regionDropdown && "hidden"} `}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <ul className={`z-50 absolute mt-2 w-full rounded bg-white dark:bg-slate-800 shadow-lg ${!regionDropdown && "hidden"} `}>
              {regions &&
                regions.length &&
                regions.map((region, idx) => {
                  return (
                    <li
                      className="cursor-pointer select-none p-3 hover:bg-slate-100 hover:dark:bg-slate-600"
                      key={idx}
                      onClick={() => {
                        updateRegions(region);
                        setRegionDropdown(!regionDropdown);
                        setSelectedRegion(region);
                      }}
                    >
                      {region}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="pt-12 grid grid-cols-4 gap-8 items-stretch h-100">
          {countries && countries.length ? (
            countries.map((country, idx) => {
              return <Card key={country.name.common} country={country} index={idx} />;
            })
          ) : (
            <h3 className="font-semibold text-lg">No Results Found.</h3>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const URL = `https://${process.env.VERCEL_URL}` || "http://localhost:3000";

  const res = await axios.get(`${URL}/api/all`);
  const data = await res.data;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

export default Home;
