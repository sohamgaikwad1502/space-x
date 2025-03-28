import { configureStore } from "@reduxjs/toolkit";
import initialDataReducer from "./slices/initialDataSlice";
import launchReducer from "./slices/launchSlice";
import launchAndLandReducer from "./slices/launchAndLandSlice";

const store = configureStore({
  reducer: {
    initialData: initialDataReducer,
    launch_success: launchReducer,
    launch_and_land: launchAndLandReducer,
  },
});

export default store;
