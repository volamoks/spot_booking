'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Zone } from 'types/index';
import { BookingDialog } from '../booking/BookingDialog';

interface ZoneCardProps {
    zone: Zone;
    getRedColor: () => string;
}

export function ZoneCard({ zone, getRedColor }: ZoneCardProps) {
    return (
        <Card className="bg-secondary">
            <CardHeader>
                <CardTitle className="text-lg">{zone.equipment}</CardTitle>
                <p className="text-sm mb-2">{zone.uniqueId}</p>
            </CardHeader>
            <CardContent>
                <p className="text-sm mb-2">Расположение: {zone.dmpProductNeighboring}</p>
                <p className="text-sm mb-2">Стоимость: UZS {zone.price}/день</p>
                <p className="text-sm mb-2">Категория: {zone.category}</p>
                <BookingDialog
                    zone={zone}
                    getRedColor={getRedColor}
                />
            </CardContent>
        </Card>
    );
}
