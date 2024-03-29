import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import setOtherToInactive from '@/actions/setOtherToInactive';
import createPlayerScore from '@/actions/createPlayerScore';

export async function POST(request: Request) {
  const user = await getCurrentUser();

  const { gameName, players } = await request.json();

  if (!user) {
    return NextResponse.redirect('/auth');
  }
  try {
    players.map((player: string) => {
      if (player === '') {
        const index = players.indexOf(player);
        players.splice(index, 1);
      }

      return player;
    });

    const game = await prisma.game.create({
      data: {
        ownerId: user.id,
        name: gameName,
        players,
        status: 'active',
      },
    });

    await createPlayerScore({ id: game.id, players });
    await setOtherToInactive(game.id);

    return NextResponse.json(game, { status: 201 });
  } catch (error: any) {
    return new NextResponse(`Internal Server Error, ${error}`, { status: 500 });
  }
}
