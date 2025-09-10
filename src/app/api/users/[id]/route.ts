import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET user by ID
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });

  if (!user) return new Response("User not found", { status: 404 });

  return Response.json(user);
}

// UPDATE user by ID
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name: body.name, email: body.email },
    });
    return Response.json(updatedUser);
  } catch (error) {
    return new Response("Failed to update user", { status: 400 });
  }
}

// DELETE user by ID
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete user", { status: 400 });
  }
}
