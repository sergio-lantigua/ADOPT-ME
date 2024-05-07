import { createSlice } from "@reduxjs/toolkit";
import { Animal, ISearchParams } from "./APIResponseTypes";

export const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: {
      location: "",
      breed: "",
      animal: "" as Animal,
      page: 0,
    },
  },
  reducers: {
    all: (state, action: { payload: ISearchParams; type: string }) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
