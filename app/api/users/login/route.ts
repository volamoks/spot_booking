import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "services/prismaService";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    if (!password) {
        return NextResponse.json(
          { message: "Password is required" },
          { status: 400 }
        );
      }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        company: true,
        phone: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create a new object without the password field
    const userResponse = {
      id: user.id,
a      email: user.email,
      name: user.name,
      role: user.role,
      company: user.company,
      phone: user.phone
    };

    return NextResponse.json({
      message: "Logged in",
      user: userResponse,
    }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error logging in" },
      { status: 500 }
    );
  }
}
