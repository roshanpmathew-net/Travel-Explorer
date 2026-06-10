import { useEffect, useState } from "react";
import CountryCard from "@/ui-components/Country_Card";
import { getCountryDetails, type Country } from "@/services/CountryDet";
import { Grid2x2, List } from "lucide-react";
import CountryList from "@/ui-components/Country_List";

const Favorites = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [view, setView] = useState("grid");

  useEffect(() => {
    const fetchFavs = async () => {
      const stored = localStorage.getItem("favs");

      if (!stored) return;

      const favNames: string[] = JSON.parse(stored);

      const data = await Promise.all(
        favNames.map((name) => getCountryDetails(name)),
      );

      setCountries(data);
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
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <p className="text-xl text-gray-500">No favorites yet</p>
              <p className="text-sm text-gray-400 mt-2">
                Start exploring and save countries you love.
              </p>
            </div>
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
            <div className="text-center py-20 text-gray-500">
              No favorites yet
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
