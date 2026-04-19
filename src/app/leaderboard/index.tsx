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
    <SafeAreaView className="flex-1 bg-background px-5 pb-4 pt-1">
      <ScreenHeader title="Leaderboard" className="mb-2" />

      <FlatList
        data={remaining}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={
          <>
            <LeaderboardPodium entries={LEADERBOARD_DATA} />
            {remaining.length > 0 && (
              <View className="mb-4 mt-6 rounded-[24px] border border-border-subtle bg-surface px-5 py-4">
                <Text
                  family="inter"
                  weight={700}
                  className="mb-1 text-xs uppercase tracking-[0.18em] text-text-muted"
                >
                  Rankings
                </Text>
                <Text family="jakarta" weight={800} className="text-xl text-primary-navy-dark">
                  Full Table
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
