import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type objType = {
  playerName: string;
  playerRole: number;
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
  },
});
export const { addPlayersWithRole } = playersWithRoleSlice.actions;
export default playersWithRoleSlice.reducer;
