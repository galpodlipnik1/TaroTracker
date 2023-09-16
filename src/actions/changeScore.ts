'use server'

import prisma from '@/lib/prismadb'
import { ChangeScore, Score } from '@/types'
import getCurrentGameInfo from './getCurrentGameInfo'

const changeScore = async (data: ChangeScore) => {
  try {
    const gameData = await getCurrentGameInfo(data.id)
    const scoreObj: any = gameData?.scores.find((score: Score) => score.playerName === data.playerName)
    const playerScoreArr = scoreObj.score
    let res;
    if(data.changeLast) {
      const newPlayerScoreArr = playerScoreArr.map((score: number, index: number) => {
        if(index === playerScoreArr.length - 1) {
          return score + Number(data.newScore)
        }
        return score
      }); 
      res = await prisma.playerScore.update({
        where: {
          id: scoreObj.id
        },
        data: {
          score: newPlayerScoreArr
        }
      })
    } else {
      res = await prisma.playerScore.update({
        where: {
          id: scoreObj.id
        },
        data: {
          score: {
            push: Number(data.newScore)
          }
        }
      })
    }

    return res
  } catch (error : any) {
    throw new Error(error)
  }
}

export default changeScore