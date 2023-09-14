'use client';

import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import getAllGames from '@/actions/getAllGames';
import { useEffect, useState } from 'react';
import { GameInfo } from '@/types/index';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import setGameToActive from '@/actions/setGameToActive';

const User = () => {
  const [games, setGames] = useState<GameInfo[] | null>([]);

  useEffect(() => {
    getAllGames().then((res) => {
      setGames(res);
    });
  }, []);

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out successfully');
  };

  const handleSetActive = async (gameId: string, gameName: string) => {
    const res = await setGameToActive(gameId);
    if (res) {
      toast.success(`${gameName} set to active`);
      getAllGames().then((res) => {
        setGames(res);
      });
    }
  };

  return (
    <div className="h-fit w-full bg-pallete flex">
      <div className="w-full mt-32 flex flex-col">
        <div className="w-full px-4 md:px-6 flex flex-col justify-center">
          <h1 className="text-4xl text-pallete4 font-bold text-center">
            Available Games
          </h1>
          <div className="w-full flex flex-col md:flex-row md:flex-wrap justify-center md:justify-start mt-8">
            {games?.map((game) => (
              <Card key={game.id} className="w-11/12 md:w-1/4 m-4 bg-pallete3">
                <CardHeader>
                  <CardTitle>{game.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {game.players.map((player) => (
                    <CardDescription
                      key={player}
                      className="text-pallete text-xl"
                    >
                      {game.scores.map((scoreObj) => {
                        if (scoreObj.playerName === player) {
                          return `${player}: ${
                            scoreObj.score[scoreObj.score.length - 1]
                          }`;
                        }
                      })}
                    </CardDescription>
                  ))}
                </CardContent>
                <CardFooter className="flex flex-row">
                  <span className="text-pallete text-xl">
                    Status: {game.status}
                  </span>
                  {game.status === 'active' ? (
                    <AiOutlineCheck className="text-green-500 text-pallete4 text-2xl ml-2" />
                  ) : (
                    <MdOutlineCancel className="text-red-500 text-pallete4 text-2xl ml-2" />
                  )}
                </CardFooter>
                <CardFooter className="flex flex-row">
                  <span className="text-gray-600 text-sm ">
                    Created at:{' '}
                    {
                      new Date(game.createdAt)
                        .toLocaleString('sl-SI')
                        .split(',')[0]
                    }
                  </span>
                </CardFooter>
                {game.status === 'inactive' && (
                  <CardFooter>
                    <button
                      className="w-full bg-pallete4 text-pallete text-xl font-bold py-2 rounded-md hover:bg-pallete2 hover:text-pallete4 transition duration-300 ease-in-out"
                      onClick={() => handleSetActive(game.id, game.name)}
                    >
                      Set active
                    </button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
        <div className="px-6 flex flex-col justify-center">
          <hr className="w-full border border-pallete4" />
          <h1 className="text-4xl text-pallete4 font-bold text-center mt-2">
            User Options
          </h1>
          <div></div>
          <div className="flex flex-col justify-center mt-8 w-1/2">
            <button
              className="bg-pallete4 text-pallete text-xl font-bold py-2 rounded-md hover:bg-pallete2 hover:text-pallete4 transition duration-300 ease-in-out"
              onClick={handleSignOut}
            >
              SignOut
            </button>
          </div>
          <div className="mt-8">
            <h1 className="text-2xl text-pallete4 font-bold mb-5">
              More options will be added soon
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
