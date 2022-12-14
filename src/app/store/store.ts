import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import playerReducer from "../features/playersSlice";
import rolesReducer from "../features/selectedRolesSlice";
import playerWithRolesReducer from "../features/playersWithRole";
import nightReducer from "../features/nightSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    players: playerReducer,
    roles: rolesReducer,
    playerWithRoles: playerWithRolesReducer,
    night: nightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
