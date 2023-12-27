import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";

export default function PostSingleOption({ user, post }) {
  if (user === "false") {
    console.log("User data is:", user.displayName);
    return (
      <View style={styles.container}>
        <Text style={styles.displayName}>{user.displayName}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.displayName}>Texto de pruebaaaa</Text>
      </View>
    );
  }
}
