import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../../../redux/actions";

export default function AuthDetails({ authPage, detailsPage, setDetailsPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login(email, password))
      .then(() => {
        console.log("Login successful");
      })
      .catch((error) => {
        console.log("Login unsuccessful");
        console.log(error);
      });
  };
  const handleRegister = () => {
    dispatch(register(email, password))
      .then(() => {
        console.log("Register successful");
      })
      .catch((error) => {
        console.log("Register unsuccessful");
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(!detailsPage)}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
        placeholder="Email"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.textInput}
        secureTextEntry
        placeholder="Password"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => (authPage ? handleRegister() : handleLogin())}
      >
        <Text style={styles.buttonText}>
          {authPage ? "Sign up" : "Sign in"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
