import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type actionType = {
  roles: number[];
  mafiaCount: number;
  cityCount: number;
};
const initialState: { roles: number[]; mafiaCount: number; cityCount: number } =
  {
    roles: [],
    mafiaCount: 0,
    cityCount: 0,
  };
const selectedRolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addSelectedRoles: (state, action: PayloadAction<actionType>) => {
      state.roles = action.payload.roles;
      state.mafiaCount = action.payload.mafiaCount;
      state.cityCount = action.payload.cityCount;
    },
  },
});

export default selectedRolesSlice.reducer;

export const { addSelectedRoles } = selectedRolesSlice.actions;
