import { configureStore } from "@reduxjs/toolkit";
import spaceXDataReducer from "./slices/spaceXData";

const store = configureStore({
  reducer: {
    spaceXData: spaceXDataReducer,
  },
});

export default store;
