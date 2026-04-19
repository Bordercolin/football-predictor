import Emblem from "@/components/emblem/Emblem";
import FlagIcon from "@/components/flag/FlagIcon";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import colors from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { Modal, Pressable, View } from "react-native";
import type { DenseMatch, PredictionModalProps } from "./matches.types";

function ScoreStepper({
  label,
  flagCode,
  value,
  onChange,
}: {
  label: string;
  flagCode?: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <View className="flex-1 items-center">
      <Emblem size="md">
        {flagCode ? <FlagIcon code={flagCode} size={44} /> : null}
      </Emblem>
      <Text
        family="inter"
        weight={700}
        numberOfLines={1}
        className="mt-2 text-center text-sm uppercase tracking-wide text-primary-navy-dark"
      >
        {label}
      </Text>

      <View className="mt-4 items-center">
        <Pressable
          accessibilityRole="button"
          onPress={() => onChange(value + 1)}
          className="h-11 w-11 items-center justify-center rounded-full bg-primary-grey active:opacity-80"
        >
          <Ionicons name="chevron-up" size={22} color={colors.primary.navy.dark} />
        </Pressable>

        <View className="my-3 h-14 w-16 items-center justify-center rounded-2xl bg-white">
          <Text family="jakarta" weight={800} className="text-3xl text-primary-navy-dark">
            {value}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => onChange(Math.max(0, value - 1))}
          className="h-11 w-11 items-center justify-center rounded-full bg-primary-grey active:opacity-80"
        >
          <Ionicons name="chevron-down" size={22} color={colors.primary.navy.dark} />
        </Pressable>
      </View>
    </View>
  );
}



export default function PredictionModal({
  visible,
  match,
  homeScore,
  awayScore,
  onChangeHomeScore,
  onChangeAwayScore,
  onCancel,
  onSave,
}: PredictionModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <View className="flex-1 justify-end bg-black/40">
        <View className="rounded-t-3xl bg-primary-grey-light px-5 pb-6 pt-4">
          <View className="mb-4 items-center">
            <View className="h-1.5 w-12 rounded-full bg-primary-grey" />
          </View>

          <View className="mb-5 flex-row items-center justify-between">
            <Pressable onPress={onCancel} className="h-10 w-10 items-center justify-center rounded-full bg-primary-grey">
              <Ionicons name="close" size={18} color={colors.primary.navy.dark} />
            </Pressable>

            <Heading level={2} className="text-primary-navy-dark">
              Predict Score
            </Heading>

            <View className="h-10 w-10" />
          </View>

          <View className="mb-4 rounded-2xl bg-white px-4 py-3">
            <Text family="inter" weight={700} className="text-xs uppercase tracking-wider text-primary-grey-dark">
              {match?.kickoffLabel ?? "Upcoming match"}
            </Text>
            <Text family="jakarta" weight={800} className="mt-1 text-base text-primary-navy-dark">
              {match?.groupLabel ?? "Match"}
            </Text>
          </View>

          <View className={clsx("flex-row items-start justify-between gap-4", !match && "opacity-60")}>
            <ScoreStepper
              label={match?.home.name ?? "TBD"}
              flagCode={match?.home.flagCode}
              value={homeScore}
              onChange={onChangeHomeScore}
            />

            <View className="mt-[78px] items-center">
              <Text family="inter" weight={800} className="text-sm uppercase tracking-widest text-primary-grey-dark">
                VS
              </Text>
            </View>

            <ScoreStepper
              label={match?.away.name ?? "TBD"}
              flagCode={match?.away.flagCode}
              value={awayScore}
              onChange={onChangeAwayScore}
            />
          </View>

          <View className="mt-6 flex-row gap-3">
            <Pressable
              onPress={onCancel}
              className="flex-1 items-center justify-center rounded-xl bg-primary-grey py-3"
            >
              <Text family="inter" weight={800} className="text-sm text-primary-navy-dark">
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={onSave}
              className="flex-1 items-center justify-center rounded-xl bg-primary-navy-dark py-3"
            >
              <Text family="inter" weight={800} className="text-sm text-white">
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

