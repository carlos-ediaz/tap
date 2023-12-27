import { View, Text } from "react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Video, ResizeMode } from "expo-av";
import styles from "./styles";
import { useEffect } from "react";
import { Image } from "expo-image";
import { useUser } from "../../../hooks/useUsers";
import PostSingleOption from "../options";

export const ImageSingle = forwardRef(({ item }, parentRef) => {
  const ref = useRef(null);
  const user = useUser(item.creator);

  useImperativeHandle(parentRef, () => ({
    unload,
  }));

  useEffect(() => {
    return () => unload();
  }, []);

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
      <Image
        style={{
          flex: 1,
          width: "100%",
        }}
        ref={ref}
        source={item.media}
      />
    </>
  );
});

export default ImageSingle;
