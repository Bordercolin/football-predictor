import Text from "@/components/typography/Text";
import ScreenHeader from "@/components/core/ScreenHeader";
import LeaderboardPodium from "@/components/leaderboard/LeaderboardPodium";
import LeaderboardListRow from "@/components/leaderboard/LeaderboardListRow";
import type { LeaderboardEntry } from "@/components/leaderboard/leaderboard.types";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { name: "Alex Thompsonssssssssssss", points: 58 },
  { name: "Colin Willems", points: 42, isCurrentUser: true },
  { name: "Jamie Wilson", points: 39 },
  { name: "Sarah Chen", points: 35 },
  { name: "Marcus Lee", points: 31 },
  { name: "Olivia Patel", points: 28 },
  { name: "Ryan Brooks", points: 24 },
  { name: "Emma Davis", points: 21 },
  { name: "Noah Garcia", points: 18 },
  { name: "Lily Nguyen", points: 14 },
];

export default function Leaderboard() {
  const remaining = LEADERBOARD_DATA.slice(3);

  return (
    <SafeAreaView className="flex-1 px-5 pb-4 pt-1">
      <ScreenHeader title="Leaderboard" className="mb-2" />

      <FlatList
        data={remaining}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={
          <>
            <LeaderboardPodium entries={LEADERBOARD_DATA} />
            {remaining.length > 0 && (
              <View className="mb-3 mt-5 px-5">
                <Text
                  family="jakarta"
                  weight={700}
                  className="text-xs uppercase tracking-wider text-primary-navy"
                >
                  Rankings
                </Text>
              </View>
            )}
          </>
        }
        renderItem={({ item, index }) => (
          <LeaderboardListRow
            className="mx-5"
            rank={index + 4}
            entry={item}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}
