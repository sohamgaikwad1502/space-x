import React from "react";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./utils/store";
const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
};

export default App;
