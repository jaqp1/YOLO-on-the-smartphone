import { ThemedText } from "@/components/themed-text";
import "@/global.css";
import { Redirect, useRouter } from "expo-router";
import { Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function HomeScreen() {
  const { hasPermission } = useCameraPermission();
  const microphonePermission = Camera.getMicrophonePermissionStatus();
  const router = useRouter();
  const redirectToPermissions =
    !hasPermission || microphonePermission === "not-determined";

  const device = useCameraDevice("back");

  if (redirectToPermissions) return <Redirect href={"/Permissions"} />;
  if (!device) return <></>;

  return (
    <>
      <SafeAreaView
        className={`flex-1 ${Platform.OS === "android" ? StatusBar.currentHeight : 0}`}
      >
        <Camera className="flex-1" device={device} isActive />
        <ThemedText></ThemedText>
      </SafeAreaView>
    </>
  );
}
