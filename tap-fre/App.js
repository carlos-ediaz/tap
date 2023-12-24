import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/reducers";
import { thunk } from "redux-thunk";

import Route from "./src/navigation/main";
import { SafeAreaProvider } from "react-native-safe-area-context";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Route />
      </Provider>
    </SafeAreaProvider>
  );
}
