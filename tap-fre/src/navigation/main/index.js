import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/actions";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth";
import HomeScreen from "../home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fdb } from "../../../db";

const Stack = createNativeStackNavigator();
//opt
const auth = getAuth(fdb);

export default function Route() {
  const currentUserObj = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  //console.log(currentUserObj.currentUser);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUserObj?.currentUser ? (
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
