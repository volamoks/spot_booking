import { NextResponse } from 'next/server';
import { prisma } from '../../../services/prismaService';

export async function GET() {
  try {
    const stores = await prisma.store.findMany({
      include: {
        dmpZones: {
          include: {
            bookings: true,
          },
        },
      },
    });

    return NextResponse.json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 });
  }
}
