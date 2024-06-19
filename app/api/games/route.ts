import { auth } from "@/auth";
import prisma from "@/prisma/prisma";

export async function GET(request: Request, res) {
  const session = await auth()
  if(!session) {
    return Response.json({ error: "Unauthorized" });
  }
  const login = session.user.name
  try {
    const data = await prisma.games.findMany({
      where: {
        OR: [{ player1: login }, { player2: login }],
      },
    });
    const responseData = data.map((game) => ({
      player1: game.player1,
      player2: game.player2,
      winner: game.winner,
      time: game.time,
      createdAt: game.created_at,
    }));
    return Response.json(responseData);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
