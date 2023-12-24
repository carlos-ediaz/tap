import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function ProfileHeader({ user }) {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <View style={styles.container}>
      <View style={styles.imageViewContainer}>
        <Image style={styles.image} source={currentUser.photoURL} />
      </View>
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
