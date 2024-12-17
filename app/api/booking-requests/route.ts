import { NextResponse } from 'next/server';
import { prisma } from '../../../services/prismaService';

export async function POST(request: Request) {
  try {
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
        userId: 1, // Hardcoded for now, get from session later
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
