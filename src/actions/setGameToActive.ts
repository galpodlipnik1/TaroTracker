'use server';

import prisma from '@/lib/prismadb';
import setOtherToInactive from './setOtherToInactive';

const setGameToActive = async (gameId: string) => {
  try {
    const res = await prisma.game.updateMany({
      where: {
        id: gameId,
      },
      data: {
        status: 'active',
      },
    });

    await setOtherToInactive(gameId);

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default setGameToActive;
