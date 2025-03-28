import { createSlice } from "@reduxjs/toolkit";

const launchAndLandSlice = createSlice({
  name: "launchAndLand",
  initialState: null,
  reducers: {
    addLaunchAndLand: (state, action) => {
      return action.payload;
    },
  },
});

export const { addLaunchAndLand } = launchAndLandSlice.actions;
export default launchAndLandSlice.reducer;
