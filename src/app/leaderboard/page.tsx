'use client';

import React from 'react';
import DisplayBoard from './components/displayBoard';

const Leaderboard = () => {
  return (
    <div className="w-screen h-screen bg-pallete flex">
      <div className="w-full mt-32 flex flex-col">
        <div className="text-5xl font-bold text-center text-pallete4 mb-6">
          Leaderboard
        </div>
        <div className="flex justify-center md:p-12 p-2">
          <DisplayBoard />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
