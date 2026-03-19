import "@/global.css";
import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from "react-native-vision-camera";

export default function HomeScreen() {
  const { hasPermission } = useCameraPermission();
  const microphonePermission = Camera.getMicrophonePermissionStatus();
  const device = useCameraDevice("back");

  // Wybieramy optymalny format (rozdzielczość i FPS)
  const format = useCameraFormat(device, [
    { videoResolution: { width: 1280, height: 720 } },
    { fps: 30 },
  ]);

  if (!hasPermission || microphonePermission === "not-determined")
    return <Redirect href={"/Permissions"} />;
  if (!device) return <></>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFill} // Użyj stylu zamiast NativeWind dla testu
        device={device}
        format={format} // Dodaj to
        pixelFormat="yuv" // 'yuv' jest najbardziej kompatybilny na Androidzie
        isActive={true}
      />
    </SafeAreaView>
  );
}
