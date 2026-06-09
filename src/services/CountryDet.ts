export interface CountryDetails {
  name: string;
  officialName: string;
  flag: string;
  flagAlt: string;

  capital: string;
  continent: string;

  population: number;
  area: number;

  currency: string;
  languages: string;

  timezone: string[];

  googleMaps: string;
  openStreetMaps: string;
}

export interface Country {
  name: string;
  capital: string;
  population: number;
  continent: string;
  languages: string;
  flag: string;
}

export const getCountryDetails = async (
  name: string
): Promise<CountryDetails> => {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch country details");
    }

    const [country] = await res.json();

    return {
      name: country.name.common,
      officialName: country.name.official,

      flag: country.flags?.png,
      flagAlt: country.flags?.alt ?? "",

      capital: country.capital?.[0] ?? "N/A",

      continent: country.continents?.join(", ") ?? "N/A",

      population: country.population,
      area: country.area,

      currency:
        Object.values(country.currencies || {})
          .map((c: any) => `${c.name} (${c.symbol})`)
          .join(", ") || "N/A",

      languages:
        Object.values(country.languages || {}).join(", ") || "N/A",

      timezone: country.timezones ?? "N/A",

      googleMaps: country.maps?.googleMaps ?? "",
      openStreetMaps: country.maps?.openStreetMaps ?? "",
    };
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};


export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,continents,languages"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch country details");
    }

    const data = await res.json();

    const countryData: Country[] = data.map((item: any) => ({
      name: item.name.official,
      capital: item.capital?.[0] ?? "N/A",
      population: item.population,
      continent: item.continents?.[0] ?? "N/A",
      languages: item.languages
        ? Object.values(item.languages).join(", ")
        : "N/A",
      flag: item.flags?.png,
    }));

    return countryData;
  } catch (error) {
    console.error("Error fetching country data:", error);
    throw error;
  }
};