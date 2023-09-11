'use client'

import React, { useEffect, useState } from 'react'
import { GameInfo } from '@/types';
import getActiveGame from '@/actions/getActiveGame';

const DisplayBoard = () => {
  const [gameInfo, setGameInfo] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActiveGame();
      setGameInfo(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(gameInfo);
  }, [gameInfo]);

  return (
    <div className='flex flex-col w-1/2'>
      <div className='flex flex-row justify-between'>
        {gameInfo?.players.map((player, index) => {
          return (
            <div key={player} className='w-1/2 flex items-center flex-col'>
              <div className='text-2xl font-bold text-pallete4'>
                {player}
              </div>
              <hr className='w-full border-pallete4' />
                {gameInfo?.scores.map((scoreObj : { playerName: string, score: string[] }) => {
                  if(scoreObj.playerName === player) {
                    return (
                      <div key={scoreObj.playerName} className=' w-full flex flex-col items-center text-pallete4'>
                        {scoreObj.score.map(score => {
                          return (
                            <div key={score} className='w-full flex items-center flex-col'>
                              {score}
                              <hr className='w-full border-pallete4' />
                            </div>
                          )
                        })}
                      </div>
                    )
                  }
                })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DisplayBoard