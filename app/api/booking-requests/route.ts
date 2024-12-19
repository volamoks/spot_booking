import { NextResponse } from 'next/server';
import { prisma } from '../../../services/prismaService';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/authOptions';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized',
      }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email!,
      },
    });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      }, { status: 404 });
    }
    const userId = user.id;
    const { zoneId, startDate, endDate } = await request.json();

    if (!zoneId || !startDate || !endDate) {
      return NextResponse.json({
        success: false,
        message: 'Missing required parameters',
      }, { status: 400 });
    }

    const zone = await prisma.zone.findUnique({
      where: {
        uniqueId: zoneId,
      },
    });

    if (!zone) {
      return NextResponse.json({
        success: false,
        message: 'Zone not found',
      }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        zoneId: zone.id,
        userId: userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice: ((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24) + 1) * zone.price,
        status: 'requested',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Booking request created successfully',
      booking,
    });
  } catch (error: unknown) {
    console.error('Error creating booking request', error);
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: error.message || 'Failed to create booking request',
      }, { status: 500 });
    }
    return NextResponse.json({
      success: false,
      message: 'Failed to create booking request',
    }, { status: 500 });
  }
}
