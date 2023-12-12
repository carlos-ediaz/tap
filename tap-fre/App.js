import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/reducers";
import { thunk } from "redux-thunk";

//import { firebase } from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";

import Constants from "expo-constants";
import AuthScreen from "./src/screens/auth";

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log(Constants.manifest.web.config.firebase);

if (getApps().length == 0) {
  //(firebase.apps.lenght == 0)
  console.log("Initializing db");
  const fb = initializeApp(Constants.manifest.web.config.firebase);
  //firebase.initializeApp(Constants.expoConfig.firebase);
} else {
  getApp();
}

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AuthScreen />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
