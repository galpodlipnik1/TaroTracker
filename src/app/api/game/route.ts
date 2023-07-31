import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import createPlayerScore from '@/actions/createPlayerScore';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  
  const { gameName, players } = await request.json();

  if (!user) {
    return NextResponse.redirect('/auth');
  }
  try {
    const game = await prisma.game.create({
      data: {
        ownerId: user.id,
        name: gameName,
        players,
        status: 'active',
      }
    });

    await createPlayerScore({ id: game.id, players });

    return NextResponse.json(game, { status: 201 });
  } catch (error: any) {
    return new NextResponse(`Internal Server Error, ${error}`, { status: 500 });
  }
}
