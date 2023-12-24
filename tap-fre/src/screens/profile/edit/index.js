import React from "react";
import NavBarGaneral from "../../../components/general/navbar";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { saveUserProfileImage } from "../../../services/user";
import { useSelector } from "react-redux";
import { getCurrentUserInfo } from "../../../redux/actions";

export default function EditProfileScreen() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const chooseImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!res.canceled) {
      saveUserProfileImage(res.uri);
      getCurrentUserInfo();
    }
  };
  console.log("___from:__/", currentUser.photoURL);
  return (
    <SafeAreaView style={styles.container}>
      <NavBarGaneral />
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageViewContainer}
          onPress={() => chooseImage()}
        >
          <Image style={styles.image} source={currentUser.photoURL} />
          <View style={styles.imageOverlay} />
          <AntDesign name="camerao" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
