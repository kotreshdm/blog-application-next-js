"use client";

import { store } from "@/config/redux/store";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/config/redux/store";

const ReactReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReactReduxProvider;
