import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'services/prismaService';
import { withAuth } from 'lib/auth';

async function handler(req: NextRequest & { auth: { userId: string; role: string } }) {
  try {
    const { role, userId } = req.auth;

    // Convert userId to number since our schema uses Int
    const userIdNum = parseInt(userId);

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

export const GET = withAuth(handler);
