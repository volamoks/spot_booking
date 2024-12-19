import { NextResponse } from 'next/server';
import { prisma } from 'services/prismaService';
import { getServerSession } from 'next-auth';
import { authOptions } from 'lib/authOptions';

async function handler() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { role, id: userId } = session.user as { role: string, id: string };

    // Convert userId to number since our schema uses Int
    const userIdNum = parseInt(userId as string);

    // Filter bookings based on user role
    const bookings = await prisma.booking.findMany({
      where: role === 'supplier' 
        ? { 
            zone: {
              supplier: userId // Filter by supplier in the zone
            }
          }
        : role === 'worker'
        ? {
            userId: userIdNum // Filter by worker's userId
          }
        : undefined,
      include: {
        zone: {
          include: {
            store: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true
          }
        }
      }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to fetch bookings' }, 
      { status: 500 }
    );
  }
}

export const GET = handler;
