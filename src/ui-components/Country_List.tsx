import { Heart } from "lucide-react";
import { type Country } from "@/services/CountryDet";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CountryCardProps {
  item: Country;
}

const CountryList = ({ item }: CountryCardProps) => {
  const nav = useNavigate();
  const [liked, setLiked] = useState(false);

  const formatPopulation = (population: number) => {
    if (population >= 1_000_000) {
      return `${(population / 1_000_000).toFixed(1)}M`;
    }

    if (population >= 1_000) {
      return `${(population / 1_000).toFixed(0)}K`;
    }

    return population.toString();
  };

  return (
    <div
      onClick={() =>
        nav(`/country/${encodeURIComponent(item.name)}`)
      }
      className="grid grid-cols-[120px_2fr_140px_140px_300px_60px] items-center gap-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-5 cursor-pointer hover:shadow-md transition"
    >
      <img
        src={item.flag}
        alt={item.name}
        className="w-[90px] h-[60px] object-cover rounded-xl"
      />

      <div>
        <h2 className="font-semibold text-2xl text-slate-800 dark:text-slate-100">
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
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
        className="flex justify-center"
      >
        <Heart
          className={`w-6 h-6 transition cursor-pointer ${
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