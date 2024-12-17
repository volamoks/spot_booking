'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zone } from '../types';
import { BookingDialog } from './booking/BookingDialog';

interface ZoneCardProps {
    zone: Zone;
    getRedColor: () => string;
}

export function ZoneCard({ zone, getRedColor }: ZoneCardProps) {
    return (
        <Card className="bg-secondary">
            <CardHeader>
                <CardTitle className="text-lg">{zone.equipment}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm mb-2">{zone.uniqueId}</p>
                <p className="text-sm mb-2">{zone.dmpProductNeighboring}</p>
                <p className="font-bold mb-2">${zone.price}/day</p>
                <p className="text-sm mb-2">{zone.category}</p>
                <BookingDialog
                    zone={zone}
                    getRedColor={getRedColor}
                />
            </CardContent>
        </Card>
    );
}
