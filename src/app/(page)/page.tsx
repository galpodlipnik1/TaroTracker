'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(animationTimeout);
  }, []);

  return (
    <div className="h-fit md:h-screen w-full bg-pallete flex">
      <div className="w-full flex flex-col mt-32">
        <div
          className={`w-full flex flex-col items-center transition-opacity ${
            isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-2'
          } duration-1000 space-y-2`}
        >
          <h1 className="text-5xl text-white font-bold hover:scale-110 hover:text-pallete3">
            Welcome to
          </h1>
          <h1 className="text-5xl text-white font-bold hover:scale-110 hover:text-pallete3">
            TaroTrack
          </h1>
        </div>
        <div className="w-full h-full flex flex-col items-center px-6">
          <div
            className={`w-full flex flex-col md:flex-row items-baseline justify-between transition-opacity ${
              isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-2'
            } duration-500 space-y-2 mt-8`}
          >
            <Card className="w-full md:w-5/12 h-7/12">
              <CardHeader className="px-4">
                <CardTitle>What is TaroTrack?</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <CardDescription>
                  TaroTrack is a web application that allows you to track your
                  tarok game scores.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="w-full md:w-5/12 h-7/12">
              <CardHeader className="px-4">
                <CardTitle>How does it work?</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <CardDescription>
                  TaroTracker is built with NextJS, Prisma, and TailwindCSS and
                  using MongoDb as a database. The application is hosted on
                  Vercel.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-end">
                  <button
                    className="bg-pallete3 text-white rounded-md px-4 py-2 hover:bg-pallete4 hover:text-pallete1"
                    onClick={() => (location.href = 'https://nextjs.org/')}
                  >
                    Learn more
                  </button>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div
            className={`w-full flex flex-col md:flex-row items-baseline justify-between transition-opacity ${
              isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-2'
            } duration-500 space-y-2 my-8`}
          >
            <Card className="w-full md:w-5/12 h-7/12 bg-white">
              <CardHeader className="px-4">
                <CardTitle>How can I contribute?</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <CardDescription>
                  taro track is currently not an open source project at the
                  moment but that might change in the future.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="w-full md:w-5/12 h-58">
              <CardHeader className="px-4">
                <CardTitle>Who made this?</CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <CardDescription>
                  TaroTrack was made by a developer named Gal who wanted to
                  simplify tracking their tarok game scores for beginers and
                  advanced players alike.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-end">
                  <button
                    className="bg-pallete3 text-white rounded-md px-4 py-2 hover:bg-pallete4 hover:text-pallete1"
                    onClick={() =>
                      (location.href = 'https://me.galpodlipnik.com/')
                    }
                  >
                    Personal Website
                  </button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
