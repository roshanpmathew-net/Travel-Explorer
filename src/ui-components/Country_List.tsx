import { Heart } from "lucide-react";
import { type Country } from "@/services/CountryDet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToFavourites, isLiked, removeFromFavourites } from "@/services/Favourites";


interface CountryCardProps {
  item: Country;
  onRemove?: (countryName: string) => void;
}

const CountryList = ({ item, onRemove  }: CountryCardProps) => {
  const nav = useNavigate();
  const countryId = item.code && item.code !== "N/A" ? item.code : item.name;
  const [liked, setLiked] = useState(isLiked(countryId));

  useEffect(() => {
    setLiked(isLiked(countryId));
  }, [countryId]);

  const formatPopulation = (population: number) => {
    if (population >= 1_000_000_000) {
      return `${(population / 1_000_000_000).toFixed(1)}B`;
    }

    if (population >= 1_000_000) {
      return `${(population / 1_000_000).toFixed(1)}M`;
    }

    if (population >= 1_000) {
      return `${(population / 1_000).toFixed(0)}K`;
    }

    return population.toString();
  };
  const handleLike = () => {
  if (liked) {
    removeFromFavourites(countryId);
    setLiked(false);

    onRemove?.(item.name);
  } else {
    addToFavourites(countryId);
    setLiked(true);
  }
};
  return (
    <div
     
      className="grid grid-cols-[120px_2fr_140px_140px_300px_60px] items-center gap-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-5 cursor-pointer hover:shadow-md transition"
    >
      <img
        src={item.flag}
        alt={item.name}
        className="w-[90px] h-[60px] object-cover rounded-xl"
      />

      <div>
        <h2  onClick={() =>
        nav(`/country/${encodeURIComponent(countryId)}`)
      } className="font-semibold text-2xl text-slate-800 dark:text-slate-100">
          {item.name}
        </h2>
        <p className="text-gray-500 dark:text-slate-400">
          {item.continent}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500 dark:text-slate-400">Capital</p>
        <p className="text-xl font-medium text-slate-800 dark:text-slate-200">
          {item.capital}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500 dark:text-slate-400">Population</p>
        <p className="text-xl font-medium text-slate-800 dark:text-slate-200">
          {formatPopulation(item.population)}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500 dark:text-slate-400">Language</p>
        <p
          className="text-xl font-medium truncate text-slate-800 dark:text-slate-200"
          title={item.languages}
        >
          {item.languages}
        </p>
      </div>

      <button
       onClick={()=>handleLike()}
        className="flex justify-center cursor-pointer"
      >
        <Heart
          
          className={`w-6 h-6 transition  ${
            liked
              ? "fill-red-500 text-red-500"
              : "text-slate-700 dark:text-slate-400"
          }`}
        />
      </button>
    </div>
  );
};

export default CountryList;