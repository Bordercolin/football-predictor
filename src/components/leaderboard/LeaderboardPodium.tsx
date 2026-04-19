import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { View } from "react-native";
import type { LeaderboardEntry } from "./leaderboard.types";

const RANK_ICONS: Record<number, { icon: string; color: string }> = {
  1: { icon: "trophy", color: "#FFD700" },
  2: { icon: "medal", color: "#C0C0C0" },
  3: { icon: "medal", color: "#CD7F32" },
};

const PODIUM_HEIGHT_BY_RANK: Record<number, number> = {
  1: 112,
  2: 88,
  3: 72,
};

const PODIUM_ORDER_BY_RANK: Array<1 | 2 | 3> = [2, 1, 3];

export default function LeaderboardPodium({
  entries,
  className,
}: {
  entries: LeaderboardEntry[];
  className?: string;
}) {
  const top3 = entries.slice(0, 3);

  return (
    <View className={clsx("mb-2 mt-4 w-full items-center", className)}>
      <View className="w-full flex-row items-end justify-center gap-3 px-4">
        {PODIUM_ORDER_BY_RANK.map((rank) => {
          const entry = top3[rank - 1];
          if (!entry) return null;
          const medal = RANK_ICONS[rank];
          const isFirst = rank === 1;

          return (
            <View key={`${rank}-${entry.name}`} className="flex-1 items-center">
              <View className="mb-2 items-center">
                <View
                  className={clsx(
                    "mb-1.5 items-center justify-center rounded-full",
                    isFirst
                      ? "h-16 w-16 bg-primary-navy-dark"
                      : "h-12 w-12 bg-primary-grey",
                  )}
                >
                  <Ionicons
                    name="person"
                    size={isFirst ? 28 : 22}
                    color={isFirst ? "#F8F9FA" : "#001A42"}
                  />
                </View>
                {medal && (
                  <Ionicons
                    name={medal.icon as any}
                    size={isFirst ? 22 : 18}
                    color={medal.color}
                  />
                )}
              </View>

              <Text
                family="jakarta"
                weight={entry.isCurrentUser ? 800 : 700}
                className="mb-0.5 text-center text-xs text-primary-navy-dark"
                numberOfLines={1}
              >
                {entry.isCurrentUser ? "You" : entry.name.split(" ")[0]}
              </Text>
              <Text
                family="jakarta"
                weight={600}
                className="mb-2 text-center text-xs text-primary-navy"
              >
                {entry.points} pts
              </Text>

              <View
                className={clsx(
                  "w-full items-center justify-center rounded-t-xl",
                  isFirst ? "bg-primary-navy-dark" : "bg-primary-grey",
                )}
                style={{ height: PODIUM_HEIGHT_BY_RANK[rank] }}
              >
                <Heading
                  level={2}
                  className={clsx(
                    isFirst ? "text-white" : "text-primary-navy-dark",
                  )}
                >
                  {rank}
                </Heading>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

