interface GameData {
  gameName: string;
  player1: string | null;
  player2: string | null;
  player3: string | null;
  player4: string | null;
}

export const validateNewGame = (gameData: GameData) => {
  let numOfNullPlayers = 0;
  for (const [key, value] of Object.entries(gameData)) {
    if ((key.startsWith('p') && value === '') || value === null) {
      numOfNullPlayers++;
    }
  }

  if (numOfNullPlayers > 1) {
    return {
      isValid: false,
      message: 'You must have at least three players',
    };
  } else {
    return {
      isValid: true,
      message: 'Game is being created',
    };
  }
};
