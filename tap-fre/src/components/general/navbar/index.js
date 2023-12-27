import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NavBarGaneral({
  title = "NavBarGeneral",
  leftButton = { display: false },
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => (leftButton.display ? leftButton.action() : null)}
      >
        <AntDesign
          name={leftButton.name}
          size={24}
          color={leftButton.display ? "black" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
}
