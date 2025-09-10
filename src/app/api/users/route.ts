import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// GET all users
export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

// CREATE new user
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
    return Response.json(user);
  } catch (error) {
    return new Response("Failed to create user", { status: 400 });
  }
}