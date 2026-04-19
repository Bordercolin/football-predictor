import Text from "@/components/typography/Text";
import colors from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import type { ComponentProps } from "react";
import { Pressable, View } from "react-native";

const iconColor = colors.primary.navy.dark;

export type ScreenHeaderProps = {
  title: string;
  onProfilePress?: () => void;
  onNotificationsPress?: () => void;
  className?: string;
} & Pick<ComponentProps<typeof View>, "testID">;

/**
 * Top bar: profile (left), page title (center), notifications (right).
 */
export default function ScreenHeader({
  title,
  onProfilePress,
  onNotificationsPress,
  className,
  testID,
}: ScreenHeaderProps) {
  return (
    <View
      accessibilityRole="header"
      testID={testID}
      className={clsx(
        "relative min-h-[52px] w-full flex-row items-center justify-between",
        className
      )}
    >
      <Pressable
        accessibilityLabel="Profile"
        accessibilityRole="button"
        hitSlop={10}
        onPress={onProfilePress}
        className="z-10 h-11 w-11 items-center justify-center active:opacity-70"
      >
        <Ionicons name="person-circle-outline" size={30} color={iconColor} />
      </Pressable>

      <View
        pointerEvents="none"
        className="absolute inset-0 items-center justify-center px-14"
      >
        <Text
          family="inter"
          weight={700}
          numberOfLines={1}
          className="text-center text-2xl text-primary-navy-dark"
        >
          {title}
        </Text>
      </View>

      <Pressable
        accessibilityLabel="Notifications"
        accessibilityRole="button"
        hitSlop={10}
        onPress={onNotificationsPress}
        className="z-10 h-11 w-11 items-center justify-center active:opacity-70"
      >
        <Ionicons name="notifications-outline" size={26} color={iconColor} />
      </Pressable>
    </View>
  );
}
