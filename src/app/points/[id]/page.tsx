'use client'

import React, { useState, useEffect } from 'react';
import getCurrentGameInfo from '@/actions/getCurrentGameInfo';
import DropDown from './components/Dropdown';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { extraPointsOptions, vrstaIgreOptions } from '@/data/addPointsData';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

interface GameInfo {
  id: string;
  ownerId: string;
  name: string;
  players: string[];
  status: string;
  createdAt: Date;
}

interface FormData {
  igralec: string;
  soigralec: string;
  vrstaIgre: string;
  stRazlike: string;
  vsiKralji: boolean;
  zadnjaPalcka: boolean;
  trula: boolean;
  zadnjiKralj: boolean;
}

const PointsPage = ({ params }: { params: { id: string } }) => {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      igralec: '',
      soigralec: '',
      vrstaIgre: '',
      stRazlike: '',
      vsiKralji: false,
      zadnjaPalcka: false,
      trula: false,
      zadnjiKralj: false,
    },
  });

  const igralec = watch('igralec');
  const soigralec = watch('soigralec');
  const vrstaIgre = watch('vrstaIgre');
  const stRazlike = watch('stRazlike');
  const vsiKralji = watch('vsiKralji');
  const zadnjaPalcka = watch('zadnjaPalcka');
  const trula = watch('trula');
  const zadnjiKralj = watch('zadnjiKralj');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchGameInfo = async () => {
      const gameInfo: GameInfo | null = await getCurrentGameInfo(params.id);
      setGameInfo(gameInfo);
    };
    fetchGameInfo();
  }, []);

  return (
    <div className="h-full w-full bg-pallete flex">
      <div className="w-full mt-32 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-pallete4">
          Vpiši za igralca, ki je igral
        </h1>
        <p className="text-pallete4">Ime igre: {gameInfo?.name}</p>
        <form className="h-4/6 w-full flex items-base justify-center mt-6">
          <div className="md:w-8/12 bg-pallete3 p-12">
            <div className="w-full h-full">
              <div className="flex flex-row w-full space-x-6">
                <div className="w-3/6">
                  <DropDown
                    disabled={isLoading}
                    options={gameInfo?.players || []}
                    onChange={(value) => setValue('igralec', value)}
                    value={igralec}
                    placeholder="Izberi igralca"
                  />
                </div>
                <div className='w-3/6'>
                  <DropDown
                    disabled={isLoading}
                    options={gameInfo?.players || []}
                    onChange={(value) => setValue('soigralec', value)}
                    value={soigralec}
                    placeholder="Izberi soigralca"
                  />
                </div>
              </div>
              {/* Rest of the form */}
            </div>
            <div className="w-full flex items-end">
              <button
                type="submit"
                className="w-full h-10 bg-pallete2 text-black font-bold text-2xl"
              >
                Dodaj točke
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PointsPage;
