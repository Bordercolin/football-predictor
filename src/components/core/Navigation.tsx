import Text from "@/components/typography/Text";
import colors from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { type Href, usePathname, useRouter } from "expo-router";
import clsx from "clsx";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const grey = colors.primary.grey;
const navy = colors.primary.navy;

export type NavigationTabKey = "home" | "matches" | "leaderboard" | "standings";

type IonName = ComponentProps<typeof Ionicons>["name"];

type TabConfig = {
  key: NavigationTabKey;
  label: string;
  icon: IonName;
  iconOutline: IonName;
};

const TABS: TabConfig[] = [
  { key: "home", label: "Home", icon: "home", iconOutline: "home-outline" },
  {
    key: "matches",
    label: "Matches",
    icon: "football",
    iconOutline: "football-outline",
  },
  {
    key: "leaderboard",
    label: "Leaderboard",
    icon: "podium",
    iconOutline: "podium-outline",
  },
  {
    key: "standings",
    label: "Standings",
    icon: "stats-chart",
    iconOutline: "stats-chart-outline",
  },
];

const HREF: Record<NavigationTabKey, Href> = {
  home: "/",
  matches: "/matches",
  leaderboard: "/leaderboard",
  standings: "/standings" as Href,
};

function tabKeyFromPathname(pathname: string): NavigationTabKey {
  const segment = pathname.replace(/\/$/, "") || "/";
  if (segment === "/matches") return "matches";
  if (segment === "/leaderboard") return "leaderboard";
  if (segment === "/standings") return "standings";
  return "home";
}

export type NavigationProps = {
  /** When set, overrides the tab highlight (default: derived from the current route). */
  activeTab?: NavigationTabKey;
  onTabPress?: (key: NavigationTabKey) => void;
  className?: string;
};

export default function Navigation({
  activeTab: activeTabProp,
  onTabPress,
  className,
}: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = activeTabProp ?? tabKeyFromPathname(pathname);

  return (
    <View
      className={clsx("flex-row pt-2 pb-6", className)}
      style={styles.bar}
    >
      {TABS.map(({ key, label, icon, iconOutline }) => {
        const active = activeTab === key;
        const color = active ? navy.dark : grey.dark;
        const iconName = active ? icon : iconOutline;

        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => {
              onTabPress?.(key);
              router.replace(HREF[key]);
            }}
            className="min-w-0 flex-1 items-center gap-1 py-2"
          >
            <Ionicons name={iconName} size={24} color={color} />
            <Text
              family="inter"
              weight={active ? 600 : 400}
              className="text-center text-xs"
              style={{ color }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: grey.light,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: grey.DEFAULT,
  },
});
