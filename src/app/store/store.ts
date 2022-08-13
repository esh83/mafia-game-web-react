import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import playerReducer from "../features/playersSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    players: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
