import clsx from "clsx";
import { Platform, View } from "react-native";
import { SvgUri } from "react-native-svg";

/** Same major version as `flag-icons` in package.json — keeps web CSS + native SVG in sync. */
const FLAG_ICONS_VERSION = "7.5.0";
const SVG_1X1_BASE = `https://cdn.jsdelivr.net/npm/flag-icons@${FLAG_ICONS_VERSION}/flags/1x1`;

export type FlagIconProps = {
  /** ISO 3166-1 alpha-2 (e.g. `us`, `fr`, `gb`). Lowercased when needed. */
  code: string;
  /** Pixel size (square). */
  size: number;
  className?: string;
};

/**
 * Renders a country flag from the `flag-icons` set.
 *
 * - **Web:** uses the CSS you load via `global.css` (`fi fi-xx` + `fis` = 1×1).
 * - **iOS / Android:** CSS does not apply to native views; this loads the same SVG from the npm package on a CDN.
 *
 * @see https://github.com/lipis/flag-icons
 */
export default function FlagIcon({ code, size, className }: FlagIconProps) {
  const normalized = code.trim().toLowerCase();

  if (Platform.OS === "web") {
    return (
      <View
        className={clsx("fi", `fi-${normalized}`, "fis", className)}
        style={[
          { width: size, height: size },
          { fontSize: size } as never,
        ]}
      />
    );
  }

  return (
    <View className={clsx("overflow-hidden", className)} style={{ width: size, height: size }}>
      <SvgUri width={size} height={size} uri={`${SVG_1X1_BASE}/${normalized}.svg`} />
    </View>
  );
}
