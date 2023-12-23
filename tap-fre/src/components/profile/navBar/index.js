import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function ProfileNavBar({ user }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AntDesign name="search1" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>{user.displayName}</Text>
      <TouchableOpacity>
        <SimpleLineIcons name="options" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
