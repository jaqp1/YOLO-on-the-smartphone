import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import * as ExpoMediaLibrary from "expo-media-library";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { Alert, Switch, TouchableHighlight, View } from "react-native";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";

export default function Permissions() {
  const ICON_SIZE = 26;

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    React.useState<CameraPermissionStatus>("not-determined");
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    React.useState<CameraPermissionStatus>("not-determined");
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    ExpoMediaLibrary.usePermissions();

  const requestMicrophonePermissions = async () => {
    const permission = await Camera.requestMicrophonePermission();
    setMicrophonePermissionStatus(permission);
  };
  useEffect(() => {
    const micPermissionStatus = () => {
      const currentStatus = Camera.getMicrophonePermissionStatus();
      setMicrophonePermissionStatus(currentStatus);
    };

    micPermissionStatus();
  }, []);

  const requestCameraPermissions = async () => {
    const permission = await Camera.requestCameraPermission();
    setCameraPermissionStatus(permission);
  };
  useEffect(() => {
    const cameraPermissionStatus = () => {
      const currentStatus = Camera.getCameraPermissionStatus();
      setCameraPermissionStatus(currentStatus);
    };

    cameraPermissionStatus();
  }, []);

  const handleContinue = () => {
    if (
      cameraPermissionStatus === "granted" &&
      microphonePermissionStatus === "granted" &&
      mediaLibraryPermission?.granted
    ) {
      router.replace("/");
    } else {
      Alert.alert("Please go to settings and enable permissions");
    }
  };

  const checkBoth = () => {
    const cam = Camera.getCameraPermissionStatus();
    const mic = Camera.getMicrophonePermissionStatus();
    console.log(`Kamera: ${cam}, Mikrofon: ${mic}`);
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Permissions" }} />
      <ThemedView className="flex-1 p-6">
        <View className="my-8" />
        <ThemedText type="subtitle" className="items-center">
          Camera needs permissions in order to work properly.
        </ThemedText>
        <View className="flex-row items-center gap-6">
          <Ionicons
            name="lock-closed-outline"
            size={ICON_SIZE}
            color={"orange"}
          />
          <ThemedText>Required</ThemedText>
        </View>
        <View className="my-6" />
        <View className="flex-row items-center gap-0 bg-[#ffffff20] rounded-10 p-10 justify-between">
          <Ionicons name="camera-outline" size={ICON_SIZE} color={"gray"} />
          <View className="ml-6 flex-shrink">
            <ThemedText>Camera</ThemedText>
            <ThemedText>Used for taking photos and videos</ThemedText>
          </View>
          <Switch
            trackColor={{ true: "orange" }}
            value={cameraPermissionStatus === "granted"}
            onChange={requestCameraPermissions}
          ></Switch>
        </View>
        <View className="my-6" />
        <View className="flex-row items-center gap-6 bg-[#ffffff20] rounded-10 p-10 justify-between">
          <Ionicons name="mic-outline" size={ICON_SIZE} color={"gray"} />
          <View className="ml-0 flex-shrink">
            <ThemedText>Microphone</ThemedText>
            <ThemedText>Used for recording voice</ThemedText>
          </View>
          <Switch
            trackColor={{ true: "orange" }}
            value={microphonePermissionStatus === "granted"}
            onValueChange={requestMicrophonePermissions}
          ></Switch>
        </View>
        <View className="my-6" />
        <View className="flex-row items-center gap-6 bg-[#ffffff20] rounded-10 p-10 justify-between">
          <Ionicons name="image-outline" size={ICON_SIZE} color={"gray"} />
          <View className="ml-0 flex-shrink">
            <ThemedText>Library</ThemedText>
            <ThemedText>Used for saving photos and videos</ThemedText>
          </View>
          <Switch
            trackColor={{ true: "orange" }}
            value={mediaLibraryPermission?.granted}
            // @ts-ignore
            onValueChange={async () => await requestMediaLibraryPermission()}
          ></Switch>
        </View>
        <View className="my-8" />
        <View className="my-8" />
        <View className="my-8" />

        <TouchableHighlight
          onPress={handleContinue}
          className="flex-row items-center gap-6 p-10 border-2 border-white rounded-50 self-center"
        >
          <Ionicons
            name="arrow-forward-outline"
            color={"white"}
            size={ICON_SIZE}
          />
        </TouchableHighlight>
      </ThemedView>
    </>
  );
}
