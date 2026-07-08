-- Leaderboard table for Name 100 Challenge
-- Run this SQL in your Supabase project's SQL Editor (https://supabase.com/dashboard)

CREATE TABLE IF NOT EXISTS leaderboard (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname        TEXT NOT NULL,
  score           INTEGER NOT NULL,
  elapsed_seconds INTEGER NOT NULL,
  challenge_slug  TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast leaderboard queries per challenge
-- Orders by score (highest first), then by elapsed time (fastest first)
CREATE INDEX IF NOT EXISTS idx_leaderboard_challenge_score
  ON leaderboard (challenge_slug, score DESC, elapsed_seconds ASC);

-- Enable Row Level Security
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Anyone can read the leaderboard
CREATE POLICY "leaderboard_public_read" ON leaderboard
  FOR SELECT USING (true);

-- Anyone can insert (anonymous submission)
CREATE POLICY "leaderboard_public_insert" ON leaderboard
  FOR INSERT WITH CHECK (true);

-- UPDATE and DELETE are denied by default (no policy = denied when RLS is enabled)
-- This prevents tampering with submitted scores
