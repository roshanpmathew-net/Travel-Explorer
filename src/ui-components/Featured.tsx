import { Banknote, Building2, ImageIcon, Users } from "lucide-react";
import data from "../data/Featured.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Country {
  id: number;
  name: string;
  population: number;
  capital: string;
  attractionName: string;
  currency: string;
  image: string;
}

const Featured = () => {

  const {t}  = useTranslation()
  const [mainCountry, setMainCountry] = useState<Country | null>(null);
  const [sideCountries, setSideCountries] = useState<Country[] | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const navigate = useNavigate();

  const getMainCountry = (countries: Country[]) => {
    const randomIndex = Math.floor(Math.random() * countries.length);

    return countries[randomIndex];
  };

  const getSideCountries = (countries: Country[], mainCountry: Country) => {
    const availableCountries = countries.filter(
      (country) => country.id !== mainCountry.id,
    );

    const shuffledCountries = [...availableCountries].sort(
      () => Math.random() - 0.5,
    );

    return shuffledCountries.slice(0, 2);
  };

  useEffect(() => {
    const selectedMainCountry = getMainCountry(data);

    setMainCountry(selectedMainCountry);

    const selectedSideCountries = getSideCountries(data, selectedMainCountry);

    setSideCountries([selectedSideCountries[0], selectedSideCountries[1]]);
  }, []);

  useEffect(() => {
    if (!mainCountry || !sideCountries) return;

    const imageUrls = [
      mainCountry.image,
      ...sideCountries.map((country) => country.image),
    ];

    let loadedCount = 0;

    imageUrls.forEach((url) => {
      const img = new Image();

      img.src = url;

      img.onload = () => {
        loadedCount++;

        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, [mainCountry, sideCountries]);

  return (
    <div className="w-full pt-10 ">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{t("featured_countries")}</h1>

        <p className="mt-2 max-w-xl text-gray-600 leading-relaxed">
          {
            t("featured_countries_description")
          }
        </p>
      </div>
      <div
        className="w-full flex gap-4 mt-4"
        
      >
        <div className="w-2/3 h-100 rounded-xl relative overflow-hidden group cursor-pointer" onClick={() => navigate(`/country/${mainCountry?.name.toLowerCase()}`)}>
          {!imagesLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-200 animate-pulse">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${mainCountry?.image})` }}
            />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent rounded-xl" />

          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-4xl font-bold">{mainCountry?.name}</h2>

            <div className="flex items-center gap-6 mt-2 text-sm">
              <p className="flex items-center gap-2">
                <Building2 size={16} />
                {mainCountry?.capital}
              </p>

              <p className="flex items-center gap-2">
                <Users size={16} />
                {((mainCountry?.population ?? 0) / 1000000).toFixed(1)}M
              </p>

              <p className="flex items-center gap-2">
                <Banknote size={16} />
                {mainCountry?.currency.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col gap-4">
          {sideCountries?.map((country) => (
            <div
              key={country.id}
              className="group relative h-47.5 rounded-xl overflow-hidden cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/country/${country.name.toLowerCase()}`);
              }}
            >
              {!imagesLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-200 animate-pulse">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${country.image})` }}
                />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent" />

              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-2xl font-bold">{country.name}</h3>

                <p className="text-sm">
                  Capital: {country.capital} • Pop:{" "}
                  {(country.population / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
