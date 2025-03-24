
export interface Competition {
  id: string;
  title: string;
  host: string;
  deadlineDate: string;
  daysLeft: number;
  maxAge?: number;
  participants: number;
  category: string;
  topUsers: { name: string; position: number }[];
}

export interface CompetitionDetails extends Competition {
  description: string;
  rules: string;
  prizes: string;
  startDate: string;
  endDate: string;
  algorithm: string;
  datasetDescription?: string;
  isJoined?: boolean;
  isVerified?: boolean;
  submissions?: Submission[];
  leaderboard?: LeaderboardEntry[];
}

export interface Submission {
  id: string;
  dateSubmitted: string;
  score: number;
  fileName: string;
  status: "pending" | "scored" | "failed";
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  score: number;
  lastSubmission: string;
  totalSubmissions: number;
}
