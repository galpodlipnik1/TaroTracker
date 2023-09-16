'use client';

import React, { useState } from 'react';

import DisplayBoard from './components/displayBoard';

const Leaderboard = () => {
  const [gameName, setGameName] = useState('');

  const handleGameName = (name: string) => {
    setGameName(name);
  };
  return (
    <div className="w-screen h-screen bg-pallete flex">
      <div className="w-full mt-32 flex flex-col">
        <div className="text-5xl font-bold text-center text-pallete4">
          Leaderboard
        </div>
        <div className="text-2xl font-bold text-center text-pallete4 my-4">
          Ime igre: {gameName}
        </div>
        <div className="flex justify-center md:p-12 p-2">
          <DisplayBoard parentCallback={handleGameName} />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
