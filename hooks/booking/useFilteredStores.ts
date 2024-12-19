import { useState, useEffect } from 'react';
import { Store } from '@/types';

interface UseFilteredStoresProps {
    initialStores: Store[];
}

export function useFilteredStores({ initialStores }: UseFilteredStoresProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStores, setFilteredStores] = useState(initialStores);
    const [equipmentTypes, setEquipmentTypes] = useState<string[]>([]);

    useEffect(() => {
        // Extract unique equipment types
        const equipmentSet = new Set<string>();
        initialStores.forEach(store => {
            store.dmpZones.forEach(zone => {
                equipmentSet.add(zone.equipment);
            });
        });
        setEquipmentTypes(Array.from(equipmentSet));
        setFilteredStores(initialStores);
    }, [initialStores]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        const filtered = initialStores.filter(store =>
            store.name.toLowerCase().includes(term.toLowerCase()),
        );
        setFilteredStores(filtered);
    };

    const handleEquipmentFilter = (equipment: string) => {
        if (!equipment) {
            setFilteredStores(initialStores);
            return;
        }
        const filtered = initialStores
            .map(store => ({
                ...store,
                dmpZones: store.dmpZones.filter(zone => zone.equipment === equipment),
            }))
            .filter(store => store.dmpZones.length > 0);
        setFilteredStores(filtered);
    };

    return {
        searchTerm,
        filteredStores,
        equipmentTypes,
        handleSearch,
        handleEquipmentFilter,
    };
}
