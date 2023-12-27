import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBarGaneral from "../../../../components/general/navbar";
import styles from "./styles";
import { Divider } from "react-native-paper";
import { saveUserField } from "../../../../services/user";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileFieldScreen({ route }) {
  const { title, field, value } = route.params;
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();
  const onSave = () => {
    saveUserField(field, textInputValue).then(() => navigation.goBack());
  };
  return (
    <SafeAreaView style={styles.container}>
      <NavBarGaneral
        title={title}
        leftButton={{ display: true, name: "save", action: onSave }}
      />
      <Divider />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.textInput}
          value={textInputValue}
          onChangeText={setTextInputValue}
        />
      </View>
    </SafeAreaView>
  );
}
