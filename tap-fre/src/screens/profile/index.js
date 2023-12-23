import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles";
import ProfileNavBar from "../../components/profile/navBar";
import ProfileHeader from "../../components/profile/header";

export default function ProfileScreen({ user }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <View style={styles.container}>
      <ProfileNavBar user={currentUser} />
      <ProfileHeader user={currentUser} />
    </View>
  );
}
