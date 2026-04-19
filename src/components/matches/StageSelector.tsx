import Text from "@/components/typography/Text";
import clsx from "clsx";
import { Pressable, ScrollView, View } from "react-native";
import type { TournamentStageKey } from "./matches.types";

export type StageOption = {
  key: TournamentStageKey;
  label: string;
};

export type StageSelectorProps = {
  options: StageOption[];
  activeKey: TournamentStageKey;
  onChange: (key: TournamentStageKey) => void;
  className?: string;
};

export default function StageSelector({
  options,
  activeKey,
  onChange,
  className,
}: StageSelectorProps) {
  return (
    <View className={clsx("w-full", className)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
      >
        {options.map((opt) => {
          const active = opt.key === activeKey;
          return (
            <Pressable
              key={opt.key}
              onPress={() => onChange(opt.key)}
              className={clsx(
                "rounded-full px-5 py-3",
                active ? "bg-primary-navy-dark" : "bg-primary-grey",
              )}
            >
              <Text
                family="inter"
                weight={700}
                className={clsx("text-sm", active ? "text-white" : "text-primary-grey-dark")}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

