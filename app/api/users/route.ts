import { NextResponse } from 'next/server';
import { prisma } from '../../../services/prismaService';

export async function POST(req: Request) {
  try {
    const { name, email, role, phone } = await req.json();

    if (!name || !email || !role) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        phone,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
      console.error("Error creating user:", error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
