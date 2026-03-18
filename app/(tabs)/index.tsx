import { ThemedText } from "@/components/themed-text";
import "@/global.css";
import { Redirect, useRouter } from "expo-router";
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

  return <ThemedText>Hello World</ThemedText>;
}
