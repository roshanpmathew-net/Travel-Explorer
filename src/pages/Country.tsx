import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountryDetails, type CountryDetails } from "@/services/CountryDet";

import { getCountryImage, type CountryImage } from "@/services/Image";
import Loader from "@/ui-components/Loader";
import { Button } from "@base-ui/react/button";
import { CircleArrowRight, Heart, Map } from "lucide-react";
import CountryDet from "@/ui-components/Country_Det";
import ImageGallery from "@/ui-components/Image_Gallery";

const Country = () => {
  const { name } = useParams();
  const [countryData, setCountryData] = useState<CountryDetails | null>(null);
  const [countryImage, setImage] = useState<CountryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const getCountryData = async () => {
      if (!name) return;
      try {
        const countryData = await getCountryDetails(name);
        setCountryData(countryData);
        // console.log(countryData);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    const fetchCountryImage = async () => {
      if (!name) return;
      try {
        const Image = await getCountryImage(name);
        setImage(Image);
        setLoading(false);
        // console.log(countryImage);
      } catch (error) {
        console.error("Error fetching country Image:", error);
      }
    };

    getCountryData();
    fetchCountryImage();
  }, [name]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="relative w-full group h-[75vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-2000 ease-out group-hover:scale-120"
          style={{ backgroundImage: `url(${countryImage?.src})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-end">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 px-4 sm:px-8 lg:px-20 pb-8 lg:pb-12 text-white">
            
            <div>
              <div className="flex items-center gap-3 sm:gap-5 mb-4">
                <img
                  src={countryData?.flag}
                  alt={countryData?.flagAlt}
                  className="w-14 h-10 sm:w-18 sm:h-12"
                />

                <p className="bg-blue-600 text-white px-3 py-1 rounded-4xl text-sm sm:text-base">
                  {countryData?.continent}
                </p>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold">
                {countryData?.name}
              </h1>

              <p className="max-w-2xl mt-4 text-sm sm:text-base lg:text-lg text-white/90">
                {countryImage?.alt}
              </p>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                className="bg-blue-600 flex items-center justify-center p-4 px-6 lg:px-8 rounded-lg gap-3 cursor-pointer w-full sm:w-auto"
                onClick={() => setLiked(!liked)}
              >
                <Heart
                  className={liked ? "fill-white text-white" : "text-white"}
                  size={24}
                />
                Add to Favorites
              </Button>

              <a
                href={countryData?.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="bg-white text-black flex items-center justify-center p-4 px-4 rounded-lg gap-3 cursor-pointer w-full sm:w-auto">
                  <Map className="text-black" />
                  View on Google Maps
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CountryDet item={countryData!} />
      </div>
      <div className="mx-4 sm:mx-8 lg:mx-10 mt-8 ">
        <div className="group relative overflow-hidden bg-[#2563EB] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-white z-10">
            <p className="text-sm font-medium uppercase tracking-wider text-blue-100">
              Travel Guide
            </p>

            <h2 className="text-2xl md:text-4xl font-bold mt-2">
              Navigate {name?.toUpperCase()}
            </h2>

            <p className="mt-3 text-blue-100 leading-relaxed">
              Plan your travel route through the island peaks and metropolitan
              wonders.
            </p>

            <a
              href={countryData?.openStreetMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-6 px-5 py-3 bg-white text-[#2563EB] font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300"
            >
              Open Street Map
            </a>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 md:translate-x-4 md:translate-y-4">
            <Map
              size={260}
              strokeWidth={1.5}
              className="text-white opacity-10 transition-transform duration-500 group-hover:scale-120"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 w-full bg-blue-100/80 p-6 sm:p-8 lg:p-11 rounded-3xl">
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Visual Exploration
      </h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600">
          Curated moments from across the archipelago.
        </p>

        <button
          className="
            flex items-center gap-2
            text-blue-600 font-medium
            cursor-pointer
            transition-all duration-300
            hover:gap-3
          "
        >
          View All
          <CircleArrowRight size={20} />
        </button>
      </div>
    </div>

    <ImageGallery name={name} />
  </div>
</div>
    </div>
  );
};

export default Country;
