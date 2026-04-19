import Text from "@/components/typography/Text";
import colors from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { type Href, usePathname, useRouter } from "expo-router";
import clsx from "clsx";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const grey = colors.primary.grey;
const navy = colors.primary.navy;

export type NavigationTabKey =
  | "home"
  | "matches"
  | "predictions"
  | "leaderboard"
  | "standings";

type IonName = ComponentProps<typeof Ionicons>["name"];

type TabConfig = {
  key: NavigationTabKey;
  label: string;
  icon: IonName;
  iconOutline: IonName;
  isPrimary?: boolean;
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
    key: "predictions",
    label: "Predict",
    icon: "sparkles",
    iconOutline: "sparkles-outline",
    isPrimary: true,
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
  predictions: "/predictions",
  leaderboard: "/leaderboard",
  standings: "/standings" as Href,
};

function tabKeyFromPathname(pathname: string): NavigationTabKey {
  const segment = pathname.replace(/\/$/, "") || "/";
  if (segment === "/matches") return "matches";
  if (segment === "/predictions") return "predictions";
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
      className={clsx("mx-4 mb-4 flex-row rounded-[28px] px-2 pb-3 pt-2", className)}
      style={styles.bar}
    >
      {TABS.map(({ key, label, icon, iconOutline, isPrimary }) => {
        const active = activeTab === key;
        const color = isPrimary
          ? colors.white
          : active
            ? navy.dark
            : grey.dark;
        const iconName = active || isPrimary ? icon : iconOutline;

        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => {
              onTabPress?.(key);
              router.replace(HREF[key]);
            }}
            className={clsx(
              "min-w-0 flex-1 items-center gap-1 rounded-[20px] px-2 py-3",
              active && !isPrimary && "bg-white",
              isPrimary && "mx-1 -mt-4 h-[92px] rounded-[22px] bg-primary-blue px-3 py-3",
            )}
            style={isPrimary ? styles.primaryTab : active ? styles.activeTab : undefined}
          >
            {isPrimary ? (
              <>
                <View style={styles.primaryIconWrap}>
                  <Ionicons name={iconName} size={22} color={color} />
                </View>
                <Text
                  family="inter"
                  weight={700}
                  className="absolute bottom-3 text-center text-[11px]"
                  style={{ color }}
                >
                  {label}
                </Text>
              </>
            ) : (
              <>
                <Ionicons name={iconName} size={24} color={color} />
                <Text
                  family="inter"
                  weight={active ? 700 : 400}
                  className="text-center text-[11px]"
                  style={{ color }}
                >
                  {label}
                </Text>
              </>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#E7EEF6",
    borderWidth: 1,
    borderColor: "#D2DDE9",
    shadowColor: navy.dark,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  activeTab: {
    shadowColor: navy.dark,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  primaryTab: {
    shadowColor: colors.primary.blue.dark,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  primaryIconWrap: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    alignItems: "center",
    marginTop: -16,
  },
});
