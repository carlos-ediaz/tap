import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { StackActions, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/actions/post";
import { ActivityIndicator } from "react-native-paper";

export default function SavePostScreen(props) {
  const [description, setDescription] = useState("");
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleSavePost = () => {
    setRequestRunning(false);
    dispatch(createPost(description, props.route.params.source[0].uri))
      .then(() => navigation.dispatch(StackActions.popToTop()))
      .catch(() => setRequestRunning(false));
  };
  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputText}
          multiline
          onChangeText={(text) => setDescription(text)}
          maxLength={200}
          placeholder="Type the description"
        />
        <Image
          style={styles.mediaPreview}
          source={{ uri: props.route.params.source[0].uri }}
        />
      </View>
      <View style={styles.space}></View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <MaterialCommunityIcons name="cancel" size={24} color="white" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSavePost()}
          style={styles.postButton}
        >
          <AntDesign name="checkcircleo" size={24} color="white" />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
