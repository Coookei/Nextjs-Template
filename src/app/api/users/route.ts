import { usersApi } from "@/lib/api";
import { createUserSchema } from "@/lib/validators/users";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  try {
    const users = await usersApi.list();
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
    const user = await usersApi.create(validation.data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user." },
      { status: 500 },
    );
  }
}
