import ScreenHeader from "@/components/core/ScreenHeader";
import FlagIcon from "@/components/flag/FlagIcon";
import StageSelector from "@/components/matches/StageSelector";
import type { TournamentStageKey } from "@/components/matches/matches.types";
import Text from "@/components/typography/Text";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StandingTeam = {
  name: string;
  flagCode: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  points: number;
};

type StandingGroup = {
  key: TournamentStageKey;
  title: string;
  teams: StandingTeam[];
};

const STANDING_GROUPS: StandingGroup[] = [
  {
    key: "group_a",
    title: "Group A",
    teams: [
      { name: "Germany", flagCode: "de", played: 3, won: 2, drawn: 1, lost: 0, gf: 8, ga: 2, points: 7 },
      { name: "Switzerland", flagCode: "ch", played: 3, won: 1, drawn: 2, lost: 0, gf: 5, ga: 3, points: 5 },
      { name: "Hungary", flagCode: "hu", played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 6, points: 3 },
      { name: "Scotland", flagCode: "gb-sct", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 7, points: 1 },
    ],
  },
  {
    key: "group_b",
    title: "Group B",
    teams: [
      { name: "Spain", flagCode: "es", played: 3, won: 3, drawn: 0, lost: 0, gf: 6, ga: 1, points: 9 },
      { name: "Italy", flagCode: "it", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 3, points: 4 },
      { name: "Croatia", flagCode: "hr", played: 3, won: 0, drawn: 2, lost: 1, gf: 3, ga: 5, points: 2 },
      { name: "Albania", flagCode: "al", played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 6, points: 1 },
    ],
  },
  {
    key: "group_c",
    title: "Group C",
    teams: [
      { name: "England", flagCode: "gb-eng", played: 3, won: 1, drawn: 2, lost: 0, gf: 4, ga: 2, points: 5 },
      { name: "Denmark", flagCode: "dk", played: 3, won: 0, drawn: 3, lost: 0, gf: 3, ga: 3, points: 3 },
      { name: "Slovenia", flagCode: "si", played: 3, won: 0, drawn: 3, lost: 0, gf: 2, ga: 2, points: 3 },
      { name: "Serbia", flagCode: "rs", played: 3, won: 0, drawn: 2, lost: 1, gf: 1, ga: 3, points: 2 },
    ],
  },
];

const STAGE_OPTIONS: Array<{ key: TournamentStageKey; label: string }> = [
  { key: "all", label: "All Groups" },
  { key: "group_a", label: "Group A" },
  { key: "group_b", label: "Group B" },
  { key: "group_c", label: "Group C" },
];

function gd(team: StandingTeam) {
  return team.gf - team.ga;
}

export default function Standings() {
  const [activeKey, setActiveKey] = useState<TournamentStageKey>("all");

  const groups = useMemo(() => {
    if (activeKey === "all") return STANDING_GROUPS;
    return STANDING_GROUPS.filter((g) => g.key === activeKey);
  }, [activeKey]);

  return (
    <SafeAreaView className="flex-1 pb-4 pt-1">
      <View className="px-5">
        <ScreenHeader title="Standings" className="mb-4" />
      </View>

      <StageSelector
        className="mb-3"
        options={STAGE_OPTIONS}
        activeKey={activeKey}
        onChange={setActiveKey}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="px-5">
          {groups.map((group) => (
            <View key={group.key} className="mb-5">
              <Text family="jakarta" weight={800} className="mb-3 text-2xl text-primary-navy-dark">
                {group.title}
              </Text>

              <View className="overflow-hidden rounded-2xl bg-white">
                <View className="flex-row items-center border-b border-primary-grey px-3 py-2">
                  <Text family="inter" weight={700} className="w-6 text-sm uppercase text-primary-grey-dark">
                    #
                  </Text>
                  <Text family="inter" weight={700} className="flex-1 text-sm uppercase text-primary-grey-dark">
                    Team
                  </Text>
                  {["P", "W", "D", "L", "GF", "GA", "GD", "PTS"].map((h) => (
                    <Text
                      key={h}
                      family="inter"
                      weight={700}
                      className={clsx("w-8 text-right text-sm uppercase text-primary-grey-dark", h === "PTS" && "w-10")}
                    >
                      {h}
                    </Text>
                  ))}
                </View>

                {group.teams.map((team, index) => (
                  <View
                    key={team.name}
                    className={clsx(
                      "flex-row items-center border-b border-primary-grey-light px-3 py-2.5",
                      index === group.teams.length - 1 && "border-b-0",
                      index < 2 && "bg-primary-blue-light/20",
                    )}
                  >
                    <Text family="inter" weight={700} className="w-6 text-xs text-primary-grey-dark">
                      {index + 1}
                    </Text>

                    <View className="mr-2">
                      <FlagIcon code={team.flagCode} size={16} />
                    </View>

                    <Text
                      family="inter"
                      weight={700}
                      numberOfLines={1}
                      className="flex-1 text-xs text-primary-navy-dark"
                    >
                      {team.name}
                    </Text>

                    <Text family="inter" weight={600} className="w-8 text-right text-xs text-primary-grey-dark">
                      {team.played}
                    </Text>
                    <Text family="inter" weight={600} className="w-8 text-right text-xs text-primary-grey-dark">
                      {team.won}
                    </Text>
                    <Text family="inter" weight={600} className="w-8 text-right text-xs text-primary-grey-dark">
                      {team.drawn}
                    </Text>
                    <Text family="inter" weight={600} className="w-8 text-right text-xs text-primary-grey-dark">
                      {team.lost}
                    </Text>
                    <Text family="inter" weight={600} className="w-8 text-right text-xs text-primary-grey-dark">
                      {team.gf}
                    </Text>
                    <Text family="inter" weight={600} className="w-8 text-right text-xs text-primary-grey-dark">
                      {team.ga}
                    </Text>
                    <Text family="inter" weight={600} className="w-8 text-right text-xs text-primary-grey-dark">
                      {gd(team)}
                    </Text>
                    <Text family="inter" weight={800} className="w-10 text-right text-xs text-primary-navy-dark">
                      {team.points}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

