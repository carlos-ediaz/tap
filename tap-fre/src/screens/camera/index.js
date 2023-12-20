import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function CameraScreen() {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const [hasMediaPermissions, setHasMediaPermissions] = useState(false);

  const [galleryItems, setGalleryItems] = useState([]);

  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );
  const [cameraReady, setCameraReady] = useState(false);
  const [mediaType, setMediaType] = useState("none");

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status == "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status == "granted");

      const MediaStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermissions(MediaStatus.status == "granted");

      if (galleryStatus.status === "granted") {
        try {
          const userGalleryMedia = await MediaLibrary.getAssetsAsync({
            sortBy: ["creationTime"],
          });
          setGalleryItems(userGalleryMedia.assets);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, []);

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 30,
          quality: Camera.Constants.VideoQuality["480"],
        };
        const videoRecordPromise = cameraRef.recordAsync(options);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data;
          navigation.navigate("savePost", { source, type: "video" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.stopRecording();
    }
  };

  const pickFromGallery = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    let fileType = "none";
    if (res.assets[0].type == "image") {
      console.log("image");
      setMediaType("image");
      fileType = "image";
    } else {
      console.log("video");
      setMediaType("video");
      fileType = "video";
    }
    if (!res.canceled) {
      navigation.navigate("savePost", {
        source: res.assets[0],
        type: fileType,
      });
    } else {
      console.log("canceled");
    }
  };
  if (
    !hasCameraPermissions ||
    !hasAudioPermissions ||
    !hasGalleryPermissions ||
    !hasMediaPermissions
  ) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          ratio={"16:9"}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setCameraReady(true)}
        />
      ) : null}
      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }
        >
          <Ionicons name="camera-reverse-outline" size={24} color="white" />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => {
            setCameraFlash(
              cameraFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            );
          }}
        >
          <Ionicons
            name={
              cameraFlash === Camera.Constants.FlashMode.off
                ? "flash-outline"
                : "flash-off-outline"
            }
            size={24}
            color="white"
          />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            disabled={!cameraReady}
            onLongPress={() => {
              recordVideo();
              console.log("long");
            }}
            onPressOut={() => stopVideo()}
            style={styles.recordButton}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => pickFromGallery()}
            style={styles.galleryButton}
          >
            {galleryItems[0] ? (
              <Image
                style={styles.galleryButtonImage}
                source={{ uri: galleryItems[0].uri }}
              />
            ) : (
              <></>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
