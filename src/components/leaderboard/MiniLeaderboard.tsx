import Text from "@/components/typography/Text";
import Heading from "@/components/typography/Heading";
import colors from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import clsx from "clsx";
import { Pressable, View } from "react-native";

import type { LeaderboardEntry } from "./leaderboard.types";

export type MiniLeaderboardProps = {
  entries: LeaderboardEntry[];
  currentUserRank?: number;
  className?: string;
};

const RANK_ICONS: Record<number, { icon: string; color: string }> = {
  1: { icon: "trophy", color: "#FFD700" },
  2: { icon: "medal", color: "#C0C0C0" },
  3: { icon: "medal", color: "#CD7F32" },
};

function LeaderboardRow({
  rank,
  entry,
}: {
  rank: number;
  entry: LeaderboardEntry;
}) {
  const medal = RANK_ICONS[rank];

  return (
    <View
      className={clsx(
        "flex-row items-center rounded-xl px-4 py-3",
        entry.isCurrentUser ? "bg-primary-blue-light/30" : "bg-primary-grey-light",
      )}
    >
      <View className="mr-3 w-7 items-center">
        {medal ? (
          <Ionicons
            name={medal.icon as any}
            size={20}
            color={medal.color}
          />
        ) : (
          <Text
            family="jakarta"
            weight={700}
            className="text-sm text-primary-navy-dark"
          >
            {rank}
          </Text>
        )}
      </View>

      <Text
        family="jakarta"
        weight={entry.isCurrentUser ? 800 : 600}
        className="flex-1 text-sm text-primary-navy-dark"
      >
        {entry.name}
        {entry.isCurrentUser && " (You)"}
      </Text>

      <Text
        family="jakarta"
        weight={700}
        className="text-sm text-primary-navy-dark"
      >
        {entry.points} pts
      </Text>
    </View>
  );
}

export default function MiniLeaderboard({
  entries,
  currentUserRank,
  className,
}: MiniLeaderboardProps) {
  const router = useRouter();

  return (
    <View className={clsx("w-full", className)}>
      <View className="mb-3 flex-row items-center justify-between">
        <Heading level={3} className="text-primary-navy-dark">
          Leaderboard
        </Heading>
        {currentUserRank && (
          <View className="rounded-full bg-primary-blue-light/40 px-3 py-1">
            <Text
              family="jakarta"
              weight={700}
              className="text-xs text-primary-navy-dark"
            >
              #{currentUserRank}
            </Text>
          </View>
        )}
      </View>

      <View className="gap-2">
        {entries.map((entry, i) => (
          <LeaderboardRow key={entry.name} rank={i + 1} entry={entry} />
        ))}
      </View>

      <Pressable
        onPress={() => router.push("/leaderboard")}
        className="mt-3 flex-row items-center justify-center rounded-xl bg-primary-grey py-3"
      >
        <Text
          family="jakarta"
          weight={700}
          className="mr-1 text-sm text-primary-navy-dark"
        >
          See full leaderboard
        </Text>
        <Ionicons
          name="chevron-forward"
          size={14}
          color={colors.primary.navy.dark}
        />
      </Pressable>
    </View>
  );
}
