import { createSlice } from "@reduxjs/toolkit";
import { IPet } from "./APIResponseTypes";

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    value: null as IPet | null,
  },
  reducers: {
    adopt: (state, action: { payload: IPet; type: string }) => {
      state.value = action.payload;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
