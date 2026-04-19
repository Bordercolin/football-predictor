import Text from "@/components/typography/Text";
import clsx from "clsx";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export type PredictionSummaryCardProps = {
  predictedCount: number;
  totalCount: number;
  pointsProjection: number;
  className?: string;
};

export default function PredictionSummaryCard({
  predictedCount,
  totalCount,
  pointsProjection,
  className,
}: PredictionSummaryCardProps) {
  const remaining = Math.max(totalCount - predictedCount, 0);

  return (
    <View
      className={clsx(
        "overflow-hidden rounded-[32px] border border-primary-blue/20 bg-primary-navy-dark px-6 py-6",
        className,
      )}
    >
      <View className="absolute inset-x-0 top-0 h-24 bg-primary-blue/15" />
      <View className="absolute -right-4 -top-6 h-32 w-32 rounded-full bg-primary-blue/20" />

      <View className="mb-4 self-start rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
        <Text
          family="inter"
          weight={700}
          className="text-[11px] uppercase tracking-[0.18em] text-white/80"
        >
          Main Focus
        </Text>
      </View>

      <Text family="jakarta" weight={800} className="max-w-[240px] text-3xl leading-tight text-white">
        Predict matches and climb the table.
      </Text>

      <Text family="inter" weight={400} className="mt-3 max-w-[280px] text-sm leading-6 text-white/72">
        Lock in your scores before kickoff, stack bonus opportunities, and turn every fixture into points.
      </Text>

      <View className="mt-6 flex-row gap-3">
        <View className="flex-1 rounded-[24px] border border-white/10 bg-white/10 px-4 py-4">
          <Text family="inter" weight={700} className="text-[11px] uppercase tracking-[0.16em] text-white/65">
            Completed Picks
          </Text>
          <Text family="jakarta" weight={800} className="mt-2 text-3xl text-white">
            {predictedCount}
            <Text family="inter" weight={700} className="text-base text-white/70">
              /{totalCount}
            </Text>
          </Text>
        </View>

        <View className="flex-1 rounded-[24px] border border-white/10 bg-white/10 px-4 py-4">
          <Text family="inter" weight={700} className="text-[11px] uppercase tracking-[0.16em] text-white/65">
            Potential Points
          </Text>
          <Text family="jakarta" weight={800} className="mt-2 text-3xl text-white">
            {pointsProjection}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center rounded-[22px] border border-white/10 bg-white/10 px-4 py-3">
        <Ionicons name="time-outline" size={18} color="#F8F9FA" />
        <Text family="inter" weight={700} className="ml-2 flex-1 text-sm text-white/80">
          {remaining === 0
            ? "All available predictions are locked in."
            : `${remaining} prediction${remaining === 1 ? "" : "s"} still open before kickoff.`}
        </Text>
      </View>
    </View>
  );
}
