export interface Score {
  id: string;
  playerName: string;
  score: number[];
}

export interface GameInfo {
  id: string;
  ownerId: string;
  name: string;
  players: string[];
  status: string;
  createdAt: Date;
  scores: Score[];
}
