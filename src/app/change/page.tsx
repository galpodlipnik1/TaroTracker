'use client';

import React, { useState, useEffect } from 'react';
import { GameInfo, Score, ChangeScore } from '@/types';
import Loader from '../components/Loader';
import getActiveGame from '@/actions/getActiveGame';
import DropDown from './components/dropDown';
import changeScore from '@/actions/changeScore';
import toast from 'react-hot-toast';

const ChangeScore = () => {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [player, setplayer] = useState<any>(null);
  const [playerHistory, setPlayerHistory] = useState<Score | null>(null);
  const [changeLast, setChangeLast] = useState(false);
  const [newPoints, setNewPoints] = useState(0);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const gameInfoData = await getActiveGame();
        setGameInfo(gameInfoData);
      } catch (error) {
        console.error('Error fetching game info:', error);
      }
    };

    fetchGameInfo();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (player && gameInfo) {
      const playerHistory =
        gameInfo?.scores?.find((score) => score.playerName === player.value) ||
        null;
      setPlayerHistory(playerHistory);
    }
  }, [player, gameInfo]);

  const checkChange = (e: any) => {
    setChangeLast(e.target.checked);
  };

  const changePoints = (e: any) => {
    setNewPoints(e.target.value);
  };

  const handleSubmit = async () => {
    const data: ChangeScore = {
      id: gameInfo?.id,
      playerName: player.value,
      newScore: newPoints,
      changeLast: changeLast,
    };

    const res = await changeScore(data);
    if (res) {
      toast.success('Točke uspešno spremenjene');
    } else {
      toast.error('Napaka pri spreminjanju točk');
    }
    getActiveGame().then((gameInfoData) => {
      setGameInfo(gameInfoData);
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full bg-pallete flex">
          <div className="w-full mt-32 flex flex-col">
            <h1 className="text-5xl text-center text-white">Spremeni točke</h1>
            <div className="w-full flex flex-col justify-center mt-3">
              <h1 className="text-3xl text-center text-white">
                Ime: {gameInfo?.name}
              </h1>
              <div className="w-full flex flex-col md:flex-row mt-3 md:p-4 p-2 items-baseline">
                <div className="w-full md:w-3/6">
                  <DropDown
                    required
                    disabled={isLoading}
                    options={gameInfo?.players || []}
                    onChange={(value) => setplayer(value)}
                    value={player}
                    placeholder="Izberi igralca"
                  />
                </div>
                <input
                  className="w-full md:w-3/6 md:ml-2 mt-2 md:mt-0 px-2 h-9 rounded-md bg-palette-dark text-black"
                  type="number"
                  placeholder="Vnesi točke"
                  onChange={changePoints}
                />
              </div>
              <div className="w-full flex flex-col md:flex-row mt-3 md:p-4 p-2 items-baseline space-x-3">
                <div className="flex flex-row mt-3 md:p-4 p-2 items-center space-x-3">
                  <label className="text-white text-xl">Spremeni zadnjo</label>
                  <input
                    type="checkbox"
                    className="mr-2 h-5 w-5"
                    onChange={checkChange}
                  />
                </div>
                <span className="text-white text-xl p-2">
                  Zgodovina točk:{' '}
                  {playerHistory?.score.join(', ') || 'Ni zgodovine'}
                </span>
              </div>
              <div className="w-full flex flex-row mt-3 md:p-4 p-2 justify-center">
                <button
                  className="w-full md:w-3/6 md:ml-2 mt-2 md:mt-0 px-2 h-10 rounded-md bg-pallete2 text-white"
                  onClick={handleSubmit}
                >
                  Spremeni
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeScore;
