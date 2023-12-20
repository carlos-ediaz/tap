import { View, Text } from "react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Video, ResizeMode } from "expo-av";
import styles from "./styles";
import { useEffect } from "react";
import { Image } from "expo-image";

export const ImageSingle = forwardRef(({ item }, parentRef) => {
  const ref = useRef(null);

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
