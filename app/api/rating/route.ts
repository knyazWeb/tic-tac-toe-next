import { auth } from "@/auth";
import prisma from "@/prisma/prisma";

interface Rating {
  player: string;
  allGames: number;
  winnersGameCount: number;
  LossesGameCount: number;
  PercentageOfWins: number;
}

export async function GET(request: Request, res) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" });
  }
  try {
    const data = await prisma.games.findMany()
    const rating: Rating[] = []

    const players = new Set<string>()
    data.forEach((game) => {
      players.add(game.player1)
      players.add(game.player2)
    })
    players.forEach((player) => {
      const allGames = data.filter((game) => game.player1 === player || game.player2 === player).length
      const winnersGameCount = data.filter((game) => game.winner === player).length
      const LossesGameCount = allGames - winnersGameCount
      const PercentageOfWins = (winnersGameCount / allGames) * 100
      rating.push({
        player,
        allGames,
        winnersGameCount,
        LossesGameCount,
        PercentageOfWins,
      })
    })
    
   
    return Response.json(rating.sort((a, b) => b.PercentageOfWins - a.PercentageOfWins));
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
