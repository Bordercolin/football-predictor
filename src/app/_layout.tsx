import Navigation from "@/components/core/Navigation";
import "../../global.css";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * Font keys must match `fontFamily` strings in `src/components/typography/Text.tsx`.
 */
const staticFonts = {
  "Inter-ExtraLight": require("../../assets/fonts/Inter_18pt-ExtraLight.ttf"),
  "Inter-Light": require("../../assets/fonts/Inter_18pt-Light.ttf"),
  "Inter-Regular": require("../../assets/fonts/Inter_18pt-Regular.ttf"),
  "Inter-Medium": require("../../assets/fonts/Inter_18pt-Medium.ttf"),
  "Inter-SemiBold": require("../../assets/fonts/Inter_18pt-SemiBold.ttf"),
  "Inter-Bold": require("../../assets/fonts/Inter_18pt-Bold.ttf"),
  "Inter-ExtraBold": require("../../assets/fonts/Inter_18pt-ExtraBold.ttf"),
  "Inter-Black": require("../../assets/fonts/Inter_18pt-Black.ttf"),
  "PlusJakartaSans-ExtraLight": require("../../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
  "PlusJakartaSans-Light": require("../../assets/fonts/PlusJakartaSans-Light.ttf"),
  "PlusJakartaSans-Regular": require("../../assets/fonts/PlusJakartaSans-Regular.ttf"),
  "PlusJakartaSans-Medium": require("../../assets/fonts/PlusJakartaSans-Medium.ttf"),
  "PlusJakartaSans-SemiBold": require("../../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  "PlusJakartaSans-Bold": require("../../assets/fonts/PlusJakartaSans-Bold.ttf"),
  "PlusJakartaSans-ExtraBold": require("../../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
} as const;

export default function RootLayout() {
  const [fontsLoaded] = useFonts(staticFonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} className="bg-primary-grey-light">
      <SafeAreaProvider>
        <Slot />
        <Navigation />
      </SafeAreaProvider>
    </View>
  );
}
