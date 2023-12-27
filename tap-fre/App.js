import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/reducers";
import { thunk } from "redux-thunk";

import Route from "./src/navigation/main";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const store = createStore(rootReducer, applyMiddleware(thunk));

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } },
});
export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Route />
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
