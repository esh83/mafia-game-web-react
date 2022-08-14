import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ROLES_ENUM } from "../../Roles";
type objType = {
  playerName: string;
  playerRole: number;
  deleted: boolean;
  shield: boolean;
}[];
type initialStateType = {
  playersWithRoles: objType;
};
const initialState: initialStateType = {
  playersWithRoles: [],
};
const playersWithRoleSlice = createSlice({
  name: "playersWithRole",
  initialState,
  reducers: {
    addPlayersWithRole: (state, action: PayloadAction<objType>) => {
      state.playersWithRoles = action.payload;
    },
    removeShield: (state) => {
      state.playersWithRoles.filter((role) => role.shield === true)[0].shield =
        false;
    },
    deletePlayer: (state, action: PayloadAction<string>) => {
      state.playersWithRoles.filter(
        (role) => role.playerName === action.payload
      )[0].deleted = true;
    },
    restorePlayer: (state, action: PayloadAction<string>) => {
      state.playersWithRoles.filter(
        (role) => role.playerName === action.payload
      )[0].deleted = false;
    },
  },
});
export const { addPlayersWithRole, deletePlayer, restorePlayer , removeShield } =
  playersWithRoleSlice.actions;
export default playersWithRoleSlice.reducer;
