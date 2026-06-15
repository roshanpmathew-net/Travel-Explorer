export interface CountryImage {
  src: string;
  alt: string;
}

interface PexelsPhoto {
  src: {
    medium: string;
    landscape: string;
  };
  alt: string;
}

const PEXELS_AUTH = import.meta.env.VITE_PEXELS_API_KEY;

export const getCountryImage = async (name: string): Promise<CountryImage> => {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        `${name} landmarks`,
      )}&per_page=1&orientation=landscape`,

      {
        headers: {
          Authorization: PEXELS_AUTH,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Image details");
    }
    const data = await res.json();

    const image = (data.photos as PexelsPhoto[])?.[0];

    if (!image) {
      throw new Error("No image found");
    }

    return {
      src: image.src.landscape,
      alt: image.alt,
    };
  } catch (e) {
    console.error("Error fetching country details:", e);
    throw e;
  }
};

export const getImages = async (
  name: string,
  limit: number,
): Promise<CountryImage[]> => {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        `${name} landmarks`,
      )}&per_page=${limit}&orientation=landscape`,

      {
        headers: {
          Authorization: PEXELS_AUTH,
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Image details");
    }
    const data = await res.json();

    const imageData: CountryImage[] = (data.photos as PexelsPhoto[])
      .slice(1)
      .map((image) => ({
        src: image.src.medium,
        alt: image.alt,
      }));

    return imageData;
  } catch (e) {
    console.error("Error fetching country details:", e);
    throw e;
  }
};
