import { ComponentProps } from "react";
import { View } from "react-native";

export type CardProps = ComponentProps<typeof View> & {
    type?: 'primary' | 'secondary' | 'tertiary' | 'grey',
    borderRadius?: 'sm' | 'md' | 'full',
};

export type LeagueStatusCardProps = Omit<ComponentProps<typeof View>, "children"> & {
    leagueName: string;
    rankLabel: string;
    points: number;
    className?: string;
};

export type MatchCardProps = Omit<ComponentProps<typeof View>, "children"> & {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    /** Shown under the live score when both predictions are set. */
    predictedHomeScore?: number;
    predictedAwayScore?: number;
    kickoffTime: string;
    powerUp?: string;
    /** ISO 3166-1 alpha-2 for flag-icons (e.g. `us`, `fr`). */
    homeFlagCode?: string;
    awayFlagCode?: string;
    className?: string;
};
