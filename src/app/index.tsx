import LeagueStatusCard from "@/components/card/LeagueStatusCard";
import MatchCard from "@/components/card/MatchCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center px-5 bg-primary-grey-light">
      <LeagueStatusCard
        className="w-full max-w-md"
        leagueName="THE OFFICE LEAGUE"
        rankLabel="2nd Place"
        points={42}
      />

      <MatchCard
        className="mt-5 w-full max-w-md"
        homeTeam="USA"
        awayTeam="FRA"
        homeScore={2}
        awayScore={1}
        predictedHomeScore={2}
        predictedAwayScore={0}
        kickoffTime="21:00"
        powerUp="UNDERDOG MULTIPLIER X1.5"
        homeFlagCode="us"
        awayFlagCode="fr"
      />
    </SafeAreaView>
  );
}
