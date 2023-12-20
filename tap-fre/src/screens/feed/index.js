import { View, Text, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { Dimensions } from "react-native";
import PostSingle from "../../components/auth/post";
import { getFeed } from "../../services/posts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageSingle from "../../components/auth/image";
import { Image } from "expo-image";

export default function FeedScreen() {
  const mediaRefs = useRef([]);
  const [posts, setPosts] = useState([]);

  const ref = useRef(null);

  useEffect(() => {
    getFeed().then(setPosts);
  }, []);
  //const [posts, setPosts] = useState([]);
  const array = [1, 2, 3, 4, 5, 6];

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          if (element.item.type === "video") {
            cell.play();
          }
        } else {
          if (element.item.type === "video") {
            cell.stop();
          }
        }
      }
    });
  });
  //const feedItemHeight = Dimensions.get("window").height - 30;

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          {
            flex: 1,
            height: Dimensions.get("window").height - 44,
            backgroundColor: "black",
          },
        ]}
      >
        {item.type === "video" ? (
          <>
            <PostSingle
              item={item}
              ref={(PostSingleRef) =>
                (mediaRefs.current[item.id] = PostSingleRef)
              }
            />
          </>
        ) : (
          <ImageSingle
            item={item}
            ref={(PostSingleRef) =>
              (mediaRefs.current[item.id] = PostSingleRef)
            }
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        windowSize={4}
        initialNumToRender={4}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.id}
        decelerationRate={"normal"}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
}
