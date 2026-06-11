import { useEffect, useMemo, useState } from "react";
import { getAllCountries, type Country } from "@/services/CountryDet";
import CountryCard from "@/ui-components/Country_Card";
import data from "../data/Countries.json"
import { toast } from "react-toastify";

import { Grid2x2, List } from "lucide-react";
import CountryList from "@/ui-components/Country_List";
import Loader from "@/ui-components/Loader";
import FilterBox from "@/ui-components/FilterBox";

const Explore = () => {
  const [countries, setCountry] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  const [region, setRegion] = useState("");
  const [selectedLangs, setLangs] = useState<string[]>([]);
  const [value, setValue] = useState([1000]);
  const [sortBy, setSortBy] = useState("");

  const [view, setView] = useState("grid");

  const [currentPage, setPage] = useState(1);
  const [length, setLength] = useState(0);

  const CardsPerpage = 12;

  const lastInd = currentPage * CardsPerpage;
  const firstInd = lastInd - CardsPerpage;

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const selRegion = !region || country.continent === region;

      const selPopulation = country.population >= value[0];

      const selLangs =
        selectedLangs.length === 0 ||
        selectedLangs.some((lang) => {
          return country.languages?.includes(lang);
        });

      return selRegion && selPopulation && selLangs;
    });
  }, [countries, region, selectedLangs, value]);

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);

      case "name-desc":
        return b.name.localeCompare(a.name);

      case "population-asc":
        return a.population - b.population;

      case "population-desc":
        return b.population - a.population;

      default:
        return 0;
    }
  });

  const currentCountries = sortedCountries.slice(firstInd, lastInd);

  const totalPages = Math.ceil(filteredCountries.length / CardsPerpage);

  useEffect(() => {
  const fetchCountries = async () => {
    try {
      throw console.error();
      
      const data = await getAllCountries();

      const MainCountries = data.filter(
        (country) => country.code?.trim()
      );

      setLength(MainCountries.length);
      setCountry(MainCountries);
      setLoading(false);
    } catch (e) {
      console.error(e);
      console.log('Falling to backup..')
      toast.warning('Loading Backup...')
      
      setCountry(data)
      setLength(data.length)
      setLoading(false);


    }
  };

  fetchCountries();
}, []);

  return (
    <div className="flex flex-row gap-2 mt-14 px-11">
      <FilterBox
        region={region}
        setRegion={setRegion}
        selectedLangs={selectedLangs}
        setLangs={setLangs}
        value={value}
        setValue={setValue}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {loading ? (
        <div className="flex w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col w-full px-10  gap-5">
          <div className="flex flex-row justify-between text-center">
            <p className="text-2xl font-bold">Explore {length} Countries</p>
            <div className="flex flex-row gap-3 text-center">
              <button
                className={`cursor-pointer p-2 rounded-2xl transition-colors
    ${
      view === "grid"
        ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-800"
    }`}
                onClick={() => setView("grid")}
              >
                <Grid2x2 />
              </button>

              <button
                className={`cursor-pointer p-2 rounded-2xl transition-colors
    ${
      view === "list"
        ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-800"
    }`}
                onClick={() => setView("list")}
              >
                <List />
              </button>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
              {currentCountries.length > 0 ? (
                currentCountries.map((country) => (
                  <CountryCard key={country.name} item={country} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No Results Found
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-5">
              {currentCountries.length > 0 ? (
                <>
                  <div className="grid grid-cols-[120px_2fr_140px_140px_300px_60px] gap-6 px-5 py-3 text-gray-500 font-medium">
                    <div>Flag</div>
                    <div>Country</div>
                    <div>Capital</div>
                    <div>Population</div>
                    <div>Language</div>
                    <div></div>
                  </div>

                  {currentCountries.map((country) => (
                    <CountryList key={country.name} item={country} />
                  ))}
                </>
              ) : (
                <div className="text-center text-gray-500 py-10">
                  No Results Found
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mt-8 mb-10">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-2xl bg-blue-600 text-white  disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-2xl bg-blue-600 text-white  disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
