import './globals.css';
import { Inter, Julee } from 'next/font/google';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] });
const julee = Julee({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'TaroTrack',
  icons: [
    {
      rel: 'icon',
      url: 'https://i.ibb.co/995W1pg/playing-cards.png',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={julee.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
