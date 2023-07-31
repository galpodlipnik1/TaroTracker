'use server';
import prisma from '@/lib/prismadb';

const createPlayerScore = async (game: { id: string; players: string[] }) => {
  const { id, players } = game;

  try {
    players.forEach(async (player) => {
      await prisma.playerScore.create({
        data: {
          gameId: id,
          playerName: player,
          score: [0],
        }
      });
    });
    
  } catch (error: any) {
    throw new Error(error);
  }
};

export default createPlayerScore;