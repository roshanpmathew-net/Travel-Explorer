import { useEffect, useState } from "react";
import Dests from "../data/Dest.json";
import { CustomSelect } from "@/ui-components/Compare/customSelect";
import compareData from "@/data/Compare.json";
import StatsComponent from "@/ui-components/Compare/StatsComponent";
import { Circle } from "lucide-react";

export interface Attraction {
  name: string;
  image: string;
}

export interface CountryDetails {
  country: string;
  tagline: string;
  costOfLivingPerDayUSD: number;
  budgetLevel: "Low" | "Moderate" | "High";
  infrastructureRating: number;
  safetyScore: number;
  climate: string;
  topIndustry: string;
  tourismSpeciality: string[];
  languages: string[];
  visaDifficulty: "Easy" | "Moderate" | "Difficult";
  bestTimeToVisit: string;
  transportOptions: string[];
  touristFriendliness: number;
  attraction: Attraction;
}

const Compare = () => {
  const [selectedA, setSelectedA] = useState("");
  const [selectedB, setSelectedB] = useState("");

  const countryA: CountryDetails | null = selectedA
    ? (compareData[selectedA as keyof typeof compareData] as CountryDetails)
    : null;

  const countryB: CountryDetails | null = selectedB
    ? (compareData[selectedB as keyof typeof compareData] as CountryDetails)
    : null;
  return (
    <>
      <section className="relative">
        <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/Compare.jpg')] bg-cover bg-center" />

          <div className="absolute inset-0 bg-linear-to-b from-blue-900/20 via-blue-500/10 to-white/40" />

          <div className="relative z-10 hidden h-full flex-col items-center justify-center px-4 text-center md:flex">
            <h1 className="text-4xl font-bold text-slate-900 lg:text-5xl">
              Compare Countries
            </h1>

            <p className="mt-3 max-w-2xl rounded-full px-5 py-2 text-sm text-slate-800 backdrop-blur-sm sm:text-base">
              Make data-driven decisions for your next journey by evaluating
              destinations side-by-side.
            </p>
          </div>
        </div>

        <div className="absolute left-1/2 -bottom-14 z-20 w-full max-w-7xl -translate-x-1/2 px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition-shadow hover:shadow-lg">
              <label
                htmlFor="destination-a"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Destination A
              </label>

              <CustomSelect
                destinationValue={selectedA}
                otherSelected={selectedB || ""}
                setDestinationValue={setSelectedA}
                destination="Destination A"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition-shadow hover:shadow-lg">
              <label
                htmlFor="destination-a"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Destination B
              </label>

              <CustomSelect
                otherSelected={selectedA || ""}
                destinationValue={selectedB}
                setDestinationValue={setSelectedB}
                destination="Destination B"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="h-28 md:h-20" />

      {selectedA && selectedB ? (
        <div className="flex w-full justify-center gap-6 px-8 py-6 mb-10">
  <div className="flex flex-col gap-6 w-[320px] shrink-0">
    <ImgCard country={countryA} />
    <ImgCard country={countryB} />
  </div>

 <div className="flex-1 rounded-2xl bg-white p-6 shadow-sm border">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-semibold">
        Key Logistics Comparison
      </h2>

      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Circle
            size={12}
            className="fill-blue-600 text-blue-600"
          />
          <span>{countryA?.country}</span>
        </div>

        <div className="flex items-center gap-2">
          <Circle
            size={12}
            className="fill-green-600 text-green-600"
          />
          <span>{countryB?.country}</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-10">
      <StatsComponent CountryProps={countryA!} bgcolor ="bg-blue-600" text_color="text-blue-600"  />
      <StatsComponent CountryProps={countryB!} bgcolor="bg-green-600" text_color="text-green-600" />
    </div>
  </div>
</div>
      ) : selectedA || selectedB ? (
        <div className="text-center py-10">
          Please select one more destination
        </div>
      ) : (
        <div className="text-center py-10">Please select your destinations</div>
      )}
    </>
  );
};

export default Compare;

interface ImgCardProps {
  country: CountryDetails | null;
}

function ImgCard({ country }: ImgCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={
            country?.attraction?.image ||
            "/images/Imgplaceholder1.jpg"
          }
          alt={country?.country}
          className="h-48 w-full object-cover"
        />

        <div className="absolute top-4 left-4 rounded-lg bg-white/95 px-3 py-1 shadow-sm backdrop-blur-sm">
          <p className="font-medium text-slate-800">
            {country?.country}
          </p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-xl font-semibold text-slate-900">
          {country?.tourismSpeciality?.[0]} &{" "}
          {country?.tourismSpeciality?.[1]}
        </h3>

        <p className="text-sm leading-relaxed text-slate-600">
          {country?.tagline}
        </p>
      </div>
    </div>
  );
}
