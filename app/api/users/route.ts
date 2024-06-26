import { auth } from "@/auth";
import prisma from "@/prisma/prisma";

export async function GET(req, res) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" });
  }
  try {
    const data = await prisma.user.findMany();
    const responseData = data.map((user) => ({
      login: user.login,
      created_at: user.created_at,
      blocked: user.blocked,
    }));
    return Response.json(responseData);
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
