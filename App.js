import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { CallYourMom } from "./CallYourMom";

export default function App() {
  return (
    <Provider store={store}>
      <CallYourMom />
    </Provider>
  );
}
