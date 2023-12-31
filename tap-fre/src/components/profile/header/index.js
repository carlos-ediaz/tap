import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function ProfileHeader({ user }) {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.auth.currentUser);

  function sendMessage() {
    const link = `whatsapp://send?phone=573025288072&text=Ví tu anuncio de Tap`;
    Linking.openURL(link)
      .then(() => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make Sure whatsapp is installed on your device");
      });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => sendMessage()}>
        <View style={styles.imageViewContainer}>
          <Image style={styles.image} source={currentUser.photoURL} />
        </View>
      </TouchableOpacity>

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
