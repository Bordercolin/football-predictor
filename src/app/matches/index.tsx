import DenseMatchCard from "@/components/matches/DenseMatchCard";
import PredictionModal from "@/components/matches/PredictionModal";
import StageSelector from "@/components/matches/StageSelector";
import type {
  DenseMatch,
  TournamentStageKey,
} from "@/components/matches/matches.types";
import ScreenHeader from "@/components/core/ScreenHeader";
import Text from "@/components/typography/Text";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { SectionList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STAGES: Array<{ key: TournamentStageKey; label: string }> = [
  { key: "all", label: "All Stages" },
  { key: "group_a", label: "Group A" },
  { key: "group_b", label: "Group B" },
  { key: "group_c", label: "Group C" },
];

const SAMPLE_MATCHES: DenseMatch[] = [
  // Group A
  {
    id: "ga-1",
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
    id: "ga-2",
    stage: "group_a",
    groupLabel: "Group A",
    kickoffLabel: "24 Oct • 21:00",
    status: "scheduled",
    home: { name: "Hungary", flagCode: "hu" },
    away: { name: "Switzerland", flagCode: "ch" },
    isPredicted: false,
  },
  {
    id: "ga-3",
    stage: "group_a",
    groupLabel: "Group A",
    kickoffLabel: "25 Oct • 18:00",
    status: "live",
    home: { name: "Germany", flagCode: "de" },
    away: { name: "Switzerland", flagCode: "ch" },
    homeScore: 1,
    awayScore: 0,
    isPredicted: true,
    pickLabel: "(1-1)",
  },

  // Group B
  {
    id: "gb-1",
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
    id: "gb-2",
    stage: "group_b",
    groupLabel: "Group B",
    kickoffLabel: "26 Oct • 21:00",
    status: "finished",
    home: { name: "Croatia", flagCode: "hr" },
    away: { name: "Albania", flagCode: "al" },
    homeScore: 2,
    awayScore: 2,
    isPredicted: true,
    pickLabel: "(2-1)",
  },

  // Group C (unknown teams cases)
  {
    id: "gc-1",
    stage: "group_c",
    groupLabel: "Group C",
    kickoffLabel: "28 Oct • 18:00",
    status: "scheduled",
    home: {},
    away: {},
    isPredicted: false,
  },
  {
    id: "gc-2",
    stage: "group_c",
    groupLabel: "Group C",
    kickoffLabel: "28 Oct • 21:00",
    status: "scheduled",
    home: { name: "France", flagCode: "fr" },
    away: {},
    isPredicted: false,
  },
];

type MatchesSection = {
  title: string;
  data: DenseMatch[];
  matchesRemainingLabel: string;
};

function groupByLabel(matches: DenseMatch[]): MatchesSection[] {
  const map = new Map<string, DenseMatch[]>();
  for (const m of matches) {
    const arr = map.get(m.groupLabel) ?? [];
    arr.push(m);
    map.set(m.groupLabel, arr);
  }

  return Array.from(map.entries()).map(([title, data]) => {
    const remaining = data.filter((m) => m.status !== "finished").length;
    return {
      title,
      data,
      matchesRemainingLabel: `${remaining} match${remaining === 1 ? "" : "es"} remaining`,
    };
  });
}

export default function Matches() {
  const [activeStage, setActiveStage] = useState<TournamentStageKey>("all");
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);
  const [predictionHome, setPredictionHome] = useState(0);
  const [predictionAway, setPredictionAway] = useState(0);
  const [predictionsById, setPredictionsById] = useState<
    Record<string, { home: number; away: number }>
  >({});

  const matchesWithPredictions = useMemo(() => {
    return SAMPLE_MATCHES.map((m) => {
      const saved = predictionsById[m.id];
      if (!saved) return m;
      return {
        ...m,
        isPredicted: true,
        pickLabel: `${m.home.name ?? "TBD"} (${saved.home}-${saved.away})`,
      };
    });
  }, [predictionsById]);

  const filtered = useMemo(() => {
    if (activeStage === "all") return matchesWithPredictions;
    return matchesWithPredictions.filter((m) => m.stage === activeStage);
  }, [activeStage, matchesWithPredictions]);

  const sections = useMemo(() => groupByLabel(filtered), [filtered]);

  const activeMatch = useMemo(() => {
    if (!activeMatchId) return null;
    return matchesWithPredictions.find((m) => m.id === activeMatchId) ?? null;
  }, [activeMatchId, matchesWithPredictions]);

  const openPredictionModal = (match: DenseMatch) => {
    if (match.status !== "scheduled") return;
    setActiveMatchId(match.id);
    const saved = predictionsById[match.id];
    setPredictionHome(saved?.home ?? 0);
    setPredictionAway(saved?.away ?? 0);
  };

  return (
    <SafeAreaView className="flex-1 bg-background pb-4 pt-1">
      <View className="px-5">
        <ScreenHeader title="Matches" className="mb-4" />
      </View>

      <StageSelector
        className="mb-3"
        options={STAGES}
        activeKey={activeStage}
        onChange={setActiveStage}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        SectionSeparatorComponent={() => <View className="h-6" />}
        renderSectionHeader={({ section }) => (
          <View className="px-5">
            <View className="mb-3 rounded-[24px] border border-border-subtle bg-surface px-4 py-4">
              <View className="flex-row items-baseline justify-between">
                <Text
                  family="jakarta"
                  weight={800}
                  className="text-2xl text-primary-navy-dark"
                >
                  {section.title}
                </Text>
                <Text
                  family="inter"
                  weight={700}
                  className="text-xs uppercase tracking-[0.16em] text-primary-grey-dark"
                >
                  {section.matchesRemainingLabel}
                </Text>
              </View>
            </View>
          </View>
        )}
        renderItem={({ item, index, section }) => (
          <View className={clsx("px-5", index === 0 ? "" : "mt-3")}>
            <DenseMatchCard
              match={item}
              onPress={() => openPredictionModal(item)}
              onPredictNowPress={() => openPredictionModal(item)}
            />
          </View>
        )}
        renderSectionFooter={({ section }) => <View className="h-2" />}
        ListEmptyComponent={
          <View className="px-5 pt-8">
            <Text family="jakarta" weight={700} className="text-base text-primary-grey-dark">
              No matches for this stage yet.
            </Text>
          </View>
        }
      />

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
