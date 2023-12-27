import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function PostSingleOption({ user, post }) {
  function sendMessage(number = 1) {
    const link = `whatsapp://send?phone=57${number}&text=Ví tu anuncio de Tap`;
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => sendMessage(user?.phoneNumber)}
      >
        {user?.phoneNumber ? (
          <Ionicons
            style={styles.whatsLogo}
            name="logo-whatsapp"
            size={24}
            color="white"
          />
        ) : null}

        <Text style={styles.phoneNumber}>
          {user?.phoneNumber ? user.phoneNumber : "No number available"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
