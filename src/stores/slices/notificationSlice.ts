import { StateCreator } from "zustand";
import { FavoritesSlicesType } from "./favoritesSlice";

type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationSliceType = {
  notification: Notification;
  showNotification: (payload: Pick<Notification, "text" | "error">) => void;
  closeNotification: () => void;
};

export const createNotificationSlice: StateCreator<
  NotificationSliceType & FavoritesSlicesType,
  [],
  [],
  NotificationSliceType
> = (set, get) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  },
  showNotification: (payload) => {
    set({
      notification: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    });

    setTimeout(() => {
      get().closeNotification();
    }, 2000);
  },
  closeNotification: () => {
    set({
      notification: {
        text: "",
        error: false,
        show: false,
      },
    });
  },
});
