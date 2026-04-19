import LeagueStatusCard from "@/components/card/LeagueStatusCard";
import MatchCardCarousel from "@/components/carousel/MatchCardCarousel";
import type { MatchCardProps } from "@/components/card/card.types";
import MiniLeaderboard from "@/components/leaderboard/MiniLeaderboard";
import type { LeaderboardEntry } from "@/components/leaderboard/MiniLeaderboard";
import ScreenHeader from "@/components/core/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native";

const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  { name: "Alex Thompson", points: 58 },
  { name: "You", points: 42, isCurrentUser: true },
  { name: "Jamie Wilson", points: 39 },
];

const SAMPLE_MATCHES: MatchCardProps[] = [
  {
    homeTeam: "USA",
    awayTeam: "FRA",
    homeScore: 2,
    awayScore: 1,
    predictedHomeScore: 2,
    predictedAwayScore: 0,
    kickoffTime: "21:00",
    powerUp: "UNDERDOG MULTIPLIER X1.5",
    homeFlagCode: "us",
    awayFlagCode: "fr",
  },
  {
    homeTeam: "ESP",
    awayTeam: "GER",
    homeScore: 1,
    awayScore: 1,
    predictedHomeScore: 2,
    predictedAwayScore: 1,
    kickoffTime: "18:45",
    powerUp: "DOUBLE POINTS",
    homeFlagCode: "es",
    awayFlagCode: "de",
  },
  {
    homeTeam: "BRA",
    awayTeam: "ARG",
    homeScore: 0,
    awayScore: 0,
    kickoffTime: "20:00",
    homeFlagCode: "br",
    awayFlagCode: "ar",
  },
];

export default function Home() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 items-center px-5 pb-4 pt-1">
        <ScrollView>
          <ScreenHeader title="Home" className="mb-4" />
          <LeagueStatusCard
            className="w-full max-w-md"
            leagueName="THE OFFICE LEAGUE"
            rankLabel="2nd Place"
            points={42}
          />

          <MatchCardCarousel
            className="mt-5 w-full max-w-md"
            matches={SAMPLE_MATCHES}
          />

          <MiniLeaderboard
            className="mt-5 w-full max-w-md"
            entries={SAMPLE_LEADERBOARD}
            currentUserRank={2}
          />
       
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
