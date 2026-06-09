import { Slider } from "@/components/ui/slider";

interface FilterProps {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  selectedLangs: string[];
  value: number[];
  setLangs: React.Dispatch<React.SetStateAction<string[]>>;
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}
const FilterBox = ({
  region,
  setRegion,
  selectedLangs,
  setLangs,
  value,
  sortBy,
  setSortBy,
  setValue,
}: FilterProps) => {
  const langs = ["English", "French", "Spanish", "Hindi", "Japanese", "Polish"];

  const formatPopulation = (num: number) => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(0)}M`;
    }
    if (num >= 1_000) {
      return `${(num / 1_000).toFixed(0)}K`;
    }
    return num.toString();
  };

  const handleLanguageChange = (language: string) => {
    setLangs((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language],
    );
  };

  const clearAll = () => {
    setRegion("");
    setLangs([]);
    setValue([1000]); // or whatever your initial slider value is
    setSortBy("");
  };
  return (
    <div className="flex flex-col gap-4 text-slate-800 dark:text-slate-200">
      <p className="text-1xl font-semibold text-slate-900 dark:text-slate-50">
        Filters
      </p>
      <div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          Continent
        </p>
        <div>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-800 rounded px-3 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Continent</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          Population
        </p>
        <div className="text-center font-medium mb-1">
          {formatPopulation(value[0])}
        </div>{" "}
        <Slider
          value={value}
          onValueChange={(newValue) =>
            setValue(Array.isArray(newValue) ? [...newValue] : [newValue])
          }
          min={1_00}
          max={100_000_000}
          step={1_000}
        />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          Language
        </p>

        <div className="flex flex-col mt-2 gap-2">
          {langs.map((item) => (
            <label
              key={item}
              htmlFor={item}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                id={item}
                checked={selectedLangs.includes(item)}
                onChange={() => handleLanguageChange(item)}
                className="h-4 w-4 rounded border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          Sort By
        </p>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
      w-full
      rounded-lg
      border border-gray-300 dark:border-slate-800
      bg-white dark:bg-slate-900
      px-3 py-2
      text-sm
      text-slate-800 dark:text-slate-100
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      transition-colors
      cursor-pointer
    "
        >
          <option value="">Select sorting</option>
          <option value="name-asc">Name (A → Z)</option>
          <option value="name-desc">Name (Z → A)</option>
          <option value="population-asc">Population ↑</option>
          <option value="population-desc">Population ↓</option>
        </select>
      </div>
      <div>
        <button
          onClick={clearAll}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium cursor-pointer transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterBox;
