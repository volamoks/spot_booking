'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface StoreFilterProps {
    onSearch: (term: string) => void;
    equipmentTypes: string[];
    onEquipmentFilter: (equipment: string) => void;
}

export function StoreFilter({ onSearch, equipmentTypes, onEquipmentFilter }: StoreFilterProps) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                    <Input
                        placeholder="Search stores..."
                        value={searchTerm}
                        onChange={e => {
                            setSearchTerm(e.target.value);
                            onSearch(e.target.value);
                        }}
                        className="mb-4"
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {equipmentTypes.map(equipment => (
                    <Button
                        key={equipment}
                        onClick={() => onEquipmentFilter(equipment)}
                    >
                        {equipment}
                    </Button>
                ))}
                <Button onClick={() => onEquipmentFilter('')}>All</Button>
            </div>
        </div>
    );
}
