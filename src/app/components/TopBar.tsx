'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Placeholder, Logo } from '../assets';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';

const TopBar = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-screen">
      <nav className="border-gray-200 bg-pallete2  fixed inset-x-0 z-40">
        <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Image
                className="rounded-full"
                width={32}
                height={32}
                src={Logo}
                alt="Icon"
              />
              <span className="self-center text-3xl md:text-5xl whitespace-nowrap text-black">
                TaroTrack
              </span>
            </a>
          </div>
          <div className="flex items-center flex-row-reverse">
            <div className="md:hidden">
              <button type="button" className="text-white" onClick={toggleMenu}>
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 18h14v-2H5v2zm0-5h14v-2H5v2zm0-7v2h14V6H5z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 5h16v2H4V5zm0 7h16v2H4v-2zm0 7h16v2H4v-2z"
                    />
                  )}
                </svg>
              </button>
            </div>
            <div className="hidden md:flex items-center justify-between w-full md:w-auto md:order-1">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                <li>
                  <a
                    href="/"
                    className={clsx(
                      'block py-2 pl-3 pr-4 rounded md:bg-transparent hover:text-pallete md:p-0 text-2xl',
                      pathname === '/' ? 'text-pallete3' : 'text-white'
                    )}
                  >
                    Domov
                  </a>
                </li>
                <li>
                  <a
                    href="/newgame"
                    className={clsx(
                      'block py-2 pl-3 pr-4 rounded md:p-0 hover:text-pallete border-gray-700 text-2xl',
                      pathname === '/newgame' ? 'text-pallete3' : 'text-white'
                    )}
                  >
                    Nova igra
                  </a>
                </li>
                <li>
                  <a
                    href="/points"
                    className={clsx(
                      'block py-2 pl-3 pr-4 rounded md:p-0 hover:text-pallete border-gray-700 text-2xl',
                      pathname === '/points' ? 'text-pallete3' : 'text-white'
                    )}
                  >
                    Dodaj tocke
                  </a>
                </li>
                <li>
                  <a
                    href="/leaderboard"
                    className={clsx(
                      'block py-2 pl-3 pr-4 rounded md:p-0 hover:text-pallete border-gray-700 text-2xl',
                      pathname === '/leaderboard'
                        ? 'text-pallete3'
                        : 'text-white'
                    )}
                  >
                    Lestvica
                  </a>
                </li>
              </ul>
            </div>
            {session && session?.data?.user?.email ? (
              <Link
                href="/user"
                className="flex mx-10 text-sm rounded-full md:mr-0 flex-col items-center hover:scale-105 transition transform"
              >
                <span className="sr-only">user</span>
                <Image
                  className="rounded-full"
                  width={42}
                  height={42}
                  src={session.data.user.image || Placeholder}
                  alt="user photo"
                />
                <span className="text-base text-pallete4">
                  {session.data.user.name}
                </span>
              </Link>
            ) : (
              <Link
                href="/auth"
                className="flex mx-10 text-sm rounded-full md:mr-0 flex-col items-center hover:scale-105 transition transform"
              >
                <span className="sr-only">user</span>
                <Image
                  className="rounded-full"
                  width={42}
                  height={42}
                  src={Placeholder}
                  alt="user photo"
                />
                <span className="text-base text-pallete4">Sign In</span>
              </Link>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="font-medium p-4 border rounded-b-lg bg-gray-800 border-gray-700">
              <li>
                <a
                  href="/"
                  className={clsx(
                    'block py-2 pl-3 pr-4 rounded text-2xl',
                    pathname === '/' ? 'text-pallete3' : 'text-white'
                  )}
                >
                  Domov
                </a>
              </li>
              <li>
                <a
                  href="/newgame"
                  className={clsx(
                    'block py-2 pl-3 pr-4 rounded md:p-0 hover:text-pallete border-gray-700 text-2xl',
                    pathname === '/newgame' ? 'text-pallete3' : 'text-white'
                  )}
                >
                  Nova igra
                </a>
              </li>
              <li>
                <a
                  href="/points"
                  className={clsx(
                    'block py-2 pl-3 pr-4 rounded border-gray-700 text-2xl',
                    pathname === '/points' ? 'text-pallete3' : 'text-white'
                  )}
                >
                  Dodaj točke
                </a>
              </li>
              <li>
                <a
                  href="/leaderboard"
                  className={clsx(
                    'block py-2 pl-3 pr-4 rounded border-gray-700 text-2xl',
                    pathname === '/leaderboard' ? 'text-pallete3' : 'text-white'
                  )}
                >
                  Lestvica
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <main className="h-screen w-screen">{children}</main>
    </div>
  );
};

export default TopBar;
