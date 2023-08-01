'use server'

import prisma from '@/lib/prismadb';

const setOtherToInactive = async (gameId: string) => {
  try {
    const res = await prisma.game.updateMany({
      where: {
        id: {
          not: gameId
        }
      },
      data: {
        status: 'inactive'
      }
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default setOtherToInactive;