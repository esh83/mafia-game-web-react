import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialStateType = {
  playerNames: string[];
};
const initialState: initialStateType = {
  playerNames: [],
};
const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    adddPlayers: (state, action: PayloadAction<string[]>) => {
      state.playerNames = action.payload;
    },
  },
});
export const { adddPlayers } = playersSlice.actions;
export default playersSlice.reducer;
