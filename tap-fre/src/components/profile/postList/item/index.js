import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import { Image } from "expo-image";

export default function ProfilePostListItem({ item }) {
  console.log("Received:::", item);
  console.log("Media source::-.", item.media);
  return <Image style={styles.container} source={item.media} />;
}
