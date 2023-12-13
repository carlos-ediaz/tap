import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/actions";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth";
import HomeScreen from "../home";

const Stack = createNativeStackNavigator();

export default function Route() {
  const currentUserObj = useSelector((state) => state.auth);
  //useSelector allow to access the data that come from redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  console.log(currentUserObj);

  if (!currentUserObj?.loaded) {
    return (
      <View>
        <Text>index</Text>
      </View>
    );
  }
  console.log(currentUserObj.currentUser);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUserObj.currentUser ? (
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
