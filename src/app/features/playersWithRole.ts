import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type objType = {
  playerName: string;
  playerRole: number;
  deleted: boolean;
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
export const { addPlayersWithRole, deletePlayer , restorePlayer } =
  playersWithRoleSlice.actions;
export default playersWithRoleSlice.reducer;
