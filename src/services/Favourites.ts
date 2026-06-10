import { toast } from "react-toastify";

export const addToFavourites = (name: string) => {
  try {
    const stored = localStorage.getItem("favs");

    const favs: string[] = stored ? JSON.parse(stored) : [];

    if (favs.includes(name)) {
      toast.info("Already in favourites");
      return;
    }

    favs.push(name);

    localStorage.setItem("favs", JSON.stringify(favs));

    toast.success(`${name} added to favourites`);
  } catch (e) {
    toast.error("Error adding to favourites");
    console.error("Error:", e);
  }
};

export const removeFromFavourites = (name: string) => {
  try {
    const stored = localStorage.getItem("favs");

    const favs: string[] = stored ? JSON.parse(stored) : [];

    const updatedFavs = favs.filter((fav) => fav !== name);

    localStorage.setItem("favs", JSON.stringify(updatedFavs));

    toast.success(`${name} removed from favourites`);
  } catch (e) {
    toast.error("Error removing from favourites");
    console.error("Error:", e);
  }
};

export const isLiked = (name: string): boolean => {
  try {
    const stored = localStorage.getItem("favs");

    const favs: string[] = stored ? JSON.parse(stored) : [];

    return favs.includes(name);
  } catch (e) {
    console.error("Error checking favourites:", e);
    return false;
  }
};