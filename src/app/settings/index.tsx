import Text from "@/components/typography/Text";
import ScreenHeader from "@/components/core/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function Settings() {
  return (
    <SafeAreaView className="flex-1 bg-background px-5 pb-4 pt-1">
      <ScreenHeader title="Settings" className="mb-6" />
      <View className="rounded-[28px] border border-border-subtle bg-surface px-5 py-6">
        <Text family="inter" weight={700} className="mb-2 text-xs uppercase tracking-[0.18em] text-text-muted">
          Preferences
        </Text>
        <Text family="jakarta" weight={800} className="text-2xl text-primary-navy-dark">
          Settings
        </Text>
        <Text className="mt-2 text-base text-text-muted">
          Your existing settings functionality can drop into this updated layout without changing behavior.
        </Text>
      </View>
    </SafeAreaView>
  );
}
