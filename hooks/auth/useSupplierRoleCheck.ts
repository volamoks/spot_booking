'use client'

import { useEffect } from 'react';
import { useRole } from '../../components/layout/RoleProvider';
import { useRouter } from 'next/navigation';

export function useSupplierRoleCheck() {
    const { role } = useRole();
    const router = useRouter();

    useEffect(() => {
        if (role !== 'supplier') {
            router.push('/worker');
        }
    }, [role, router]);

    return { role };
}
