import clsx from "clsx";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import colors from "@/utils/colors";

export type EmblemSize = "sm" | "md" | "lg";

const DIMENSIONS: Record<EmblemSize, number> = {
  sm: 36,
  md: 52,
  lg: 72,
};

export type EmblemProps = {
  size?: EmblemSize;
  children?: ReactNode;
  className?: string;
};

export default function Emblem({
  size = "md",
  children,
  className,
}: EmblemProps) {
  const dim = DIMENSIONS[size];

  return (
    <View
      className={clsx("items-center justify-center overflow-hidden", className)}
      style={[
        styles.container,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary.grey.light,
  },
});
