'use client';

import { BookASpot } from '../../components/book-a-spot';
import { ProtectedComponent } from '../../components/RoleProvider';
import { Store } from '../../types';
import { UserRole } from '../../types/user';

interface SupplierClientPageProps {
    stores: Store[];
}

function SupplierClientPage({ stores }: SupplierClientPageProps) {
    if (!stores || stores.length === 0) {
        return <div>No stores found</div>;
    }

    return <BookASpot initialStores={stores} />;
}

export default function SupplierClientPageWithProtection({ stores }: SupplierClientPageProps) {
    return (
        <ProtectedComponent 
            component={() => <SupplierClientPage stores={stores} />}
            allowedRoles={['supplier'] as UserRole[]}
        />
    );
}
