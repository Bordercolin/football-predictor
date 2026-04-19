import Emblem from "@/components/emblem/Emblem";
import FlagIcon from "@/components/flag/FlagIcon";
import Text from "@/components/typography/Text";
import colors from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { Pressable, View } from "react-native";
import type { DenseMatch, MatchTeam } from "./matches.types";

function TeamSlot({ team }: { team: MatchTeam }) {
  const known = Boolean(team?.name);
  const label = known ? team.name! : "TBD";

  return (
    <View className="flex-1 items-center">
      <Emblem size="md" className={clsx(!known && "bg-primary-grey-light")}>
        {team.flagCode ? <FlagIcon code={team.flagCode} size={44} /> : null}
        {!team.flagCode && !known ? (
          <Ionicons name="help" size={18} color={colors.primary.grey.dark} />
        ) : null}
      </Emblem>
      <Text
        family="inter"
        weight={700}
        numberOfLines={1}
        className={clsx(
          "mt-3 text-center text-sm uppercase tracking-[0.16em]",
          known ? "text-primary-navy-dark" : "text-primary-grey-dark",
        )}
      >
        {label}
      </Text>
    </View>
  );
}

function StatusChip({ match }: { match: DenseMatch }) {
  const base = "flex-row items-center gap-1.5 rounded-full px-3.5 py-2";

  if (match.isPredicted) {
    return (
      <View className={clsx(base, "bg-primary-blue-light/50")}>
        <Ionicons name="checkmark-circle" size={14} color={colors.primary.blue.DEFAULT} />
        <Text
          family="inter"
          weight={700}
          className="text-xs text-primary-blue"
        >
          Predicted
        </Text>
      </View>
    );
  }

  return (
    <View className={clsx(base, "bg-primary-red-light/35")}>
      <Ionicons name="close-circle" size={14} color={colors.primary.red.DEFAULT} />
      <Text
        family="inter"
        weight={700}
        className="text-xs text-primary-red"
      >
        Not Predicted
      </Text>
    </View>
  );
}

function CenterScore({ match }: { match: DenseMatch }) {
  const showScore =
    (match.status === "live" || match.status === "finished") &&
    typeof match.homeScore === "number" &&
    typeof match.awayScore === "number";

  if (showScore) {
    return (
      <View className="items-center px-3">
        {match.status === "live" && (
          <View className="mb-1.5 flex-row items-center gap-2">
            <View className="h-2 w-2 rounded-full bg-primary-red" />
            <Text family="inter" weight={700} className="text-[10px] uppercase text-primary-red">
              Live
            </Text>
          </View>
        )}
        <View className="flex-row items-center gap-2">
          <Text family="jakarta" weight={800} className="text-xl text-primary-navy-dark">
            {match.homeScore}
          </Text>
          <Text family="jakarta" weight={400} className="text-xl text-primary-grey">
            -
          </Text>
          <Text family="jakarta" weight={800} className="text-xl text-primary-navy-dark">
            {match.awayScore}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="items-center px-3">
      <Text family="inter" weight={800} className="text-base uppercase tracking-widest text-primary-grey">
        VS
      </Text>
    </View>
  );
}

export type DenseMatchCardProps = {
  match: DenseMatch;
  className?: string;
  onPress?: () => void;
  onPredictNowPress?: () => void;
};

export default function DenseMatchCard({
  match,
  className,
  onPress,
  onPredictNowPress,
}: DenseMatchCardProps) {
  const canEditPrediction = match.status === "scheduled";

  return (
    <View
      className={clsx("w-full rounded-[28px] border border-border-subtle bg-surface p-5", className)}
      style={{
        shadowColor: colors.primary.navy.dark,
        shadowOpacity: 0.05,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
      }}
    >
      <View className="mb-4 flex-row items-center justify-between">
        <View className="rounded-full border border-border-subtle bg-surface-muted px-3.5 py-2">
          <Text
            family="inter"
            weight={700}
            className="text-xs uppercase tracking-wide text-primary-grey-dark"
          >
            {match.kickoffLabel}
          </Text>
        </View>
        <StatusChip match={match} />
      </View>

      <View className="flex-row items-center justify-between">
        <TeamSlot team={match.home} />
        <CenterScore match={match} />
        <TeamSlot team={match.away} />
      </View>

      {match.isPredicted && match.pickLabel ? (
        <View className="mt-4 flex-row items-center justify-between">
          <Text family="inter" weight={600} className="text-sm text-primary-grey-dark">
            Your Pick:{" "}
            <Text family="inter" weight={700} className="text-sm text-primary-navy-dark">
              {match.pickLabel}
            </Text>
          </Text>
          {canEditPrediction ? (
            <Pressable
              onPress={onPress}
              className="h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface-muted active:opacity-80"
              accessibilityRole="button"
              accessibilityLabel="Edit prediction"
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={colors.primary.navy.dark}
              />
            </Pressable>
          ) : (
            <View className="flex-row items-center gap-1 rounded-full bg-primary-grey px-3 py-2">
              <Ionicons
                name="lock-closed"
                size={14}
                color={colors.primary.grey.dark}
              />
              <Text
                family="inter"
                weight={700}
                className="text-xs uppercase tracking-wide text-primary-grey-dark"
              >
                Locked
              </Text>
            </View>
          )}
        </View>
      ) : (
        <>
          {canEditPrediction ? (
            <Pressable
              onPress={onPredictNowPress ?? onPress}
              className="mt-4 items-center justify-center rounded-2xl bg-primary-navy-dark py-3.5"
            >
              <Text family="inter" weight={800} className="text-sm text-white">
                Predict Now
              </Text>
            </Pressable>
          ) : (
            <View className="mt-4 items-center justify-center rounded-2xl bg-primary-grey py-3.5">
              <Text
                family="inter"
                weight={800}
                className="text-sm text-primary-grey-dark"
              >
                Locked
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}
