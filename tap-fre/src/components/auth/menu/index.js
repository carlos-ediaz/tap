import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style";
import { AntDesign } from "@expo/vector-icons";

export default function AuthMenu({
  authPage,
  setAuthPage,
  detailsPage,
  setDetailsPage,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <Text style={styles.headerText}>
          {authPage ? "Sign up" : "Sign in"}
        </Text>
        <TouchableOpacity
          style={styles.providerButton}
          onPress={() => setDetailsPage(!detailsPage)}
        >
          <AntDesign name="user" size={24} color="black" />
          <Text style={styles.providerButtonText}>Use Email</Text>
          <View />
          {/*Center the text*/}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.containerBottomButton}
        onPress={() => setAuthPage(!authPage)}
      >
        {authPage ? (
          <Text>
            Already have an account?
            <Text style={styles.bottomButtonText}>Sign In</Text>
          </Text>
        ) : (
          <Text>
            Don't have an account?
            <Text style={styles.bottomButtonText}> Sign Up</Text>
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
