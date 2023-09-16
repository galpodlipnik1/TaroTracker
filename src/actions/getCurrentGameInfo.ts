'use server';

import prisma from '@/lib/prismadb';

const getCurrentGameInfo = async (gameId: string | undefined) => {
  try {
    const gameInfo = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        scores: {
          select: {
            id: true,
            playerName: true,
            score: true,
          },
        },
      },
    });

    return gameInfo;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getCurrentGameInfo;
