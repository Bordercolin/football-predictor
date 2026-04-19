import Text from "@/components/typography/Text";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { View } from "react-native";
import type { LeaderboardEntry } from "./leaderboard.types";
import Emblem from "../emblem/Emblem";

export default function LeaderboardListRow({
  rank,
  entry,
  className,
}: {
  rank: number;
  entry: LeaderboardEntry;
  className?: string;
}) {
  return (
    <View
      className={clsx(
        "flex-row items-center rounded-2xl border px-4 py-3.5",
        entry.isCurrentUser
          ? "border-primary-blue/20 bg-primary-blue-light/25"
          : "border-border-subtle bg-surface",
        className,
      )}
    >
      <Text
        family="jakarta"
        weight={700}
        className="mr-4 w-6 text-center text-sm text-primary-navy"
      >
        {rank}
      </Text>

      <Emblem size="sm" className="mr-3">
        <Ionicons name="person" size={18} color="#001A42" />
      </Emblem>

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
