'use client';

import React, { useEffect } from 'react';
import getActiveGame from '@/actions/getActiveGame';
import { useRouter } from 'next/navigation';

const Points = () => {
  const router = useRouter();
  useEffect(() => {
    getActiveGame().then((res: any) => {
      if (res) router.push(`/points/${res.id}/advanced`);
      else router.push(`/newgame`);
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-pallete flex justify-center items-center text-5xl text-pallete4">
      Redirecting...
    </div>
  );
};

export default Points;
