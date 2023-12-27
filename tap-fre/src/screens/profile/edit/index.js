import React from "react";
import NavBarGaneral from "../../../components/general/navbar";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { saveUserProfileImage } from "../../../services/user";
import { useSelector } from "react-redux";
import { getCurrentUserInfo } from "../../../redux/actions";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileScreen() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigation = useNavigation();
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
  return (
    <SafeAreaView style={styles.container}>
      <NavBarGaneral title="Profile" />
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
      <View style={styles.fieldsContainer}>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={() =>
            navigation.navigate("editProfileField", {
              title: "Display Name",
              field: "displayName",
              value: currentUser.displayName,
            })
          }
        >
          <Text>Display name</Text>
          <View style={styles.fieldValueContainer}>
            <Text>{currentUser.displayName}</Text>
            <EvilIcons name="chevron-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={() =>
            navigation.navigate("editProfileField", {
              title: "Phone Number",
              field: "phoneNumber",
              value: currentUser.phoneNumber,
            })
          }
        >
          <Text>Phone Number</Text>
          <View style={styles.fieldValueContainer}>
            <Text>{currentUser.phoneNumber}</Text>
            <EvilIcons name="chevron-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
