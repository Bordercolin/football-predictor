import ScreenHeader from "@/components/core/ScreenHeader";
import PredictionModal from "@/components/matches/PredictionModal";
import type { DenseMatch } from "@/components/matches/matches.types";
import PredictionFixtureCard from "@/components/predictions/PredictionFixtureCard";
import PredictionSummaryCard from "@/components/predictions/PredictionSummaryCard";
import Text from "@/components/typography/Text";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PREDICTION_FIXTURES: DenseMatch[] = [
  {
    id: "pred-1",
    stage: "group_a",
    groupLabel: "Group A",
    kickoffLabel: "24 Oct • 18:00",
    status: "scheduled",
    home: { name: "Germany", flagCode: "de" },
    away: { name: "Scotland", flagCode: "gb-sct" },
    isPredicted: true,
    pickLabel: "(2-0)",
  },
  {
    id: "pred-2",
    stage: "group_a",
    groupLabel: "Group A",
    kickoffLabel: "24 Oct • 21:00",
    status: "scheduled",
    home: { name: "Hungary", flagCode: "hu" },
    away: { name: "Switzerland", flagCode: "ch" },
    isPredicted: false,
  },
  {
    id: "pred-3",
    stage: "group_b",
    groupLabel: "Group B",
    kickoffLabel: "25 Oct • 18:00",
    status: "scheduled",
    home: { name: "Spain", flagCode: "es" },
    away: { name: "Italy", flagCode: "it" },
    isPredicted: true,
    pickLabel: "(1-1)",
  },
  {
    id: "pred-4",
    stage: "group_c",
    groupLabel: "Group C",
    kickoffLabel: "28 Oct • 18:00",
    status: "scheduled",
    home: {},
    away: {},
    isPredicted: false,
  },
];

export default function Predictions() {
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);
  const [predictionHome, setPredictionHome] = useState(0);
  const [predictionAway, setPredictionAway] = useState(0);
  const [predictionsById, setPredictionsById] = useState<
    Record<string, { home: number; away: number }>
  >({
    "pred-1": { home: 2, away: 0 },
    "pred-3": { home: 1, away: 1 },
  });

  const fixtures = useMemo(() => {
    return PREDICTION_FIXTURES.map((match) => {
      const saved = predictionsById[match.id];
      if (!saved) {
        return {
          ...match,
          isPredicted: false,
          pickLabel: undefined,
        };
      }

      return {
        ...match,
        isPredicted: true,
        pickLabel: `(${saved.home}-${saved.away})`,
      };
    });
  }, [predictionsById]);

  const activeMatch = useMemo(() => {
    if (!activeMatchId) return null;
    return fixtures.find((match) => match.id === activeMatchId) ?? null;
  }, [activeMatchId, fixtures]);

  const predictedCount = fixtures.filter((match) => match.isPredicted).length;

  const openPredictionModal = (match: DenseMatch) => {
    setActiveMatchId(match.id);
    const saved = predictionsById[match.id];
    setPredictionHome(saved?.home ?? 0);
    setPredictionAway(saved?.away ?? 0);
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-5 pb-4 pt-1">
      <ScreenHeader title="Predictions" className="mb-4" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <PredictionSummaryCard
          predictedCount={predictedCount}
          totalCount={fixtures.length}
          pointsProjection={predictedCount * 3 + 6}
        />

        <View className="mt-6 mb-3 rounded-[24px] border border-border-subtle bg-surface px-4 py-4">
          <Text family="inter" weight={700} className="mb-1 text-[11px] uppercase tracking-[0.18em] text-text-muted">
            Upcoming Fixtures
          </Text>
          <Text family="jakarta" weight={800} className="text-2xl text-primary-navy-dark">
            Make Your Picks
          </Text>
          <Text className="mt-2 text-sm leading-6 text-text-muted">
            Focus on the next matches first. You can edit any open prediction until kickoff.
          </Text>
        </View>

        <View className="gap-4">
          {fixtures.map((match) => (
            <PredictionFixtureCard
              key={match.id}
              match={match}
              onPress={() => openPredictionModal(match)}
            />
          ))}
        </View>
      </ScrollView>

      <PredictionModal
        visible={Boolean(activeMatchId)}
        match={activeMatch}
        homeScore={predictionHome}
        awayScore={predictionAway}
        onChangeHomeScore={setPredictionHome}
        onChangeAwayScore={setPredictionAway}
        onCancel={() => setActiveMatchId(null)}
        onSave={() => {
          if (!activeMatchId) return;
          setPredictionsById((prev) => ({
            ...prev,
            [activeMatchId]: { home: predictionHome, away: predictionAway },
          }));
          setActiveMatchId(null);
        }}
      />
    </SafeAreaView>
  );
}
