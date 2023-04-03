import Card from "../components/card";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="shadow-md p-4 rounded flex justify-start items-stretch w-[30rem] bg-white dark:text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input className="bg-transparent leading-tight focus:outline-none w-full px-4" placeholder="Search for a country..." />
          </div>
          <div x-data="select" className="relative bg-white leading-tight focus:outline-none shadow-md">
            <button type="button" className="flex w-full items-center justify-between rounded p-2">
              <span x-text="(language == '') ? 'Choose language' : language"></span>
              <span className="text-2xl w-5 h-5 grid place-content-center">
                <i className="bx bx-chevron-down"></i>
              </span>
            </button>

            <ul className="hidden z-2 absolute mt-2 w-full rounded" x-show="open">
              <li className="cursor-pointer select-none p-2 ">Python</li>
              <li className="cursor-pointer select-none p-2 ">PHP</li>
              <li className="cursor-pointer select-none p-2 ">C#</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 grid grid-cols-4 gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
