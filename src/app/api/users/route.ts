import { createUser, listUsers } from "@/lib/api/users";
import { createUserSchema } from "@/lib/validators/users";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// example API for users using the decoupled lib/api/users.ts instead of a coupled prisma implementation

export async function GET() {
  try {
    const users = await listUsers();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get users." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null); // if json error, use null.
  const validation = createUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  try {
    const user = await createUser(validation.data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user." },
      { status: 500 },
    );
  }
}
