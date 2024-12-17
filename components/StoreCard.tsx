'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Store } from '../types';
import { ZoneCard } from './ZoneCard';

interface StoreCardProps {
    store: Store;
    getRedColor: () => string;
}

export function StoreCard({ store, getRedColor }: StoreCardProps) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <Card
            className="overflow-hidden border-l-4"
            style={{ borderLeftColor: getRedColor() }}
        >
            <CardHeader
                className="cursor-pointer"
                onClick={toggleExpand}
            >
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span>{store.name}</span>
                    </div>
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-2">Address: {store.address}</p>
                <p className="mb-2">Available Spots: {store.dmpZones.length}</p>
                {expanded && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {store.dmpZones.map(zone => (
                            <ZoneCard
                                key={zone.id}
                                zone={zone}
                                getRedColor={getRedColor}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
