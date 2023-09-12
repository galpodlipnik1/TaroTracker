'use server';

import prisma from '@/lib/prismadb';
import getCurrentUser from './getCurrentUser';
const getAllGames = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  try {
    const game = await prisma.game.findMany({
      where: {
        ownerId: user.id,
      },
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

    return game;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getAllGames;
