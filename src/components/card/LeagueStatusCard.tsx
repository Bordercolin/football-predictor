import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import clsx from "clsx";
import { View } from "react-native";
import type { LeagueStatusCardProps } from "./card.types";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/utils/colors";

const DEFAULT_SECTION_LABEL = "YOUR CURRENT LEAGUE";




/**
 * League standing summary — editorial layout with faint users watermark.
 */
export default function LeagueStatusCard({
  leagueName,
  rankLabel,
  points,
  className,
  ...props
}: LeagueStatusCardProps) {
  return (
    <View
      className={clsx(
        "relative w-full overflow-hidden rounded-[30px] border border-border-subtle bg-primary-navy-dark px-6 py-6",
        className
      )}
      {...props}
    >
      <View className="absolute inset-x-0 top-0 h-24 bg-primary-blue/15" />
      <View className="absolute -right-3 -top-4 h-28 w-28 rounded-full bg-primary-blue/20" />
      <View className="absolute right-4 top-4 opacity-20">
        <Ionicons name="people" size={54} color={colors.white} />
      </View>

      <View className="mb-3 self-start rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
        <Text
          family="inter"
          weight={700}
          className="text-[11px] uppercase tracking-[0.18em] text-white/80"
        >
          {DEFAULT_SECTION_LABEL}
        </Text>
      </View>

      <View className="mb-8 pr-16">
        <Heading
          level={1}
          allCaps
          weight={800}
          className="mt-1.5 font-extrabold leading-tight text-white"
        >
          {leagueName}
        </Heading>
      </View>

      <View className="z-10 flex-row items-end justify-between">
        <View>
          <Text
            family="inter"
            weight={700}
            className="mb-2 text-[11px] uppercase tracking-[0.16em] text-white/65"
          >
            Current Position
          </Text>
          <Text
            family="jakarta"
            weight={800}
            className="text-3xl leading-none text-white"
          >
            {rankLabel}
          </Text>
        </View>
        <View className="items-end rounded-[24px] border border-white/10 bg-white/10 px-4 py-3">
          <Text
            family="inter"
            weight={700}
            className="text-[11px] uppercase tracking-[0.16em] text-white/65"
          >
            Points
          </Text>
          <Text
            family="jakarta"
            weight={700}
            className="text-[22px] leading-tight text-white"
          >
            {points} PTS
          </Text>
        </View>
      </View>
    </View>
  );
}
