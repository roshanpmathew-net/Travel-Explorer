/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { getAllCountries, type Country } from "@/services/CountryDet";
import CountryCard from "@/ui-components/ExplorePage/Country_Card";
import data from "../data/Countries.json";
import { toast } from "react-toastify";

import { Grid2x2, List } from "lucide-react";
import CountryList from "@/ui-components/ExplorePage/Country_List";
import Loader from "@/ui-components/Common/Loader";
import FilterBox from "@/ui-components/ExplorePage/FilterBox";
import CustomButton from "@/ui-components/Common/customButton";

export type Filters = {
  region: string;
  selectedLangs: string[];
  population: number[];
  sortBy: string;
};

const Explore = () => {
  const [countries, setCountry] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    region: "",
    selectedLangs: [],
    population: [1000],
    sortBy: "",
  });

  const [view, setView] = useState<"grid" | "list">("grid");

  const [currentPage, setCurrentPage] = useState(1);
  const [length, setLength] = useState(0);

  const handleFilterChange = <K extends keyof Filters>(
    key: K,
    value: Filters[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClear = () => {
    setFilters({
      region: "",
      selectedLangs: [],
      population: [1000],
      sortBy: "",
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.region,
    filters.selectedLangs,
    filters.population,
    filters.sortBy,
  ]);

  const CardsPerpage = 12;

  const lastInd = currentPage * CardsPerpage;
  const firstInd = lastInd - CardsPerpage;

  console.log("First Index: ", firstInd);
  console.log("Last Index: ", lastInd);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const selRegion = !filters.region || country.continent === filters.region;

      const selPopulation = country.population >= filters.population[0];

      const selLangs =
        filters.selectedLangs.length === 0 ||
        filters.selectedLangs.some((lang) => {
          return country.languages?.includes(lang);
        });

      return selRegion && selPopulation && selLangs;
    });
  }, [countries, filters.region, filters.selectedLangs, filters.population]);

  console.log("Filtered: ", filteredCountries);

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    switch (filters.sortBy) {
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

  console.log("Sorted: ", sortedCountries);

  const currentCountries = sortedCountries.slice(firstInd, lastInd);

  const totalPages = Math.ceil(sortedCountries.length / CardsPerpage);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        throw console.error();

        const data = await getAllCountries();

        const MainCountries = data.filter((country) => country.code?.trim());

        setLength(MainCountries.length);
        setCountry(MainCountries);
        setLoading(false);
      } catch (e) {
        console.error(e);
        console.log("Falling to backup..");
        toast.warning("Loading Backup...");

        setCountry(data);
        setLength(data.length);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="flex flex-row gap-2 mt-14 px-11">
      <FilterBox
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClear}
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
              <CustomButton
                active={view === "grid"}
                onClick={() => setView("grid")}
              >
                <Grid2x2 size={18} />
              </CustomButton>

              <CustomButton
                active={view === "list"}
                onClick={() => setView("list")}
              >
                <List size={18} />
              </CustomButton>
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
            <div className="flex flex-col gap-3 mt-5 ">
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
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-2xl bg-blue-600 text-white  disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
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
