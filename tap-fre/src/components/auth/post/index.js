import { View, Text } from "react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Video, ResizeMode } from "expo-av";
import styles from "./styles";
import { useEffect } from "react";
import { Image } from "expo-image";
import { useUser } from "../../../hooks/useUsers";
import PostSingleOption from "../options";

export const PostSingle = forwardRef(({ item }, parentRef) => {
  const ref = useRef(null);
  const { data } = useUser(item.creator);
  const user = data;

  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop,
  }));

  useEffect(() => {
    return () => unload();
  }, []);

  const play = async () => {
    if (ref.current == null) {
      return;
    }
    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    }
    try {
      await ref.current.playAsync();
    } catch (error) {
      console.log(error);
    }
  };
  const stop = async () => {
    if (ref.current == null) {
      return;
    }
    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    try {
      await ref.current.stopAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const unload = async () => {
    if (ref.current == null) {
      return;
    }
    try {
      await ref.current.unloadAsync();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <PostSingleOption user={user} post={item} />
      <Video
        ref={ref}
        style={styles.container}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={false}
        isLooping
        source={{
          uri: item.media,
        }}
      />
    </>
  );
});

export default PostSingle;
