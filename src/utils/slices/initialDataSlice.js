import { createSlice } from "@reduxjs/toolkit";

const initalDataSlice = createSlice({
  name: "allData",
  initialState: null,
  reducers: {
    addAllData: (state, action) => {
      return action.payload;
    },
  },
});

export const { addAllData } = initalDataSlice.actions;
export default initalDataSlice.reducer;
