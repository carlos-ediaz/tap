import React from "react";
import NavBarGaneral from "../../../components/general/navbar";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";

export default function EditProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBarGaneral />
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.imageViewContainer}>
          <Image
            style={styles.image}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
            }}
          />
          <View style={styles.imageOverlay} />
          <AntDesign name="camerao" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
