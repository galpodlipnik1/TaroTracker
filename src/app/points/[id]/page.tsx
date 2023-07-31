'use client'

import React, { useState, useEffect } from 'react';
import getCurrentGameInfo from '@/actions/getCurrentGameInfo';

interface GameInfo {
  id: string;
  ownerId: string;
  name: string;
  players: string[];
  status: string;
  createdAt: Date;
}

const PointsPage = ({ params }: { params: { id:string } }) => {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);

  useEffect(() => {
    const fetchGameInfo = async () => {
      const gameInfo: GameInfo | null = await getCurrentGameInfo(params.id);
      setGameInfo(gameInfo);
    };
    fetchGameInfo();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="h-full w-full bg-pallete flex">
      <div className="w-full mt-32 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-pallete4">
          Vpiši za igralca, ki je igral
        </h1>
        <p className='text-pallete4'>Ime igre: {gameInfo?.name}</p>
        <form className="h-4/6 w-full flex items-base justify-center mt-6" onSubmit={handleSubmit}>
        <div className="md:w-8/12 bg-pallete3 p-12">
          <div className="w-full h-full">
            <div className="flex flex-col">
              <label className="text-black text-2xl font-bold">Ime igre</label>
              <input
                name="gameName"
                required
                type="text"
                className="h-10 bg-pallet4 text-black font-bold text-2xl"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center w-full mt-6">
              <h2 className="text-black text-2xl font-bold">Ime igralcev</h2>
            </div>
            <div className="flex justify-between mt-6">
              <div className="flex flex-col">
                <label className="text-black text-2xl font-bold">
                  Igralec 1
                </label>
                <input
                  name="player1"
                  type="text"
                  className="w-5/6 h-10 bg-pallet4 text-black font-bold text-2xl"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black text-2xl font-bold">
                  Igralec 2
                </label>
                <input
                  name="player2"
                  type="text"
                  className="w-5/6 h-10 bg-pallet4 text-black font-bold text-2xl"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <div className="flex flex-col">
                <label className="text-black text-2xl font-bold">
                  Igralec 3
                </label>
                <input
                  name="player3"
                  type="text"
                  className="w-5/6 h-10 bg-pallet4 text-black font-bold text-2xl"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black text-2xl font-bold">
                  Igralec 4
                </label>
                <input
                  name="player4"
                  type="text"
                  className="w-5/6 h-10 bg-pallet4 text-black font-bold text-2xl"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-end">
            <button type='submit' className="w-full h-10 bg-pallete2 text-black font-bold text-2xl">
              Začni igro
            </button>
          </div>
        </div>
      </form>
      </div>
      <div></div>
    </div>
  );
};

export default PointsPage;
