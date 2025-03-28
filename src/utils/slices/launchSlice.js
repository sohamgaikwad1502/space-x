import { createSlice } from "@reduxjs/toolkit";

const launchSlice = createSlice({
  name: "launch",
  initialState: null,
  reducers: {
    addLaunches: (state, action) => {
      return action.payload;
    },
  },
});

export const { addLaunches } = launchSlice.actions;
export default launchSlice.reducer;
