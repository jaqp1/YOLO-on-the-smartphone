import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import ExpoMediaLibrary from "expo-media-library";
import { Stack } from "expo-router";
import React from "react";
import { Switch, View } from "react-native";
import { CameraPermissionStatus } from "react-native-vision-camera";

export default function Permissions() {
  const ICON_SIZE = 26;

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    React.useState<CameraPermissionStatus>("not-determined");
  const [microphonePremissionStatus, setMicriphonePermissionStatus] =
    React.useState<CameraPermissionStatus>("not-determined");

  const [mediaLibraryPermission, requestMediaLibraryPermissions] =
    ExpoMediaLibrary.usePermissions();

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Permissions" }} />
      <ThemedView className="flex-1 p-20">
        <View className="my-8" />
        <ThemedText type="subtitle" className="align-center">
          Camera needs permissions in order to work properly.
        </ThemedText>
        <View className="flex-row align-cneter gap-6">
          <Ionicons
            name="lock-closed-outline"
            size={ICON_SIZE}
            color={"orange"}
          />
          <ThemedText>Required</ThemedText>
        </View>
        <View className="my-8" />
        <View className="flex-row items-center gap-6 bg-[#ffffff20] rounded-10 p-10 justify-between">
          <Ionicons name="camera-outline" size={ICON_SIZE} color={"gray"} />
          <Switch
            trackColor={{ true: "orange" }}
            value={cameraPermissionStatus === "granted"}
          ></Switch>
        </View>
      </ThemedView>
    </>
  );
}
