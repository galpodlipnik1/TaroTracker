'use server';

import prisma from '@/lib/prismadb';
import { PointsData } from '@/types/addPointsAdvanced';
import getCurrentGameInfo from './getCurrentGameInfo';

interface GameInfo {
  id: string;
  ownerId: string;
  name: string;
  players: string[];
  scores: { id: string; playerName: string; score: number[] }[];
  status: string;
  createdAt: Date;
}

export const addPointsAdvanced = async (id: string, data: PointsData) => {
  const { igralec, soigralec } = data;

  const gameInfo = (await getCurrentGameInfo(id)) as GameInfo;

  if (!gameInfo) throw new Error('No active game');

  const igralecScores = gameInfo.scores.find(
    (player) => player.playerName === igralec.name
  );
  const soigralecScores = gameInfo.scores.find(
    (player) => player.playerName === soigralec.name
  );
  if (!igralecScores || !soigralecScores)
    throw new Error('Something went wrong');
  const newIgralecScore =
    igralecScores.score[igralecScores.score.length - 1] + igralec.points;
  const newSoigralecScore =
    soigralecScores.score[soigralecScores.score.length - 1] + soigralec.points;

  try {
    const resIgralec = await prisma.playerScore.update({
      where: {
        id: igralecScores.id,
      },
      data: {
        score: {
          push: newIgralecScore,
        },
      },
    });
    const resSoigralec = await prisma.playerScore.update({
      where: {
        id: soigralecScores.id,
      },
      data: {
        score: {
          push: newSoigralecScore,
        },
      },
    });

    return { resIgralec, resSoigralec };
  } catch (error: any) {
    throw new Error(error);
  }
};
