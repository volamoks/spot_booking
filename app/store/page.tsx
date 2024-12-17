'use client'

import { getStoresWithZonesAndBookings } from '../../services/storeService';
import { Store, Zone } from '../../types';
import { useState, useEffect } from 'react';
import { StoreFilter } from '../../components/StoreFilter';

export default function StoreDashboard() {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [equipmentTypes, setEquipmentTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      const fetchedStores = await getStoresWithZonesAndBookings();
      setStores(fetchedStores);
      setFilteredStores(fetchedStores);

      // Extract unique equipment types
      const equipmentSet = new Set<string>();
      fetchedStores.forEach(store => {
        store.dmpZones.forEach(zone => {
          equipmentSet.add(zone.equipment);
        });
      });
      setEquipmentTypes(Array.from(equipmentSet));
    };

    fetchStores();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(term.toLowerCase()) ||
      store.address.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStores(filtered);
  };

    const handleEquipmentFilter = (equipment: string) => {
        if (!equipment) {
            setFilteredStores(stores);
            return;
        }
        const filtered = stores.map(store => ({
            ...store,
            dmpZones: store.dmpZones.filter(zone => zone.equipment === equipment)
        })).filter(store => store.dmpZones.length > 0);
        setFilteredStores(filtered);
    };

  return (
    <div>
      <StoreFilter onSearch={handleSearch} equipmentTypes={equipmentTypes} onEquipmentFilter={handleEquipmentFilter} />
      {filteredStores && filteredStores.map((store: Store) => (
        <div key={store.id}>
          <h2>{store.name}</h2>
          <p>{store.address}</p>
        </div>
      ))}
    </div>
  )
}
