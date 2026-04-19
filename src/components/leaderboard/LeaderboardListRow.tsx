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
        "flex-row items-center rounded-xl px-4 py-3.5",
        entry.isCurrentUser
          ? "bg-primary-blue-light/30"
          : "bg-primary-grey-light",
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

     <Emblem size="sm">
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

