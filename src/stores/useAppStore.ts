import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSliceType } from "./slices/recipesSlice";
import {
  createFavoritesSlice,
  FavoritesSlicesType,
} from "./slices/favoritesSlice";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./slices/notificationSlice";

// store principal
export const useAppStore = create<
  RecipesSliceType & FavoritesSlicesType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
  }))
);
