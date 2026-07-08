// ── Leaderboard Types ───────────────────────────────────────────────

export interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  elapsed_seconds: number;
  challenge_slug: string;
  created_at: string;
}

export interface LeaderboardSubmitRequest {
  nickname: string;
  score: number;
  elapsed_seconds: number;
  challenge_slug: string;
}

export interface LeaderboardSubmitResponse {
  success: boolean;
  entry?: LeaderboardEntry;
  rank?: number;
  error?: string;
}

export interface LeaderboardGetResponse {
  entries: LeaderboardEntry[];
  total: number;
}
