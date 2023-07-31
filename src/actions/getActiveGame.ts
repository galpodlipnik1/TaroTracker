'use server'

import prisma from '@/lib/prismadb'
import getCurrentUser from './getCurrentUser'
const getActiveGame = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  try {
    const game = await prisma.game.findFirst({
      where: {
        ownerId: user.id,
        status: 'active',
      }
    });
    return game;
  } catch (error: any) {
    throw new Error(error);
  }
}

export default getActiveGame;