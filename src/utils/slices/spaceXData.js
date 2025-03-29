import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allData: null,
  launch: null,
  launchAndLand: null,
};

const spaceXData = createSlice({
  name: "allData",
  initialState: initialState,
  reducers: {
    addAllData: (state, action) => {
      state.allData = action.payload;
    },
    addLaunchAndLand: (state, action) => {
      state.launchAndLand = action.payload;
    },
    addLaunches: (state, action) => {
      state.launch = action.payload;
    },
  },
});

export const { addAllData, addLaunchAndLand, addLaunches } = spaceXData.actions;
export default spaceXData.reducer;
