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