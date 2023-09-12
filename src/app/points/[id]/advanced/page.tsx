'use client';

import React, { useState, useEffect } from 'react';
import getCurrentGameInfo from '@/actions/getCurrentGameInfo';
import DropDown from '../components/dropDown';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { extraPointsOptions, vrstaIgreOptions } from '@/data/addPointsData';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { validateAddPointsAdvanced } from '@/util/validateAddPointsAdvanced';
import { FormatedData, SubmitData } from '@/types/addPointsAdvanced';
import { addPointsAdvanced } from '@/actions/addPointsAdvanced';
import { calculatePointsAdvanced } from '@/util/calculatePointsAdvanced';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

interface GameInfo {
  id: string;
  ownerId: string;
  name: string;
  players: string[];
  scores: { id: string; playerName: string; score: number[] }[];
  status: string;
  createdAt: Date;
}

interface FormData {
  igralec: string;
  soigralec: string;
  vrstaIgre: string;
  stRazlike: string;
  vsiKralji: string;
  zadnjaPalcka: string;
  trula: string;
  zadnjiKralj: string;
  zmagal: string;
  izgubljeniMond: string;
}

const PointsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      igralec: '',
      soigralec: '',
      vrstaIgre: '',
      stRazlike: '',
      vsiKralji: '',
      zadnjaPalcka: '',
      trula: '',
      zadnjiKralj: '',
      zmagal: '',
      izgubljeniMond: '',
    },
  });

  const igralec = watch('igralec');
  const soigralec = watch('soigralec');
  const vrstaIgre = watch('vrstaIgre');
  const vsiKralji = watch('vsiKralji');
  const zadnjaPalcka = watch('zadnjaPalcka');
  const trula = watch('trula');
  const zadnjiKralj = watch('zadnjiKralj');
  const zmagal = watch('zmagal');
  const izgubljeniMond = watch('izgubljeniMond');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const validated = validateAddPointsAdvanced(data as SubmitData);

    if (validated.isValid) {
      setIsLoading(true);
      const calculatedPoints = calculatePointsAdvanced(
        validated.formatedData as FormatedData
      );
      const res = await addPointsAdvanced(params.id, calculatedPoints);
      setIsLoading(false);
      if (res) toast.success('Točke uspešno dodane!');
      else toast.error('Napaka pri dodajanju točk!');
    } else {
      toast.error(validated.error);
    }
  };

  const handleSwitch = () => {
    router.push(`/points/${params.id}/beginner`);
  };

  useEffect(() => {
    const fetchGameInfo = async () => {
      const gameInfo: GameInfo | null = await getCurrentGameInfo(params.id);
      setGameInfo(gameInfo);
    };
    fetchGameInfo();
  }, []);

  return (
    <div className="h-screen w-full bg-pallete flex">
      <div className="w-full mt-32 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-pallete4 text-center">
          Vpiši za igralca, ki je igral (Napredno)
        </h1>
        <p className="text-pallete4">Ime igre: {gameInfo?.name}</p>
        <p className="text-pallete4">Igralci: {gameInfo?.players.join(', ')}</p>

        <form
          className="h-5/6 md:h-4/6 w-full flex items-base justify-center mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full md:w-8/12 bg-pallete3 p-12">
            <div className="w-full h-full">
              <div className="w-full flex justify-end">
                <HiOutlineSwitchHorizontal
                  className="inline-block text-2xl hover:cursor-pointer hover:scale-110"
                  title="Pojdi na stran za začetnike"
                  onClick={handleSwitch}
                />
              </div>
              <div className="flex flex-col md:flex-row w-full md:space-x-6">
                <div className="w-full md:w-3/6">
                  <DropDown
                    disabled={isLoading}
                    options={gameInfo?.players || []}
                    onChange={(value) => setValue('igralec', value)}
                    value={igralec}
                    placeholder="Izberi igralca"
                  />
                </div>
                <div className="w-full md:w-3/6">
                  <DropDown
                    disabled={isLoading}
                    options={gameInfo?.players || []}
                    onChange={(value) => setValue('soigralec', value)}
                    value={soigralec}
                    placeholder="Izberi soigralca"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full md:mt-6 justify-between items-baseline">
                <div className="w-full md:w-2/6">
                  <DropDown
                    disabled={isLoading}
                    options={vrstaIgreOptions}
                    onChange={(value) => setValue('vrstaIgre', value)}
                    value={vrstaIgre}
                    placeholder="Izberi vrsto igre"
                  />
                </div>
                <div className="flex flex-row items-center w-full md:w-[16.7rem] mt-3 md:mt-0">
                  {/*
                  <label className="text-black font-bold text-xl">
                    Št. razlike
                  </label>
                  */}
                  <input
                    className=" h-9 w-full bg-white text-black text-sm rounded-sm px-2"
                    type="number"
                    placeholder="Št. razlike"
                    {...register('stRazlike')}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full md:mt-6 justify-between items-baseline">
                <div className="flex flex-row items-baseline justify-start w-full md:w-1/2">
                  {/*
                  <label className="text-black font-bold text-xl mr-3">
                    Vsi kralji
                  </label>
                  */}
                  <div className="w-full md:w-4/6">
                    <DropDown
                      disabled={isLoading}
                      options={extraPointsOptions[0]['options']}
                      onChange={(value) => setValue('vsiKralji', value)}
                      placeholder="Vsi kralji?"
                      value={vsiKralji}
                    />
                  </div>
                </div>
                <div className="flex flex-row items-baseline justify-end w-full md:w-1/2">
                  {/*
                  <label className="text-black font-bold text-xl mr-3">
                    Zadnja palčka
                  </label>
                  */}
                  <div className="w-full md:w-4/6">
                    <DropDown
                      disabled={isLoading}
                      options={extraPointsOptions[1]['options']}
                      onChange={(value) => setValue('zadnjaPalcka', value)}
                      placeholder="Zadnja palčka?"
                      value={zadnjaPalcka}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full justify-between items-baseline">
                <div className="flex flex-row items-baseline justify-start w-full md:w-1/2">
                  {/*
                  <label className="text-black font-bold text-xl mr-3">
                    Trula
                  </label>
                  */}
                  <div className="w-full md:w-4/6">
                    <DropDown
                      disabled={isLoading}
                      options={extraPointsOptions[2]['options']}
                      onChange={(value) => setValue('trula', value)}
                      placeholder="Trula?"
                      value={trula}
                    />
                  </div>
                </div>
                <div className="flex flex-row items-baseline justify-end w-full md:w-1/2">
                  {/*
                  <label className="text-black font-bold text-xl mr-3">
                    Zadnji kralj
                  </label>
                  */}
                  <div className="w-full md:w-4/6">
                    <DropDown
                      disabled={isLoading}
                      options={extraPointsOptions[3]['options']}
                      onChange={(value) => setValue('zadnjiKralj', value)}
                      placeholder="Zadnji kralj?"
                      value={zadnjiKralj}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full justify-between items-baseline">
                <div className="flex flex-row items-baseline justify-start w-full md:w-1/2">
                  {/*
                    <label className="text-black font-bold text-xl mr-3">
                      Zmagal
                    </label>
                    */}
                  <div className="w-full md:w-4/6">
                    <DropDown
                      disabled={isLoading}
                      options={extraPointsOptions[4]['options']}
                      onChange={(value) => setValue('zmagal', value)}
                      placeholder="Igralec zmagal?"
                      value={zmagal}
                    />
                  </div>
                </div>
                <div className="flex flex-row items-baseline justify-end w-full md:w-1/2">
                  {/*
                    <label className="text-black font-bold text-xl mr-3">
                      Vzet mond
                    </label>
                    */}
                  <div className="w-full md:w-4/6">
                    <DropDown
                      disabled={isLoading}
                      options={extraPointsOptions[5]['options']}
                      onChange={(value) => setValue('izgubljeniMond', value)}
                      placeholder="Igralec izgubil monda?"
                      value={izgubljeniMond}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex items-end">
              <button
                type="submit"
                className="w-full h-10 bg-pallete2 text-black font-bold text-2xl rounded-md"
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
