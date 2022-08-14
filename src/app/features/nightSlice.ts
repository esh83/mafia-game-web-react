import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type mafiaShot = {
  playerName: string;
  playerRole: number;
  shield: boolean;
};
type mafiaSave = {
  playerName: string;
  playerRole: number;
};
type armourResault = {
  remain: number;
  want: boolean;
};
type nightStateType = {
  mafiaShot: mafiaShot;
  mafiaSave: mafiaSave;
  citySave: mafiaSave;
  sniperShot: mafiaSave;
  armourResault: armourResault;
};
const initialState: nightStateType = {
  mafiaShot: { playerName: "", playerRole: 0, shield: false },
  mafiaSave: { playerName: "", playerRole: 0 },
  citySave: { playerName: "", playerRole: 0 },
  sniperShot: { playerName: "", playerRole: 0 },
  armourResault: { remain: 2, want: false },
};
const nightSlice = createSlice({
  name: "night",
  initialState,
  reducers: {
    updateMafiaShot: (state, action: PayloadAction<mafiaShot>) => {
      state.mafiaShot = action.payload;
    },
    updateMafiaSave: (state, action: PayloadAction<mafiaSave>) => {
      state.mafiaSave = action.payload;
    },
    updateCitySave: (state, action: PayloadAction<mafiaSave>) => {
      state.citySave = action.payload;
    },
    updateSniperShot: (state, action: PayloadAction<mafiaSave>) => {
      state.sniperShot = action.payload;
    },
    updateArmourResault: (state, action: PayloadAction<boolean>) => {
      state.armourResault.want = action.payload;
      action.payload === true ? (state.armourResault.remain -= 1) : null;
    },
    resetArmour: (state) => {
     state.armourResault.want = false,
     state.armourResault.remain = 2
    },
  },
});

export default nightSlice.reducer;

export const {
  updateMafiaShot,
  updateMafiaSave,
  updateCitySave,
  updateSniperShot,
  updateArmourResault,
  resetArmour
} = nightSlice.actions;
