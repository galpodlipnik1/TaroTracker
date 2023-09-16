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

export interface ChangeScore {
  id: string | undefined;
  playerName: string;
  newScore: number;
  changeLast: boolean;
}
