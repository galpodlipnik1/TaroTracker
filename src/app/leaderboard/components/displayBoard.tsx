import React, { useEffect, useState } from 'react';
import { GameInfo } from '@/types';
import getActiveGame from '@/actions/getActiveGame';

const DisplayPlayerScores = ({ scores }: { scores: number[] }) => (
  <div className="w-full flex flex-col items-center text-pallete4">
    {scores.map((score: number) => (
      <div key={score} className="w-full flex items-center flex-col">
        {score}
        <hr className="w-full border-pallete4" />
      </div>
    ))}
  </div>
);

const DisplayBoard = () => {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActiveGame();
      setGameInfo(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex-col w-full">
      <div className="flex flex-row justify-between">
        {gameInfo?.players.map((player) => (
          <div key={player} className="w-1/2 flex items-center flex-col">
            <div className="text-2xl font-bold text-pallete4">{player}</div>
            <hr className="w-full border-pallete4" />
            {gameInfo.scores
              .filter((scoreObj) => scoreObj.playerName === player)
              .map((filteredScoreObj) => (
                <DisplayPlayerScores
                  key={filteredScoreObj.playerName} 
                  scores={filteredScoreObj.score}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayBoard;
