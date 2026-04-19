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
        "relative w-full overflow-hidden rounded-2xl bg-primary-grey p-6",
        className
      )}
      {...props}
    >
      <View className="absolute right-4 top-3 opacity-20">
        <Ionicons name="people" size={50} color={colors.primary.navy.dark} />
      </View>


      <View className="mb-8 pr-16">
        
        <Heading
          level={1}
          allCaps
          weight={800}
          className="mt-1.5 font-extrabold leading-tight text-primary-navy-dark"
        >
          {leagueName}
        </Heading>
      </View>

      <View className="z-10 flex-row items-end justify-between">
        <Text
          family="jakarta"
          weight={800}
          className="text-3xl leading-none text-primary-navy-dark"
        >
          {rankLabel}
        </Text>
        <View className="items-end">
          <Text
            family="jakarta"
            weight={700}
            className="text-[22px] leading-tight text-primary-navy-dark"
          >
            {points} PTS
          </Text>

        </View>
      </View>
    </View>
  );
}
