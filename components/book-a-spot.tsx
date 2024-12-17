'use client'

import { useEffect, useState } from 'react'
import { useRole } from '../components/RoleProvider'
import { useRouter } from 'next/navigation'
import { Store, Zone } from '../types'
import { useTheme } from 'next-themes'
import { StoreFilter } from './StoreFilter'
import { StoreCard } from './StoreCard'

interface BookASpotProps {
  initialStores: Store[]
}

export function BookASpot({ initialStores }: BookASpotProps) {
  const { role } = useRole()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
    const [filteredStores, setFilteredStores] = useState(initialStores);
  const { theme } = useTheme()
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


  useEffect(() => {
    if (role !== 'supplier') {
      router.push('/worker')
    }
  }, [role, router])

  if (role !== 'supplier') return null

  const handleSearch = (term: string) => {
    setSearchTerm(term);
      const filtered = initialStores.filter(store =>
          store.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredStores(filtered);
  }

    const handleEquipmentFilter = (equipment: string) => {
        if (!equipment) {
            setFilteredStores(initialStores);
            return;
        }
        const filtered = initialStores.map(store => ({
            ...store,
            dmpZones: store.dmpZones.filter(zone => zone.equipment === equipment)
        })).filter(store => store.dmpZones.length > 0);
        setFilteredStores(filtered);
    };

  const getRedColor = () => {
    return theme === 'dark' ? 'rgba(228, 0, 43, 0.7)' : 'rgb(228, 0, 43)'
  }

  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6" style={{ color: getRedColor() }}>Book a Spot</h1>
        
        <StoreFilter 
          onSearch={handleSearch}
          equipmentTypes={equipmentTypes}
          onEquipmentFilter={handleEquipmentFilter}
        />

        <div className="space-y-4">
          {filteredStores.map((store) => (
            <StoreCard 
              key={store.id}
              store={store}
              getRedColor={getRedColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
