import Emblem from "@/components/emblem/Emblem";
import FlagIcon from "@/components/flag/FlagIcon";
import Text from "@/components/typography/Text";
import colors from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { View } from "react-native";
import type { MatchCardProps } from "./card.types";

export default function MatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  predictedHomeScore,
  predictedAwayScore,
  kickoffTime,
  powerUp,
  homeFlagCode,
  awayFlagCode,
  className,
  ...props
}: MatchCardProps) {
  const hasPrediction =
    typeof predictedHomeScore === "number" &&
    typeof predictedAwayScore === "number";

  return (
    <View
      className={clsx(
        "w-full rounded-[30px] border border-border-subtle bg-surface px-6 pb-7 pt-5",
        className
      )}
      style={{
        shadowColor: colors.primary.navy.dark,
        shadowOpacity: 0.06,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 5,
      }}
      {...props}
    >
      <View className="mb-6 flex-row items-center justify-between">
        <View className="rounded-full border border-primary-blue/15 bg-primary-blue-light/35 px-3.5 py-2">
          <Text
            family="inter"
            weight={700}
            className="text-xs uppercase tracking-wide"
            style={{ color: colors.primary.navy.dark }}
          >
            {kickoffTime} KICKOFF
          </Text>
        </View>

        {powerUp && (
          <View className="flex-row items-center gap-1.5">
            <Ionicons
              name="flash"
              size={15}
              color={colors.primary.blue.DEFAULT}
            />
            <Text
              family="inter"
              weight={600}
              className="text-xs uppercase tracking-wide text-primary-blue"
            >
              {powerUp}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-center py-2">
        <View className="flex-1 items-center gap-3">
          <Emblem size="lg">
            {homeFlagCode ? <FlagIcon code={homeFlagCode} size={64} /> : null}
          </Emblem>
          <Text
            family="inter"
            weight={700}
            className="text-base uppercase tracking-[0.18em] text-primary-navy-dark"
          >
            {homeTeam}
          </Text>
        </View>

        <View className="items-center px-4">
          <View className="flex-row items-center gap-4">
            <Text
              family="jakarta"
              weight={800}
              className="text-3xl text-primary-navy-dark"
            >
              {homeScore}
            </Text>
            <Text
              family="jakarta"
              weight={400}
              className="text-3xl text-primary-grey"
            >
              -
            </Text>
            <Text
              family="jakarta"
              weight={800}
              className="text-3xl text-primary-navy-dark"
            >
              {awayScore}
            </Text>
          </View>

          {hasPrediction && (
            <View className="mt-4 items-center rounded-2xl border border-border-subtle bg-surface-tinted px-5 py-3">
              <Text
                family="inter"
                weight={600}
                className="mb-1 text-[10px] uppercase tracking-[0.14em] text-primary-grey-dark"
              >
                Predicted
              </Text>
              <View className="flex-row items-center gap-2.5">
                <Text
                  family="jakarta"
                  weight={700}
                  className="text-xl text-primary-navy"
                >
                  {predictedHomeScore}
                </Text>
                <Text
                  family="jakarta"
                  weight={400}
                  className="text-lg text-primary-grey"
                >
                  -
                </Text>
                <Text
                  family="jakarta"
                  weight={700}
                  className="text-xl text-primary-navy"
                >
                  {predictedAwayScore}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View className="flex-1 items-center gap-3">
          <Emblem size="lg">
            {awayFlagCode ? <FlagIcon code={awayFlagCode} size={64} /> : null}
          </Emblem>
          <Text
            family="inter"
            weight={700}
            className="text-base uppercase tracking-[0.18em] text-primary-navy-dark"
          >
            {awayTeam}
          </Text>
        </View>
      </View>
    </View>
  );
}
