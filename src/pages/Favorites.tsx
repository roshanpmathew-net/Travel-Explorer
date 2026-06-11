import { useEffect, useState } from "react";
import CountryCard from "@/ui-components/Country_Card";
import { getCountryDetails, type Country } from "@/services/CountryDet";
import CountryData from '../data/CountryDetails.json'

import { Grid2x2, List } from "lucide-react";
import CountryList from "@/ui-components/Country_List";
import { toast } from "react-toastify";
import Loader from "@/ui-components/Loader";

const Favorites = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [view, setView] = useState("grid");

  useEffect(() => {
    const fetchFavs = async () => {
      const stored = localStorage.getItem("favs");

      if (!stored) return;

      const favCodes: string[] = JSON.parse(stored);
      console.log(favCodes)

      try {
        throw console.error();
        
        const data = await Promise.all(
          favCodes.map((code) => getCountryDetails(code)),
        );
        setCountries(data);
      } catch (error) {
        console.error("Error fetching favorites details:", error);
        toast.warning('Loading Backup...')
        const backup = favCodes
          .map((code) => {
            const item = (CountryData as any)[code.toUpperCase()];
            if (!item) return null;
            return {
              name: item.names?.common ?? "N/A",
              capital: item.capitals?.[0]?.name ?? "N/A",
              population: item.population ?? 0,
              continent: item.continents?.[0] ?? "N/A",
              code: item.codes?.alpha_3 ?? "N/A",
              languages:
                item.languages?.map((lang: any) => lang.name).join(", ") ??
                "N/A",
              flag: item.flag?.url_png || item.flag?.url_svg || "",
            };
          })
          .filter((country): country is Country => country !== null);
        setCountries(backup);
      }
    };

    fetchFavs();
  }, []);

  const handleRemoveFavourite = (countryName: string) => {
    setCountries((prev) =>
      prev.filter((country) => country.name !== countryName),
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Favorites
          </h1>
          <p className="text-gray-500 mt-1">
            {countries.length} saved destinations
          </p>
        </div>

        <div className="flex gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              view === "grid"
                ? "bg-white dark:bg-slate-700 shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            <Grid2x2 size={18} />
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg cursor-pointer transition-all ${
              view === "list"
                ? "bg-white dark:bg-slate-700 shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>



      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {countries.length > 0 ? (
            countries.map((country) => (
              <CountryCard
                key={country.name}
                item={country}
                onRemove={handleRemoveFavourite}
              />
            ))
          ) : (
            <Loader/>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
          {countries.length > 0 ? (
            <>
              <div className="grid grid-cols-[120px_2fr_140px_140px_300px_60px] gap-6 px-5 py-4 border-b border-gray-200 dark:border-slate-800 text-sm font-semibold text-gray-500">
                <div>Flag</div>
                <div>Country</div>
                <div>Capital</div>
                <div>Population</div>
                <div>Language</div>
                <div></div>
              </div>

              {countries.map((country) => (
                <CountryList
                  key={country.name}
                  item={country}
                  onRemove={handleRemoveFavourite}
                />
              ))}
            </>
          ) : (
            <Loader/>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
