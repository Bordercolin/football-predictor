import Emblem from "@/components/emblem/Emblem";
import FlagIcon from "@/components/flag/FlagIcon";
import Text from "@/components/typography/Text";
import colors from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { Pressable, View } from "react-native";
import type { DenseMatch } from "@/components/matches/matches.types";

export type PredictionFixtureCardProps = {
  match: DenseMatch;
  onPress?: () => void;
  className?: string;
};

function TeamBadge({
  name,
  flagCode,
}: {
  name?: string;
  flagCode?: string;
}) {
  const known = Boolean(name);

  return (
    <View className="flex-1 items-center">
      <Emblem size="md" className={clsx(!known && "bg-surface-muted")}>
        {flagCode ? <FlagIcon code={flagCode} size={42} /> : null}
        {!flagCode && !known ? (
          <Ionicons name="help" size={18} color={colors.text.soft} />
        ) : null}
      </Emblem>
      <Text
        family="inter"
        weight={700}
        numberOfLines={1}
        className={clsx(
          "mt-3 text-center text-sm uppercase tracking-[0.16em]",
          known ? "text-primary-navy-dark" : "text-text-soft",
        )}
      >
        {name ?? "TBD"}
      </Text>
    </View>
  );
}

export default function PredictionFixtureCard({
  match,
  onPress,
  className,
}: PredictionFixtureCardProps) {
  return (
    <View
      className={clsx(
        "rounded-[28px] border border-border-subtle bg-surface px-5 py-5",
        className,
      )}
      style={{
        shadowColor: colors.primary.navy.dark,
        shadowOpacity: 0.05,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
      }}
    >
      <View className="mb-5 flex-row items-center justify-between">
        <View className="rounded-full border border-border-subtle bg-surface-muted px-3.5 py-2">
          <Text
            family="inter"
            weight={700}
            className="text-xs uppercase tracking-[0.16em] text-text-muted"
          >
            {match.kickoffLabel}
          </Text>
        </View>

        <View
          className={clsx(
            "rounded-full border px-3.5 py-2",
            match.isPredicted
              ? "border-primary-blue/20 bg-primary-blue-light/25"
              : "border-primary-red/20 bg-primary-red-light/25",
          )}
        >
          <Text
            family="inter"
            weight={700}
            className={clsx(
              "text-xs uppercase tracking-[0.16em]",
              match.isPredicted ? "text-primary-blue-dark" : "text-primary-red-dark",
            )}
          >
            {match.isPredicted ? "Predicted" : "Open"}
          </Text>
        </View>
      </View>

      <View className="mb-5 flex-row items-center justify-between">
        <TeamBadge name={match.home.name} flagCode={match.home.flagCode} />
        <View className="px-4">
          <Text family="inter" weight={800} className="text-sm uppercase tracking-[0.24em] text-text-soft">
            VS
          </Text>
        </View>
        <TeamBadge name={match.away.name} flagCode={match.away.flagCode} />
      </View>

      <View className="rounded-[22px] border border-border-subtle bg-surface-tinted px-4 py-4">
        <Text family="inter" weight={700} className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
          {match.groupLabel}
        </Text>
        <Text family="jakarta" weight={800} className="mt-2 text-lg text-primary-navy-dark">
          {match.pickLabel ? `Your pick ${match.pickLabel}` : "No prediction saved yet"}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={match.isPredicted ? "Edit prediction" : "Predict match"}
        onPress={onPress}
        className={clsx(
          "mt-4 items-center justify-center rounded-2xl py-3.5",
          match.isPredicted ? "bg-primary-blue" : "bg-primary-navy-dark",
        )}
      >
        <Text family="inter" weight={800} className="text-sm text-white">
          {match.isPredicted ? "Edit Prediction" : "Predict Now"}
        </Text>
      </Pressable>
    </View>
  );
}
