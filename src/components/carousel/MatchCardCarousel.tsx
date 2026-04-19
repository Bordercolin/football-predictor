import MatchCard from "@/components/card/MatchCard";
import type { MatchCardProps } from "@/components/card/card.types";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const INITIAL_CAROUSEL_HEIGHT = 0;

export type MatchCardCarouselProps = {
  matches: MatchCardProps[];
  className?: string;
};

export default function MatchCardCarousel({
  matches,
  className,
}: MatchCardCarouselProps) {
  const [width, setWidth] = useState(0);
  const [itemHeight, setItemHeight] = useState(INITIAL_CAROUSEL_HEIGHT);

  const onLayout = useCallback(
    (e: { nativeEvent: { layout: { width: number } } }) => {
      setWidth(e.nativeEvent.layout.width);
    },
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: MatchCardProps }) => (
      <View
        style={{ width, paddingHorizontal: 4 }}
        onLayout={(e) => {
          const h = Math.ceil(e.nativeEvent.layout.height);
          if (h <= 0) return;
          setItemHeight((prev) => (h > prev ? h : prev));
        }}
      >
        <MatchCard {...item} className={clsx("w-full", item.className)} />
      </View>
    ),
    [width],
  );

  if (matches.length === 0) {
    return null;
  }

  return (
    <>
      <View className={clsx("w-full", className)} onLayout={onLayout}>
        {width > 0 && (
          <Carousel
            loop={matches.length > 1}
            width={width}
            height={itemHeight}
            data={matches}
            renderItem={renderItem}
            scrollAnimationDuration={300}
          />
        )}
      </View>
    </>
  );
}
