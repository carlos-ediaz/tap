import { View, Text } from "react-native";
import React from "react";
import styles from "../navBar/styles";
import { FlatList } from "react-native";
import ProfilePostListItem from "./item";

export default function ProfilePostList({ currentUserPosts }) {
  console.log("CurrentUserPosts pr:", currentUserPosts);
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        removeClippedSubviews
        data={currentUserPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProfilePostListItem item={item} />}
      />
    </View>
  );
}
