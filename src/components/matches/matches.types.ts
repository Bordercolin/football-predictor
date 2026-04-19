export type TournamentStageKey =
  | "all"
  | "group_a"
  | "group_b"
  | "group_c"
  | "group_d"
  | "group_e"
  | "group_f"
  | "group_g"
  | "group_h";

export type MatchStatus = "scheduled" | "live" | "finished";

export type MatchTeam = {
  name?: string;
  flagCode?: string;
};

export type DenseMatch = {
  id: string;
  stage: TournamentStageKey;
  groupLabel: string;
  kickoffLabel: string;
  status: MatchStatus;
  home: MatchTeam;
  away: MatchTeam;
  homeScore?: number;
  awayScore?: number;
  isPredicted: boolean;
  pickLabel?: string; 
};


export type PredictionModalProps = {
  visible: boolean;
  match: DenseMatch | null;
  homeScore: number;
  awayScore: number;
  onChangeHomeScore: (v: number) => void;
  onChangeAwayScore: (v: number) => void;
  onCancel: () => void;
  onSave: () => void;
};
