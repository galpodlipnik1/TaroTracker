'use client';

import React, { useState, useEffect } from 'react';
import { GameInfo } from '@/types';
import getActiveGame from '@/actions/getActiveGame';
import DropDown from '../points/[id]/components/dropDown';
const ChangeScore = () => {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [igralec, setIgralec] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getActiveGame().then((gameInfo) => {
      setGameInfo(gameInfo);
    });
  }, []);

  return (
    <div className="w-full h-full bg-pallete flex">
      <div className="w-full mt-32 flex flex-col">
        <h1 className="text-5xl text-center text-white">Change Scores</h1>
        <div className="w-full flex flex-col justify-center mt-3">
          <h1 className="text-3xl text-center text-white">
            Ime: {gameInfo?.name}
          </h1>
          <div className="w-full flex flex-row mt-3 md:p-4 p-2 items-baseline">
            <div className="w-full md:w-3/6">
              <DropDown
                required
                disabled={isLoading}
                options={gameInfo?.players || []}
                onChange={(value) => setIgralec(value)}
                value={igralec}
                placeholder="Izberi igralca"
              />
            </div>
            <input
              className="w-full md:w-3/6 md:ml-2 mt-2 md:mt-0 px-2 h-10 rounded-md bg-pallete-dark text-white"
              type="number"
              placeholder="Vnesi točke"
            />
          </div>
          <div>
            {
              //zgodovina točk
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeScore;
