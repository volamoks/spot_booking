'use client';

import { Store } from 'types/index';
import { StoreFilter } from 'components/features/StoreFilter';
import { StoreCard } from 'components/features/StoreCard';
import { useFilteredStores } from '@/hooks/booking/useFilteredStores';
import { useSupplierRoleCheck } from '@/hooks/auth/useSupplierRoleCheck';
import { useRedColor } from '@/hooks/ui/useRedColor';

interface BookASpotProps {
    initialStores: Store[];
}

export function BookASpot({ initialStores }: BookASpotProps) {
    const { role } = useSupplierRoleCheck();
    const { filteredStores, equipmentTypes, handleSearch, handleEquipmentFilter } = useFilteredStores({ initialStores });
    const { getRedColor } = useRedColor();


    if (role !== 'supplier') return null;

    return (
        <div>
            <div className="space-y-6">
                <h1
                    className="text-3xl font-bold mb-6"
                    style={{ color: getRedColor() }}
                >
                    Забронировать ДМП
                </h1>

                <StoreFilter
                    onSearch={handleSearch}
                    equipmentTypes={equipmentTypes}
                    onEquipmentFilter={handleEquipmentFilter}
                />

                <div className="space-y-4">
                    {filteredStores.map(store => (
                        <StoreCard
                            key={store.id}
                            store={store}
                            getRedColor={getRedColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
