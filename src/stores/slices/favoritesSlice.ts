import { StateCreator } from "zustand";
import { Recipe } from "../../types";
import { createRecipesSlice, RecipesSliceType } from "./recipesSlice";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

export type FavoritesSlicesType = {
  favorites: Recipe[];
  addToFavorites: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSlicesType & RecipesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSlicesType
> = (set, get, api) => ({
  favorites: [],
  addToFavorites: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (currentFavorite) => currentFavorite.idDrink !== recipe.idDrink
        ),
      }));

      createNotificationSlice(set, get, api).showNotification({
        text: "Eliminado de favoritos",
        error: false,
      });
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));

      createNotificationSlice(set, get, api).showNotification({
        text: "Agregado a favoritos",
        error: false,
      });
    }

    // consumiendo el slice createRecipesSlice
    createRecipesSlice(set, get, api).closeModal();

    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExist: (id) => {
    return get().favorites.some(
      (currentRecipe) => currentRecipe.idDrink === id
    );
  },
  loadFromStorage: () => {
    const favoritesLS = localStorage.getItem("favorites");
    if (favoritesLS) {
      set({
        favorites: JSON.parse(favoritesLS),
      });
    }
  },
});
