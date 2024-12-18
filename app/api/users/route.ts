import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from 'services/prismaService';

export async function POST(req: Request) {
    try {
        const { email, password, name, company, role } = await req.json();

        // Check for required fields
        if (!email || !password || !name || !company || !role) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user via Prisma
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                company,
                role,
            },
        });

        // Create a new object without the password field
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            company: user.company,
            role: user.role
        };

        // Return user data
        return NextResponse.json({ 
            message: 'User created',
            user: userResponse,
        }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating user:', error);
        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return NextResponse.json(
                { message: 'Email already exists' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Error creating user' },
            { status: 500 },
        );
    }
}
