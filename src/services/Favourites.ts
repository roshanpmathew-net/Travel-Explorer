import { toast } from "react-toastify";

export const addToFavourites = (code: string) => {
  try {
    const stored = localStorage.getItem("favs");

    const favs: string[] = stored ? JSON.parse(stored) : [];

    if (favs.includes(code)) {
      toast.info("Already in favourites");
      return;
    }

    favs.push(code);

    localStorage.setItem("favs", JSON.stringify(favs));

    toast.success(`Added to favourites`);
  } catch (e) {
    toast.error("Error adding to favourites");
    console.error("Error:", e);
  }
};

export const removeFromFavourites = (code: string) => {
  try {
    const stored = localStorage.getItem("favs");

    const favs: string[] = stored ? JSON.parse(stored) : [];

    const updatedFavs = favs.filter((fav) => fav !== code);

    localStorage.setItem("favs", JSON.stringify(updatedFavs));

    toast.success(`Removed from favourites`);
  } catch (e) {
    toast.error("Error removing from favourites");
    console.error("Error:", e);
  }
};

export const isLiked = (code: string): boolean => {
  try {
    const stored = localStorage.getItem("favs");

    const favs: string[] = stored ? JSON.parse(stored) : [];

    return favs.includes(code);
  } catch (e) {
    console.error("Error checking favourites:", e);
    return false;
  }
};