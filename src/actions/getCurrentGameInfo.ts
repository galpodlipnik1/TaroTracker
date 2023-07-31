'use server'

import prisma from '@/lib/prismadb'

const getCurrentGameInfo = async (gameId: string) => {
  try {
    const gameInfo = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        scores: {
          select: {
            playerName: true,
            score: true,
          }
        }
      }
    });

    return gameInfo;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getCurrentGameInfo;