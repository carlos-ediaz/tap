import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ProfileHeader({ user }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Avatar.Icon size={50} icon="account" />
      <Text style={styles.emailText}>{user.email}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("editProfile")}
      >
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
