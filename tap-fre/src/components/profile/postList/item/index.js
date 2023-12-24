import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import { Image } from "expo-image";

export default function ProfilePostListItem({ item }) {
  return <Image style={styles.container} source={item.media} />;
}
