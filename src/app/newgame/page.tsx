'use client';

import React, { useState } from 'react';
import { validateNewGame } from '@/util/validateNexGame';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NewGamePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gameName: '',
    player1: '',
    player2: '',
    player3: '',
    player4: '',
  });

  const createGame = async () => {
    const formatData = {
      gameName: formData.gameName,
      players: [
        formData.player1,
        formData.player2,
        formData.player3,
        formData.player4,
      ],
    };
    const res = await axios.post('/api/game', formatData);

    router.push(`/points/`);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const returnInfo = validateNewGame(formData);

    if (!returnInfo?.isValid) {
      toast.error(returnInfo?.message as string);
    } else {
      createGame();
      toast.success(returnInfo?.message as string);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="h-full w-full bg-pallete flex flex-col">
      <div className="w-full mt-32 flex justify-center">
        <h1 className="text-3xl font-bold text-pallete4">
          Vpiši imena igralcev in igre
        </h1>
      </div>
      <form
        className="h-4/6 w-full flex items-base justify-center mt-6"
        onSubmit={handleSubmit}
      >
        <div className="md:w-6/12 bg-pallete3 p-12">
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
                  required
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
                  required
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
                  required
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
            <button
              type="submit"
              className="w-full h-10 bg-pallete2 text-black font-bold text-2xl rounded-md"
            >
              Začni igro
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewGamePage;
